import { Box, Table, TableBody, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import MapTable from "../../common/MapTable";
import TotalCell from "../../common/TotalCell";

const listDataMapping = [
  [1, 6],
  [2, 7],
  [3, 8],
  [4, 9],
  [5, 10],
];

const PostTest = () => {
  const { t } = useTranslation();

  const dataElementConfigsEWithTotal = dataElementConfigsE.map((item) => {
    if (item.find((col) => col.dsde)) {
      return [
        ...item.slice(0, item.length - 5),
        ...item.slice(item.length - 5).map((col, colIndex) => {
          return {
            ...col,
            customCell: (
              <TotalCell
                listData={listDataMapping[colIndex]
                  .map((dataIndex) => {
                    const dataItem = item.slice(dataIndex, dataIndex + 1)[0];
                    if (dataItem.dsde) {
                      return `${dataItem.dsde}-${dataItem.coc}`;
                    }
                    return null;
                  })
                  .filter((dataIndex) => dataIndex)}
              />
            ),
          };
        }),
      ];
    }
    return item;
  });

  return (
    <Box id="family-planing-wrapper">
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          backgroundColor: "#0277BD",
          border: "1px solid #fff",
          padding: "8px 5px",
          color: "#fff",
          fontSize: 18,
          textAlign: "center",
        }}
      >
        {t("E_Family_Planing")}
      </Typography>

      <Table>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigsEWithTotal} />
        </TableBody>
      </Table>
    </Box>
  );
};

export default PostTest;

const disableCell = {
  backgroundColor: "#DDD !important",
};

const blueTitle = {
  backgroundColor: "#99ccff",
};

const blueContent = {
  textAlign: "left !important",
  backgroundColor: "#cae5ff",
};

const yorkGreenTitle = {
  backgroundColor: "#99cc99",
};

const yorkGreenCategory = {
  backgroundColor: "#b7dbb7",
};

const yorkGreenContent = {
  backgroundColor: "#e0efe0",
};

const pinkTitle = {
  backgroundColor: "#ebc7de",
};

const pinkCategory = {
  backgroundColor: "#efd2e4",
};

const pinkContent = {
  backgroundColor: "#efd2e4",
};

const brownTitle = {
  backgroundColor: "#b7704c",
};

const brownCategory = {
  backgroundColor: "#cc997f",
};

const brownContent = {
  backgroundColor: "#e0c1b2",
};

