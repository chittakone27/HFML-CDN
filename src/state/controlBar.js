import { create } from "zustand";
import produce from "immer";

const useControlBarStore = create((set, get) => ({
  layout: {
    hideCompleteButton: false,
    customElements: [],
    customControlBarComponent: null
  },
  actions: {
    resetLayout: () => {
      set(
        produce((state) => {
          state.layout = {
            hideCompleteButton: false
          };
        })
      );
    },
    setLayout: (property, value) =>
      set(
        produce((state) => {
          state.layout[property] = value;
        })
      )
  }
}));

export default useControlBarStore;
