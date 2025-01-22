import { Box, Popover, Typography } from "@mui/material";
import { hr } from "date-fns/locale";
import { useTranslation } from "react-i18next";

const CustomPopup = ({ anchorEl, setAnchorEl, content }) => {
  const { t } = useTranslation();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Popover
      sx={{
        "& > .MuiPopover-paper": {
          backgroundColor: "#FFEB3B",
          padding: "20px",
          maxWidth: "500px",
          maxHeight: "300px",
        },
      }}
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      {listHeaders.map((header, index) => {
        return (
          <>
            <Box sx={{ fontWeight: "700" }}>{t(header)}:</Box>
            {content && (
              <Box
                dangerouslySetInnerHTML={{
                  __html: Object.values(content)[index],
                }}
              />
            )}
            {index < 2 && <hr />}
          </>
        );
      })}
    </Popover>
  );
};

export default CustomPopup;

const listHeaders = ["dataElement", "definition", "source"];
