import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import useCurrentEvent from "./useCurrentEvent";

const EventDateLabel = ({ type, label }) => {
  const { t } = useTranslation();
  const { currentEvent, currentProgramStage } = useCurrentEvent();
  let currentLabel = "";
  if (label) {
    currentLabel = label;
  } else {
    if (type === "dueDate") {
      currentLabel = currentProgramStage.dueDateLabel
        ? currentProgramStage.dueDateLabel
        : t("dueDate");
    } else {
      currentLabel = currentProgramStage.executionDateLabel;
    }
  }

  return (
    <div style={{ marginBottom: 3 }}>
      <Typography sx={{ fontWeight: "bold" }}>
        {currentLabel}
        {type === "eventDate" && (
          <Typography variant="mandatoryStar">&nbsp;&lowast;</Typography>
        )}
      </Typography>
    </div>
  );
};

export default EventDateLabel;
