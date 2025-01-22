import { Input } from "@/ui/common";
import _ from "lodash";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import useDataEntryStore from "@/state/dataEntry";
import { shallow } from "zustand/shallow";

const DataElementTotalField = ({ dsde }) => {
  const { orgUnits, dataElements, categoryCombos } = useMetadataStore(
    (state) => ({
      orgUnits: state.orgUnits,
      dataElements: state.dataElements,
      categoryCombos: state.categoryCombos
    }),
    shallow
  );
  const { dataSet, orgUnit, period } = useSelectionStore(
    (state) => ({
      dataSet: state.dataSet,
      orgUnit: state.orgUnit,
      period: state.period
    }),
    shallow
  );
  const dataValues = useDataEntryStore((state) => state.dataValues);
  const foundDe = dataElements.find((de) => de.id === dsde);
  const foundDataSetElement = dataSet.dataSetElements.find((dse) => dse.dataElement.id === foundDe.id);
  let foundCc;
  if (foundDataSetElement.categoryCombo) {
    foundCc = categoryCombos.find((currentCc) => currentCc.id === foundDataSetElement.categoryCombo.id);
  } else {
    foundCc = categoryCombos.find((currentCc) => currentCc.id === foundDe.categoryCombo.id);
  }
  let total = 0;
  foundCc.categoryOptionCombos.forEach((coc) => {
    const value = dataValues[`${dsde}-${coc.id}-${orgUnit.id}`];
    total += value ? parseInt(value.value) : 0;
  });

  return (
    <div className="data-entry-input-field-container">
      <Input disabled={true} valueType="TEXT" value={total} change={() => {}} />
    </div>
  );
};

export default DataElementTotalField;
