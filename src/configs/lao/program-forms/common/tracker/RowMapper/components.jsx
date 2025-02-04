import { Box, TableCell, Typography } from "@mui/material";

import useRuleContext from "../hooks/useRuleContext";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import DataValueField from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlur";
import DataValueLabel from "@/ui/TrackerCapture/EventForm/DataValueLabel";

const getLabelProps = (context, id) => {
  if (context === "event") return { dataElement: id };
  return { attribute: id };
};

const getHelpers = (target, { errors, helpers, warnings }) => {
  const result = [];
  Object.keys(errors).forEach((key) => {
    if (key === target) result.push({ type: "ERROR", value: errors[key] });
  });
  Object.keys(helpers).forEach((key) => {
    if (key === target) result.push({ type: "HELPER", value: helpers[key] });
  });
  Object.keys(warnings).forEach((key) => {
    if (key === target) result.push({ type: "WARNING", value: warnings[key] });
  });

  return result;
};

export const FieldCell = ({ context, cell, labelInTop }) => {
  const { id, cellProps } = cell;
  const {
    errors,
    helpers,
    warnings,
    hiddenFields,
    disabledFields,
    hiddenOptions
  } = useRuleContext(context);

  const Field = context === "event" ? DataValueField : AttributeField;
  const Label = context === "event" ? DataValueLabel : AttributeLabel;

  const options = hiddenOptions[id];
  const disabled = disabledFields[id];
  const fieldProps = {
    helpers: getHelpers(id, { errors, helpers, warnings }),
    ...cell.fieldProps
  };

  if (disabled) fieldProps.disabled = true;
  if (options) fieldProps.hiddenOptions = options;
  if (context === "event") fieldProps.dataElement = id;
  if (context === "profile") fieldProps.attribute = id;

  return (
    <TableCell {...cellProps}>
      {!hiddenFields[id] && (
        <div className="field-container">
          {labelInTop && <Label {...getLabelProps(context, id)} />}
          <Field {...fieldProps} />
        </div>
      )}
    </TableCell>
  );
};

export const LabelCell = ({ context, cell }) => {
  const { id, cellProps } = cell;
  const { hiddenFields } = useRuleContext(context);

  const Label = context === "event" ? DataValueLabel : AttributeLabel;

  const fieldProps = { ...cell.fieldProps };
  if (context === "event") fieldProps.dataElement = id;
  if (context === "profile") fieldProps.attribute = id;

  return (
    <TableCell {...cellProps}>
      {!hiddenFields[id] && <Label {...fieldProps} />}
    </TableCell>
  );
};

export const CustomCell = ({ customCell, customCellProp }) => (
  <TableCell {...customCellProp}>{customCell}</TableCell>
);
