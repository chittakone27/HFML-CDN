import TbCaseFindingTable from "../components/TbCaseFindingTable";
import TotalCell from "../../common/TotalCell";

const genderMapping = [
  [0, 2, 4, 6, 8, 10, 12, 14],
  [1, 3, 5, 7, 9, 11, 13, 15],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
];

const AgeAndSex = () => {
  return (
    <TbCaseFindingTable
      headerTitle="Age_and_Sex_distribution"
      dataElementConfigs={dataElementConfigs}
      minWidth={1800}
    />
  );
};

const addTotalConfigs = (deConfigs) =>
  deConfigs.map((item) => {
    if (item.find((col) => col.dsde)) {
      const listCellHaveDsde = item
        .filter((col) => col.dsde && col)
        .map((col) => `${col.dsde}-${col.coc}`);
      return [
        ...item.slice(0, item.length - 3),
        ...item.slice(item.length - 3).map((col, colIndex) => {
          const listData = genderMapping[colIndex].map((genderIndex) => {
            return listCellHaveDsde.find(
              (cell, cellIndex) => cellIndex === genderIndex && cell
            );
          });
          return { ...col, customCell: <TotalCell listData={listData} /> };
        }),
      ];
    }
    return item;
  });

const headerStyle = {
  backgroundColor: "#3492ca",
  color: "#fff",
  textAlign: "center",
};

const headerStyle5 = {
  ...headerStyle,
  width: "5%",
};

const disableStyle = {
  backgroundColor: "#ddd",
};

const totalStyle = { textAlign: "center" };

