import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import withPadding from "@/hocs/withPadding";
import useEventCaptureStore from "@/state/eventCapture";

const NewEventButton = ({ disabled }) => {
  const { register } = useEventCaptureStore((state) => state.actions);
  const { t, i18n } = useTranslation();

  return (
    <Button
      disabled={disabled}
      variant="contained"
      onClick={() => {
        register();
      }}
    >
      {t("newEvent")}
    </Button>
  );
};

export default withPadding(NewEventButton);
