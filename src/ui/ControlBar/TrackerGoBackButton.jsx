import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import withPadding from "@/hocs/withPadding";
import useTrackerCaptureStore from "@/state/trackerCapture";

const TrackerGoBackButton = ({ disabled }) => {
  const { setLayout, resetState } = useTrackerCaptureStore(
    (state) => state.actions
  );
  const { t, i18n } = useTranslation();

  return (
    <Button
      disabled={disabled}
      variant="contained"
      onClick={() => {
        setLayout("layout", "layout1");
        resetState();
      }}
    >
      {t("goBack")}
    </Button>
  );
};

export default withPadding(TrackerGoBackButton);
