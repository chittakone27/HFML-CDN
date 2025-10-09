import { Box, styled } from "@mui/material";

export const FieldRow = styled(Box)({
  width: "100%",
  display: "flex",
  borderBottom: "1px solid #c2c2c2",
  "&:has(div:empty)": { display: "none" },
  "&:last-child": { borderBottom: 0 },
  "&>div": {
    display: "flex",
    alignItems: "center",
    "&:empty": { display: "none" },
    "&:nth-of-type(1)": {
      padding: 10,
      width: 300,
    },
    "&:nth-of-type(2)": {
      padding: 10,
      paddingLeft: 0,
      flex: 1,
      "&>div": {
        width: "100%",
        paddingLeft: 20,
        borderLeft: "1px solid #c2c2c2",
      },
    },
  },
});
