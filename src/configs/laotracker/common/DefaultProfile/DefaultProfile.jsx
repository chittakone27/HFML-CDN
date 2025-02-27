/* Components */
import { Button, Alert, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import VillageSelectorOrgUnit from "../VillageSelectorOrgUnit";
/* Hooks */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import useDefaultProfileRules from "./useDefaultProfileRules";
/* Libs */
import moment from "moment";
import { toast } from "react-toastify";
import { format } from "date-fns";
import _ from "lodash";
/* Other funcs */
import { tracker } from "@/api";
import { generateUid } from "@/utils/utils";
import { pull } from "@/utils/fetch";
/* Const values */
import { IDENTIFICATION_ATTRS } from "./const";
/* CSS */
import "./DefaultProfile.css";
const { saveTei, deleteTei, saveEnrollment, getTeiById, deleteEnrollment } = tracker;
const DefaultProfile = ({ attributeProps = {} }) => {
  const [loading, setLoading] = useState(false);
  const [alertContent, setAlertContent] = useState(null);
  const { t } = useTranslation();
  const { actions, data, layout } = useTrackerCaptureStore(
    useShallow((state) => ({
      actions: state.actions,
      data: state.data,
      layout: state.layout
    }))
  );
  const { changeAttributeValue, setHandlers, setData, setLayout } = actions;
  const { currentTei, currentEnrollment } = data;
  const { program, orgUnit } = useSelectionStore(useShallow((state) => ({ program: state.program, orgUnit: state.orgUnit })));
  const trackedEntityAttributes = useMetadataStore((state) => state.trackedEntityAttributes);
  const attributes = program.programTrackedEntityAttributes.map((ptea) => {
    return ptea.trackedEntityAttribute.id;
  });
  const hiddenAttributes = ["r8bZppSsIvR", "oVwa5LfjnvA", "UNiaP6Oz7Mv"];
  const disabledAttributes = ["oPKsfqS64oE"];

  const currentDate = format(new Date(), "yyyy-MM-dd");
  const currentHealthId = currentTei.attributes.find((e) => e.attribute === "oPKsfqS64oE")?.value;
  const dob = currentTei.attributes.find((e) => e.attribute === "tQeFLjYbqzv")?.value;
  const sex = currentTei.attributes.find((e) => e.attribute === "DmuazFb368B")?.value;
  const props = useDefaultProfileRules();
  const identAttrIds = Object.keys(IDENTIFICATION_ATTRS)
    .map((attrName) => IDENTIFICATION_ATTRS[attrName])
    .filter((attr) => attr !== "FB3Ro1hJ9ht");

  const createCurrentProgramEnrollment = (tei) => {
    const newEnrollment = {
      enrollmentDate: currentDate,
      incidentDate: currentDate,
      enrollment: generateUid(),
      program: program.id,
      trackedEntityInstance: tei.trackedEntityInstance,
      orgUnit: orgUnit.id,
      attributes: []
    };

    const events = [];
    program.programStages.forEach((programStage) => {
      if (programStage.autoGenerateEvent) {
        events.push({
          event: generateUid(),
          eventDate: currentDate,
          dueDate: currentDate,
          program: program.id,
          orgUnit: orgUnit.id,
          programStage: programStage.id,
          dataValues: []
        });
      }
    });

    if (events.length) newEnrollment.events = events;
    return newEnrollment;
  };

  const createClientRegistryEnrollment = (tei) => {
    const attributeValues = tei.attributes.reduce((prev, current) => {
      prev[current.attribute] = current.value;
      return prev;
    }, {});
    const newEnrollment = {
      enrollmentDate: currentDate,
      incidentDate: currentDate,
      enrollment: generateUid(),
      program: "m9tWdDKc2Y4",
      trackedEntityInstance: tei.trackedEntityInstance,
      orgUnit: attributeValues.UNiaP6Oz7Mv,
      attributes: []
    };
    return newEnrollment;
  };

  const doEnroll = async (tei) => {
    const currentProgramEnrollment = createCurrentProgramEnrollment(tei);
    const currProgramEnrResult = await saveEnrollment(currentProgramEnrollment);
    const chrEnrollmentResult = await pull(
      `/api/routes/chr/run?work=register&tei=${currentProgramEnrollment.trackedEntityInstance}&program=${program.id}`
    );
    if (chrEnrollmentResult && currProgramEnrResult.ok) {
      const result = await getTeiById(program.id, tei.trackedEntityInstance);
      actions.initData(result, program.id, orgUnit.id);
      actions.setLayout("layout", "layout3");
    }
  };

  useEffect(() => {
    setHandlers("profileSave", save);
    setHandlers("profileDelete", deleteProfile);
  }, []);

  useEffect(() => {
    if (program && program.id === "AyPkCOMmgdd") {
      setLayout("hideProfileDeleteButton", true);
    } else {
      setLayout("hideProfileDeleteButton", false);
    }
  }, [program ? program.id : null]);

  const saveCurrentTei = async (tei, enr, events) => {
    //setLoading(true);
    setAlertContent("Saving Tracked Entity Instance..");
    const teiResult = await saveTei(tei ? tei : currentTei);
    if (layout.layout === "layout2") {
      await doEnroll(tei);
    }
    if (layout.layout === "layout3") {
      await pull(`/api/routes/chr/run?work=update&tei=${currentTei.trackedEntityInstance}`);
    }

    if (teiResult.ok) {
      toast.success(t("saved"), {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      });
      actions.changeTeiProperty("lastSaved", new Date().toString());
      setLoading(false);
    } else {
      // setApiError({ teiResult: teiResult, enrResult: enrResult });
      setLoading(false);
    }
    actions.setLayout("customProfileFormButtons", null);
    setAlertContent(null);
  };

  const save = async (tei, enr, events) => {
    if (layout.layout && layout.layout !== "layout3") {
      setAlertContent("Checking Health ID..");
      actions.setLayout(
        "customProfileFormButtons",
        <div style={{ display: "flex" }}>
          <div style={{ paddingLeft: "5px" }}>
            <CircularProgress size={25} />
          </div>
          <div style={{ paddingTop: "5px", paddingLeft: "5px" }}>{t("checkingClientHealthId")}</div>
        </div>
      );
      const trackedEntityInstance = _.cloneDeep(tei);
      const currentHealthId = trackedEntityInstance.attributes.find((e) => e.attribute === "oPKsfqS64oE")?.value;
      const dob = trackedEntityInstance.attributes.find((e) => e.attribute === "tQeFLjYbqzv")?.value;
      const sex = trackedEntityInstance.attributes.find((e) => e.attribute === "DmuazFb368B")?.value;
      if (dob && sex) {
        if (currentHealthId) {
          const generatedNumber = currentHealthId.split("-")[2];
          const healthId = await checkDuplicateHealthId(
            `${moment(dob).format("DDMMYYYY")}-${sex === "M" ? "1" : "2"}-${generatedNumber}`,
            trackedEntityInstance
          );
          if (healthId !== currentHealthId) {
            changeHealthId(trackedEntityInstance, healthId);
          }
        } else {
          const randomNumber = generateRandomNumber();
          const healthId = await checkDuplicateHealthId(
            `${moment(dob).format("DDMMYYYY")}-${sex === "M" ? "1" : "2"}-${randomNumber.join("")}`,
            trackedEntityInstance
          );
          if (healthId !== currentHealthId) {
            changeHealthId(trackedEntityInstance, healthId);
          }
        }
      }
      await saveCurrentTei(trackedEntityInstance);
    } else {
      await saveCurrentTei(tei);
    }
  };

  const deleteProfile = async () => {
    const result = await deleteEnrollment(currentEnrollment.enrollment);
    const result1 = await pull(`/api/routes/chr/run?work=unenroll&tei=${currentEnrollment.trackedEntityInstance}&program=${program.id}`);
    setLayout("layout", "layout1");
  };

  const checkDuplicateHealthId = async (healthId) => {
    let flag = true;
    while (flag) {
      const url = `/api/routes/chr/run?work=search&filter=oPKsfqS64oE:${healthId}`;
      const result = await pull(url);
      // const result = await pull(
      //   `/api/trackedEntityInstances.json?filter=oPKsfqS64oE:EQ:${healthId}&program=m9tWdDKc2Y4&ou=IWp9dQGM0bS&ouMode=DESCENDANTS&skipPaging=true&fields=trackedEntityInstance`
      // );
      if (result.trackedEntityInstances.length > 0) {
        if (result.trackedEntityInstances[0].trackedEntityInstance !== currentTei.trackedEntityInstance) {
          const randomNumber = generateRandomNumber();
          healthId = `${healthId.split("-")[0]}-${healthId.split("-")[1]}-${randomNumber.join("")}`;
        } else {
          flag = false;
        }
      } else {
        flag = false;
      }
    }
    return healthId;
  };

  const generateRandomNumber = () => {
    return [
      Math.floor(Math.random() * (9 - 0 + 1)) + 0,
      Math.floor(Math.random() * (9 - 0 + 1)) + 0,
      Math.floor(Math.random() * (9 - 0 + 1)) + 0,
      Math.floor(Math.random() * (9 - 0 + 1)) + 0
    ];
  };

  useEffect(() => {
    (async () => {
      if (dob && sex && layout.layout !== "layout3") {
        if (currentHealthId) {
          const generatedNumber = currentHealthId.split("-")[2];
          const healthId = `${moment(dob).format("DDMMYYYY")}-${sex === "M" ? "1" : "2"}-${generatedNumber}`;
          if (healthId !== currentHealthId) {
            changeAttributeValue("oPKsfqS64oE", healthId);
          }
        } else {
          const randomNumber = generateRandomNumber();
          const healthId = `${moment(dob).format("DDMMYYYY")}-${sex === "M" ? "1" : "2"}-${randomNumber.join("")}`;
          if (healthId !== currentHealthId) {
            changeAttributeValue("oPKsfqS64oE", healthId);
          }
        }
      }
    })();
  }, [dob, sex]);

  const changeHealthId = (tei, healthId) => {
    const foundAttribute = tei.attributes.find((e) => e.attribute === "oPKsfqS64oE");
    if (foundAttribute) {
      foundAttribute.value = healthId;
    } else {
      tei.attributes.push({
        attribute: "oPKsfqS64oE",
        value: healthId
      });
    }
    return tei;
  };

  useEffect(() => {
    setData("mandatoryAttributes", ["UNiaP6Oz7Mv"]);
  }, []);

  console.log(layout);
  return (
    <div className="delivery-registry-profile-container">
      {layout.layout === "layout2" && (
        <div className="delivery-registry-profile-field-row client-health-id-row">
          <AttributeLabel attribute="oPKsfqS64oE" />
          <div style={{ fontWeight: "bold", color: "#0277bd" }}>
            <div>{t("clientHealthIdWarning1")}</div>
            <div>{t("clientHealthIdWarning2")}</div>
          </div>
        </div>
      )}
      {layout.layout === "layout3" && (
        <div className="delivery-registry-profile-field-row client-health-id-row">
          <AttributeLabel attribute="oPKsfqS64oE" />
          <AttributeField
            attribute="oPKsfqS64oE"
            disabled={disabledAttributes.includes("oPKsfqS64oE")}
            {...attributeProps["oPKsfqS64oE"]}
            {...props["oPKsfqS64oE"]}
            helpers={[
              {
                type: "HELPER",
                value: t("clientHealthIdWarning1")
              }
            ]}
          />
        </div>
      )}
      <div className="not-client-health-id-row">
        {attributes.map((attribute) => {
          if (attribute === "oPKsfqS64oE" || identAttrIds.includes(attribute)) {
            return null;
          } else if (attribute === "UNiaP6Oz7Mv") {
            return (
              <div className="delivery-registry-profile-field-row">
                <div>{t("currentAddress")}</div>
                <div>
                  <VillageSelectorOrgUnit
                    mandatoryFields={["r8bZppSsIvR", "oVwa5LfjnvA", "UNiaP6Oz7Mv"]}
                    VillageSelectorIds={["r8bZppSsIvR", "oVwa5LfjnvA", "UNiaP6Oz7Mv"]}
                  />
                </div>
              </div>
            );
          }
          // else if (attribute === IDENTIFICATION_ATTRS["CVID"]) {
          //   return (
          //     <div className="ident-section-container">
          //       <div className="ident-title">Identification</div>
          //       <div className="ident-inputs-container">
          //         <div className="delivery-registry-profile-field-row">
          //           <span className="ident-caution">{t("atLeastIdField")}</span>
          //         </div>
          //         {Object.keys(IDENTIFICATION_ATTRS).map((attrName) => {
          //           return (
          //             <div className="delivery-registry-profile-field-row">
          //               <AttributeLabel
          //                 attribute={IDENTIFICATION_ATTRS[attrName]}
          //                 mandatory={true}
          //               />
          //               <AttributeField
          //                 attribute={IDENTIFICATION_ATTRS[attrName]}
          //                 disabled={disabledAttributes.includes(
          //                   IDENTIFICATION_ATTRS[attrName]
          //                 )}
          //                 {...attributeProps[IDENTIFICATION_ATTRS[attrName]]}
          //                 {...props[IDENTIFICATION_ATTRS[attrName]]}
          //               />
          //             </div>
          //           );
          //         })}
          //       </div>
          //     </div>
          //   );
          // }
          else if (
            hiddenAttributes.includes(attribute) ||
            (attributeProps[attribute] && attributeProps[attribute].hidden) ||
            (props[attribute] && props[attribute].hidden)
          ) {
            return null;
          } else {
            return (
              <div className="delivery-registry-profile-field-row">
                <AttributeLabel attribute={attribute} />
                <AttributeField
                  attribute={attribute}
                  disabled={disabledAttributes.includes(attribute)}
                  {...attributeProps[attribute]}
                  {...props[attribute]}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
export default DefaultProfile;
