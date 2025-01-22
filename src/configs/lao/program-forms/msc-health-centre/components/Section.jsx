import { useState } from "react";
import { Box, Collapse, Table, TableBody, TableCell, Typography } from "@mui/material";

import MapTable from "../../common/MapTable";
import CollapseButton from "../../common/CollapseButton";

const Section = ({ dataElementConfigs, tableName, title }) => {
  const [open, setOpen] = useState(true);

  return (
    <Box className="section">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          "& svg": {
            color: "#363f4d"
          }
        }}
        onClick={() => setOpen(!open)}
      >
        <Typography>{title}</Typography>
        <CollapseButton open={open} />
      </Box>
      <Collapse in={open}>
        <Box>
          <Table>
            <TableBody>
              {/* <MapTable
                dataElementConfigs={dataElementConfigs}
                tableName={tableName}
              /> */}
              <tr>
                <TableCell>Hello</TableCell>
                <TableCell>Hello</TableCell>
              </tr>
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Section;
