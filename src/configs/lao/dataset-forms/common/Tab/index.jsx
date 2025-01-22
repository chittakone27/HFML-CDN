import { Box, styled, Tab, Tabs, colors } from "@mui/material";

export const StyledTab = styled(Tab)(() => ({
  color: "#fff",
  borderRadius: "4px 4px 0 0",
  backgroundColor: "rgba(224,224,224,0.1)",
  marginRight: 4,
  marginTop: 4,
  "&.Mui-selected": {
    backgroundColor: "#fff",
  },
}));

export const StyledTabs = styled(Tabs)(() => ({
  border: "1.5px solid #fff",
  backgroundColor: "#0277BD",
  padding: "6px 4px 0 6px",
  borderRadius: "8px 8px 0 0",
  minHeight: 0,
  "& button": {
    padding: 10,
    whiteSpace: "nowrap",
    maxWidth: "none",
    minHeight: 0,
    "& .MuiTouchRipple-root": {
      minHeight: "none",
    },
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .MuiTabs-scrollButtons": {
    color: "#fff",
  },
  "& .MuiTabs-flexContainer": {
    display: "flex",
    flexWrap: "wrap",
  },
}));

export const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <Box hidden={value !== index} sx={{ p: 1, width: 1 }} {...other}>
      <Box sx={{ width: 1, overflowX: "auto" }}>{children}</Box>
    </Box>
  );
};
