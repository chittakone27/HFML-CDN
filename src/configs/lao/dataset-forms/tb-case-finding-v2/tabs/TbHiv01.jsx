import TbCaseFindingTable from "../components/TbCaseFindingTable";

const TbHiv01 = () => {
  return (
    <TbCaseFindingTable
      headerTitle="tb_hiv_01"
      dataElementConfigs={dataElementConfigs}
    />
  );
};

const headerStyle = {
  backgroundColor: "#3492ca",
  color: "#fff",
  width: "30%",
  textAlign: "center",
};

const disableStyle = {
  backgroundColor: "#ddd",
};

const totalStyle = { textAlign: "center" };

const dataElementConfigs = [
  [
    {
      display: "empty",
      style: { ...headerStyle, width: "40%" },
      cellProps: { colSpan: 2 },
    },
    { display: "text", text: "ຂຶ້ນທະບຽນ", style: headerStyle },
    { display: "text", text: "ໄດ້ຮັບ ART", style: headerStyle },
  ],
  [
    {
      display: "text",
      text: "ໃໝ່",
      style: disableStyle,
      cellProps: { rowSpan: 3 },
    },
    { display: "text", text: "Pb+", style: disableStyle },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "uLTx5PGOz6f" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "hJg2lJvnvFg" },
  ],
  [
    { display: "text", text: "Pb-", style: disableStyle },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "i5SiGO0dQNo" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "fZw7PiiYRa4" },
  ],
  [
    { display: "text", text: "EP", style: disableStyle },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "w7ZTCWYQi9C" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "z58z3fje76F" },
  ],
  [
    {
      display: "text",
      text: "ກັບຄືນເປັນອີກ",
      style: disableStyle,
      cellProps: { rowSpan: 3 },
    },
    { display: "text", text: "Pb+", style: disableStyle },
    { cc: "qkwEmwnwmCk", coc: "iKGbK3dtjnc", dsde: "r6PkPbLMp43" },
    { cc: "qkwEmwnwmCk", coc: "iKGbK3dtjnc", dsde: "xjqEWKWom2r" },
  ],
  [
    { display: "text", text: "Pb-", style: disableStyle },
    { cc: "qkwEmwnwmCk", coc: "NFEIpwf4uMk", dsde: "r6PkPbLMp43" },
    { cc: "qkwEmwnwmCk", coc: "NFEIpwf4uMk", dsde: "xjqEWKWom2r" },
  ],
  [
    { display: "text", text: "EP", style: disableStyle },
    { cc: "qkwEmwnwmCk", coc: "KiIF4CTr8ko", dsde: "r6PkPbLMp43" },
    { cc: "qkwEmwnwmCk", coc: "KiIF4CTr8ko", dsde: "xjqEWKWom2r" },
  ],
  [
    {
      display: "text",
      text: "ລົ້ມເຫຼວ",
      style: disableStyle,
      cellProps: { rowSpan: 3 },
    },
    { display: "text", text: "Pb+", style: disableStyle },
    { cc: "qkwEmwnwmCk", coc: "iKGbK3dtjnc", dsde: "a2l9gmP6yeL" },
    { cc: "qkwEmwnwmCk", coc: "iKGbK3dtjnc", dsde: "jp4r1h7ko33" },
  ],
  [
    { display: "text", text: "Pb-", style: disableStyle },
    { cc: "qkwEmwnwmCk", coc: "NFEIpwf4uMk", dsde: "a2l9gmP6yeL" },
    { cc: "qkwEmwnwmCk", coc: "NFEIpwf4uMk", dsde: "jp4r1h7ko33" },
  ],
  [
    { display: "text", text: "EP", style: disableStyle },
    { cc: "qkwEmwnwmCk", coc: "KiIF4CTr8ko", dsde: "a2l9gmP6yeL" },
    { cc: "qkwEmwnwmCk", coc: "KiIF4CTr8ko", dsde: "jp4r1h7ko33" },
  ],
  [
    {
      display: "text",
      text: "ກັບມາໃໝ່ຫຼັງຫາຍຕົວ",
      style: disableStyle,
      cellProps: { rowSpan: 3 },
    },
    { display: "text", text: "Pb+", style: disableStyle },
    { cc: "qkwEmwnwmCk", coc: "iKGbK3dtjnc", dsde: "UQepjKLDzmn" },
    { cc: "qkwEmwnwmCk", coc: "iKGbK3dtjnc", dsde: "xL41988GdI7" },
  ],
  [
    { display: "text", text: "Pb-", style: disableStyle },
    { cc: "qkwEmwnwmCk", coc: "NFEIpwf4uMk", dsde: "UQepjKLDzmn" },
    { cc: "qkwEmwnwmCk", coc: "NFEIpwf4uMk", dsde: "xL41988GdI7" },
  ],
  [
    { display: "text", text: "EP", style: disableStyle },
    { cc: "qkwEmwnwmCk", coc: "KiIF4CTr8ko", dsde: "UQepjKLDzmn" },
    { cc: "qkwEmwnwmCk", coc: "KiIF4CTr8ko", dsde: "xL41988GdI7" },
  ],
  [
    {
      display: "text",
      text: "ອື່ນໆ",
      style: disableStyle,
      cellProps: { rowSpan: 3 },
    },
    { display: "text", text: "Pb+", style: disableStyle },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "mbQdFNIjWiH" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "E6CvXA241cV" },
  ],
  [
    { display: "text", text: "Pb-", style: disableStyle },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "yiRXK47C3fX" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "Rd9y6739RdG" },
  ],
  [
    { display: "text", text: "EP", style: disableStyle },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "CBX1WkTqvnu" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "fZhMxLNmAQ8" },
  ],
];

export default TbHiv01;
