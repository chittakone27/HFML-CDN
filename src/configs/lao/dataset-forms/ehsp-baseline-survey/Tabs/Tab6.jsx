import React, { useMemo } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { tableCellStyles } from "../styles/styles";
import MapTable from "../../common/MapTable";

const Tab6 = () => {
  const { t } = useTranslation();

  const headerTable6 = [
    t("Question number"),
    t("Location"),
    t("ID"),
    t("Measurement"),
    t("Patient 1"),
    t("Patient 2"),
    t("Patient 3"),
  ];

  const tableConfigs6 = useMemo(
    () => [
      [
        { display: "text", text: "1", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: "Reception",
          cellProps: tableCellStyles.no,
        },
        {
          display: "text",
          text: "4.1.1.3",
          cellProps: tableCellStyles.no,
        },
        {
          display: "text",
          text: "The assessor inteviews 3 patients whether they are talked by heatlh staff in a friendly tone of voice and appropriate pace of speech, attended with active listening (nodding, no interrupting, confirmed what they heard customer say, etc.) at any place.",
          cellProps: tableCellStyles.value,
        },

        {
          cc: "tQprfffyj8J",
          coc: "rFr8Mudfj4o",
          dsde: "ZaB6MFm50Yn",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "tQprfffyj8J",
          coc: "heefNOdrbv8",
          dsde: "ZaB6MFm50Yn",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "tQprfffyj8J",
          coc: "uUEBV4BoDXD",
          dsde: "ZaB6MFm50Yn",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "2", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: "OPD",
          cellProps: tableCellStyles.no,
        },
        {
          display: "text",
          text: "4.1.1.4",
          cellProps: tableCellStyles.no,
        },
        {
          display: "text",
          text: "The assessor inteviews 3 patients whether staff introduced himself/herself including information on his/her name and role.",
          cellProps: tableCellStyles.value,
        },

        {
          cc: "tQprfffyj8J",
          coc: "rFr8Mudfj4o",
          dsde: "VVM38iOEl8W",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "tQprfffyj8J",
          coc: "heefNOdrbv8",
          dsde: "VVM38iOEl8W",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "tQprfffyj8J",
          coc: "uUEBV4BoDXD",
          dsde: "VVM38iOEl8W",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "3", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: "OPD",
          cellProps: tableCellStyles.no,
        },
        {
          display: "text",
          text: "4.1.1.5",
          cellProps: tableCellStyles.no,
        },
        {
          display: "text",
          text: "The assessor inteviews 3 patients whether they received explanation on directions on where to go in each step.",
          cellProps: tableCellStyles.value,
        },

        {
          cc: "tQprfffyj8J",
          coc: "rFr8Mudfj4o",
          dsde: "xSNIy8cZQPn",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "tQprfffyj8J",
          coc: "heefNOdrbv8",
          dsde: "xSNIy8cZQPn",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "tQprfffyj8J",
          coc: "uUEBV4BoDXD",
          dsde: "xSNIy8cZQPn",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "4", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: "OPD",
          cellProps: tableCellStyles.no,
        },
        {
          display: "text",
          text: "4.1.1.6",
          cellProps: tableCellStyles.no,
        },
        {
          display: "text",
          text: "The assessor inteviews 3 patients whether they received informaiton to their questions.",
          cellProps: tableCellStyles.value,
        },

        {
          cc: "tQprfffyj8J",
          coc: "rFr8Mudfj4o",
          dsde: "OFtHXjEGeW0",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "tQprfffyj8J",
          coc: "heefNOdrbv8",
          dsde: "OFtHXjEGeW0",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "tQprfffyj8J",
          coc: "uUEBV4BoDXD",
          dsde: "OFtHXjEGeW0",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "5", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: "OPD",
          cellProps: tableCellStyles.no,
        },
        {
          display: "text",
          text: "4.1.1.8",
          cellProps: tableCellStyles.no,
        },
        {
          display: "text",
          text: "The assessor Inteviews 3 patients whether they recieved explanation on service procedure and expected time.",
          cellProps: tableCellStyles.value,
        },

        {
          cc: "tQprfffyj8J",
          coc: "rFr8Mudfj4o",
          dsde: "omIpDOYkZ1d",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "tQprfffyj8J",
          coc: "heefNOdrbv8",
          dsde: "omIpDOYkZ1d",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "tQprfffyj8J",
          coc: "uUEBV4BoDXD",
          dsde: "omIpDOYkZ1d",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "6", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: "IPD",
          cellProps: tableCellStyles.no,
        },
        {
          display: "text",
          text: "4.3.1.11",
          cellProps: tableCellStyles.no,
        },

        {
          display: "text",
          text: "The assessor Inteviews 3 patients whether they recieved sufficient explanaion about results of physical examination, lab tests, diagnosis and treament by health staff.",
          cellProps: tableCellStyles.value,
        },

        {
          cc: "tQprfffyj8J",
          coc: "rFr8Mudfj4o",
          dsde: "qSyy1qTnGrJ",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "tQprfffyj8J",
          coc: "heefNOdrbv8",
          dsde: "qSyy1qTnGrJ",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "tQprfffyj8J",
          coc: "uUEBV4BoDXD",
          dsde: "qSyy1qTnGrJ",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "7", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: "Pharmacy",
          cellProps: tableCellStyles.no,
        },
        {
          display: "text",
          text: "4.1.3.7",
          cellProps: tableCellStyles.no,
        },
        {
          display: "text",
          text: "The assessor interviews 3 patients on average waiting time for receiving medicine is less than 30 minutes",
          cellProps: tableCellStyles.value,
        },

        {
          cc: "tQprfffyj8J",
          coc: "rFr8Mudfj4o",
          dsde: "tM23pYi3TSZ",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "tQprfffyj8J",
          coc: "heefNOdrbv8",
          dsde: "tM23pYi3TSZ",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "tQprfffyj8J",
          coc: "uUEBV4BoDXD",
          dsde: "tM23pYi3TSZ",
          cellProps: tableCellStyles.value,
        },
      ],
    ],
    []
  );

  return (
    <Box className="ehsp-baseline-survey-tab">
      <Table id="ehsp-baseline-survey-table-1">
        <TableHead>
          <TableRow>
            {headerTable6.map((header) => (
              <TableCell className="cell-header-table">{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={tableConfigs6} />
        </TableBody>
      </Table>
    </Box>
  );
};

export default Tab6;
