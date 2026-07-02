import _ from "lodash";
import React, { memo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import useEventCaptureStore from "@/state/eventCapture";
import { TableRow, TableCell, Box } from "@mui/material";
import DataValueField from "@/ui/EventCapture/Form/DataValueField";
import DataValueLabel from "@/ui/EventCapture/Form/DataValueLabel";

const isHiddenRow = (hiddenFields = [], dataElements = []) => {
  if (!Array.isArray(dataElements)) return false;

  const listCheckHide = dataElements.map(
    ({ id, customCell, isCustomCellHide }) => {
      if (hiddenFields.includes(id)) return true;
      if (customCell && isCustomCellHide) return true;
      return false;
    }
  );

  return !listCheckHide.includes(false);
};

const isHiddenField = (hiddenFields, dataElement) => {
  return hiddenFields.includes(dataElement);
};

const MapTable = ({ dataElementConfigs, tableName, disableHideCell }) => {
  const { t } = useTranslation();

  const hiddenFields = useEventCaptureStore(
    useShallow((state) => state.status.hiddenFields)
  );

  const program = useSelectionStore(
    useShallow((state) => state.program)
  );

  // ✅ safe guard
  const safeConfigs = Array.isArray(dataElementConfigs)
    ? dataElementConfigs
    : [];

  return safeConfigs.map(
    (dataElements, idx) =>
      !isHiddenRow(hiddenFields, dataElements) && (
        <TableRow key={`${tableName}-${idx}`}>
          {dataElements.map((de) => {
            if (!de) return null;

            if (isHiddenField(hiddenFields, de.id) && !disableHideCell)
              return null;

            if (de.customCell) {
              if (de.isCustomCellHide) return null;
              return de.customCell;
            }

            // Check program stage
            const foundPde =
              program?.programStages?.[0]?.programStageDataElements?.find(
                (pde) => pde.dataElement.id === de.id
              );

            if (!foundPde) return null;

            // Prepare props
            let fieldProps = { ...de.fieldProps };

            if (de.disabled) {
              fieldProps.disabled = true;
            }

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
                    <span>{t(de.text)}</span>
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
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <DataValueLabel {...fieldProps} />
                        {fieldProps?.required && (
                          <span style={{ color: "red", marginLeft: 4 }}>
                            *
                          </span>
                        )}
                      </Box>
                    </TableCell>

                    <TableCell {...de.fieldCellProps}>
                      <DataValueField {...fieldProps} />

                      {/* 🔴 TEST / VALIDATION MESSAGE */}
                      {de.message && (
                        <Box sx={{ color: "red", fontSize: 14, mt: 0.5,ml:3,fontWeight:"bold" }}>
                          {de.message}
                        </Box>
                      )}
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