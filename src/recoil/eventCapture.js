import { atom, selector } from "recoil";

const eventCaptureState = atom({
  key: "eventCaptureState",
  default: {
    layout: {
      layout: "layout1",
      isDirtyWarningDialog: false,
      preventNewEventDialog: false
    },
    events: [],
    completeness: null,
    filter: {
      dialog: false,
      filters: []
    },
    paging: {
      reload: false,
      page: 1,
      totalPages: 10
    },
    status: {
      valid: true,
      disabledFields: [],
      hiddenFields: [],
      helpers: [],
      assignations: []
    }
  }
});

const eventCaptureLayout = selector({
  key: "eventCaptureLayout",
  get: ({ get }) => {
    const state = get(eventCaptureState);
    return state.layout;
  },
  set: ({ get, set }, newValue) => {
    const currentState = { ...get(eventCaptureState) };
    currentState.layout = newValue;
    set(eventCaptureState, currentState);
  }
});

const eventCaptureEvents = selector({
  key: "eventCaptureEvents",
  get: ({ get }) => {
    const state = get(eventCaptureState);
    return state.events;
  },
  set: ({ get, set }, newValue) => {
    const currentState = { ...get(eventCaptureState) };
    currentState.events = [...newValue];
    set(eventCaptureState, currentState);
  }
});

const eventCapturePaging = selector({
  key: "eventCapturePaging",
  get: ({ get }) => {
    const state = get(eventCaptureState);
    return state.paging;
  },
  set: ({ get, set }, newValue) => {
    const currentState = { ...get(eventCaptureState) };
    currentState.paging = { ...newValue };
    set(eventCaptureState, currentState);
  }
});

const eventCaptureFilter = selector({
  key: "eventCaptureFilter",
  get: ({ get }) => {
    const state = get(eventCaptureState);
    return state.filter;
  },
  set: ({ get, set }, newValue) => {
    const currentState = { ...get(eventCaptureState) };
    currentState.filter = { ...newValue };
    set(eventCaptureState, currentState);
  }
});

const eventCaptureStatus = selector({
  key: "eventCaptureStatus",
  get: ({ get }) => {
    const state = get(eventCaptureState);
    return state.status;
  },
  set: ({ get, set }, newValue) => {
    const currentState = { ...get(eventCaptureState) };
    currentState.status = { ...newValue };
    set(eventCaptureState, currentState);
  }
});
const eventCaptureCompleteness = selector({
  key: "eventCaptureCompleteness",
  get: ({ get }) => {
    const state = get(eventCaptureState);
    return state.completeness;
  },
  set: ({ get, set }, newValue) => {
    const currentState = { ...get(eventCaptureState) };
    if (newValue) {
      currentState.completeness = { ...newValue };
    } else {
      currentState.completeness = null;
    }

    set(eventCaptureState, currentState);
  }
});

export {
  eventCaptureState,
  eventCaptureLayout,
  eventCaptureEvents,
  eventCapturePaging,
  eventCaptureFilter,
  eventCaptureStatus,
  eventCaptureCompleteness
};
