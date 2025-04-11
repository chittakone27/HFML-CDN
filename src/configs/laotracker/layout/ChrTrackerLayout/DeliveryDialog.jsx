import { useEffect, useState } from "react";
import { Dialog, Tabs, Tab } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DeliveryDetails from "./eventForms/DeliveryDetails";
import Infant from "./eventForms/Infant";
import BirthCertificateButton from "./BirthCertificateButton";
import { useShallow } from "zustand/react/shallow";
import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useChrTrackerStore from "./state";
import { useTranslation } from "react-i18next";
import { findAttributeValue, findDataValue } from "../../common/utils";
import _, { clone } from "lodash";
import { tracker } from "@/api";
import { generateUid } from "@/utils/utils";
import useBasicRules from "./eventForms/useBasicRules";
import useDeliveryDialogRules from "./useDeliveryDialogRules";
import { pull } from "@/utils/fetch";
const { saveEvent, saveEnrollment, searchTeis, saveTei } = tracker;
const DeliveryDialog = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const { trackerActions, data } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      trackerActions: state.actions
    }))
  );
  const { currentTei } = data;
  const { program, orgUnit } = useSelectionStore(
    useShallow((state) => ({
      program: state.program,
      orgUnit: state.orgUnit
    }))
  );
  const { event, actions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      actions: state.actions
    }))
  );
  const { currentEnrollment, currentProgramStage, currentEvent, editing } =
    event;

  const { setEvent, changeDataValue, changeEventProperty } = actions;
  const { saveEventToState, changeEnrollmentProperty, saveEnrollmentToState } =
    trackerActions;

  const completed =
    currentEnrollment && currentEnrollment.status === "COMPLETED";
  const childTeisValue = findDataValue(currentEvent.dataValues, "lYdXxom1BAG");
  let children = [];
  if (childTeisValue) {
    children = JSON.parse(childTeisValue);
  }

  useEffect(() => {
    setTab(0);
    setEvent("currentChild", null);
  }, [currentEnrollment.enrollment]);

  const updateInfants = () => {
    if (!childTeisValue) {
      let liveBirths = findDataValue(currentEvent.dataValues, "OcT4N2illVT");
      liveBirths = liveBirths ? parseInt(liveBirths) : null;
      if (liveBirths && liveBirths > 0) {
        const children = [];
        for (let i = 0; i < liveBirths; i++) {
          const foundDateOfDelivery = findDataValue(
            currentEvent.dataValues,
            "grMMOiF9fPj"
          );
          const newTeiId = generateUid();
          const newEnrollmentId = generateUid();
          const newBirthDetailEventId = generateUid();
          const newImmunizationEventId = generateUid();
          const newChild = {
            orgUnit: orgUnit.id,
            trackedEntityInstance: newTeiId,
            trackedEntityType: "MCPQUTHX1Ze",
            enrollments: [
              {
                trackedEntityType: "MCPQUTHX1Ze",
                orgUnit: orgUnit.id,
                program: "Yj9cJ34AXw6",
                trackedEntityInstance: newTeiId,
                enrollment: newEnrollmentId,
                enrollmentDate: foundDateOfDelivery,
                incidentDate: foundDateOfDelivery,
                status: "ACTIVE",
                events: [
                  {
                    dueDate: foundDateOfDelivery,
                    program: "Yj9cJ34AXw6",
                    event: newBirthDetailEventId,
                    programStage: "bwGkn5ebqkD",
                    orgUnit: orgUnit.id,
                    trackedEntityInstance: newTeiId,
                    enrollment: newEnrollmentId,
                    status: "ACTIVE",
                    eventDate: foundDateOfDelivery,
                    dataValues: []
                  },
                  {
                    dueDate: foundDateOfDelivery,
                    program: "Yj9cJ34AXw6",
                    event: newImmunizationEventId,
                    programStage: "hCTTxOH8FOa",
                    orgUnit: orgUnit.id,
                    trackedEntityInstance: newTeiId,
                    enrollment: newEnrollmentId,
                    status: "ACTIVE",
                    eventDate: foundDateOfDelivery,
                    dataValues: []
                  }
                ]
              }
            ],
            attributes: []
          };
          children.push(newChild);
        }

        changeDataValue("lYdXxom1BAG", JSON.stringify(children));
        const cloned = _.cloneDeep(currentEvent);
        cloned.dataValues.push({
          dataElement: "lYdXxom1BAG",
          value: JSON.stringify(children)
        });
        return cloned;
      } else {
        console.log("here here");
        return currentEvent;
      }
    } else {
      return currentEvent;
    }
  };

  const errors = useBasicRules();
  const { basicErrors, completeDeliveryErrors } = useDeliveryDialogRules();
  const finalErrors = [...errors, ...basicErrors];
  let ableToCompleteDelivery = true;
  if (completeDeliveryErrors.length > 0) {
    ableToCompleteDelivery = false;
  }
  const liveBirths = findDataValue(currentEvent.dataValues, "OcT4N2illVT");
  if (!liveBirths) {
    ableToCompleteDelivery = false;
  }
  if (liveBirths && parseInt(liveBirths) > 0) {
    if (!childTeisValue) {
      ableToCompleteDelivery = false;
    }
  }

  return currentEnrollment ? (
    <Dialog fullWidth={true} maxWidth={"lg"} open={true}>
      <div className="chr-tracker-event-form-container">
        <div className="chr-tracker-event-form">
          <div className="chr-tracker-delivery-tabs-container">
            <Tabs
              value={tab}
              onChange={(event, value) => {
                setTab(value);
                // setEvent("currentChild", children[value - 1]);
              }}
            >
              <Tab label={t("deliveryDetails")} />
              {children.map((child, index) => {
                return <Tab label={t("infant") + " " + (index + 1)} />;
              })}
            </Tabs>
          </div>
          <div className="chr-tracker-delivery-content">
            {tab === 0 && <DeliveryDetails />}
            {tab !== 0 && <Infant childIndex={tab - 1} />}
          </div>
        </div>
        <div className="chr-tracker-event-form-helper">
          {finalErrors.length > 0 ? (
            <div
              style={{
                padding: 5,
                color: "#e53935",
                height: "100%",
                width: "100%",
                overflow: "auto",
                backgroundColor: "#ffcdd2",
                borderRadius: 3
              }}
            >
              {finalErrors.map((error) => {
                return <div>{error}</div>;
              })}
            </div>
          ) : (
            <div
              style={{
                padding: 5,
                height: "100%",
                width: "100%",
                overflow: "auto",
                backgroundColor: "#e8f5e9",
                borderRadius: 3
              }}
            >
              {t("noErrors")}
            </div>
          )}
        </div>
        <div className="chr-tracker-event-form-buttons">
          {editing && (
            <LoadingButton
              disabled={finalErrors.length > 0}
              loading={loading}
              variant="contained"
              onClick={async () => {
                setLoading(true);
                const toBeSavedEvent = await updateInfants(currentEvent);
                saveEventToState(toBeSavedEvent);
                await saveEvent(toBeSavedEvent);
                setEvent("editing", false);
                setLoading(false);
              }}
            >
              {t("save")}
            </LoadingButton>
          )}
          {!editing && !completed && (
            <LoadingButton
              loading={loading}
              variant="contained"
              onClick={() => {
                setEvent("editing", true);
              }}
            >
              {t("edit")}
            </LoadingButton>
          )}
          &nbsp;
          <LoadingButton
            loading={loading}
            variant="contained"
            color="error"
            onClick={() => {
              setEvent("currentEnrollment", null);
              setEvent("currentEvent", null);
              setEvent("editing", false);
            }}
          >
            {t("close")}
          </LoadingButton>
          <div style={{ marginLeft: "auto" }}>
            <LoadingButton
              loading={loading}
              disabled={!ableToCompleteDelivery || completed}
              color="success"
              variant="contained"
              onClick={async () => {
                setLoading(true);
                setEvent("editing", false);
                const cloned = _.cloneDeep(children);
                for (let i = 0; i < cloned.length; i++) {
                  const currentChild = cloned[i];
                  while (true) {
                    const dob = findAttributeValue(currentChild, "tQeFLjYbqzv");
                    const splitted = dob.split("-");
                    const sex = findAttributeValue(currentChild, "DmuazFb368B");
                    const randomNumbers = [
                      Math.floor(Math.random() * (9 - 0 + 1)) + 0,
                      Math.floor(Math.random() * (9 - 0 + 1)) + 0,
                      Math.floor(Math.random() * (9 - 0 + 1)) + 0,
                      Math.floor(Math.random() * (9 - 0 + 1)) + 0
                    ];
                    const number = randomNumbers.join("");
                    const newClientHealthId = `${splitted[2]}${splitted[1]}${
                      splitted[0]
                    }-${sex === "M" ? "1" : "2"}-${number}`;
                    const foundInDhis2 = await searchTeis(
                      { oPKsfqS64oE: newClientHealthId },
                      null,
                      "IWp9dQGM0bS",
                      "MCPQUTHX1Ze"
                    );
                    const foundInChr = await pull(
                      `/api/routes/chr/run?work=search&filter=oPKsfqS64oE:${newClientHealthId}`
                    );
                    if (
                      foundInDhis2.trackedEntityInstances.length === 0 &&
                      foundInChr.trackedEntityInstances.length === 0
                    ) {
                      cloned[i].attributes.push({
                        attribute: "oPKsfqS64oE",
                        value: newClientHealthId
                      });
                      break;
                    }
                  }
                }
                const clonedEnrollment = _.cloneDeep(currentEnrollment);
                const toBeSavedEvent = _.cloneDeep(currentEvent);
                const foundDataValueIndex = toBeSavedEvent.dataValues.findIndex(
                  (dv) => dv.dataElement === "lYdXxom1BAG"
                );
                toBeSavedEvent.dataValues[foundDataValueIndex].value =
                  JSON.stringify(cloned);
                changeDataValue("lYdXxom1BAG", JSON.stringify(cloned));
                changeEnrollmentProperty("status", "COMPLETED");
                changeEventProperty("status", "COMPLETED");
                toBeSavedEvent.status = "COMPLETED";
                clonedEnrollment.status = "COMPLETED";
                saveEnrollmentToState(clonedEnrollment);
                saveEventToState(toBeSavedEvent);
                await saveEnrollment(clonedEnrollment);
                await saveEvent(toBeSavedEvent);
                setEvent("currentEnrollment", clonedEnrollment);
                //ONLY ON DEV, ENROLL CHILDREN TO EIR AND CHR
                for (let i = 0; i < cloned.length; i++) {
                  await saveTei(cloned[i]);
                  await pull(
                    `/api/routes/chr/run?work=register&tei=${cloned[i].trackedEntityInstance}&program=Yj9cJ34AXw6`
                  );
                }
                setLoading(false);
              }}
            >
              {t("completeThisDelivery")}
            </LoadingButton>
            &nbsp;
            {completed && (
              <BirthCertificateButton loading={loading} children={children} />
            )}
          </div>
        </div>
      </div>
    </Dialog>
  ) : null;
};
export default DeliveryDialog;
