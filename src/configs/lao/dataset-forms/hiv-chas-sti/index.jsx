import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import MapTable from "../common/MapTable";

import "../common/index.css";
import "./hiv-chas-sti.css";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import { useEffect, useMemo, useState } from "react";
import { pull } from "@/utils/fetch";
import TotalCell from "../common/TotalCell";

const IndicatorCell = ({ children }) => {
  return <>{children}</>;
};

const HeaderCell = styled(TableCell)(() => ({
  backgroundColor: "#6D6D2F",
  color: "#fff",
  fontWeight: "bold",
  border: "1px solid #fff",
  textAlign: "center",
}));

const HivChasSTI = () => {
  const { t } = useTranslation();
  const { orgUnit, period } = useSelectionStore(
    (state) => ({ orgUnit: state.orgUnit, period: state.period }),
    shallow
  );
  const [dataIndicator, setDataIndicator] = useState(null);
  const getIndicator = async () => {
    try {
      const result = await pull(
        `/api/analytics.json?dimension=dx:uzjGGUwiiew;OuNMAVAL2oo;Qmrkazs6jqr;IfXeM0V7Jzp;mm5xhH3qcM3;SedHk1gLvwz;sH3uvWGeRAl;HpKktsq4Tzy;cCNpzr4vBoE;DkI0vYxx80Z;mqelYIz1GEo;bp6BTVoycVl&dimension=ou:${orgUnit.id}&filter=pe:${period.dhis2Period}`
      );
      if (result) {
        const resultData = {};
        const indicatorIndex = result.headers.findIndex(
          (header) => header.name === "dx"
        );
        const valueIndex = result.headers.findIndex(
          (header) => header.name === "value"
        );
        result.rows.forEach((row) => {
          resultData[row[indicatorIndex]] = row[valueIndex];
        });
        setDataIndicator(resultData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIndicator();
  }, [orgUnit.id, period.dhis2Period]);

  const dataElements = useMemo(() => {
    if (dataIndicator) {
      return dataElementConfigs.map((item, index) => {
        if ([2, 4, 6, 8].includes(index)) {
          return [
            ...item.slice(0, 1),
            {
              ...item.slice(1, 2)[0],
              text: dataIndicator[item.slice(1, 2)[0].indicator] * 1 || "",
            },
            {
              ...item.slice(2, 3)[0],
              text: dataIndicator[item.slice(2, 3)[0].indicator] * 1 || "",
            },
            {
              ...item.slice(3)[0],
              text:
                item
                  .slice(1, 3)
                  .reduce(
                    (prev, curr) =>
                      prev + (dataIndicator[curr.indicator] * 1 || 0),
                    0
                  ) || "",
            },
          ];
        }
        return item;
      });
    }
    return dataElementConfigs;
  }, [JSON.stringify(dataIndicator)]);
  return (
    <Box id="hiv-chas-sti-form-container" className="custom-form">
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell>ພຕພ</HeaderCell>
            <HeaderCell>ຍິງ</HeaderCell>
            <HeaderCell>ຊາຍ</HeaderCell>
            <HeaderCell>ລວມ</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={dataElements} />
        </TableBody>
      </Table>
    </Box>
  );
};

const labelStyle = {
  style: {
    backgroundColor: "#A2BF62",
    color: "#000",
    paddingBlock: "15px",
    border: "1px solid #fff",
  },
};
const deStyle = {
  style: {
    backgroundColor: "#DCE7C4",
    width: "20%",
    border: "1px solid #fff",
    textAlign: "center",
  },
};
const dataElementConfigs = [
  [
    {
      display: "text",
      text: "ຈໍານວນຄົນເຈັບທີ່ມາກວດເຂດນອກ,ພະຍາດຍິງ,ສຸກເສີນ ທັງໝົດ",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "mSDeg5cH50l",
      cellProps: { ...deStyle, colSpan: 2 },
    },

    {
      display: "text",
      text: "0",
      cellProps: deStyle,
      customCell: <TotalCell listData={["mSDeg5cH50l-lmbxvugTvKr"]} />,
    },
  ],
  [
    {
      display: "text",
      text: "ຈຳນວນຄົນເຈັນທີ່ມາກວດ ພຕພ ທັງໝົດ",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "KOdohXDC60d",
      dsde: "pBSI63hcV2m",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "mU6SvscLWrH",
      dsde: "pBSI63hcV2m",
      cellProps: deStyle,
    },
    {
      display: "text",
      text: "0",
      cellProps: deStyle,
      customCell: (
        <TotalCell
          listData={["pBSI63hcV2m-mU6SvscLWrH", "pBSI63hcV2m-KOdohXDC60d"]}
        />
      ),
    },
  ],
  [
    {
      display: "text",
      text: "ຈໍານວນຄົນເຈັບທີ່ມີອາການຊຶມເຊື້ອ ພຕພ ທັງໝົດ",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "",
      cellProps: deStyle,
      indicator: "Qmrkazs6jqr",
    },
    {
      display: "text",
      text: "",
      cellProps: deStyle,
      indicator: "OuNMAVAL2oo",
    },
    {
      display: "text",
      text: "",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "ຈຳນວນຄົນເຈັນທີ່ມາກວດ HBV ທັງໝົດ",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "KOdohXDC60d",
      dsde: "NAVRhODjwqg",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "mU6SvscLWrH",
      dsde: "NAVRhODjwqg",
      cellProps: deStyle,
    },
    {
      display: "text",
      text: "0",
      cellProps: deStyle,
      customCell: (
        <TotalCell
          listData={["NAVRhODjwqg-mU6SvscLWrH", "NAVRhODjwqg-KOdohXDC60d"]}
        />
      ),
    },
  ],
  [
    {
      display: "text",
      text: "ຈຈໍານວນຄົນເຈັບທີ່ມີອາການຊຶມເຊື້ອ HBV ທັງໝົດ",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "",
      cellProps: deStyle,
      indicator: "IfXeM0V7Jzp",
    },
    {
      display: "text",
      text: "",
      cellProps: deStyle,
      indicator: "mm5xhH3qcM3",
    },
    {
      display: "text",
      text: "",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "ຈຳນວນຄົນເຈັນທີ່ມາກວດ HCV ທັງໝົດ",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "KOdohXDC60d",
      dsde: "zkVkI6ZM0ae",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "mU6SvscLWrH",
      dsde: "zkVkI6ZM0ae",
      cellProps: deStyle,
    },
    {
      display: "text",
      text: "0",
      cellProps: deStyle,
      customCell: (
        <TotalCell
          listData={["zkVkI6ZM0ae-mU6SvscLWrH", "zkVkI6ZM0ae-KOdohXDC60d"]}
        />
      ),
    },
  ],
  [
    {
      display: "text",
      text: "ຈໍານວນຄົນເຈັບທີ່ມີອາການຊຶມເຊື້ອ HCV ທັງໝົດ",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "",
      cellProps: deStyle,
      indicator: "sH3uvWGeRAl",
    },
    {
      display: "text",
      text: "",
      cellProps: deStyle,
      indicator: "HpKktsq4Tzy",
    },
    {
      display: "text",
      text: "",
      cellProps: deStyle,
    },
  ],

  [
    {
      display: "text",
      text: "ຈຳນວນຄົນເຈັນທີ່ມາກວດ ຊີຟີລິດ ທັງໝົດ",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "KOdohXDC60d",
      dsde: "HxlbXS1LOgM",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "mU6SvscLWrH",
      dsde: "HxlbXS1LOgM",
      cellProps: deStyle,
    },
    {
      display: "text",
      text: "0",
      cellProps: deStyle,
      customCell: (
        <TotalCell
          listData={["HxlbXS1LOgM-mU6SvscLWrH", "HxlbXS1LOgM-KOdohXDC60d"]}
        />
      ),
    },
  ],
  [
    {
      display: "text",
      text: "ຈໍານວນຄົນເຈັບທີ່ມີອາການຊຶມເຊື້ອ ຊີຟີລິດ ທັງໝົດ",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "",
      cellProps: deStyle,
      indicator: "DkI0vYxx80Z",
    },
    {
      display: "text",
      text: "",
      cellProps: deStyle,
      indicator: "mqelYIz1GEo",
    },
    {
      display: "text",
      text: "",
      cellProps: deStyle,
    },
  ],
];

export default HivChasSTI;
