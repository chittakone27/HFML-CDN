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
import { findAttributeValue, findDataValue } from "../../common/utils";
import _ from "lodash";
import { tracker } from "@/api";
import { generateUid } from "@/utils/utils";
import useBasicRules from "./eventForms/useBasicRules";
import useDeliveryDialogRules from "./useDeliveryDialogRules";
const { saveEvent } = tracker;
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
              newChild.attributes.push({
                attribute: tea.eirTeaId,
                value: foundDateOfDelivery
              });
            } else {
              const foundCurrentAttribute = findAttributeValue(currentTei, tea.deliveryTeaId);
              newChild.attributes.push({
                attribute: tea.eirTeaId,
                value: foundCurrentAttribute
              });
            }
          });
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

  const errors = useBasicRules();
  const { basicErrors, completeDeliveryErrors } = useDeliveryDialogRules();
  const finalErrors = [...errors, ...basicErrors];
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
              style={{ padding: 5, color: "#e53935", height: "100%", width: "100%", overflow: "auto", backgroundColor: "#ffcdd2", borderRadius: 3 }}
            >
              {finalErrors.map((error) => {
                return <div>{error}</div>;
              })}
            </div>
          ) : (
            <div style={{ padding: 5, height: "100%", width: "100%", overflow: "auto", backgroundColor: "#e8f5e9", borderRadius: 3 }}>
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
            disabled={completeDeliveryErrors.length > 0}
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
