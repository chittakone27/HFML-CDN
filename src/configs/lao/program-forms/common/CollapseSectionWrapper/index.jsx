import { useState } from "react";
import { Typography, Box, Collapse, styled } from "@mui/material";

import CollapseButton from "../CollapseButton";
import { useTranslation } from "react-i18next";

const StyledWrapper = styled(Box)(() => ({
  border: "1px solid rgba(224, 224, 224, 1)",
  margin: 0,
}));

const CollapseSectionWrapper = ({ headerTitle, children, ...props }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <StyledWrapper {...props}>
      <Box
        sx={{
          backgroundColor: "rgb(44, 102, 147)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          padding: "2px 12px",
        }}
        onClick={() => setOpen(!open)}
        className="collapse-header-wrapper"
      >
        <Typography className="strong-text" sx={{ color: "#fff" }}>
          {t(headerTitle)}
        </Typography>
        <CollapseButton open={open} />
      </Box>
      <Collapse in={open}>
        <Box className="collapse-children-wrapper">{children}</Box>
      </Collapse>
    </StyledWrapper>
  );
};

export default CollapseSectionWrapper;
