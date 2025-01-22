import TotalCell from "../../common/TotalCell";
import TbCaseFindingTable from "../components/TbCaseFindingTable";

const testedMapping = [
  [0, 2],
  [1, 3],
];

const TbHivCases = () => {
  return (
    <TbCaseFindingTable
      headerTitle="TB_HIV_cases"
      dataElementConfigs={dataElementConfigs}
    />
  );
};

const addTotalConfigs = (deConfigs) =>
  deConfigs.map((item) => {
    if (item.find((col) => col.dsde)) {
      const listCellHaveDsde = item
        .filter(
          (col, colIndex) => col.dsde && colIndex !== item.length - 1 && col
        )
        .map((col) => `${col.dsde}-${col.coc}`);
      return [
        ...item.slice(0, item.length - 3),
        ...item.slice(item.length - 3, item.length - 1).map((col, colIndex) => {
          const listData = testedMapping[colIndex].map((testedIndex) => {
            return listCellHaveDsde.find(
              (cell, cellIndex) => cellIndex === testedIndex && cell
            );
          });
          return { ...col, customCell: <TotalCell listData={listData} /> };
        }),
        ...item.slice(item.length - 1),
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
      text: "total_screen_for_hiv",
      style: { ...headerStyle, width: "12%" },
      cellProps: { rowSpan: 2 },
    },
    {
      display: "text",
      text: "Before_testing_HIV",
      style: headerStyle,
      cellProps: { colSpan: 2 },
    },
    {
      display: "text",
      text: "After_testing_HIV",
      style: headerStyle,
      cellProps: { colSpan: 2 },
    },
    {
      display: "text",
      text: "Total",
      style: headerStyle,
      cellProps: { colSpan: 2 },
    },
    {
      display: "text",
      text: "cpt",
      style: { ...headerStyle, width: "12%" },
      cellProps: { rowSpan: 2 },
    },
  ],
  [
    { display: "text", text: "Negative", style: headerStyle },
    { display: "text", text: "Positive", style: headerStyle },
    { display: "text", text: "Negative", style: headerStyle },
    { display: "text", text: "Positive", style: headerStyle },
    { display: "text", text: "Negative", style: headerStyle },
    { display: "text", text: "Positive", style: headerStyle },
  ],
  [
    { display: "text", text: "TB_Cases", style: disableStyle },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "vyR1CsU1BuE" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "HOYM2uCqW8F" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "QbxU9kqyBQg" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "rwMvv66Vdy3" },
    { display: "text", text: "0", style: totalStyle },
    { display: "text", text: "0", style: totalStyle },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "UWFFsZQu2AM" },
  ],
]);

export default TbHivCases;
