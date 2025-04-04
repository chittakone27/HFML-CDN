import { useEffect, useState } from "react";
import { Dialog, Button, Tabs, Tab } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DeliveryDetails from "./eventForms/DeliveryDetails";
import Infant from "./eventForms/Infant";
import { useShallow } from "zustand/react/shallow";
import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useChrTrackerStore from "./state";
import { useTranslation } from "react-i18next";
import { findDataValue } from "../../common/utils";
import _ from "lodash";
import { tracker } from "@/api";
import { generateUid } from "@/utils/utils";
const { saveEvent } = tracker;
const DeliveryDialog = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const { trackerActions } = useTrackerCaptureStore(
    useShallow((state) => ({
      trackerActions: state.actions
    }))
  );
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
  const { currentEnrollment, currentProgramStage, currentEvent, editing } = event;

  const { setEvent, changeDataValue } = actions;
  const { saveEventToState } = trackerActions;

  const completed = currentEnrollment && currentEnrollment.status === "COMPLETED";
  const childTeisValue = findDataValue(currentEvent.dataValues, "lYdXxom1BAG");
  let children = [];
  if (childTeisValue) {
    children = JSON.parse(childTeisValue);
  }

  useEffect(() => {
    setTab(0);
    setEvent("currentChild", null);
  }, [currentEnrollment.enrollment]);

  const populateChildAttributes = (child) => {
    [
      {
        deliveryTeaId: "tQeFLjYbqzv",
        eirTeaId: "tQeFLjYbqzv"
      },
      {
        deliveryTeaId: "IEE2BMhfoSc",
        eirTeaId: "RqEyvE6zcTE"
      },
      {
        deliveryTeaId: "IBLkiaYRRL3",
        eirTeaId: "WkHHrysFy3n"
      },
      {
        deliveryTeaId: "r8bZppSsIvR",
        eirTeaId: "r8bZppSsIvR"
      },
      {
        deliveryTeaId: "oVwa5LfjnvA",
        eirTeaId: "oVwa5LfjnvA"
      },
      {
        deliveryTeaId: "UNiaP6Oz7Mv",
        eirTeaId: "UNiaP6Oz7Mv"
      },
      {
        deliveryTeaId: "RwoKpuIgMmA", //lgHRdU82IJv
        eirTeaId: "DcMyN6eoyFD"
      }
    ].forEach((tea) => {
      if (tea.deliveryTeaId === "tQeFLjYbqzv") {
        tei = updateAttribute(tei, tea.eirTeaId, {
          value: foundDateOfDelivery
        });
      } else {
        const foundCurrentAttribute = currentTei.attributes.find((e) => e.attribute === tea.deliveryTeaId);
        if (foundCurrentAttribute) {
          tei = updateAttribute(tei, tea.eirTeaId, foundCurrentAttribute);
        } else {
          if (tea.deliveryTeaId === "RwoKpuIgMmA") {
            const foundCurrentPhoneNumber = currentTei.attributes.find((e) => e.attribute === "lgHRdU82IJv");
            if (foundCurrentPhoneNumber) {
              tei = updateAttribute(tei, "lgHRdU82IJv", foundCurrentPhoneNumber);
            }
          }
        }
      }
    });
    return tei;
  };

  const updateInfants = () => {
    if (!childTeisValue) {
      let liveBirths = findDataValue(currentEvent.dataValues, "OcT4N2illVT");
      liveBirths = liveBirths ? parseInt(liveBirths) : null;
      if (liveBirths && liveBirths > 0) {
        const children = [];
        for (let i = 0; i < liveBirths; i++) {
          const foundDateOfDelivery = findDataValue(currentEvent.dataValues, "grMMOiF9fPj");
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
      }
    } else {
      return currentEvent;
    }
  };

  // if (liveBirths && liveBirths > 0) {
  //   for (let i = 0; i < liveBirths.length; i++) {
  //     while (true) {
  //       const dob = findAttributeValue(currentTei, "tQeFLjYbqzv");
  //       const splitted = dob.split("-");
  //       const sex = findAttributeValue(currentTei, "DmuazFb368B");
  //       const randomNumbers = [
  //         Math.floor(Math.random() * (9 - 0 + 1)) + 0,
  //         Math.floor(Math.random() * (9 - 0 + 1)) + 0,
  //         Math.floor(Math.random() * (9 - 0 + 1)) + 0,
  //         Math.floor(Math.random() * (9 - 0 + 1)) + 0
  //       ];
  //       const number = randomNumbers.join("");
  //       newClientHealthId = `${splitted[2]}${splitted[1]}${splitted[0]}-${sex === "M" ? "1" : "2"}-${number}`;
  //       const found = await searchTeis({ oPKsfqS64oE: newClientHealthId }, null, "IWp9dQGM0bS", "MCPQUTHX1Ze");
  //       if (found.trackedEntityInstances.length === 0) {
  //         break;
  //       }
  //     }
  //   }
  // }

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
        <div className="chr-tracker-event-form-buttons">
          {editing && (
            <LoadingButton
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
            color="success"
            variant="contained"
            onClick={async () => {
              // await createInfants();
            }}
          >
            {t("completeThisDelivery")}
          </LoadingButton>
          <LoadingButton
            loading={loading}
            style={{ marginLeft: "auto" }}
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
        </div>
      </div>
    </Dialog>
  ) : null;
};
export default DeliveryDialog;
