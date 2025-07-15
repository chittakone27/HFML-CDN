import "./Profile.css";
import { Button, Alert, CircularProgress, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import VillageSelectorOrgUnit from "../../../common/VillageSelector/VillageSelectorOrgUnit";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { tracker } from "@/api";
const { saveTei, deleteTei, saveEnrollment, getTeiById } = tracker;
import { toast } from "react-toastify";
import "./Profile.css";
import { generateUid } from "@/utils/utils";
import { pull } from "@/utils/fetch";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import moment from "moment";
import _ from "lodash";
import { Loader } from "@/ui/common";
import useProfileRules from "./useProfileRules";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";

const Profile = ({ attributeProps = {} }) => {
  const [edit, setEdit] = useState(false);
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
  const { changeAttributeValue, setHandlers, setLayout } = actions;
  const { currentTei, currentEnrollment } = data;
  const { currentEvent } = useCurrentEvent();
  const { program, orgUnit } = useSelectionStore(useShallow((state) => ({ program: state.program, orgUnit: state.orgUnit })));
  const trackedEntityAttributes = useMetadataStore((state) => state.trackedEntityAttributes);
  const attributes = program.programTrackedEntityAttributes.map((ptea) => {
    return ptea.trackedEntityAttribute.id;
  });
  const { hiddenAttributes, missingVillage } = useProfileRules();
  const disabledAttributes = ["vJdG29KW1Et"];

  const currentDate = format(new Date(), "yyyy-MM-dd");
  const currentHealthId = currentTei.attributes.find((e) => e.attribute === "oPKsfqS64oE")?.value;
  const dob = currentTei.attributes.find((e) => e.attribute === "tQeFLjYbqzv")?.value;
  const sex = currentTei.attributes.find((e) => e.attribute === "DmuazFb368B")?.value;

  useEffect(() => {
    setHandlers("profileSave", save);
  }, []);

  useEffect(() => {
    setLayout("hideEventSaveButton", true);
  });

  useEffect(() => {
    setLayout("disableProfileSaveButton", missingVillage);
  }, [missingVillage]);

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
          eventDate: "",
          dueDate: currentDate,
          program: program.id,
          orgUnit: orgUnit.id,
          programStage: programStage.id,
          dataValues: [],
          status: "SCHEDULE"
        });
      }
    });

    if (events.length) newEnrollment.events = events;
    return newEnrollment;
  };

  // useEffect(() => {
  //   if (layout.layout === "layout2") {
  //     setEdit(true);
  //   } else {
  //     setEdit(false);
  //   }
  // }, [layout.layout]);

  const checkDuplicateHealthId = async (healthId, currentTei) => {
    let flag = true;
    while (flag) {
      const result = await pull(
        `/api/trackedEntityInstances.json?filter=oPKsfqS64oE:EQ:${healthId}&program=Yj9cJ34AXw6&ou=IWp9dQGM0bS&ouMode=DESCENDANTS&skipPaging=true&fields=trackedEntityInstance`
      );
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
      attributes: [],
      orgUnit: attributeValues.UNiaP6Oz7Mv
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
      const result = await getTeiById(program.id, currentTei.trackedEntityInstance);
      actions.initData(result, program.id, orgUnit.id);
      actions.setLayout("layout", "layout3");
    }
  };
  const saveCurrentTei = async (tei) => {
    setAlertContent("Saving Tracked Entity Instance..");
    const teiResult = await saveTei(tei ? tei : currentTei);
    if (layout.layout === "layout2") {
      await doEnroll(tei);
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
    setAlertContent(null);
  };

  const save = async (tei, enr, events) => {
    if (layout.layout && layout.layout !== "layout3") {
      setAlertContent("Checking Health ID..");
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
      await pull(`/api/routes/chr/run?work=update&tei=${currentTei.trackedEntityInstance}`);
      setLoading(false);
    }
  };

  return (
    <div className="custom-tracker-profile-container">
      {layout.layout === "layout3" && (
        <>
          <div className="custom-tracker-profile-field-row">
            <AttributeLabel attribute="oPKsfqS64oE" />
            <AttributeField
              disabled={true}
              attribute="oPKsfqS64oE"
              {...attributeProps["oPKsfqS64oE"]}
              helpers={[
                {
                  type: "HELPER",
                  value: t("childUniqueIdWarning1")
                }
              ]}
            />
          </div>
        </>
      )}
      {attributes.map((attribute) => {
        if (attribute === "UNiaP6Oz7Mv" && !hiddenAttributes.includes("villageSelector")) {
          return (
            <div className="custom-tracker-profile-field-row">
              <div>{t("currentAddress")}</div>
              <div>
                <VillageSelectorOrgUnit VillageSelectorIds={["r8bZppSsIvR", "oVwa5LfjnvA", "UNiaP6Oz7Mv"]} />
                <div style={{ textAlign: "justify" }}>
                  <Typography variant="HELPER">- {t("addressInstruction1")}</Typography>
                  <br />
                  <Typography variant="HELPER">- {t("addressInstruction2")}</Typography>
                  <br />
                  <Typography variant="HELPER">- {t("addressInstruction3")}</Typography>
                </div>
              </div>
            </div>
          );
        } else if (hiddenAttributes.includes(attribute)) {
          return null;
        } else {
          const initialDate = attribute === "tQeFLjYbqzv" ? format(new Date(), "yyyy-MM-dd") : undefined;
          return (
            <div className="custom-tracker-profile-field-row">
              {attribute === "DtqYqC9Xr5Z" ? (
                <div style={{ display: "flex" }}>
                  <Typography variant={"body1"}>{t("livingAbroad")}</Typography>
                </div>
              ) : (
                <AttributeLabel attribute={attribute} />
              )}
              <div>
                <AttributeField
                  renderAsRadio={attribute === "DmuazFb368B" ? true : undefined}
                  disabled={disabledAttributes.includes(attribute)}
                  disabledManualFields={true}
                  attribute={attribute}
                  initialDate={initialDate}
                  {...attributeProps[attribute]}
                />
                <div>{attribute === "DtqYqC9Xr5Z" && <Typography variant="HELPER">{t("foreignerInstruction")}</Typography>}</div>
              </div>
            </div>
          );
        }
      })}
      {layout.layout === "layout2" && (
        <>
          <div className="custom-tracker-profile-field-row">
            <AttributeLabel attribute="oPKsfqS64oE" />
            <div style={{ fontWeight: "bold", color: "#0277bd" }}>
              <div>{t("childUniqueIdWarning1")}</div>
              <div>{t("childUniqueIdWarning2")}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Profile;
