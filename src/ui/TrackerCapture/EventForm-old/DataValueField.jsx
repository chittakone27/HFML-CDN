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
const { saveEvent } = event;

const DataValueField = (props) => {
  const [toBeSaved, setToBeSaved] = useState(false);
  const [apiError, setApiError] = useState(null);
  let { label, dataElement, disabled, focus, hiddenOptions, helpers } = props;
  const { me, dataElements, optionSets } = useMetadataStore(
    (state) => ({
      me: state.me,
      dataElements: state.dataElements,
      optionSets: state.optionSets
    }),
    shallow
  );
  const orgUnit = useSelectionStore((state) => state.orgUnit);
  const { currentEvent, currentProgramStage } = useCurrentEvent();
  const { actions, layout } = useTrackerCaptureStore((state) => ({ actions: state.actions, layout: state.layout }), shallow);
  const { changeDataValue, changeEventProperty, setLayout } = actions;
  const foundPde = currentProgramStage.programStageDataElements.find((pde) => pde.dataElement.id === dataElement);
  const foundDe = dataElements.find((de) => de.id === dataElement);
  foundDe.mandatory = foundPde ? foundPde.compulsory : false;
  foundDe.allowFutureDate = foundPde.allowFutureDate;
  const foundOptionSet = foundDe.optionSetValue ? optionSets.find((os) => os.id === foundDe.optionSet.id) : null;
  let valueSet = foundOptionSet
    ? foundOptionSet.options.map((o) => ({
        label: o.displayName,
        value: o.code
      }))
    : null;
  const { valueType, id } = foundDe;
  const completed = currentEvent.status === "COMPLETED" ? true : false;
  const foundDataValue = currentEvent.dataValues.find((dv) => dv.dataElement === dataElement);
  const value = foundDataValue ? foundDataValue.value : "";
  if (completed) {
    disabled = true;
  }
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

  let isInstantSave = false;
  if (foundDe.optionSet || ["BOOLEAN", "TRUE_ONLY"].includes(foundDe.valueType)) {
    isInstantSave = true;
  }

  useEffect(() => {
    if (toBeSaved) {
      saveCurrentEvent();
      setToBeSaved(false);
    }
  }, [toBeSaved]);

  if (currentEvent.orgUnit !== orgUnit.id) {
    const foundValidOu = me.organisationUnits.find((ou) => {
      return orgUnit.path.includes(ou.id);
    });
    if (!foundValidOu) {
      disabled = true;
    }
  }
  if (foundDe.id === "PJV46iCxgQl") {
    console.log(disabled);
  }

  return (
    <div className="input-field-container">
      <Input
        focus={focus}
        blur={saveCurrentEvent}
        label={label ? foundDe.displayFormName : null}
        disabled={disabled}
        valueType={valueType}
        valueSet={valueSet}
        mandatory={foundDe.mandatory}
        value={value}
        change={(value) => {
          changeDataValue(currentEvent.event, dataElement, value);
          if (isInstantSave) {
            setToBeSaved(true);
          }
        }}
        maxDate={foundDe.allowFutureDate ? undefined : moment().format("YYYY-MM-DD")}
        initialDate={foundDe.valueType === "AGE" ? currentEvent.eventDate : undefined}
        accept={
          foundDe.valueType === "DATE" || foundDe.valueType === "AGE" || foundDe.valueType === "ORGANISATION_UNIT"
            ? (value) => {
                changeDataValue(currentEvent.event, dataElement, value);
                setToBeSaved(true);
              }
            : undefined
        }
        {...props}
      />
      {apiError && (
        <ErrorDialog
          error={JSON.stringify(apiError)}
          handleClose={() => {
            setApiError(null);
          }}
        />
      )}
    </div>
  );
};

export default DataValueField;
