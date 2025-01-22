import { Input } from "@/ui/common";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { shallow } from "zustand/shallow";
import moment from "moment";
import { useEffect } from "react";
import { tracker } from "@/api";
const { getReservedValue } = tracker;

const AttributeField = (props) => {
  const { trackedEntityAttributes, optionSets } = useMetadataStore(
    (state) => ({
      trackedEntityAttributes: state.trackedEntityAttributes,
      optionSets: state.optionSets
    }),
    shallow
  );
  const { data, actions, layout } = useTrackerCaptureStore(
    (state) => ({
      data: state.data,
      actions: state.actions,
      layout: state.layout
    }),
    shallow
  );
  const { program, orgUnit } = useSelectionStore((state) => ({ program: state.program, orgUnit: state.orgUnit }), shallow);
  const { currentTei, currentEnrollment, currentEvents } = data;
  const { label, attribute, disabled, blur, focus, maxDate, minDate, hiddenOptions, helpers } = props;
  const { changeAttributeValue } = actions;
  const foundPtea = program.programTrackedEntityAttributes.find((ptea) => ptea.trackedEntityAttribute.id === attribute);
  const foundTea = trackedEntityAttributes.find((tea) => tea.id === attribute);
  foundTea.mandatory = foundPtea.mandatory;
  const foundOptionSet = foundTea.optionSet ? optionSets.find((os) => os.id === foundTea.optionSet.id) : null;
  let valueSet = foundOptionSet
    ? foundOptionSet.options.map((o) => ({
        label: o.displayName,
        value: o.code
      }))
    : null;

  if (hiddenOptions) {
    valueSet = valueSet
      ? valueSet.filter((set) => {
          return !hiddenOptions.includes(set.value);
        })
      : null;
  }

  const { valueType, id } = foundTea;
  const foundCurrentValue = currentTei.attributes.find((attr) => attr.attribute === attribute);

  const value = foundCurrentValue ? foundCurrentValue.value : "";

  const changeValue = (value) => {
    const phoneNumberRegex = /^\d{0,12}$/;
    if (foundTea.valueType === "PHONE_NUMBER") {
      if (value.length <= 12 && phoneNumberRegex.test(value)) {
        changeAttributeValue(attribute, value);
      }
    } else {
      changeAttributeValue(attribute, value);
    }
  };

  let currentDisabled = disabled;

  if (foundTea.pattern) {
    currentDisabled = true;
  }

  useEffect(() => {
    (async () => {
      if (layout.layout === "layout2" && foundTea.pattern && !value) {
        const result = await getReservedValue(foundTea.id, orgUnit);
        changeValue(result[0].value);
      }
    })();
  }, []);

  return (
    <div className="input-field-container">
      <Input
        helpers={helpers}
        focus={focus}
        blur={blur}
        label={label ? foundTea.displayFormName : null}
        disabled={currentDisabled}
        valueType={valueType}
        valueSet={valueSet}
        mandatory={foundTea.mandatory}
        value={value}
        change={(value) => {
          changeValue(value);
        }}
        minDate={minDate}
        maxDate={maxDate ? maxDate : foundTea.allowFutureDate ? undefined : moment().format("YYYY-MM-DD")}
        initialDate={foundTea.valueType === "AGE" ? currentEnrollment.enrollmentDate : undefined}
        accept={
          foundTea.valueType === "DATE" ||
          foundTea.valueType === "AGE" ||
          foundTea.valueType === "ORGANISATION_UNIT" ||
          foundTea.valueType === "COORDINATE"
            ? (value) => {
                changeValue(value);
              }
            : undefined
        }
        {...props}
      />
    </div>
  );
};

export default AttributeField;
