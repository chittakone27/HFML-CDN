import { create } from "zustand";
import produce from "immer";
import useSelectionStore from "./selection";
import useMetadataStore from "./metadata";
import { generateUid } from "@/utils/utils";
import { convertEventObject } from "@/utils/eventData";
import { event, completeness } from "@/api";
import Swal from "sweetalert2";
import i18n from "../i18n";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { format } from "date-fns";
import _ from "lodash";
const { VITE_MODE } = import.meta.env;
const { saveEvent } = event;

const useTrackerCaptureStore = create((set, get) => ({
  layout: {
    layout: "layout1",
    hideProfile: false,
    isDirtyWarningDialog: false,
    preventNewEventDialog: false,
    hideEventFormButtons: false,
    disableCompleteButton: false,
    disableProfileSaveButton: false,
    profileFormEditing: false,
    profileFormLoadingMessage: "",
    indicatorsLoading: false,
    listLoading: false,
    formLoading: false,
    eventFormEditing: false,
    customProfileButtons: null,
    customEventFormButtons: null,
    hideRegisterButton: false,
    hideSearchButton: false,
    disableRegisterButton: false,
    disableEventEditButton: false,
    disableEventSaveButton: false,
    disableEventCompleteButton: false,
    disableEventCreateButton: false,
    disableEventDeleteButton: false,
    disableProfileEditButton: false,
    hideEventSaveButton: false,
    hideProfileDeleteButton: false,
    customProfileFormButtons: null,
    selectedProgramStage: null
  },
  handlers: {
    profileSave: null,
    eventSave: null,
    eventComplete: null,
    eventIncomplete: null,
    profileDelete: null
  },
  teis: [],
  convertedTeis: [],
  paging: {
    page: 1,
    pageSize: 1000
  },
  data: {
    selectedProgramStage: null,
    selectedEvent: null,
    currentTei: null,
    currentEnrollment: null,
    currentEnrollments: null,
    currentEvents: null,
    teiFilter: null,
    mandatoryAttributes: null
  },
  filter: { dialog: false, filters: [], lastUpdated: "" },
  currentEvent: {},
  customState: {},
  actions: {
    setCustomState: (key, value) => {
      set(
        produce((state) => {
          state.customState[key] = value;
        })
      );
    },
    resetState: () => {
      set(
        produce((state) => {
          state.data = {
            selectedProgramStage: null,
            selectedEvent: null,
            currentTei: null,
            currentEnrollment: null,
            currentEnrollments: null,
            currentEvents: null,
            teiFilter: state.data.teiFilter,
            mandatoryAttributes: null
          };
          state.layout = {
            ...state.layout,
            disableCompleteButton: false,
            disableProfileSaveButton: false,
            hideProfile: false,
            profileFormEditing: false,
            customProfileButtons: null,
            customEventFormButtons: null,
            disableRegisterButton: false,
            disableEventEditButton: false,
            disableEventSaveButton: false,
            disableEventCompleteButton: false,
            disableEventCreateButton: false,
            disableEventDeleteButton: false,
            disableProfileEditButton: false,
            hideProfileDeleteButton: false,
            hideEventSaveButton: false,
            selectedProgramStage: null
          };
          state.handlers = { profileSave: null, eventSave: null, eventComplete: null, eventIncomplete: null, profileDelete: null };
          state.paging = {
            page: 1,
            pageSize: 1000
          };
          state.customState = {};
        })
      );
    },
    setHandlers: (key, f) => {
      set(
        produce((state) => {
          state.handlers[key] = f;
        })
      );
    },
    setLayout: (layoutKey, value) => {
      set(
        produce((state) => {
          state.layout[layoutKey] = value;
        })
      );
    },
    setData: (dataKey, value) => {
      set(
        produce((state) => {
          state.data[dataKey] = value;
        })
      );
    },
    setTeis: (teis) => {
      set(
        produce((state) => {
          state.teis = teis;
        })
      );
    },
    setConvertedTeis: (convertedTeis) => {
      set(
        produce((state) => {
          state.convertedTeis = convertedTeis;
        })
      );
    },
    setFilter: (filterKey, value) => {
      set(
        produce((state) => {
          state.filter[filterKey] = value;
        })
      );
    },
    setPaging: (pagingKey, value) => {
      set(
        produce((state) => {
          state.paging[pagingKey] = value;
        })
      );
    },
    register: (enrollmentDate, incidentDate, additionalTeas) => {
      set(
        produce((state) => {
          state.layout.layout = "layout2";
          const { orgUnit, program } = useSelectionStore.getState();
          const teiId = generateUid();
          const enrId = generateUid();
          state.data.currentTei = {
            orgUnit: orgUnit.id,
            trackedEntityInstance: teiId,
            trackedEntityType: program.trackedEntityType.id,
            attributes: [],
            isNew: true
          };
          if (additionalTeas) {
            Object.keys(additionalTeas).forEach((tea) => {
              state.data.currentTei.attributes.push({
                attribute: tea,
                value: additionalTeas[tea]
              });
            });
          }
          const currentEnrollment = {
            attributes: [],
            orgUnit: orgUnit.id,
            program: program.id,
            trackedEntityInstance: teiId,
            enrollment: enrId,
            trackedEntityType: program.trackedEntityType.id,
            enrollmentDate: enrollmentDate ? enrollmentDate : "",
            incidentDate: incidentDate ? incidentDate : "",
            events: []
          };
          const currentEvents = [];
          program.programStages.forEach((ps) => {
            if (ps.autoGenerateEvent) {
              const generatedEvent = {
                event: generateUid(),
                eventDate: enrollmentDate ? enrollmentDate : "",
                dueDate: enrollmentDate ? enrollmentDate : "",
                orgUnit: orgUnit.id,
                enrollment: enrId,
                trackedEntityInstance: teiId,
                program: program.id,
                programStage: ps.id,
                dataValues: [],
                status: "ACTIVE"
              };
              currentEnrollment.events.push(generatedEvent);
              currentEvents.push(generatedEvent);
            }
          });
          state.data.currentEnrollment = currentEnrollment;
          state.data.currentEvents = currentEvents;
        })
      );
    },
    initData: (tei, program, orgUnit) => {
      set(
        produce((state) => {
          const foundEnrollments = tei.enrollments.filter((enr) => {
            return enr.program === program;
          });
          const foundActiveEnrollment = tei.enrollments.find((enr) => {
            return enr.program === program && enr.status === "ACTIVE";
          });

          const foundEnrollment = foundActiveEnrollment ? foundActiveEnrollment : foundEnrollments[0];
          const currentEvents = [];
          foundEnrollments.forEach((fe) => {
            fe.events.forEach((ev) => {
              ev.isDirty = false;
              currentEvents.push(ev);
            });
          });
          state.data.currentEvents = currentEvents;
          state.data.currentTei = tei;
          state.data.currentEnrollments = _.cloneDeep(tei.enrollments);
          delete foundEnrollment.events;
          state.data.currentEnrollment = foundEnrollment;
          delete tei.enrollments;
        })
      );
    },
    initNewEvent: (programStage, select = true) => {
      set(
        produce((state) => {
          const enrollment = state.data.currentEnrollment;
          const tei = state.data.currentTei;
          const { orgUnit } = useSelectionStore.getState();
          const eventId = generateUid();
          const newEvent = {
            isDirty: true,
            isNew: true,
            eventDate: format(new Date(), "yyyy-MM-dd"),
            dueDate: format(new Date(), "yyyy-MM-dd"),
            event: eventId,
            orgUnit: orgUnit.id,
            enrollment: enrollment.enrollment,
            trackedEntityInstance: tei.trackedEntityInstance,
            program: enrollment.program,
            programStage,
            dataValues: [],
            status: "ACTIVE"
          };
          state.data.currentEvents.push(newEvent);
          if (select) {
            state.data.selectedEvent = eventId;
          }
        })
      );
    },
    scheduleNewEvent: (programStage, dueDate, orgUnit) => {
      set(
        produce((state) => {
          const enrollment = state.data.currentEnrollment;
          const tei = state.data.currentTei;
          const eventId = generateUid();
          const scheduledEvent = {
            isDirty: true,
            isNew: true,
            eventDate: "",
            dueDate: dueDate,
            event: eventId,
            orgUnit: orgUnit ? orgUnit : enrollment.orgUnit,
            enrollment: enrollment.enrollment,
            trackedEntityInstance: tei.trackedEntityInstance,
            program: enrollment.program,
            programStage,
            dataValues: [],
            status: "SCHEDULE"
          };
          state.data.currentEvents.push(scheduledEvent);
          state.data.selectedEvent = eventId;
          saveEvent(scheduledEvent);
        })
      );
    },
    deleteEventFromList: (eventId) => {
      set(
        produce((state) => {
          const foundEventIndex = state.data.currentEvents.findIndex((ev) => ev.event == eventId);
          if (foundEventIndex !== -1) {
            state.data.currentEvents.splice(foundEventIndex, 1);
          }
        })
      );
    },
    deleteEnrollmentFromList: (enrollmentId) => {
      set(
        produce((state) => {
          const foundEnrollmentIndex = state.data.currentEnrollments.findIndex((enr) => enr.enrollment === enrollmentId);
          if (foundEnrollmentIndex !== -1) {
            state.data.currentEnrollments.splice(foundEnrollmentIndex, 1);
          }
        })
      );
    },
    selectEvent: (eventId) => {
      set(
        produce((state) => {
          state.data.selectedEvent = eventId;
        })
      );
    },
    selectProgramStage: (programStage) => {
      set(
        produce((state) => {
          state.data.selectedProgramStage = programStage;
        })
      );
    },
    selectTeiFilter: (teiFilter) => {
      set(
        produce((state) => {
          state.data.teiFilter = teiFilter;
        })
      );
    },
    changeAttributeValue: (attribute, value) => {
      set(
        produce((state) => {
          const foundAttributeValue = state.data.currentTei.attributes.find((attr) => attr.attribute === attribute);

          if (!foundAttributeValue) {
            state.data.currentTei.attributes.push({
              attribute,
              value
            });
          } else {
            foundAttributeValue.value = value;
          }

          if (state.data.currentEnrollment && state.data.currentEnrollment.attributes) {
            const foundEnrollmentAttributeValue = state.data.currentEnrollment.attributes.find((attr) => attr.attribute === attribute);
            if (!foundEnrollmentAttributeValue) {
              state.data.currentEnrollment.attributes.push({
                attribute,
                value
              });
            } else {
              foundEnrollmentAttributeValue.value = value;
            }
          }
        })
      );
    },
    changeDataValue: (eventId, dataElement, value) => {
      set(
        produce((state) => {
          const foundEvent = state.data.currentEvents.find((ev) => ev.event === eventId);
          if (foundEvent) {
            const foundDataValue = foundEvent.dataValues.find((dv) => dv.dataElement === dataElement);
            if (foundDataValue) {
              if (foundDataValue.value !== value + "") {
                foundEvent.isDirty = true;
              }
              foundDataValue.value = value;
            } else {
              if (value !== "") {
                foundEvent.isDirty = true;
                foundEvent.dataValues.push({ dataElement, value });
              }
            }
          }
        })
      );
    },
    changeEventProperty: (eventId, property, value) => {
      set(
        produce((state) => {
          const foundEvent = state.data.currentEvents.find((ev) => ev.event === eventId);
          if (foundEvent) {
            if (property === "isDirty") {
              foundEvent[property] = value;
            } else {
              if (foundEvent[property] !== value) {
                foundEvent.isDirty = true;
              }
              foundEvent[property] = value;
            }
          }
        })
      );
    },
    changeEnrollmentProperty: (property, value) => {
      set(
        produce((state) => {
          state.data.currentEnrollment[property] = value;
        })
      );
    },
    changeTeiProperty: (property, value) => {
      set(
        produce((state) => {
          state.data.currentTei[property] = value;
        })
      );
    },
    saveEventToState: (event) => {
      set(
        produce((state) => {
          const foundEventIndex = state.data.currentEvents.findIndex((ev) => ev.event === event.event);
          if (foundEventIndex === -1) {
            console.log("not found event");
            state.data.currentEvents.push(event);
          } else {
            console.log("found event");
            state.data.currentEvents[foundEventIndex] = { ...event };
          }
        })
      );
    },
    saveEnrollmentToState: (enrollment) => {
      set(
        produce((state) => {
          const foundEnrollmentIndex = state.data.currentEnrollments.findIndex((enr) => enr.enrollment === enrollment.enrollment);
          if (foundEnrollmentIndex === -1) {
            state.data.currentEnrollments.push(enrollment);
          } else {
            state.data.currentEnrollments[foundEnrollmentIndex] = { ...enrollment };
          }
        })
      );
    }
  }
}));

if (VITE_MODE === "development") {
  mountStoreDevtool("trackerCaptureStore", useTrackerCaptureStore);
}

export default useTrackerCaptureStore;
