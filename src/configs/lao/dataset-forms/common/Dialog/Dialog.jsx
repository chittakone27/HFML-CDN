import { Box, Dialog, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomDialog = ({ open, setOpen, children, title = "" }) => {
  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>
        {title}
        {setOpen ? (
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <Box
        className="dop-v3-dialog"
        sx={{ padding: "40px", width: "100%" }}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    </Dialog>
  );
};

export default CustomDialog;
