import TotalCell from "../../common/TotalCell";
import TbCaseFindingTable from "../components/TbCaseFindingTable";

const TBRegisteredCases = () => {
  return (
    <TbCaseFindingTable
      headerTitle="All_TB_Registered_Cases"
      dataElementConfigs={dataElementConfigs}
    />
  );
};

const addTotalConfigs = (deConfigs) =>
  deConfigs.map((item, index) => {
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
    if (index === deConfigs.length - 2) {
      const listData = deConfigs
        .filter((row) => row.find((col) => col.dsde))
        .map((row) =>
          row
            .filter((col, colIndex) => col.dsde && colIndex !== 6 && col)
            .map((col) => `${col.dsde}-${col.coc}`)
        )
        .flat();
      return [
        ...item.slice(0, 1),
        {
          ...item.slice(1, 2)[0],
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
    { display: "text", text: "tb_types", style: headerStyle },
    { display: "text", text: "New", style: headerStyle },
    { display: "text", text: "Relapsed", style: headerStyle },
    { display: "text", text: "Failed", style: headerStyle },
    { display: "text", text: "Relapsed_After_Cured", style: headerStyle },
    { display: "text", text: "Others", style: headerStyle },
    { display: "text", text: "Move_in", style: headerStyle },
    { display: "text", text: "Total", style: headerStyle },
  ],
  [
    { display: "empty", style: headerStyle },
    { display: "text", text: "111", style: headerStyle },
    { display: "text", text: "112", style: headerStyle },
    { display: "text", text: "113", style: headerStyle },
    { display: "text", text: "114", style: headerStyle },
    { display: "text", text: "115", style: headerStyle },
    { display: "text", text: "116", style: headerStyle },
    { display: "text", text: "117", style: headerStyle },
  ],
  [
    { display: "text", text: "Ps+", style: disableStyle },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "D6ZZJ6Qhbl2" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "C3GSXm7kbw5" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "vBMhjnp2GQ7" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "Qdi96o3Pdhx" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "ntTGL0XZrr5" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "N0k4TsTnZE1" },
    { display: "text", text: "0", style: totalStyle },
  ],
  [
    { display: "text", text: "Ps-b+", style: disableStyle },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "l50IUuchiDX" },
    {
      display: "text",
      text: "-",
      style: { ...disableStyle, ...totalStyle },
    },
    {
      display: "text",
      text: "-",
      style: { ...disableStyle, ...totalStyle },
    },
    {
      display: "text",
      text: "-",
      style: { ...disableStyle, ...totalStyle },
    },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "iiFJfTCHsCX" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "fD3y7vZjflz" },
    { display: "text", text: "0", style: totalStyle },
  ],
  [
    { display: "text", text: "Ps-b-", style: disableStyle },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "ZIbirAPUpc3" },
    {
      display: "text",
      text: "-",
      style: { ...disableStyle, ...totalStyle },
    },
    {
      display: "text",
      text: "-",
      style: { ...disableStyle, ...totalStyle },
    },
    {
      display: "text",
      text: "-",
      style: { ...disableStyle, ...totalStyle },
    },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "M7K28uR7Tca" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "DtXl45PK83h" },
    { display: "text", text: "0", style: totalStyle },
  ],
  [
    { display: "text", text: "EP", style: disableStyle },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "N46nRMzaZXD" },
    {
      display: "text",
      text: "-",
      style: { ...disableStyle, ...totalStyle },
    },
    {
      display: "text",
      text: "-",
      style: { ...disableStyle, ...totalStyle },
    },
    {
      display: "text",
      text: "-",
      style: { ...disableStyle, ...totalStyle },
    },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "nzkdSbL7FGP" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "myTC8hCX5dI" },
    { display: "text", text: "0", style: totalStyle },
  ],
  [
    { display: "empty", cellProps: { rowSpan: 2 } },
    {
      display: "text",
      text: "0",
      cellProps: { colSpan: 5 },
      style: totalStyle,
    },
    { display: "empty", cellProps: { rowSpan: 2 } },
    { display: "empty", cellProps: { rowSpan: 2 } },
  ],
  [
    {
      display: "text",
      text: "total_case_registered",
      cellProps: { colSpan: 5 },
      style: totalStyle,
    },
  ],
]);

export default TBRegisteredCases;
