import { useMemo } from "react";
import { Input } from "@/ui/common";
import useMetadataStore from "@/state/metadata";
import useEventCaptureStore from "@/state/eventCapture";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import moment from "moment";
const { VITE_MODE } = import.meta.env;

const DataValueFieldNoState = ({ value, change, label, dataElement, disabled, blur, focus, renderAsRadio, optionNotes, includeOptionCode }) => {
  const { dataElements, optionSets } = useMetadataStore((state) => ({ dataElements: state.dataElements, optionSets: state.optionSets }), shallow);
  const program = useSelectionStore((state) => state.program);
  const { status, currentEvent, completeness } = useEventCaptureStore(
    (state) => ({ status: state.status, currentEvent: state.currentEvent, completeness: state.completeness }),
    shallow
  );
  const { helpers, hiddenOptions, hiddenFields, mandatoryFields, disabledFields, assignations } = status;
  const { setCurrentEventDataValue } = useEventCaptureStore((state) => state.actions);

  const foundPde = program.programStages[0].programStageDataElements.find((pde) => pde.dataElement.id === dataElement);
  const findDe = (dataElement) => {
    const foundDe = dataElements.find((de) => de.id === dataElement);
    return foundDe;
  };

  const foundDe = useMemo(() => findDe(dataElement), [dataElement]);
  foundDe.mandatory = foundPde.compulsory;
  foundDe.allowFutureDate = foundPde.allowFutureDate;
  const findOs = (foundDe) => {
    const foundOptionSet = foundDe.optionSetValue ? optionSets.find((os) => os.id === foundDe.optionSet.id) : null;
    return foundOptionSet;
  };
  if (mandatoryFields.includes(foundDe.id)) {
    foundDe.mandatory = true;
  }
  const foundOptionSet = useMemo(() => findOs(foundDe), [foundDe.id]);
  let valueSet = foundOptionSet
    ? foundOptionSet.options.map((o) => ({ label: `${o.displayName} ${includeOptionCode ? `(${o.code})` : ""}`, value: o.code }))
    : null;
  const { valueType, id } = foundDe;
  const foundHelpers = helpers.filter((helper) => helper.targetType === "DATA_ELEMENT" && helper.target === id);
  const hidden = hiddenFields.includes(id);

  if (disabledFields.includes(id)) {
    disabled = true;
  }

  //HIDE OPTIONS
  const currentHiddenOptions = hiddenOptions
    .filter((ho) => ho.target === id)
    .reduce((previous, current) => {
      previous.push(...current.options);
      return previous;
    }, []);

  valueSet = valueSet
    ? valueSet.filter((set) => {
        return !currentHiddenOptions.includes(set.value);
      })
    : null;
  // if (currentHiddenOptions.includes(value)) {
  //   changeValue("");
  // }

  //CLEAR VALUE IF HIDDEN
  // if (hidden) {
  //   changeValue("");
  // }

  //ASSIGN VALUE
  // const foundAssignations = assignations.filter((a) => a.target === id);
  // foundAssignations.forEach((a) => {
  //   changeValue(a.value);
  // });
  return !hidden ? (
    <div className="input-field-container">
      {VITE_MODE === "development" && foundDe.id}
      <Input
        focus={focus}
        blur={blur}
        label={label ? label : ""}
        disabled={disabled}
        helpers={foundHelpers}
        renderAsRadio={renderAsRadio}
        optionNotes={optionNotes}
        valueType={valueType}
        valueSet={valueSet}
        mandatory={foundDe.mandatory}
        value={value}
        change={change}
        maxDate={foundDe.allowFutureDate ? undefined : moment().format("YYYY-MM-DD")}
        initialDate={foundDe.valueType === "AGE" ? currentEvent.eventDate : undefined}
        accept={
          foundDe.valueType === "DATE" || foundDe.valueType === "AGE" || foundDe.valueType === "ORGANISATION_UNIT"
            ? (value) => {
                change(value);
              }
            : undefined
        }
      />
    </div>
  ) : null;
};

export default DataValueFieldNoState;
