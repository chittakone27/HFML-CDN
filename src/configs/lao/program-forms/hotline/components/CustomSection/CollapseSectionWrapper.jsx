import { useState } from "react";
import { Typography, Box, Collapse } from "@mui/material";

import CollapseButton from "../../../common/CollapseButton";
import { useTranslation } from "react-i18next";

const CollapseSectionWrapper = ({ headerTitle, children, isOpen, ...props }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(isOpen);

  return (
    <Box className="hotline-section-container" sx={{ margin: 0 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          "& svg": {
            color: "#363f4d"
          }
        }}
        className="hotline-section-title"
        onClick={() => setOpen(!open)}
      >
        <Typography>{t(headerTitle)}</Typography>
        <CollapseButton open={open} />
      </Box>
      <Collapse in={open}>
        <Box {...props}> {children}</Box>
      </Collapse>
    </Box>
  );
};

export default CollapseSectionWrapper;
