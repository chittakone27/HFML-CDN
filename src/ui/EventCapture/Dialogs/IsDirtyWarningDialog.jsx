import { Button, Alert, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useTranslation } from "react-i18next";
import useEventCaptureStore from "@/state/eventCapture";
import { shallow } from "zustand/shallow";

const IsDirtyWarningDialog = () => {
  const { t } = useTranslation();
  const { layout } = useEventCaptureStore(
    (state) => ({
      layout: state.layout
    }),
    shallow
  );
  const { setLayout } = useEventCaptureStore((state) => state.actions);
  const { isDirtyWarningDialog } = layout;

  const handleClose = (event, reason) => {
    if (["escapeKeyDown", "backdropClick"].includes(reason)) return;
    setLayout("isDirtyWarningDialog", false);
  };

  return (
    <Dialog open={isDirtyWarningDialog} onClose={handleClose}>
      <DialogTitle>{t("warning")}</DialogTitle>
      <DialogContent>
        <Alert severity="warning">{t("isDirtyWarning")}</Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus color="secondary" variant="contained">
          {t("ok")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default IsDirtyWarningDialog;
