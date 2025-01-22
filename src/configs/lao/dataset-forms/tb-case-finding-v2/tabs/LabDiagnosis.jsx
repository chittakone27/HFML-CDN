import TotalCell from "../../common/TotalCell";
import TbCaseFindingTable from "../components/TbCaseFindingTable";

const LabDiagnosis = () => {
  return (
    <TbCaseFindingTable
      headerTitle="Microscopy_Testing"
      dataElementConfigs={dataElementConfigs}
      minWidth={1700}
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

const dataElementConfigs = addTotalConfigs([
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
    { display: "text", text: "Total_presumptive_TB", style: disableStyle },
    { cc: "WiAFXrXhzno", coc: "srmvl44ELKL", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "QOSOHuRCGAf", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "iRLpzFSIhan", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "P3rRvLVSh1p", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "cncWTcouJHy", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "rPxqIZdvH7I", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "hSzNI9krTJM", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "hVGm58EFKmy", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "Ki7ZmQYQVfi", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "uuylW84OwvP", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "tfFImjkphvc", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "gcpampLY3BP", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "B8cLvyj5ZOb", dsde: "O9BTmjhggwk" },
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
    { cc: "WiAFXrXhzno", coc: "iRLpzFSIhan", dsde: "kQXyBx4PoSy" },
    { cc: "WiAFXrXhzno", coc: "P3rRvLVSh1p", dsde: "kQXyBx4PoSy" },
    { cc: "WiAFXrXhzno", coc: "cncWTcouJHy", dsde: "kQXyBx4PoSy" },
    { cc: "WiAFXrXhzno", coc: "rPxqIZdvH7I", dsde: "kQXyBx4PoSy" },
    { cc: "WiAFXrXhzno", coc: "hSzNI9krTJM", dsde: "kQXyBx4PoSy" },
    { cc: "WiAFXrXhzno", coc: "hVGm58EFKmy", dsde: "kQXyBx4PoSy" },
    { cc: "WiAFXrXhzno", coc: "Ki7ZmQYQVfi", dsde: "kQXyBx4PoSy" },
    { cc: "WiAFXrXhzno", coc: "uuylW84OwvP", dsde: "kQXyBx4PoSy" },
    { cc: "WiAFXrXhzno", coc: "tfFImjkphvc", dsde: "kQXyBx4PoSy" },
    { cc: "WiAFXrXhzno", coc: "gcpampLY3BP", dsde: "kQXyBx4PoSy" },
    { cc: "WiAFXrXhzno", coc: "B8cLvyj5ZOb", dsde: "kQXyBx4PoSy" },
    { cc: "WiAFXrXhzno", coc: "vXNYN0N8Swx", dsde: "kQXyBx4PoSy" },
    { cc: "WiAFXrXhzno", coc: "mFjckULrbYa", dsde: "kQXyBx4PoSy" },
    { display: "empty", style: disableStyle },
    { display: "text", text: "0", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "Smear_Positive",
      style: disableStyle,
    },
    { cc: "WiAFXrXhzno", coc: "srmvl44ELKL", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "QOSOHuRCGAf", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "iRLpzFSIhan", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "P3rRvLVSh1p", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "cncWTcouJHy", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "rPxqIZdvH7I", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "hSzNI9krTJM", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "hVGm58EFKmy", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "Ki7ZmQYQVfi", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "uuylW84OwvP", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "tfFImjkphvc", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "gcpampLY3BP", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "B8cLvyj5ZOb", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "vXNYN0N8Swx", dsde: "Xope2HgYv5D" },
    { cc: "WiAFXrXhzno", coc: "mFjckULrbYa", dsde: "Xope2HgYv5D" },
    { display: "empty", style: disableStyle },
    { display: "text", text: "0", style: totalStyle },
  ],
  [
    { display: "text", text: "presumptive_genxpert", style: disableStyle },
    { cc: "WiAFXrXhzno", coc: "srmvl44ELKL", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "QOSOHuRCGAf", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "iRLpzFSIhan", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "P3rRvLVSh1p", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "cncWTcouJHy", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "rPxqIZdvH7I", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "hSzNI9krTJM", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "hVGm58EFKmy", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "Ki7ZmQYQVfi", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "uuylW84OwvP", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "tfFImjkphvc", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "gcpampLY3BP", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "B8cLvyj5ZOb", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "vXNYN0N8Swx", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "mFjckULrbYa", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "ViKcp6fXevh", dsde: "Hqraj0OmfHw" },
    { display: "text", text: "0", style: totalStyle },
  ],
  [
    { display: "text", text: "GeneXpert_Positive", style: disableStyle },
    { cc: "WiAFXrXhzno", coc: "srmvl44ELKL", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "QOSOHuRCGAf", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "iRLpzFSIhan", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "P3rRvLVSh1p", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "cncWTcouJHy", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "rPxqIZdvH7I", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "hSzNI9krTJM", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "hVGm58EFKmy", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "Ki7ZmQYQVfi", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "uuylW84OwvP", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "tfFImjkphvc", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "gcpampLY3BP", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "B8cLvyj5ZOb", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "vXNYN0N8Swx", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "mFjckULrbYa", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "ViKcp6fXevh", dsde: "a073Znqpq9o" },
    { display: "text", text: "0", style: totalStyle },
  ],
]);

export default LabDiagnosis;
