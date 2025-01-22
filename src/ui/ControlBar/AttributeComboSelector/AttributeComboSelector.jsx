import { Autocomplete, TextField } from "@mui/material";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import withPadding from "@/hocs/withPadding";
import "./AttributeComboSelector.css";
import { shallow } from "zustand/shallow";

const AttributeComboSelector = () => {
  const categoryCombos = useMetadataStore((state) => state.categoryCombos);
  const { dataSet, attributeOptionCombo, actions } = useSelectionStore(
    (state) => ({ dataSet: state.dataSet, attributeOptionCombo: state.attributeOptionCombo, actions: state.actions }),
    shallow
  );
  const { selectAttributeOptionCombo } = actions;
  const foundCc = categoryCombos.find((cc) => cc.id === dataSet.categoryCombo.id);

  return (
    <div className="attribute-combo-selector-container">
      {foundCc.displayName}
      <div style={{ height: 3 }}></div>
      <Autocomplete
        value={attributeOptionCombo}
        onChange={(event, value) => {
          selectAttributeOptionCombo(value);
        }}
        isOptionEqualToValue={(option, value) => {
          return value ? option.id === value.id : false;
        }}
        size="small"
        fullWidth
        autoComplete={false}
        getOptionLabel={(option) => option.displayName}
        options={foundCc.categoryOptionCombos.map((coc) => {
          return { ...coc, categoryCombo: foundCc.id, isDefault: false };
        })}
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  );
};

export default withPadding(AttributeComboSelector);
