import _ from "lodash";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { TableRow, TableCell, Typography } from "@mui/material";

import DataValueField from "@/ui/DataEntry/Form/DataValueField";
import { Box } from "@mui/system";

const MapTable = ({ dataElementConfigs, tableName }) => {
  const { t } = useTranslation();

  return dataElementConfigs.map((dataElements, idx) => {
    return (
      <TableRow key={`${tableName}-${idx}`}>
        {dataElements.map((de, cellIdx) => {
          const fieldProps = {};
          const cellProps = { ...de.cellProps };

          if (de.dsde) fieldProps.dsde = de.dsde;
          if (de.cc) fieldProps.cc = de.cc;
          if (de.coc) fieldProps.coc = de.coc;
          if (de.img) fieldProps.img = de.img;
          if (de.style) cellProps.sx = de.style;
          if (de.disabled) fieldProps.disabled = de.disabled || false;
          // custom total cell
          if (de.customCell) {
            return (
              <TableCell key={`${idx}-${cellIdx}`} {...cellProps}>
                {de.customCell}
              </TableCell>
            );
          }

          switch (de.display) {
            case "text":
              const newCellProps = {
                ...cellProps,
                sx: { ...cellProps.sx, cursor: de.onClick && "pointer" },
              };
              return (
                <TableCell
                  key={`${idx}-${cellIdx}-${de.text}`}
                  onClick={de.onClick}
                  {...newCellProps}
                >
                  {de.img && de.img.length > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>{t(de.text)}</Typography>
                      {de.img.map((imgURL) => (
                        <Box style={{ maxHeight: "100%" }}>
                          <img
                            src={imgURL}
                            alt="img"
                            style={{
                              maxWidth: "230px",
                              maxHeight: "95px",
                              width: "auto",
                              height: "auto",
                            }}
                          />
                        </Box>
                      ))}
                    </div>
                  ) : (
                    <span dangerouslySetInnerHTML={{ __html: t(de.text) }} />
                  )}
                </TableCell>
              );

            case "textOnField":
              return (
                <TableCell key={`${de.coc}-${de.dsde}`} {...cellProps}>
                  <span>{t(de.text)}</span>
                  <DataValueField {...fieldProps} />
                </TableCell>
              );

            case "empty":
              return <TableCell key={`${idx}-${cellIdx}`} {...cellProps} />;

            default:
              return (
                <TableCell key={`${de.coc}-${de.dsde}`} {...cellProps}>
                  <DataValueField {...fieldProps} />
                </TableCell>
              );
          }
        })}
      </TableRow>
    );
  });
};

export default memo(MapTable);
