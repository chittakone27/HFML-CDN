import { Table, TableBody } from "@mui/material";

import MapTable from "../../../common/MapTable";
import CollapseSectionWrapper from "./CollapseSectionWrapper";

const CustomSection = ({ title, dataElementConfigs, isOpen }) => {
  return (
    <CollapseSectionWrapper
      isOpen={isOpen}
      headerTitle={title}
      sx={{ padding: "10px" }}
    >
      <Table>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigs} tableName={title} />
        </TableBody>
      </Table>
    </CollapseSectionWrapper>
  );
};

export default CustomSection;
