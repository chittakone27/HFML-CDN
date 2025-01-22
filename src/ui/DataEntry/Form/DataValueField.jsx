import { useState } from "react";
import { Input } from "@/ui/common";
import _ from "lodash";
import { dataValue } from "@/api";
import { useTranslation } from "react-i18next";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import useDataEntryStore from "@/state/dataEntry";
import { shallow } from "zustand/shallow";
import DataValueHistory from "./DataValueHistory";
const { saveDataValue } = dataValue;
const instantSaveValueTypes = ["AGE", "BOOLEAN", "TRUE_ONLY"];

const DataValueField = ({
  dsde,
  cc,
  coc,
  ou,
  tabIndex,
  helpers,
  disabled = false
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);

  const { orgUnits, dataElements, categoryCombos, optionSets } =
    useMetadataStore(
      (state) => ({
        orgUnits: state.orgUnits,
        dataElements: state.dataElements,
        categoryCombos: state.categoryCombos,
        optionSets: state.optionSets
      }),
      shallow
    );
  const { dataSet, orgUnit, period, attributeOptionCombo } = useSelectionStore(
    (state) => ({
      dataSet: state.dataSet,
      orgUnit: state.orgUnit,
      period: state.period,
      attributeOptionCombo: state.attributeOptionCombo
    }),
    shallow
  );
  const foundOu = orgUnits.find((o) => o.id === ou);
  const currentOrgUnit = foundOu ? foundOu.id : orgUnit.id;
  const currentAttributeOptionCombo = attributeOptionCombo;
  const { completeness, dataValues, currentDataValue, status, actions } =
    useDataEntryStore(
      (state) => ({
        completeness: state.completeness,
        dataValues: state.dataValues,
        currentDataValue:
          state.dataValues[
            `${dsde}-${coc}-${currentOrgUnit}-${currentAttributeOptionCombo.id}`
          ],
        status: state.status,
        actions: state.actions
      }),
      shallow
    );
  const {
    setStatus,
    setDataValue,
    setDataValueDirty,
    setDataValueSelected,
    setDataValueError,
    setDataValueCommentAndFollowUp
  } = actions;
  const { isLocked } = status;
  const foundDe = dataElements.find((de) => de.id === dsde);
  const foundDataSetElement = dataSet.dataSetElements.find(
    (dse) => dse.dataElement.id === foundDe.id
  );
  let foundCc;
  if (foundDataSetElement.categoryCombo) {
    foundCc = categoryCombos.find(
      (currentCc) => currentCc.id === foundDataSetElement.categoryCombo.id
    );
  } else {
    foundCc = categoryCombos.find((currentCc) => currentCc.id === cc);
  }
  const foundCoc = foundCc.categoryOptionCombos.find(
    (currentCoc) => currentCoc.id === coc
  );
  const foundOptionSet = foundDe.optionSetValue
    ? optionSets.find((os) => os.id === foundDe.optionSet.id)
    : null;

  let valueSet = foundOptionSet
    ? foundOptionSet.options.map((o) => ({
        label: o.displayName,
        value: o.code
      }))
    : null;

  const { valueType } = foundDe;
  let backgroundColor;

  if (loading) {
    backgroundColor = "#ffe9ab";
  }
  if (saved) {
    backgroundColor = "#c9ffb3";
  }
  if (currentDataValue && currentDataValue.error) {
    backgroundColor = "#ffa1a1";
  }
  const saveCurrentValue = async (instant, currentValue) => {
    if (instant) {
      setLoading(true);
      setSaved(false);
      const result = await saveDataValue(
        dataSet.id,
        currentOrgUnit,
        period.dhis2Period,
        dsde,
        coc,
        currentValue,
        attributeOptionCombo,
        currentDataValue ? currentDataValue.followUp : "",
        currentDataValue ? currentDataValue.comment : ""
      );
      if (result.ok) {
        setDataValueError(dsde, coc, currentOrgUnit, "");
        setSaved(true);
      } else {
        const error = result.json.message;
        setDataValueError(dsde, coc, currentOrgUnit, error);
      }
      setLoading(false);
    } else if (currentDataValue && currentDataValue.isDirty) {
      setLoading(true);
      setSaved(false);
      const result = await saveDataValue(
        dataSet.id,
        currentOrgUnit,
        period.dhis2Period,
        dsde,
        coc,
        currentDataValue.value,
        attributeOptionCombo,
        currentDataValue ? currentDataValue.followUp : "",
        currentDataValue ? currentDataValue.comment : ""
      );
      if (result.ok) {
        setDataValueDirty(dsde, coc, currentOrgUnit, false);
        setDataValueError(dsde, coc, currentOrgUnit, "");
        setSaved(true);
      } else {
        const error = result.json.message;
        setDataValueError(dsde, coc, currentOrgUnit, error);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div className="data-entry-input-field-container">
        {openHistory ? (
          <DataValueHistory
            setOpenHistory={setOpenHistory}
            foundDe={foundDe}
            foundCoc={foundCoc}
            currentOrgUnit={currentOrgUnit}
            dataSet={dataSet}
            attributeOptionCombo={attributeOptionCombo}
            period={period}
            currentDataValue={currentDataValue}
            setDataValueCommentAndFollowUp={setDataValueCommentAndFollowUp}
            saveDataValue={saveDataValue}
          />
        ) : null}
        <Input
          helpers={helpers}
          tabIndex={tabIndex}
          backgroundColor={backgroundColor}
          focus={() => {
            setDataValueSelected(foundDe.id, foundCoc.id, currentOrgUnit);
          }}
          blur={() => {
            const foundError = helpers
              ? helpers.find((helper) => helper.type === "ERROR")
              : null;
            if (foundError) {
              setDataValueSelected(
                foundDe.id,
                foundCoc.id,
                currentOrgUnit,
                false
              );
              return;
            }
            saveCurrentValue(false);
          }}
          onDoubleClick={() => {
            if (!disabled) {
              setOpenHistory(true);
            }
          }}
          disabled={disabled || completeness || isLocked}
          valueType={valueType}
          valueSet={valueSet}
          value={currentDataValue ? currentDataValue.value : ""}
          change={async (value) => {
            setDataValue(dsde, coc, currentOrgUnit, value);
            if (instantSaveValueTypes.includes(valueType) || valueSet) {
              setDataValue(dsde, coc, currentOrgUnit, value);
              await saveCurrentValue(true, value);
            } else {
              setDataValue(dsde, coc, currentOrgUnit, value);
            }
          }}
          accept={
            valueType === "DATE"
              ? async (value) => {
                  setDataValue(dsde, coc, currentOrgUnit, value);
                  await saveCurrentValue(true, value);
                }
              : undefined
          }
        />
      </div>
    </>
  );
};

export default DataValueField;
