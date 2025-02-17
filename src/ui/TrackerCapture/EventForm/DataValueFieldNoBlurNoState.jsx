import { useEffect, useState } from "react";
import { Input } from "@/ui/common";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import moment from "moment";
import useCurrentEvent from "./useCurrentEvent";
import useTrackerCaptureStore from "@/state/trackerCapture";
import ErrorDialog from "@/ui/common/ErrorDialog/ErrorDialog";
import { event } from "@/api";
import { pickTranslation } from "@/utils/utils";

const { saveEvent } = event;
const { VITE_MODE } = import.meta.env;

const DataValueFieldNoBlurNoState = (props) => {
  const [apiError, setApiError] = useState(null);
  let { label, dataElement, disabled, focus, hiddenOptions, helpers, currentEvent, currentProgramStage, change, accept } = props;
  const { dataElements, optionSets } = useMetadataStore(
    (state) => ({
      dataElements: state.dataElements,
      optionSets: state.optionSets
    }),
    shallow
  );
  const orgUnit = useSelectionStore((state) => state.orgUnit);
  const { actions, layout } = useTrackerCaptureStore((state) => ({ actions: state.actions, layout: state.layout }), shallow);
  const { changeDataValue, changeEventProperty, setLayout } = actions;
  const foundPde = currentProgramStage.programStageDataElements.find((pde) => pde.dataElement.id === dataElement);
  const foundDe = dataElements.find((de) => de.id === dataElement);
  if (!foundDe) {
    console.log(dataElement);
  }
  foundDe.mandatory = foundPde ? foundPde.compulsory : false;
  foundDe.allowFutureDate = foundPde.allowFutureDate;
  const foundOptionSet = foundDe.optionSetValue ? optionSets.find((os) => os.id === foundDe.optionSet.id) : null;
  let valueSet = foundOptionSet
    ? foundOptionSet.options.map((o) => ({
        label: pickTranslation(o, i18n.language, "name"),
        value: o.code
      }))
    : null;
  const { valueType, id } = foundDe;
  const foundDataValue = currentEvent.dataValues.find((dv) => dv.dataElement === dataElement);
  const value = foundDataValue ? foundDataValue.value : "";

  if (hiddenOptions) {
    valueSet = valueSet
      ? valueSet.filter((set) => {
          return !hiddenOptions.includes(set.value);
        })
      : null;
  }

  const saveCurrentEvent = async () => {
    if (!helpers || helpers.filter((h) => h.type === "ERROR").length === 0) {
      if (currentEvent.isDirty) {
        setLayout("formLoading", true);
        const result = await saveEvent(currentEvent);
        if (!result.ok) {
          setApiError({ ...result });
        } else {
          changeEventProperty(currentEvent.event, "isDirty", false);
          setLayout("formLoading", false);
        }
      }
    }
  };

  return (
    <div className="input-field-container">
      {VITE_MODE === "development" && foundDe.id}
      <Input
        focus={focus}
        label={label ? foundDe.displayFormName : null}
        disabled={disabled}
        valueType={valueType}
        valueSet={valueSet}
        mandatory={foundDe.mandatory}
        value={value}
        change={change}
        maxDate={foundDe.allowFutureDate ? undefined : moment().format("YYYY-MM-DD")}
        initialDate={foundDe.valueType === "AGE" ? currentEvent.eventDate : undefined}
        accept={foundDe.valueType === "DATE" || foundDe.valueType === "AGE" || foundDe.valueType === "ORGANISATION_UNIT" ? accept : undefined}
        {...props}
      />
    </div>
  );
};

export default DataValueFieldNoBlurNoState;
