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

const { VITE_MODE, VITE_TRACKER_API, VITE_CONFIG_NAME } = import.meta.env;

const IsDirtyAlert = Swal.mixin({
  icon: "warning",
  showCancelButton: true,
  cancelButtonColor: "#e53935",
  confirmButtonColor: "#0277bd",
  allowOutsideClick: false
});

const useEventCaptureStore = create((set, get) => ({
  layout: {
    layout: "layout1",
    isDirtyWarningDialog: false,
    preventNewEventDialog: false,
    hideEventFormButtons: false,
    hideEventFormCompleteButton: false,
    hideEventDeleteButton: false,
    hideFormTop: false,
    indicatorsLoading: false,
    listLoading: false,
    formLoading: false,
    hiddenEventListColumns: [],
    eventSaveButton: null,
    disableEventSaveButton: false,
    hideEventDate: false,
    hideCoordinatesPicker: false
  },
  customState: {},
  events: {},
  convertedEvents: [],
  completeness: null,
  filter: {
    dialog: false,
    filters: []
  },
  sort: { dialog: false, sorts: [{ type: "property", id: "lastUpdated", value: "desc" }] },
  paging: {
    reload: false,
    page: 1,
    totalPages: 10
  },
  status: {
    valid: true,
    disabledFields: [],
    hiddenFields: [],
    mandatoryFields: [],
    hiddenOptions: [],
    hiddenSections: [],
    helpers: [],
    assignations: []
  },
  currentEvent: {
    dataValues: {}
  },
  actions: {
    setCustomState: (key, value) => {
      set(
        produce((state) => {
          state.customState[key] = value;
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
    setEvents: (events) => {
      set(
        produce((state) => {
          state.events = events;
        })
      );
    },
    setConvertedEvents: (convertedEvents) => {
      set(
        produce((state) => {
          state.convertedEvents = convertedEvents;
        })
      );
    },
    setCompleteness: (completeness) => {
      set(() => ({
        completeness
      }));
    },
    setFilter: (filterKey, value) => {
      set(
        produce((state) => {
          state.filter[filterKey] = value;
        })
      );
    },
    setSort: (sortKey, value) => {
      set(
        produce((state) => {
          state.sort[sortKey] = value;
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
    setStatus: (status) => {
      set(
        produce((state) => {
          state.status = status;
        })
      );
    },
    setCurrentEvent: (currentEvent) => {
      set(
        produce((state) => {
          state.currentEvent = { ...currentEvent };
        })
      );
    },
    setCurrentEventProperty: (property, value) => {
      const defaultProperties = ["eventDate"];
      if (property === "isDirty" || !defaultProperties.includes(property)) {
        set(
          produce((state) => {
            state.currentEvent[property] = value;
          })
        );
      } else {
        set(
          produce((state) => {
            state.currentEvent[property] = value;
            state.currentEvent.isDirty = true;
          })
        );
      }
    },
    setCurrentEventGeometry: (latitude, longitude) => {
      set(
        produce((state) => {
          state.currentEvent.geometry = {
            type: "Point",
            coordinates: [longitude, latitude]
          };
          state.currentEvent.isDirty = true;
        })
      );
    },
    setCurrentEventDataValue: (dataElement, value) => {
      set(
        produce((state) => {
          let previousValue = state.currentEvent.dataValues[dataElement];
          if (previousValue === undefined) {
            previousValue = "";
          }
          if (previousValue !== value) {
            state.currentEvent.isDirty = true;
          }
          state.currentEvent.dataValues[dataElement] = value;
        })
      );
    },
    fetchEvents: () => {
      const { getEvents } = event;
      const { getCompleteness } = completeness;
      const selectionStore = useSelectionStore.getState();
      const { orgUnit, program, period } = selectionStore;
      const { currentEvent, paging, filter, sort, actions } = get();
      const { setEvents, setLayout, setPaging, setCompleteness } = actions;
      const run = async () => {
        setLayout("listLoading", true);
        const result = await getEvents(program, orgUnit.id, paging.page, period, filter.filters, sort.sorts);
        if (VITE_TRACKER_API === "new") {
          setPaging("totalPages", Math.ceil(result.total / result.pageSize));
          setEvents({ rows: result.instances });
        } else {
          setPaging("totalPages", result.metaData.pager.pageCount);
          setEvents(result);
        }
        if (program.periodType && program.dataSet) {
          const completenessResult = await getCompleteness(program.dataSet.id, orgUnit.id, period.dhis2Period);
          setCompleteness(completenessResult);
        }
        setLayout("listLoading", false);
      };
      if (program && orgUnit) {
        run();
      }
    },
    initNewEventHelper: (initOrgUnit, initProgram) => {
      const selectionStore = useSelectionStore.getState();
      const { orgUnit, program } = selectionStore;
      const newEvent = {
        isNew: true,
        isDirty: false,
        event: generateUid(),
        eventDate: "",
        dueDate: "",
        dataValues: {},
        status: "ACTIVE",
        orgUnit: initOrgUnit ? initOrgUnit.id : orgUnit.id,
        program: initProgram ? initProgram.id : program.id,
        programStage: initProgram ? initProgram.programStages[0].id : program.programStages[0].id
      };
      return newEvent;
    },
    initNewEvent: (initOrgUnit, initProgram) => {
      const actions = get().actions;
      const newEvent = actions.initNewEventHelper(initOrgUnit, initProgram);
      set(
        produce((state) => {
          state.currentEvent = { ...newEvent };
        })
      );
      return newEvent;
    },
    register: (initOrgUnit, initProgram) => {
      const { currentEvent, actions } = get();
      const { setLayout, initNewEvent } = actions;
      const me = useMetadataStore.getState().me;
      i18n.changeLanguage(me.settings.keyUiLocale);
      if (currentEvent && currentEvent.isDirty) {
        IsDirtyAlert.fire({
          title: i18n.t("unsavedChanges"),
          html: `<div>${i18n.t("isDirtyWarning1")}</div>`,
          cancelButtonText: i18n.t("discardChanges"),
          confirmButtonText: i18n.t("goBackToTheForm")
        }).then((result) => {
          if (result.isDismissed) {
            initNewEvent(initOrgUnit, initProgram);
            setLayout("layout", "layout2");
          }
        });
        return;
      } else {
        initNewEvent(initOrgUnit, initProgram);
        setLayout("layout", "layout2");
      }
    },
    open: async (eventId) => {
      const { currentEvent, actions, layout } = get();
      const { getEventById } = event;
      const { setLayout, setCurrentEvent } = actions;
      const me = useMetadataStore.getState().me;
      i18n.changeLanguage(me.settings.keyUiLocale);
      const openEvent = async () => {
        if (layout.layout === "layout1") {
          setLayout("listLoading", true);
        } else {
          setLayout("formLoading", true);
        }
        const result = await getEventById(eventId);
        const eventObject = convertEventObject(result);
        setCurrentEvent(eventObject);
        setLayout("layout", "layout2");
        setLayout("listLoading", false);
        setLayout("formLoading", false);
      };
      if (currentEvent && currentEvent.isDirty) {
        IsDirtyAlert.fire({
          title: i18n.t("unsavedChanges"),
          html: `<div>${i18n.t("isDirtyWarning1")}</div>`,
          cancelButtonText: i18n.t("discardChanges"),
          confirmButtonText: i18n.t("goBackToTheForm")
        }).then(async (dialogResult) => {
          if (dialogResult.isDismissed) {
            openEvent();
          }
        });
        return;
      }
      openEvent();
    },
    close: () => {
      const { currentEvent, actions } = get();
      const me = useMetadataStore.getState().me;
      i18n.changeLanguage(me.settings.keyUiLocale);
      const closeEvent = () => {
        actions.setLayout("layout", "layout1");
        actions.setLayout("isDirtyWarningDialog", false);
        actions.setCurrentEvent({});
      };
      if (currentEvent && currentEvent.isDirty) {
        IsDirtyAlert.fire({
          title: i18n.t("unsavedChanges"),
          html: `<div>${i18n.t("isDirtyWarning1")}</div>`,
          cancelButtonText: i18n.t("discardChanges"),
          confirmButtonText: i18n.t("goBackToTheForm")
        }).then(async (dialogResult) => {
          if (dialogResult.isDismissed) {
            closeEvent();
          }
        });
      } else {
        closeEvent();
      }
    },
    reloadList: () => {
      const { currentEvent, actions } = get();
      actions.setPaging("reload", new Date().toString());
    },
    resetEventCaptureState: () => {
      set(
        produce((state) => {
          state.layout = {
            layout: "layout1",
            isDirtyWarningDialog: false,
            preventNewEventDialog: false,
            hideEventFormButtons: false,
            hideEventFormCompleteButton: false,
            hideEventDeleteButton: false,
            hideFormTop: false,
            indicatorsLoading: false,
            listLoading: false,
            formLoading: false,
            hiddenEventListColumns: [],
            eventSaveButton: null,
            disableEventSaveButton: false,
            hideEventDate: false,
            hideCoordinatesPicker: false
          };
          state.customState = {};
          state.status = {
            valid: true,
            disabledFields: [],
            hiddenFields: [],
            mandatoryFields: [],
            hiddenOptions: [],
            hiddenSections: [],
            helpers: [],
            assignations: []
          };
          state.currentEvent = { dataValues: {} };
          state.events = {};
          state.completeness = null;
          state.paging = {
            reload: false,
            page: 1,
            totalPages: 10
          };
          state.filter = {
            dialog: false,
            filters: []
          };
        })
      );
    }
  }
}));

if (VITE_MODE === "development") {
  mountStoreDevtool("eventCaptureStore", useEventCaptureStore);
}

export default useEventCaptureStore;
