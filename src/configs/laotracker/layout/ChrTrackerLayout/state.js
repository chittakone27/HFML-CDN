import { create } from "zustand";
import produce from "immer";

const useChrTrackerStore = create((set, get) => ({
  profile: {
    helpers: [],
    disabledFields: [],
    hiddenFields: []
  },
  event: {
    currentProgramStage: null
  },
  actions: {
    setProfile: (key, value) => {
      set(
        produce((state) => {
          state.profile[key] = value;
        })
      );
    },
    setEvent: (key, value) => {
      set(
        produce((state) => {
          state.event[key] = value;
        })
      );
    }
  }
}));

export default useChrTrackerStore;
