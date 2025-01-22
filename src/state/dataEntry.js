import { create } from "zustand";
import produce from "immer";
import useSelectionStore from "./selection";
import useMetadataStore from "./metadata";

const useDataEntryStore = create((set, get) => ({
  completeness: null,
  status: {
    isLocked: false,
    canBeCompleted: true,
  },
  dataValues: {},
  selected: "",
  actions: {
    setCompleteness: (completeness) => {
      set(() => ({
        completeness,
      }));
    },
    setDataValues: (dataValues) => {
      const newDataValues = {};
      dataValues.forEach((dv) => {
        newDataValues[
          `${dv.dataElement}-${dv.categoryOptionCombo}-${dv.orgUnit}-${dv.attributeOptionCombo}`
        ] = {
          value: dv.value,
          isDirty: false,
          isSelected: false,
          storedBy: dv.storedBy,
          lastUpdated: dv.lastUpdated,
          followUp: dv.followup,
          comment: dv.comment,
        };
      });
      set(() => ({
        dataValues: { ...newDataValues },
      }));
    },
    setDataValue: (dataElement, categoryOptionCombo, orgUnit, value) => {
      set(
        produce((state) => {
          const attributeOptionCombo =
            useSelectionStore.getState().attributeOptionCombo.id;
          const prop = `${dataElement}-${categoryOptionCombo}-${orgUnit}-${attributeOptionCombo}`;

          if (!state.dataValues[prop]) {
            state.dataValues[prop] = {
              value: "",
              isDirty: false,
              error: "",
              followUp: false,
              comment: null,
            };
          }
          state.dataValues[prop].value = value;
          state.dataValues[prop].isDirty = true;
        })
      );
    },
    setDataValueCommentAndFollowUp: (
      dataElement,
      categoryOptionCombo,
      orgUnit,
      followUp,
      comment
    ) => {
      set(
        produce((state) => {
          const attributeOptionCombo =
            useSelectionStore.getState().attributeOptionCombo.id;
          const prop = `${dataElement}-${categoryOptionCombo}-${orgUnit}-${attributeOptionCombo}`;

          if (!state.dataValues[prop]) {
            state.dataValues[prop] = {
              value: "",
              isDirty: false,
              error: "",
              followup: false,
              comment: null,
            };
          }
          state.dataValues[prop].followUp = followUp;
          state.dataValues[prop].comment = comment;
        })
      );
    },
    setDataValueDirty: (dataElement, categoryOptionCombo, orgUnit, isDirty) => {
      set(
        produce((state) => {
          const attributeOptionCombo =
            useSelectionStore.getState().attributeOptionCombo.id;
          const prop = `${dataElement}-${categoryOptionCombo}-${orgUnit}-${attributeOptionCombo}`;

          state.dataValues[prop].isDirty = isDirty;
        })
      );
    },
    setDataValueSelected: (dataElement, categoryOptionCombo, orgUnit) => {
      set(() => {
        const prop = `${dataElement}-${categoryOptionCombo}-${orgUnit}`;
        return {
          selected: prop,
        };
      });
    },
    setDataValueError: (dataElement, categoryOptionCombo, orgUnit, error) => {
      set(
        produce((state) => {
          const attributeOptionCombo =
            useSelectionStore.getState().attributeOptionCombo.id;
          const prop = `${dataElement}-${categoryOptionCombo}-${orgUnit}-${attributeOptionCombo}`;
          state.dataValues[prop].error = error;
        })
      );
    },
    setStatus: (property, value) => {
      set(
        produce((state) => {
          state.status[property] = value;
        })
      );
    },
  },
}));

export default useDataEntryStore;
