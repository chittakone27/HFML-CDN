import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { Button } from "@mui/material";

const CollapseButton = ({ open }, ref) => {
  return (
    <Button
      sx={{
        color: "#fff",
        padding: 0,
        "& .MuiSvgIcon-root": {
          fontSize: 22,
          width: "100%",
          height: "30px",
        },
      }}
    >
      {open ? <ExpandLess /> : <ExpandMore />}
    </Button>
  );
};

export default CollapseButton;
