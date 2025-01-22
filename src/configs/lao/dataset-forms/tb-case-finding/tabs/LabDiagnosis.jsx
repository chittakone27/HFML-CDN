import TotalCell from "../../common/TotalCell";
import TbCaseFindingTable from "../components/TbCaseFindingTable";

const LabDiagnosis = () => {
  return (
    <TbCaseFindingTable
      headerTitle="Microscopy_Testing"
      dataElementConfigs={dataElementConfigs}
      minWidth={1500}
    />
  );
};

const addTotalConfigs = (deConfigs) =>
  deConfigs.map((item) => {
    if (item.find((col) => col.dsde)) {
      const listData = item
        .filter((col) => col.dsde && col)
        .map((col) => `${col.dsde}-${col.coc}`);
      return [
        ...item.slice(0, item.length - 1),
        {
          ...item.slice(item.length - 1)[0],
          customCell: <TotalCell listData={listData} />,
        },
      ];
    }
    return item;
  });

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

const dataElementConfigs = addTotalConfigs([
  [
    {
      display: "text",
      text: "screened_by",
      style: { ...headerStyle, width: "12%" },
    },
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
    {
      display: "text",
      text: "Total_presumptive_TB",
      style: disableStyle,
    },
    { cc: "WiAFXrXhzno", coc: "srmvl44ELKL", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "QOSOHuRCGAf", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "P3rRvLVSh1p", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "cncWTcouJHy", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "rPxqIZdvH7I", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "hSzNI9krTJM", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "yPxsUxHMDsr", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "vXNYN0N8Swx", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "mFjckULrbYa", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "ViKcp6fXevh", dsde: "O9BTmjhggwk" },
    { display: "text", text: "0", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "Presumptive_tested_by_microscopy",
      style: disableStyle,
    },
    { cc: "WiAFXrXhzno", coc: "srmvl44ELKL", dsde: "kQXyBx4PoSy" },
    { cc: "WiAFXrXhzno", coc: "QOSOHuRCGAf", dsde: "kQXyBx4PoSy" },
    { cc: "WiAFXrXhzno", coc: "P3rRvLVSh1p", dsde: "kQXyBx4PoSy" },
    { cc: "WiAFXrXhzno", coc: "cncWTcouJHy", dsde: "kQXyBx4PoSy" },
    { cc: "WiAFXrXhzno", coc: "rPxqIZdvH7I", dsde: "kQXyBx4PoSy" },
    { cc: "WiAFXrXhzno", coc: "hSzNI9krTJM", dsde: "kQXyBx4PoSy" },
    { cc: "WiAFXrXhzno", coc: "yPxsUxHMDsr", dsde: "kQXyBx4PoSy" },
    { cc: "WiAFXrXhzno", coc: "vXNYN0N8Swx", dsde: "kQXyBx4PoSy" },
    { cc: "WiAFXrXhzno", coc: "mFjckULrbYa", dsde: "kQXyBx4PoSy" },
    { display: "empty", style: disableStyle },
    { display: "text", text: "0", style: totalStyle },
  ],
  [
    { display: "text", text: "Smear_Positive", style: disableStyle },
    { cc: "WiAFXrXhzno", coc: "srmvl44ELKL", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "QOSOHuRCGAf", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "P3rRvLVSh1p", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "cncWTcouJHy", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "rPxqIZdvH7I", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "hSzNI9krTJM", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "yPxsUxHMDsr", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "vXNYN0N8Swx", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "mFjckULrbYa", dsde: "Xope2HgYv5D" },
    { display: "empty", style: disableStyle },
    { display: "text", text: "0", style: totalStyle },
  ],
  [
    { display: "text", text: "presumptive_genxpert", style: disableStyle },
    { cc: "WiAFXrXhzno", coc: "srmvl44ELKL", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "QOSOHuRCGAf", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "P3rRvLVSh1p", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "cncWTcouJHy", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "rPxqIZdvH7I", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "hSzNI9krTJM", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "yPxsUxHMDsr", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "vXNYN0N8Swx", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "mFjckULrbYa", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "ViKcp6fXevh", dsde: "Hqraj0OmfHw" },
    { display: "text", text: "0", style: totalStyle },
  ],
  [
    { display: "text", text: "GeneXpert_Positive", style: disableStyle },
    { cc: "WiAFXrXhzno", coc: "srmvl44ELKL", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "QOSOHuRCGAf", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "P3rRvLVSh1p", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "cncWTcouJHy", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "rPxqIZdvH7I", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "hSzNI9krTJM", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "yPxsUxHMDsr", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "vXNYN0N8Swx", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "mFjckULrbYa", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "ViKcp6fXevh", dsde: "a073Znqpq9o" },
    { display: "text", text: "0", style: totalStyle },
  ],
]);

export default LabDiagnosis;