const dataElementConfigs = addTotalConfigs([
  [
    { display: "empty", cellProps: { rowSpan: 2 }, style: headerStyle },
    {
      display: "empty",
      cellProps: { rowSpan: 2 },
      style: { ...headerStyle, width: "4%" },
    },
    {
      display: "text",
      text: "0-4",
      cellProps: { colSpan: 2 },
      style: headerStyle,
    },
    {
      display: "text",
      text: "5-14",
      cellProps: { colSpan: 2 },
      style: headerStyle,
    },
    {
      display: "text",
      text: "15-24",
      cellProps: { colSpan: 2 },
      style: headerStyle,
    },
    {
      display: "text",
      text: "25-34",
      cellProps: { colSpan: 2 },
      style: headerStyle,
    },
    {
      display: "text",
      text: "35-44",
      cellProps: { colSpan: 2 },
      style: headerStyle,
    },
    {
      display: "text",
      text: "45-54",
      cellProps: { colSpan: 2 },
      style: headerStyle,
    },
    {
      display: "text",
      text: "55-64",
      cellProps: { colSpan: 2 },
      style: headerStyle,
    },
    {
      display: "text",
      text: "65+",
      cellProps: { colSpan: 2 },
      style: headerStyle,
    },
    {
      display: "text",
      text: "Total",
      cellProps: { colSpan: 3, style: headerStyle },
    },
  ],
  [
    { display: "text", text: "M", style: headerStyle5 },
    { display: "text", text: "F", style: headerStyle5 },
    { display: "text", text: "M", style: headerStyle5 },
    { display: "text", text: "F", style: headerStyle5 },
    { display: "text", text: "M", style: headerStyle5 },
    { display: "text", text: "F", style: headerStyle5 },
    { display: "text", text: "M", style: headerStyle5 },
    { display: "text", text: "F", style: headerStyle5 },
    { display: "text", text: "M", style: headerStyle5 },
    { display: "text", text: "F", style: headerStyle5 },
    { display: "text", text: "M", style: headerStyle5 },
    { display: "text", text: "F", style: headerStyle5 },
    { display: "text", text: "M", style: headerStyle5 },
    { display: "text", text: "F", style: headerStyle5 },
    { display: "text", text: "M", style: headerStyle5 },
    { display: "text", text: "F", style: headerStyle5 },
    { display: "text", text: "M", style: { ...headerStyle, width: "4%" } },
    { display: "text", text: "F", style: { ...headerStyle, width: "4%" } },
    { display: "text", text: "Total", style: { ...headerStyle, width: "4%" } },
  ],
  [
    {
      display: "text",
      text: "Ps+",
      style: disableStyle,
      cellProps: { rowSpan: 2 },
    },
    { display: "text", text: "New", style: disableStyle },
    { cc: "ckxRGNs40fd", coc: "AgafVnOtXKU", dsde: "Y3Bg0M73Ory" },
    { cc: "ckxRGNs40fd", coc: "eu1dtsJlNvJ", dsde: "Y3Bg0M73Ory" },
    { cc: "ckxRGNs40fd", coc: "V8lpbM1LzJx", dsde: "Y3Bg0M73Ory" },
    { cc: "ckxRGNs40fd", coc: "QkFz5Tuyb6F", dsde: "Y3Bg0M73Ory" },
    { cc: "ckxRGNs40fd", coc: "zM8GaAsSbJu", dsde: "Y3Bg0M73Ory" },
    { cc: "ckxRGNs40fd", coc: "XWsYvU3zr5j", dsde: "Y3Bg0M73Ory" },
    { cc: "ckxRGNs40fd", coc: "s6zxoJd0DIT", dsde: "Y3Bg0M73Ory" },
    { cc: "ckxRGNs40fd", coc: "xbieHWHYq0z", dsde: "Y3Bg0M73Ory" },
    { cc: "ckxRGNs40fd", coc: "NMGdsuXzAvs", dsde: "Y3Bg0M73Ory" },
    { cc: "ckxRGNs40fd", coc: "K9NAXxdWuCO", dsde: "Y3Bg0M73Ory" },
    { cc: "ckxRGNs40fd", coc: "X3vtKLEjiMf", dsde: "Y3Bg0M73Ory" },
    { cc: "ckxRGNs40fd", coc: "wHWPjwOaihG", dsde: "Y3Bg0M73Ory" },
    { cc: "ckxRGNs40fd", coc: "mJi5EzVBpyg", dsde: "Y3Bg0M73Ory" },
    { cc: "ckxRGNs40fd", coc: "Xmwhod6AQDH", dsde: "Y3Bg0M73Ory" },
    { cc: "ckxRGNs40fd", coc: "tQMBC03b8YF", dsde: "Y3Bg0M73Ory" },
    { cc: "ckxRGNs40fd", coc: "pjz3OYB5BKV", dsde: "Y3Bg0M73Ory" },
    { display: "text", text: "0", style: totalStyle },
    { display: "text", text: "0", style: totalStyle },
    { display: "text", text: "0", style: totalStyle },
  ],
  [
    { display: "text", text: "Relapsed", style: disableStyle },
    { cc: "ckxRGNs40fd", coc: "AgafVnOtXKU", dsde: "sru5FbtLlQZ" },
    { cc: "ckxRGNs40fd", coc: "eu1dtsJlNvJ", dsde: "sru5FbtLlQZ" },
    { cc: "ckxRGNs40fd", coc: "V8lpbM1LzJx", dsde: "sru5FbtLlQZ" },
    { cc: "ckxRGNs40fd", coc: "QkFz5Tuyb6F", dsde: "sru5FbtLlQZ" },
    { cc: "ckxRGNs40fd", coc: "zM8GaAsSbJu", dsde: "sru5FbtLlQZ" },
    { cc: "ckxRGNs40fd", coc: "XWsYvU3zr5j", dsde: "sru5FbtLlQZ" },
    { cc: "ckxRGNs40fd", coc: "s6zxoJd0DIT", dsde: "sru5FbtLlQZ" },
    { cc: "ckxRGNs40fd", coc: "xbieHWHYq0z", dsde: "sru5FbtLlQZ" },
    { cc: "ckxRGNs40fd", coc: "NMGdsuXzAvs", dsde: "sru5FbtLlQZ" },
    { cc: "ckxRGNs40fd", coc: "K9NAXxdWuCO", dsde: "sru5FbtLlQZ" },
    { cc: "ckxRGNs40fd", coc: "X3vtKLEjiMf", dsde: "sru5FbtLlQZ" },
    { cc: "ckxRGNs40fd", coc: "wHWPjwOaihG", dsde: "sru5FbtLlQZ" },
    { cc: "ckxRGNs40fd", coc: "mJi5EzVBpyg", dsde: "sru5FbtLlQZ" },
    { cc: "ckxRGNs40fd", coc: "Xmwhod6AQDH", dsde: "sru5FbtLlQZ" },
    { cc: "ckxRGNs40fd", coc: "tQMBC03b8YF", dsde: "sru5FbtLlQZ" },
    { cc: "ckxRGNs40fd", coc: "pjz3OYB5BKV", dsde: "sru5FbtLlQZ" },
    { display: "text", text: "0", style: totalStyle },
    { display: "text", text: "0", style: totalStyle },
    { display: "text", text: "0", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "Ps-b+",
      style: disableStyle,
      cellProps: { colSpan: 2 },
    },
    { cc: "ckxRGNs40fd", coc: "AgafVnOtXKU", dsde: "OHY9yESeQoj" },
    { cc: "ckxRGNs40fd", coc: "eu1dtsJlNvJ", dsde: "OHY9yESeQoj" },
    { cc: "ckxRGNs40fd", coc: "V8lpbM1LzJx", dsde: "OHY9yESeQoj" },
    { cc: "ckxRGNs40fd", coc: "QkFz5Tuyb6F", dsde: "OHY9yESeQoj" },
    { cc: "ckxRGNs40fd", coc: "zM8GaAsSbJu", dsde: "OHY9yESeQoj" },
    { cc: "ckxRGNs40fd", coc: "XWsYvU3zr5j", dsde: "OHY9yESeQoj" },
    { cc: "ckxRGNs40fd", coc: "s6zxoJd0DIT", dsde: "OHY9yESeQoj" },
    { cc: "ckxRGNs40fd", coc: "xbieHWHYq0z", dsde: "OHY9yESeQoj" },
    { cc: "ckxRGNs40fd", coc: "NMGdsuXzAvs", dsde: "OHY9yESeQoj" },
    { cc: "ckxRGNs40fd", coc: "K9NAXxdWuCO", dsde: "OHY9yESeQoj" },
    { cc: "ckxRGNs40fd", coc: "X3vtKLEjiMf", dsde: "OHY9yESeQoj" },
    { cc: "ckxRGNs40fd", coc: "wHWPjwOaihG", dsde: "OHY9yESeQoj" },
    { cc: "ckxRGNs40fd", coc: "mJi5EzVBpyg", dsde: "OHY9yESeQoj" },
    { cc: "ckxRGNs40fd", coc: "Xmwhod6AQDH", dsde: "OHY9yESeQoj" },
    { cc: "ckxRGNs40fd", coc: "tQMBC03b8YF", dsde: "OHY9yESeQoj" },
    { cc: "ckxRGNs40fd", coc: "pjz3OYB5BKV", dsde: "OHY9yESeQoj" },
    { display: "text", text: "0", style: totalStyle },
    { display: "text", text: "0", style: totalStyle },
    { display: "text", text: "0", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "Ps-b-",
      style: disableStyle,
      cellProps: { colSpan: 2 },
    },
    { cc: "ckxRGNs40fd", coc: "AgafVnOtXKU", dsde: "mNaOLbD9Vqq" },
    { cc: "ckxRGNs40fd", coc: "eu1dtsJlNvJ", dsde: "mNaOLbD9Vqq" },
    { cc: "ckxRGNs40fd", coc: "V8lpbM1LzJx", dsde: "mNaOLbD9Vqq" },
    { cc: "ckxRGNs40fd", coc: "QkFz5Tuyb6F", dsde: "mNaOLbD9Vqq" },
    { cc: "ckxRGNs40fd", coc: "zM8GaAsSbJu", dsde: "mNaOLbD9Vqq" },
    { cc: "ckxRGNs40fd", coc: "XWsYvU3zr5j", dsde: "mNaOLbD9Vqq" },
    { cc: "ckxRGNs40fd", coc: "s6zxoJd0DIT", dsde: "mNaOLbD9Vqq" },
    { cc: "ckxRGNs40fd", coc: "xbieHWHYq0z", dsde: "mNaOLbD9Vqq" },
    { cc: "ckxRGNs40fd", coc: "NMGdsuXzAvs", dsde: "mNaOLbD9Vqq" },
    { cc: "ckxRGNs40fd", coc: "K9NAXxdWuCO", dsde: "mNaOLbD9Vqq" },
    { cc: "ckxRGNs40fd", coc: "X3vtKLEjiMf", dsde: "mNaOLbD9Vqq" },
    { cc: "ckxRGNs40fd", coc: "wHWPjwOaihG", dsde: "mNaOLbD9Vqq" },
    { cc: "ckxRGNs40fd", coc: "mJi5EzVBpyg", dsde: "mNaOLbD9Vqq" },
    { cc: "ckxRGNs40fd", coc: "Xmwhod6AQDH", dsde: "mNaOLbD9Vqq" },
    { cc: "ckxRGNs40fd", coc: "tQMBC03b8YF", dsde: "mNaOLbD9Vqq" },
    { cc: "ckxRGNs40fd", coc: "pjz3OYB5BKV", dsde: "mNaOLbD9Vqq" },
    { display: "text", text: "0", style: totalStyle },
    { display: "text", text: "0", style: totalStyle },
    { display: "text", text: "0", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "EP",
      style: disableStyle,
      cellProps: { colSpan: 2 },
    },
    { cc: "ckxRGNs40fd", coc: "AgafVnOtXKU", dsde: "l5VzphG0LWF" },
    { cc: "ckxRGNs40fd", coc: "eu1dtsJlNvJ", dsde: "l5VzphG0LWF" },
    { cc: "ckxRGNs40fd", coc: "V8lpbM1LzJx", dsde: "l5VzphG0LWF" },
    { cc: "ckxRGNs40fd", coc: "QkFz5Tuyb6F", dsde: "l5VzphG0LWF" },
    { cc: "ckxRGNs40fd", coc: "zM8GaAsSbJu", dsde: "l5VzphG0LWF" },
    { cc: "ckxRGNs40fd", coc: "XWsYvU3zr5j", dsde: "l5VzphG0LWF" },
    { cc: "ckxRGNs40fd", coc: "s6zxoJd0DIT", dsde: "l5VzphG0LWF" },
    { cc: "ckxRGNs40fd", coc: "xbieHWHYq0z", dsde: "l5VzphG0LWF" },
    { cc: "ckxRGNs40fd", coc: "NMGdsuXzAvs", dsde: "l5VzphG0LWF" },
    { cc: "ckxRGNs40fd", coc: "K9NAXxdWuCO", dsde: "l5VzphG0LWF" },
    { cc: "ckxRGNs40fd", coc: "X3vtKLEjiMf", dsde: "l5VzphG0LWF" },
    { cc: "ckxRGNs40fd", coc: "wHWPjwOaihG", dsde: "l5VzphG0LWF" },
    { cc: "ckxRGNs40fd", coc: "mJi5EzVBpyg", dsde: "l5VzphG0LWF" },
    { cc: "ckxRGNs40fd", coc: "Xmwhod6AQDH", dsde: "l5VzphG0LWF" },
    { cc: "ckxRGNs40fd", coc: "tQMBC03b8YF", dsde: "l5VzphG0LWF" },
    { cc: "ckxRGNs40fd", coc: "pjz3OYB5BKV", dsde: "l5VzphG0LWF" },
    { display: "text", text: "0", style: totalStyle },
    { display: "text", text: "0", style: totalStyle },
    { display: "text", text: "0", style: totalStyle },
  ],
]);

export default AgeAndSex;
