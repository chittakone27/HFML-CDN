import { Accordion as MuiAccordion, AccordionSummary, styled, AccordionDetails, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIosSharp";

const StyleAccordion = styled(MuiAccordion)({
  margin: 0,
  overflow: "hidden",
  borderRadius: "4px",
  border: "1px solid #c2c2c2",
  "&.Mui-expanded": { margin: 0 },
});

const Title = styled(AccordionSummary)({
  backgroundColor: grey[100],
  borderBottom: 0,
  minHeight: "auto",
  padding: "12px 10px",
  "&.Mui-expanded": { minHeight: "auto", borderBottom: "1px solid #c2c2c2" },
  "& .MuiAccordionSummary-content": {
    margin: 0,
    "&.Mui-expanded": {
      margin: 0,
    },
  },
});

const Content = styled(AccordionDetails)({
  padding: 0,
  "& table tr:last-child td": { borderBottom: 0 },
});

const Accordion = ({ children, title }) => {
  return (
    <StyleAccordion defaultExpanded elevation={0}>
      <Title expandIcon={<ArrowForwardIosIcon fontSize="small" sx={{ fontSize: "0.9rem" }} />}>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      </Title>
      <Content>{children}</Content>
    </StyleAccordion>
  );
};

export default Accordion;
