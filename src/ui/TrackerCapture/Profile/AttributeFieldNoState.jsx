import { Input } from "@/ui/common";
import useMetadataStore from "@/state/metadata";
import { shallow } from "zustand/shallow";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { pickTranslation } from "@/utils/utils";
const AttributeFieldNoState = (props) => {
  const { i18n } = useTranslation();
  const { trackedEntityAttributes, optionSets } = useMetadataStore(
    (state) => ({
      trackedEntityAttributes: state.trackedEntityAttributes,
      optionSets: state.optionSets
    }),
    shallow
  );
  const { label, attribute, disabled, blur, focus, maxDate, minDate, hiddenOptions, helpers, value, change } = props;
  const foundTea = trackedEntityAttributes.find((tea) => tea.id === attribute);
  const foundOptionSet = foundTea.optionSet ? optionSets.find((os) => os.id === foundTea.optionSet.id) : null;

  let valueSet = foundOptionSet
    ? foundOptionSet.options.map((o) => ({
        label: pickTranslation(o, i18n.language, "name"),
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

  let currentDisabled = false;

  if (disabled) {
    currentDisabled = true;
  }

  return (
    <div className="input-field-container">
      <Input
        disabled={currentDisabled}
        helpers={helpers}
        focus={focus}
        blur={blur}
        label={label ? foundTea.displayFormName : null}
        valueType={valueType}
        valueSet={valueSet}
        mandatory={foundTea.mandatory}
        value={value}
        change={change}
        minDate={minDate}
        maxDate={maxDate ? maxDate : foundTea.allowFutureDate ? undefined : moment().format("YYYY-MM-DD")}
        // initialDate={foundTea.valueType === "AGE" ? currentEnrollment.enrollmentDate : undefined}
        accept={
          foundTea.valueType === "DATE" ||
          foundTea.valueType === "AGE" ||
          foundTea.valueType === "ORGANISATION_UNIT" ||
          foundTea.valueType === "COORDINATE"
            ? change
            : undefined
        }
        {...props}
        backgroundColor={currentDisabled ? "#f0f0f0" : undefined}
      />
    </div>
  );
};

export default AttributeFieldNoState;
