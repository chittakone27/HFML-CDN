import "./Profile.css";
import { Button, Alert, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import VillageSelectorOrgUnit from "../common/VillageSelectorOrgUnit";
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
import { Loader } from "@/ui/common";
import useProfileRules from "./useProfileRules";

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
  const { changeAttributeValue } = actions;
  const { currentTei, currentEnrollment } = data;
  const { program, orgUnit } = useSelectionStore(useShallow((state) => ({ program: state.program, orgUnit: state.orgUnit })));
  const trackedEntityAttributes = useMetadataStore((state) => state.trackedEntityAttributes);
  const attributes = program.programTrackedEntityAttributes.map((ptea) => {
    return ptea.trackedEntityAttribute.id;
  });
  const hiddenAttributes = ["oPKsfqS64oE", "r8bZppSsIvR", "oVwa5LfjnvA", "UNiaP6Oz7Mv", "M41B0OLdXww", "IdwH3mwSy2o", "WiuXRd1B6Wu", "zf7F68AsXEH"];
  const disabledAttributes = ["vJdG29KW1Et"];
  const attributeValues = currentTei.attributes.reduce((prev, current) => {
    prev[current.attribute] = current.value;
    return prev;
  }, {});
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const currentHealthId = currentTei.attributes.find((e) => e.attribute === "oPKsfqS64oE")?.value;
  const dob = currentTei.attributes.find((e) => e.attribute === "tQeFLjYbqzv")?.value;
  const sex = currentTei.attributes.find((e) => e.attribute === "DmuazFb368B")?.value;
  useProfileRules();

  const createCurrentProgramEnrollment = () => {
    const newEnrollment = {
      enrollmentDate: currentDate,
      incidentDate: currentDate,
      enrollment: generateUid(),
      program: program.id,
      trackedEntityInstance: currentTei.trackedEntityInstance,
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

  useEffect(() => {
    if (layout.layout === "layout2") {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [layout.layout]);

  const checkDuplicateHealthId = async (healthId) => {
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

  const doEnroll = async () => {
    const currentProgramEnrollment = createCurrentProgramEnrollment();
    const currProgramEnrResult = await saveEnrollment(currentProgramEnrollment);
    if (currProgramEnrResult.ok) {
      const result = await getTeiById(program.id, currentTei.trackedEntityInstance);
      actions.initData(result, program.id, orgUnit.id);
      actions.setLayout("layout", "layout3");
    }
  };
  const saveCurrentTei = async (tei) => {
    setAlertContent("Saving Tracked Entity Instance..");
    const teiResult = await saveTei(tei ? tei : currentTei);
    if (layout.layout === "layout2") {
      await doEnroll();
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

  return (
    <div className="custom-tracker-profile-container">
      <div className="custom-tracker-profile-title">{t("profile")}</div>
      <div className="custom-tracker-profile-content">
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
          if (attribute === "UNiaP6Oz7Mv") {
            return (
              <div className="custom-tracker-profile-field-row">
                <div>{t("currentAddress")}</div>
                <div>
                  <VillageSelectorOrgUnit disabled={!edit} VillageSelectorIds={["r8bZppSsIvR", "oVwa5LfjnvA", "UNiaP6Oz7Mv"]} />
                </div>
              </div>
            );
          } else if (hiddenAttributes.includes(attribute)) {
            return null;
          } else {
            return (
              <div className="custom-tracker-profile-field-row">
                <AttributeLabel attribute={attribute} />
                <AttributeField
                  disabled={disabledAttributes.includes(attribute) || loading || !edit}
                  attribute={attribute}
                  {...attributeProps[attribute]}
                />
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
      <div className="custom-tracker-profile-footer">
        {edit && (
          <LoadingButton
            disabled={!attributeValues.UNiaP6Oz7Mv}
            loading={loading}
            variant="contained"
            color="primary"
            onClick={async () => {
              setEdit(false);
              setLoading(true);
              if (layout.layout && layout.layout !== "layout3") {
                setAlertContent("Checking Health ID..");
                const tei = { ...currentTei };
                if (dob && sex) {
                  if (currentHealthId) {
                    const generatedNumber = currentHealthId.split("-")[2];
                    const healthId = await checkDuplicateHealthId(`${moment(dob).format("DDMMYYYY")}-${sex === "M" ? "1" : "2"}-${generatedNumber}`);
                    if (healthId !== currentHealthId) {
                      changeHealthId(tei, healthId);
                    }
                  } else {
                    const randomNumber = generateRandomNumber();
                    const healthId = await checkDuplicateHealthId(
                      `${moment(dob).format("DDMMYYYY")}-${sex === "M" ? "1" : "2"}-${randomNumber.join("")}`
                    );
                    if (healthId !== currentHealthId) {
                      changeHealthId(tei, healthId);
                    }
                  }
                }
                saveCurrentTei(tei);
              } else {
                saveCurrentTei();
              }
            }}
          >
            {t("save")}
          </LoadingButton>
        )}
        {!edit && (
          <Button
            disabled={loading}
            variant="contained"
            color="primary"
            onClick={async () => {
              setEdit(true);
            }}
          >
            {t("edit")}
          </Button>
        )}
        &nbsp;
        {layout.layout === "layout2" && (
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              actions.setLayout("layout", "layout1");
            }}
          >
            {t("cancel")}
          </Button>
        )}
        {alertContent ? (
          <div style={{ paddingLeft: "10px" }}>
            <Alert
              icon={<CircularProgress size={20} thickness={4} color="inherit" />}
              severity="info"
              sx={{
                display: "flex",
                alignItems: "center",
                maxHeight: "40px",
                borderRadius: "5px"
              }}
            >
              {alertContent}
            </Alert>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Profile;
