import { Box, TableCell } from "@mui/material";
import { useMemo } from "react";
import { shallow } from "zustand/shallow";

import { Input } from "@/ui/common";
import DataValueLabel from "@/ui/EventCapture/Form/DataValueLabel";
import useEventCaptureStore from "@/state/eventCapture";
import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";

const dataElement = "S3FyEAI34OA";

const VillageName = ({ disabled = false }) => {
  const program = useSelectionStore((state) => state.program);
  const { dataElements, optionSets } = useMetadataStore(
    (state) => ({
      dataElements: state.dataElements,
      optionSets: state.optionSets,
    }),
    shallow
  );
  const { status, currentEvent, completeness } = useEventCaptureStore(
    (state) => ({
      status: state.status,
      currentEvent: state.currentEvent,
      completeness: state.completeness,
    }),
    shallow
  );
  const { helpers, hiddenFields, mandatoryFields, disabledFields } = status;
  const { setCurrentEventDataValue } = useEventCaptureStore(
    (state) => state.actions
  );
  const foundPde = program.programStages[0].programStageDataElements.find(
    (pde) => pde.dataElement.id === dataElement
  );

  const foundDe = dataElements.find((de) => de.id === dataElement);
  foundDe.mandatory = foundPde.compulsory;

  if (mandatoryFields.includes(foundDe.id)) foundDe.mandatory = true;

  const { valueType, id } = foundDe;
  const foundHelpers = helpers.filter(
    (helper) => helper.targetType === "DATA_ELEMENT" && helper.target === id
  );
  const hidden = hiddenFields.includes(id);

  const completed = currentEvent.status === "COMPLETED" ? true : false;
  const value =
    currentEvent.dataValues && currentEvent.dataValues[id]
      ? currentEvent.dataValues[id]
      : "";

  const changeValue = (value) => setCurrentEventDataValue(id, value);

  if (disabledFields.includes(id)) disabled = true;
  if (completeness) disabled = true;
  if (completed) disabled = true;

  const villages = useMemo(() => {
    const ou = currentEvent.orgUnit;
    const found = optionSets.find(({ id }) => id === "SYbcOcQqrWK");
    if (!found) return [];

    const filtered = found.options.filter((option) => {
      const hc = option.attributeValues.find(
        (attr) => attr.attribute.id === "hPANGEVFRw6"
      );
      const zone = option.attributeValues.find(
        (attr) => attr.attribute.id === "VWI1eszTvpZ"
      );

      if (hc && zone) {
        if (hc.value === ou && (zone.value === "2" || zone.value === "3")) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });

    return filtered.map((o) => ({ label: o.displayName, value: o.code }));
  }, []);

  return (
    !hidden && (
      <>
        <TableCell sx={{ width: "300px" }}>
          <DataValueLabel dataElement={dataElement} />
        </TableCell>
        <TableCell>
          <Box className="input-field-container">
            <Input
              disabled={disabled}
              helpers={foundHelpers}
              valueType={valueType}
              valueSet={villages}
              mandatory={foundDe.mandatory}
              value={value}
              change={(value) => {
                changeValue(value);
              }}
            />
          </Box>
        </TableCell>
      </>
    )
  );
};

export default VillageName;
