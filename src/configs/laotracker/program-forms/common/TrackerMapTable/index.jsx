import _ from "lodash";
import React, { memo } from "react";
// import { shallow } from "zustand/shallow";
import { useTranslation } from "react-i18next";
import { TableRow, TableCell, Box } from "@mui/material";

import useTrackerCaptureStore from "@/state/trackerCapture";
import DataValueField from "@/ui/TrackerCapture/EventForm/DataValueField";
import DataValueLabel from "@/ui/TrackerCapture/EventForm/DataValueLabel";

// const isHiddenRow = (hiddenFields, dataElements) => {
//   const listCheckHide = dataElements.map(
//     ({ id, customCell, isCustomCellHide }) => {
//       if (hiddenFields.includes(id)) return true;
//       if (customCell && isCustomCellHide) return true;
//       return false;
//     }
//   );

//   //if any element display => isHide = false
//   if (listCheckHide.includes(false)) {
//     return false;
//   }

//   return true;
// };

// const isHiddenField = (hiddenFields, dataElement) => {
//   const found = hiddenFields.find((id) => id === dataElement);
//   if (!found) {
//     return false;
//   }
//   return true;
// };

const TrackerMapTable = ({
  dataElementConfigs,
  tableName,
  disableHideCell
}) => {
  const { t } = useTranslation();
  //   const hiddenFields = useEventCaptureStore(
  //     (state) => state.status.hiddenFields,
  //     shallow
  //   );

  return dataElementConfigs.map((dataElements, idx) => (
    /*!isHiddenRow(hiddenFields, dataElements) &&*/ <TableRow
      key={`${tableName}-${idx}`}
    >
      {dataElements.map((de) => {
        // if (isHiddenField(hiddenFields, de.id) && !disableHideCell) return;
        if (de.customCell) {
          if (de.isCustomCellHide) return;
          return de.dataElement || de.customCell;
        }

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
  ));
};

export default memo(TrackerMapTable);
