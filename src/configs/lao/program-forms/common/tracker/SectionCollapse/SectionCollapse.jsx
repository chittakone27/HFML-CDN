import { Box, Collapse, Typography, styled } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const TitleWrapper = styled(Box)(({ theme, disabledCollapse }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "10px",
  cursor: !disabledCollapse ? "pointer" : "auto",
  borderBottom: "1px solid #c2c2c2",
  backgroundColor: theme.palette.grey[100],
  "&.section-hide": {
    borderBottom: 0
  }
}));

const SectionWrapper = styled(Box)({
  borderRadius: 4,
  overflow: "hidden",
  border: "1px solid #c2c2c2",
  "& table tr:last-child td": {
    borderBottom: 0
  }
});

const SectionCollapse = ({
  children,
  title,
  titleStyling = { fontWeight: 500 },
  disabledCollapse,
  ...other
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);

  return (
    <SectionWrapper className="bordered" {...other}>
      <TitleWrapper
        onClick={() => {
          if (!disabledCollapse) setOpen(!open);
        }}
        disabledCollapse={disabledCollapse}
      >
        <Typography variant="body2" sx={titleStyling}>
          {t(title)}
        </Typography>
        {open
          ? !disabledCollapse && <ExpandLess style={{ fontSize: 22 }} />
          : !disabledCollapse && <ExpandMore style={{ fontSize: 22 }} />}
      </TitleWrapper>
      <Collapse in={open}>{children}</Collapse>
    </SectionWrapper>
  );
};

export default SectionCollapse;
