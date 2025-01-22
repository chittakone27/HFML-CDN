import TotalCell from "../../common/TotalCell";
import TbCaseFindingTable from "../components/TbCaseFindingTable";

const CasesRegisteredByFacility = () => {
  return (
    <TbCaseFindingTable
      headerTitle="All_Cases"
      dataElementConfigs={dataElementConfigs}
    />
  );
};

const headerStyle = {
  backgroundColor: "#3492ca",
  color: "#fff",
  width: "8%",
  textAlign: "center",
};

const disableStyle = {
  backgroundColor: "#ddd",
};

const totalStyle = { textAlign: "center" };

const dataElementConfigs = [
  [
    { display: "empty", style: { ...headerStyle, width: "12%" } },
    { display: "text", text: "Tuber", style: headerStyle },
    { display: "text", text: "HIV", style: headerStyle },
    { display: "text", text: "Children_Doctor", style: headerStyle },
    { display: "text", text: "Clinic_Private_Hospital", style: headerStyle },
    { display: "text", text: "Local_Health", style: headerStyle },
    { display: "text", text: "Jailed", style: headerStyle },
    { display: "text", text: "Community", style: headerStyle },
    { display: "text", text: "Closed_Person", style: headerStyle },
    { display: "text", text: "Others", style: headerStyle },
    { display: "text", text: "ACF", style: headerStyle },
    { display: "text", text: "Total", style: headerStyle },
  ],
  [
    { display: "text", text: "All_Cases1", style: disableStyle },
    { cc: "WiAFXrXhzno", coc: "srmvl44ELKL", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "QOSOHuRCGAf", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "P3rRvLVSh1p", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "cncWTcouJHy", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "rPxqIZdvH7I", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "hSzNI9krTJM", dsde: "JRSEpFRmLcl" },
    { cc: "WiAFXrXhzno", coc: "yPxsUxHMDsr", dsde: "JRSEpFRmLcl" },
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
            "JRSEpFRmLcl-P3rRvLVSh1p",
            "JRSEpFRmLcl-cncWTcouJHy",
            "JRSEpFRmLcl-rPxqIZdvH7I",
            "JRSEpFRmLcl-hSzNI9krTJM",
            "JRSEpFRmLcl-yPxsUxHMDsr",
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
