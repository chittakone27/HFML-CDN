import { Select, MenuItem, OutlinedInput, Chip, ListItemText, Checkbox } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import useChrTrackerStore from "../state";
import Row from "../Row";
import DataValueLabelNoState from "@/ui/TrackerCapture/EventForm/DataValueLabelNoState";
import DataValueFieldNoBlurNoState from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlurNoState";
import useTrackerCaptureStore from "@/state/trackerCapture";
import EventDateLabelNoState from "@/ui/TrackerCapture/EventForm/EventDateLabelNoState";
import EventDateFieldNoState from "@/ui/TrackerCapture/EventForm/EventDateFieldNoState";
import useIpdVisitDetailsRules from "./useIpdVisitDetailsRules";
import { useTranslation } from "react-i18next";
import useMetadataStore from "@/state/metadata";
import { pickTranslation } from "@/utils/utils";
import { findDataValue } from "@/configs/laotracker/common/utils";
import { useEffect } from "react";
const preConditionDataElements = ["dLIPYO8wooC", "eYGlKgmZyj8", "NoXeTahc1E2", "uN8LfG3KPgZ", "ZwwgoOLFry8", "CuKwviFco3q"];

const IpdVisitDetails = () => {
  const { t, i18n } = useTranslation();
  const { dataElements, optionSets } = useMetadataStore(
    useShallow((state) => ({
      optionSets: state.optionSets,
      dataElements: state.dataElements
    }))
  );
  const { event, actions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      actions: state.actions
    }))
  );
  const { data } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data
    }))
  );
  const { currentEvent, currentProgramStage, editing, order } = event;
  const { changeDataValue, changeEventProperty, setEvent } = actions;
  const completed = currentEvent && currentEvent.status === "COMPLETED";
  const props = useIpdVisitDetailsRules();
  const { hiddenFields, disabledFields, fieldProps } = props;
  const icd10OptionSet = optionSets.find((os) => os.id === "ZgqhnzhZZcQ");

  useEffect(() => {
    let order = ["eventDate"];
    currentProgramStage.programStageDataElements.forEach((psde) => {
      order.push(psde.dataElement.id);
    });
    setEvent("order", order);
  }, []);

  return (
    <div>
      <Row
        label={
          <div style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
            1.&nbsp;
            <EventDateLabelNoState type="eventDate" currentProgramStage={currentProgramStage} />
          </div>
        }
        field={
          <EventDateFieldNoState
            accept={(value) => {
              changeEventProperty("eventDate", value);
              changeEventProperty("dueDate", value);
            }}
            disabled={!editing || completed}
            currentEvent={currentEvent}
            {...fieldProps.eventDate}
          />
        }
      />
      {currentProgramStage.programStageDataElements.map((psde, index) => {
        const foundIndex = order.findIndex((o) => o === psde.dataElement.id);
        if (psde.dataElement.id === "eYGlKgmZyj8") {
          return (
            <Row
              label={foundIndex + 1 + ". " + t("preConditions")}
              field={
                <Select
                  multiple
                  value={preConditionDataElements.filter((de) => {
                    const foundDataValue = findDataValue(currentEvent.dataValues, de);
                    if (foundDataValue && foundDataValue === "true") {
                      return true;
                    } else {
                      return false;
                    }
                  })}
                  onChange={(event) => {
                    preConditionDataElements.forEach((de) => {
                      if (event.target.value.includes(de)) {
                        changeDataValue(de, "true");
                      } else {
                        changeDataValue(de, "");
                      }
                    });
                  }}
                  input={<OutlinedInput style={{ width: "100%", textAlign: "left" }} />}
                  renderValue={(selected) =>
                    selected
                      .map((value) => {
                        const foundDe = dataElements.find((de) => de.id === value);
                        const deName = pickTranslation(foundDe, i18n.language, "formName");
                        return deName;
                      })
                      .join(", ")
                  }
                >
                  {preConditionDataElements
                    .filter((dataElement) => {
                      if (fieldProps.preConditions[dataElement] && fieldProps.preConditions[dataElement].hidden) {
                        return false;
                      } else {
                        return true;
                      }
                    })
                    .map((dataElement) => {
                      const foundDe = dataElements.find((de) => de.id === dataElement);
                      const deName = pickTranslation(foundDe, i18n.language, "formName");
                      const foundDataValue = findDataValue(currentEvent.dataValues, dataElement);
                      const isCheked = foundDataValue && foundDataValue === "true";
                      return (
                        <MenuItem key={foundDe.id} value={foundDe.id}>
                          <Checkbox checked={isCheked} />
                          <ListItemText primary={deName} />
                        </MenuItem>
                      );
                    })}
                </Select>
              }
            />
          );
        } else if (hiddenFields.includes(psde.dataElement.id)) {
          return null;
        } else {
          return (
            <Row
              label={
                <div style={{ display: "flex" }}>
                  {foundIndex + 1}.&nbsp;
                  <DataValueLabelNoState dataElement={psde.dataElement.id} currentProgramStage={currentProgramStage} />
                </div>
              }
              field={
                psde.dataElement.id === "vVNQoYA5RZH" ? (
                  <DataValueFieldNoBlurNoState
                    change={(value) => {
                      changeDataValue(psde.dataElement.id, value);
                    }}
                    accept={(value) => {
                      changeDataValue(psde.dataElement.id, value);
                    }}
                    disabled={!editing || completed}
                    dataElement={psde.dataElement.id}
                    currentProgramStage={currentProgramStage}
                    currentEvent={currentEvent}
                    valueSet={icd10OptionSet.options.map((o) => {
                      return {
                        value: o.code,
                        label: pickTranslation(o, "lo", "name") + " / " + o.name
                      };
                    })}
                  />
                ) : (
                  <DataValueFieldNoBlurNoState
                    change={(value) => {
                      changeDataValue(psde.dataElement.id, value);
                    }}
                    accept={(value) => {
                      changeDataValue(psde.dataElement.id, value);
                    }}
                    disabled={!editing || completed}
                    dataElement={psde.dataElement.id}
                    currentProgramStage={currentProgramStage}
                    currentEvent={currentEvent}
                    {...fieldProps[psde.dataElement.id]}
                  />
                )
              }
            />
          );
        }
      })}
    </div>
  );
};

export default IpdVisitDetails;
