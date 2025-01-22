import _ from "lodash";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { TableRow, TableCell } from "@mui/material";

import { CustomCell, FieldCell, LabelCell } from "./components";

//return list table row
//configs
//1 row is a array cell object
//default case: return 2 cell (label and field) - example config [{id: "dataElementId"}]
//label case: return 1 label cell - example config [{id: "dataElementId", display: 'label'}]
//field case: return 1 field cell - example config [{id: "dataElementId", display: 'field'}]
//text case: return 1 text cell - example config [{text: "text here", display: 'text'}]
//empty case: return 1 empty cell - example config [{display: 'empty'}]
//custom cell: return 1 custom cell - example config [{customCell: <CustomComponent />}]

const RowMapper = ({ context = "profile", rows, tableName }) => {
  const { t } = useTranslation();

  return rows.map((cells, rowIdx) => (
    <TableRow key={`${tableName}-${rowIdx}`}>
      {cells.map((cell, cellIdx) => {
        const { id, cellProps, customCell } = cell;

        if (customCell) return <CustomCell key={`${tableName}-${rowIdx}-${cellIdx}`} customCell={customCell} />;

        switch (cell.display) {
          case "field":
            return <FieldCell key={id} context={context} cell={cell} />;
          case "label":
            return <LabelCell key={id} context={context} cell={cell} />;
          case "labelInTop":
            return <FieldCell key={id} context={context} cell={cell} labelInTop />;
          case "text":
            const { text } = cell;
            return (
              <TableCell key={id || text} {...cellProps}>
                <span>{t(text)}</span>
              </TableCell>
            );
          case "empty":
            return <TableCell key={`${tableName}-${rowIdx}-${cellIdx}`} {...cellProps} />;
          default:
            const labelCell = { ...cell, cellProps: cell.labelCellProps };
            const fieldCell = { ...cell, cellProps: cell.fieldCellProps };
            return (
              <React.Fragment key={cell.id}>
                <LabelCell context={context} cell={labelCell} />
                <FieldCell context={context} cell={fieldCell} />
              </React.Fragment>
            );
        }
      })}
    </TableRow>
  ));
};

export default memo(RowMapper);
