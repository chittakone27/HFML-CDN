import { DATA_ELEMENTS } from "./eventForms/ipdVisitDetailsConst";
import { findDataValue } from "../../common/utils";
import { tracker } from "@/api";
import _ from "lodash";
const { saveEvent, saveTei, saveEnrollment, getReservedValue } = tracker;
const { IPD_STATUS_AT_DISCHARGE, DATE_OF_DEATH } = DATA_ELEMENTS;

const saveIpdVisitDetails = async (currentEvent, currentTei, currentEnrollment, trackerActions, chrTrackerActions) => {
  const { changeEnrollmentProperty, saveEventToState } = trackerActions;
  const { changeEventProperty } = chrTrackerActions;
  const ipdStatusAtDischarge = findDataValue(currentEvent.dataValues, IPD_STATUS_AT_DISCHARGE);
  const dateOfDeath = findDataValue(currentEvent.dataValues, DATE_OF_DEATH);

  const isDead = ipdStatusAtDischarge === "6";
  if (isDead) {
    const foundCodSystemId = currentTei.attributes.find((attr) => attr.attribute === "BfkIayM14MF");
    if (!foundCodSystemId) {
      const codSystemId = await getReservedValue("BfkIayM14MF", "null");
      const clonedTei = _.cloneDeep(currentTei);
      clonedTei.attributes.push({
        attribute: "BfkIayM14MF",
        value: codSystemId[0].value
      });
      await saveTei(clonedTei);
    }
    const newEnrollment = {
      trackedEntityInstance: currentTei.trackedEntityInstance,
      orgUnit: currentEvent.orgUnit,
      enrollmentDate: currentEvent.eventDate,
      program: "ogrOUKoSaWA",
      incidentDate: dateOfDeath,
      events: [
        {
          trackedEntityInstance: currentTei.trackedEntityInstance,
          eventDate: dateOfDeath,
          orgUnit: currentEvent.orgUnit,
          program: "ogrOUKoSaWA",
          programStage: "WlWJt4lVSWw"
        }
      ]
    };
    const clonedEvent = _.cloneDeep(currentEvent);
    clonedEvent.status = "COMPLETED";
    const clonedCurrentEnrollment = _.cloneDeep(currentEnrollment);
    clonedCurrentEnrollment.status = "COMPLETED";
    const eventResult = await saveEvent(clonedEvent);
    const newEnrollmentResult = await saveEnrollment(newEnrollment);
    const currentEnrollmentResult = await saveEnrollment(clonedCurrentEnrollment);
    if (eventResult.ok && newEnrollmentResult.ok && currentEnrollmentResult.ok) {
      saveEventToState(clonedEvent);
      changeEventProperty("status", "COMPLETED");
      changeEnrollmentProperty("status", "COMPLETED");
    }
  }
};

export { saveIpdVisitDetails };
