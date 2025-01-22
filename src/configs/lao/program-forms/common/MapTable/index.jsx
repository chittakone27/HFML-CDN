import _ from "lodash";
import React, { memo } from "react";
// Hooks
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import useEventCaptureStore from "@/state/eventCapture";
// Components
import { TableRow, TableCell, Box } from "@mui/material";
import DataValueField from "@/ui/EventCapture/Form/DataValueField";
import DataValueLabel from "@/ui/EventCapture/Form/DataValueLabel";

const isHiddenRow = (hiddenFields, dataElements) => {
  const listCheckHide = dataElements.map(
    ({ id, customCell, isCustomCellHide }) => {
      if (hiddenFields.includes(id)) return true;
      if (customCell && isCustomCellHide) return true;
      return false;
    }
  );

  //if any element display => isHide = false
  if (listCheckHide.includes(false)) {
    return false;
  }

  return true;
};

const isHiddenField = (hiddenFields, dataElement) => {
  const found = hiddenFields.find((id) => id === dataElement);
  if (!found) {
    return false;
  }
  return true;
};

const MapTable = ({ dataElementConfigs, tableName, disableHideCell }) => {
  const { t } = useTranslation();
  const hiddenFields = useEventCaptureStore(
    useShallow((state) => state.status.hiddenFields)
  );
  const program = useSelectionStore(useShallow((state) => state.program));

  return dataElementConfigs.map(
    (dataElements, idx) =>
      !isHiddenRow(hiddenFields, dataElements) && (
        <TableRow key={`${tableName}-${idx}`}>
          {dataElements.map((de) => {
            if (isHiddenField(hiddenFields, de.id) && !disableHideCell) return;
            if (de.customCell) {
              if (de.isCustomCellHide) return;
              return de.dataElement || de.customCell;
            }
            /* If a data element don't exist in this program stage, the return nothing */
            const foundPde =
              program.programStages[0].programStageDataElements.find(
                (pde) => pde.dataElement.id === de.id
              );
            if (!foundPde) return;
            /* End data element don't exist */
            let fieldProps = { ...de.fieldProps };
            if (de.id) fieldProps.dataElement = de.id;
            if (!de.display) de.display = "default";
            switch (de.display) {
              case "noLabel":
                return (
                  <TableCell key={de.id} {...de.cellProps}>
                    <DataValueField {...fieldProps} />
                  </TableCell>
                );

              case "label":
                return (
                  <TableCell key={de.id} {...de.cellProps}>
                    <DataValueLabel {...fieldProps} />
                  </TableCell>
                );

              case "text":
                return (
                  <TableCell key={de.text} {...de.cellProps}>
                    <span {...fieldProps}>{t(de.text)}</span>
                  </TableCell>
                );

              case "empty":
                return <TableCell key={de.id} {...de.cellProps} />;

              case "labelInBottom":
                return (
                  <TableCell key={de.id} {...de.cellProps}>
                    <DataValueField {...fieldProps} />
                    <DataValueLabel {...fieldProps} />
                  </TableCell>
                );

              case "labelInTop":
                return (
                  <TableCell key={de.id} {...de.cellProps}>
                    <DataValueLabel {...fieldProps} />
                    <DataValueField {...fieldProps} />
                  </TableCell>
                );

              case "checkboxLeft":
                return (
                  <TableCell key={de.id} {...de.cellProps}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <DataValueField {...fieldProps} />
                      <DataValueLabel {...fieldProps} />
                    </Box>
                  </TableCell>
                );

              default:
                return (
                  <React.Fragment key={de.id}>
                    <TableCell {...de.labelCellProps}>
                      <DataValueLabel {...fieldProps} />
                    </TableCell>
                    <TableCell {...de.fieldCellProps}>
                      <DataValueField {...fieldProps} />
                    </TableCell>
                  </React.Fragment>
                );
            }
          })}
        </TableRow>
      )
  );
};

export default memo(MapTable);
