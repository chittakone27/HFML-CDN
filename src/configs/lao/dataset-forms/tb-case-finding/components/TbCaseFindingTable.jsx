import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import MapTable from "../../common/MapTable";
import { memo } from "react";

const HeaderCell = styled(TableCell)(() => ({
  backgroundColor: "#0277BD",
  color: "#fff",
}));

const TbCaseFindingTable = ({ headerTitle, dataElementConfigs, minWidth }) => {
  const { t } = useTranslation();

  return (
    <Table sx={{ minWidth: minWidth || 1200 }}>
      <TableHead>
        <TableRow>
          <HeaderCell colSpan={100}>
            <span dangerouslySetInnerHTML={{ __html: t(headerTitle) }} />
          </HeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <MapTable
          tableName={headerTitle}
          dataElementConfigs={dataElementConfigs}
        />
      </TableBody>
    </Table>
  );
};

export default memo(TbCaseFindingTable);