const dataElementConfigsE = [
  [
    {
      display: "empty",
      cellProps: { rowSpan: 2 },
      style: { ...blueTitle, width: "10%" },
    },
    {
      display: "text",
      text: "Outreach_",
      cellProps: { colSpan: 5 },
      style: { ...yorkGreenTitle, width: "30%" },
    },
    {
      display: "text",
      text: "CBD_and_VHV",
      cellProps: { colSpan: 5 },
      style: { ...pinkTitle, width: "30%" },
    },
    {
      display: "text",
      text: "Total_",
      cellProps: { colSpan: 5 },
      style: { ...brownTitle, width: "30%" },
    },
  ],
  [
    {
      display: "text",
      text: "Old_user_number_of_couple",
      style: yorkGreenCategory,
    },
    {
      display: "text",
      text: "New_user_number_of_couple",
      style: yorkGreenCategory,
    },
    {
      display: "text",
      text: "Number_of_continue_users",
      style: yorkGreenCategory,
    },
    {
      display: "text",
      text: "Total_number_distributed",
      style: yorkGreenCategory,
    },
    {
      display: "text",
      text: "Wastage_",
      style: yorkGreenCategory,
    },
    {
      display: "text",
      text: "Old_user_number_of_couple",
      style: pinkCategory,
    },
    {
      display: "text",
      text: "New_user_number_of_couple",
      style: pinkCategory,
    },
    {
      display: "text",
      text: "Number_of_continue_users",
      style: pinkCategory,
    },
    {
      display: "text",
      text: "Total_number_distributed",
      style: pinkCategory,
    },
    {
      display: "text",
      text: "Wastage_",
      style: pinkCategory,
    },
    {
      display: "text",
      text: "Old_user_number_of_couple",
      style: brownCategory,
    },
    {
      display: "text",
      text: "New_user_number_of_couple",
      style: brownCategory,
    },
    {
      display: "text",
      text: "Number_of_continue_users",
      style: brownCategory,
    },
    {
      display: "text",
      text: "Total_number_distributed",
      style: brownCategory,
    },
    {
      display: "text",
      text: "Wastage_",
      style: brownCategory,
    },
  ],
  [
    { display: "text", text: "Condoms_", style: blueContent },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "bM0YZOyAlMr",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "m2V4dUljQVq",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "xCa6R5GJHmZ",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "NQ1VY2fZLhp",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "MnAu1CNFhuD",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "VPbIDh5HeVc",
      style: pinkContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "whoq3P3gtyc",
      style: pinkContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "CSugsclfQYE",
      style: pinkContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "hUhFB4xWcnR",
      style: pinkContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "Bw5LhLbGlZ2",
      style: pinkContent,
    },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
  ],
  [
    { display: "text", text: "Single_Pill", style: blueContent },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "VPbIDh5HeVc",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "whoq3P3gtyc",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "CSugsclfQYE",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "hUhFB4xWcnR",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "Bw5LhLbGlZ2",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "VPbIDh5HeVc",
      style: pinkContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "whoq3P3gtyc",
      style: pinkContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "CSugsclfQYE",
      style: pinkContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "hUhFB4xWcnR",
      style: pinkContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "Bw5LhLbGlZ2",
      style: pinkContent,
    },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
  ],
  [
    { display: "text", text: "Combined_Pill", style: blueContent },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "sa8Ep87YPNv",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "kUIvo5is72S",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "a6pVsTaYm7v",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "MxuZzDqR47u",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "tAtyR4Q17E0",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "sa8Ep87YPNv",
      style: pinkContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "kUIvo5is72S",
      style: pinkContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "a6pVsTaYm7v",
      style: pinkContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "MxuZzDqR47u",
      style: pinkContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "tAtyR4Q17E0",
      style: pinkContent,
    },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
  ],
  [
    { display: "text", text: "Depose_Injectable", style: blueContent },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "bx2Imp5Yzuw",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "QFWbdLref5O",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "ayQp61TleuI",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "SCytLILeL3R",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "oRNIpuxO3rx",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "bx2Imp5Yzuw",
      style: pinkContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "QFWbdLref5O",
      style: pinkContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "ayQp61TleuI",
      style: pinkContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "SCytLILeL3R",
      style: pinkContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "oRNIpuxO3rx",
      style: pinkContent,
    },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
  ],
  [
    { display: "text", text: "IUD_", style: blueContent },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
  ],
  [
    { display: "text", text: "Implant_", style: blueContent },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
  ],
  [
    { display: "text", text: "Emergency_pill", style: blueContent },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "pMsIub38RRC",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "yRcuPIKofP7",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "gqAUUkPKvQQ",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "IjyThCvfkyd",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "ym41uKo2JHl",
      dsde: "rnDH004G59G",
      style: yorkGreenContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "pMsIub38RRC",
      style: pinkContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "yRcuPIKofP7",
      style: pinkContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "gqAUUkPKvQQ",
      style: pinkContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "IjyThCvfkyd",
      style: pinkContent,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "W0ELtxvwjdA",
      dsde: "rnDH004G59G",
      style: pinkContent,
    },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
  ],
  [
    { display: "text", text: "Female_Sterilization", style: blueContent },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: brownContent },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
  ],
  [
    { display: "text", text: "Male_Sterilization", style: blueContent },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: brownContent },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
    { display: "empty", style: disableCell },
  ],
];
