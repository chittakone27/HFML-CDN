import TotalCell from "../../common/TotalCell";
import TbCaseFindingTable from "../components/TbCaseFindingTable";

const GeneXpertTesting = () => {
  return (
    <TbCaseFindingTable
      headerTitle="GeneXpert_Testing"
      dataElementConfigs={dataElementConfigs}
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
        ...item.slice(0, 1),
        {
          ...item.slice(1, 2)[0],
          customCell: <TotalCell listData={listData} />,
        },
        ...item.slice(2, item.length),
      ];
    }
    return item;
  });

const headerStyle = {
  backgroundColor: "#3492ca",
  width: "12%",
  color: "#fff",
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
      text: "suspected",
      cellProps: { rowSpan: 2 },
      style: { ...headerStyle, width: "16%" },
    },
    {
      display: "text",
      text: "Total_Checked_Case",
      cellProps: { rowSpan: 2 },
      style: headerStyle,
    },
    {
      display: "text",
      text: "Result",
      cellProps: { colSpan: 6 },
      style: headerStyle,
    },
  ],
  [
    { display: "text", text: "T", style: headerStyle },
    { display: "text", text: "RR", style: headerStyle },
    { display: "text", text: "TI", style: headerStyle },
    { display: "text", text: "N", style: headerStyle },
    { display: "text", text: "I", style: headerStyle },
    { display: "text", text: "TT", style: headerStyle },
  ],
  [
    { display: "text", text: "Tuber", style: disableStyle },
    { display: "text", text: "0", style: totalStyle },
    { cc: "cR8hmqC15RL", coc: "eCIZb34KI9i", dsde: "mXYcr3mHxyN" },
    { cc: "cR8hmqC15RL", coc: "zchVl22y90l", dsde: "mXYcr3mHxyN" },
    { cc: "cR8hmqC15RL", coc: "CpeJurlAxQU", dsde: "mXYcr3mHxyN" },
    { cc: "cR8hmqC15RL", coc: "z5i7IcMj0uq", dsde: "mXYcr3mHxyN" },
    { cc: "cR8hmqC15RL", coc: "L1CfihPJjJa", dsde: "mXYcr3mHxyN" },
    { cc: "cR8hmqC15RL", coc: "GCh8Kw5Zklo", dsde: "mXYcr3mHxyN" },
  ],
  [
    { display: "text", text: "Tuber_Anti_Drug", style: disableStyle },
    { display: "text", text: "0", style: totalStyle },
    { cc: "cR8hmqC15RL", coc: "eCIZb34KI9i", dsde: "fSofolK9xSk" },
    { cc: "cR8hmqC15RL", coc: "zchVl22y90l", dsde: "fSofolK9xSk" },
    { cc: "cR8hmqC15RL", coc: "CpeJurlAxQU", dsde: "fSofolK9xSk" },
    { cc: "cR8hmqC15RL", coc: "z5i7IcMj0uq", dsde: "fSofolK9xSk" },
    { cc: "cR8hmqC15RL", coc: "L1CfihPJjJa", dsde: "fSofolK9xSk" },
    { cc: "cR8hmqC15RL", coc: "GCh8Kw5Zklo", dsde: "fSofolK9xSk" },
  ],
]);

export default GeneXpertTesting;
