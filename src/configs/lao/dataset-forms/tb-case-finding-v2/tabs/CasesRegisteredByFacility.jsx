import TotalCell from "../../common/TotalCell";
import TbCaseFindingTable from "../components/TbCaseFindingTable";

const CasesRegisteredByFacility = () => {
  return (
    <TbCaseFindingTable
      headerTitle="All_Cases"
      dataElementConfigs={dataElementConfigs}
      minWidth={1500}
    />
  );
};

const headerStyle = {
  backgroundColor: "#3492ca",
  color: "#fff",
  width: "5%",
  textAlign: "center",
};

const disableStyle = {
  backgroundColor: "#ddd",
};

const totalStyle = { textAlign: "center" };

const dataElementConfigs = [
  [
    {
      display: "text",
      text: "screened_by",
      style: { ...headerStyle, width: "12%" },
      cellProps: { rowSpan: 2 },
    },
    {
      display: "text",
      text: "Tuber",
      style: headerStyle,
      cellProps: { rowSpan: 2 },
    },
    {
      display: "text",
      text: "HIV",
      style: headerStyle,
      cellProps: { rowSpan: 2 },
    },
    {
      display: "text",
      text: "OPDIPD",
      style: headerStyle,
      cellProps: { rowSpan: 2 },
    },
    {
      display: "text",
      text: "Children_Doctor",
      style: headerStyle,
      cellProps: { rowSpan: 2 },
    },
    {
      display: "text",
      text: "Clinic_Private_Hospital",
      style: headerStyle,
      cellProps: { rowSpan: 2 },
    },
    {
      display: "text",
      text: "Local_Health",
      style: headerStyle,
      cellProps: { rowSpan: 2 },
    },
    {
      display: "text",
      text: "Jailed",
      style: headerStyle,
      cellProps: { rowSpan: 2 },
    },
    {
      display: "text",
      text: "Community",
      style: headerStyle,
      cellProps: { colSpan: 6 },
    },
    {
      display: "text",
      text: "Closed_Person",
      style: headerStyle,
      cellProps: { rowSpan: 2 },
    },
    {
      display: "text",
      text: "Others",
      style: headerStyle,
      cellProps: { rowSpan: 2 },
    },
    {
      display: "text",
      text: "ACF",
      style: headerStyle,
      cellProps: { rowSpan: 2 },
    },
    {
      display: "text",
      text: "Total",
      style: { ...headerStyle, width: "2%" },
      cellProps: { rowSpan: 2 },
    },
  ],
  [
    { display: "text", text: "HPP", style: headerStyle },
    { display: "text", text: "PSI", style: headerStyle },
    { display: "text", text: "PEDA", style: headerStyle },
    { display: "text", text: "LaoPHA", style: headerStyle },
    {
      display: "text",
      text: "Laoyouth",
      style: headerStyle,
    },
    { display: "text", text: "VHV", style: headerStyle },
  ],
  [
    { display: "text", text: "All_Cases1", style: disableStyle },
    { cc: "WiAFXrXhzno", coc: "srmvl44ELKL", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "QOSOHuRCGAf", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "iRLpzFSIhan", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "P3rRvLVSh1p", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "cncWTcouJHy", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "rPxqIZdvH7I", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "hSzNI9krTJM", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "hVGm58EFKmy", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "Ki7ZmQYQVfi", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "uuylW84OwvP", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "tfFImjkphvc", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "gcpampLY3BP", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "B8cLvyj5ZOb", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "vXNYN0N8Swx", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "mFjckULrbYa", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "ViKcp6fXevh", dsde: "JRSEpFRmLcl" },
    {
      display: "text",
      text: "0",
      style: totalStyle,
      customCell: (
        <TotalCell
          listData={[
            "JRSEpFRmLcl-srmvl44ELKL",
            "JRSEpFRmLcl-QOSOHuRCGAf",
            "JRSEpFRmLcl-iRLpzFSIhan",
            "JRSEpFRmLcl-P3rRvLVSh1p",
            "JRSEpFRmLcl-cncWTcouJHy",
            "JRSEpFRmLcl-rPxqIZdvH7I",
            "JRSEpFRmLcl-hSzNI9krTJM",
            "JRSEpFRmLcl-hVGm58EFKmy",
            "JRSEpFRmLcl-Ki7ZmQYQVfi",
            "JRSEpFRmLcl-uuylW84OwvP",
            "JRSEpFRmLcl-tfFImjkphvc",
            "JRSEpFRmLcl-gcpampLY3BP",
            "JRSEpFRmLcl-B8cLvyj5ZOb",
            "JRSEpFRmLcl-vXNYN0N8Swx",
            "JRSEpFRmLcl-mFjckULrbYa",
            "JRSEpFRmLcl-ViKcp6fXevh",
          ]}
        />
      ),
    },
  ],
];

export default CasesRegisteredByFacility;
