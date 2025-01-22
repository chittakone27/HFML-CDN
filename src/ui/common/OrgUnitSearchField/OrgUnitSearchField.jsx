import { Box, IconButton, InputAdornment, List, ListItemButton, ListItemIcon, ListItemText, OutlinedInput, Popper } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchRounded from "@mui/icons-material/SearchRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import zIndex from "@mui/material/styles/zIndex";

const OrgUnitSearchField = ({ orgUnits, onCheck, checked }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [query, setQuery] = useState("");
  const openPopper = Boolean(anchorEl);
  const popperId = openPopper ? "search-field" : undefined;

  const filtered = orgUnits.filter((ou) => query && ou.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <Box sx={{ px: 1, pt: 1 }} aria-describedby={popperId}>
      <OutlinedInput
        fullWidth
        value={query}
        onChange={(e) => {
          if (e.target.value) {
            setAnchorEl(e.currentTarget.parentElement);
          } else {
            setAnchorEl(null);
          }

          setQuery(e.target.value);
        }}
        size="small"
        placeholder={t("search")}
        onFocus={(e) => {
          setAnchorEl(e.currentTarget.parentElement);
        }}
        startAdornment={
          <InputAdornment position="start">
            <SearchRounded />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setQuery("");
                setAnchorEl(null);
              }}
            >
              <CloseRounded />
            </IconButton>
          </InputAdornment>
        }
      />
      {filtered.length > 0 && (
        <Popper sx={{ zIndex: zIndex.tooltip }} id={popperId} open={openPopper} anchorEl={anchorEl} placement="bottom-start">
          <Box sx={{ p: 1, bgcolor: "background.paper", width: "calc(500px - 8px)", height: "500px", overflowY: "auto" }}>
            <List dense>
              {filtered.map((ou) => (
                <ListItemButton
                  onClick={() => {
                    onCheck(ou);
                    setAnchorEl(null);
                  }}
                >
                  <ListItemIcon className="rct-checkbox" sx={{ minWidth: "30px" }}>
                    <FontAwesomeIcon icon={checked[0] === ou.value ? faSquareCheck : faSquare} fontSize={18} />
                  </ListItemIcon>
                  <ListItemText primary={ou.label} sx={{ "& .MuiTypography-root": { fontSize: "16px" } }} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Popper>
      )}
    </Box>
  );
};

export default OrgUnitSearchField;
