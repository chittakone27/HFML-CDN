import { create } from "zustand";
import produce from "immer";

const useChrTrackerStore = create((set, get) => ({
  profile: {
    helpers: [],
    disabledFields: [],
    hiddenFields: []
  },
  actions: {
    setProfile: (key, value) => {
      set(
        produce((state) => {
          state.profile[key] = value;
        })
      );
    }
  }
}));

export default useChrTrackerStore;
