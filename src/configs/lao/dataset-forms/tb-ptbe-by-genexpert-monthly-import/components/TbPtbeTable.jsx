import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import MapTable from "../../common/MapTable";

const HeaderCell = styled(TableCell)(() => ({
  backgroundColor: "#0277BD",
  color: "#fff",
  textAlign: "center",
}));

const TbPtbeTable = ({ headerTitle, dataElementConfigs, minWidth, sx }) => {
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table sx={{ minWidth: minWidth || 1000, ...sx }}>
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
    </TableContainer>
  );
};

export default TbPtbeTable;
