import { DialogActions, Dialog, Alert, AlertTitle, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./ErrorDialog.css";

const ErrorDialog = ({ error, handleClose }) => {
  const { t } = useTranslation();
  return (
    <Dialog open={true} fullWidth maxWidth="md">
      <div className="error-dialog-content-container">
        <div className="error-dialog-title">
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Something went wrong!! <br />
            Please save the error description below and contact the administrator.
          </Alert>
        </div>
        <div className="error-description-container">{error}</div>
      </div>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          {t("ok")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
