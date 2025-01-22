import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import useCurrentEvent from "./useCurrentEvent";
import { pickExecutionDateLabel, pickDueDateLabel } from "@/utils/utils";
const EventDateLabel = ({ type }) => {
  const { t } = useTranslation();
  const { currentProgramStage } = useCurrentEvent();
  let currentLabel = "";
  if (type === "eventDate") {
    currentLabel = pickExecutionDateLabel(currentProgramStage, t);
  } else {
    currentLabel = pickDueDateLabel(currentProgramStage, t);
  }

  return (
    <div style={{ marginBottom: 3 }}>
      <Typography sx={{ fontWeight: "bold" }}>
        {currentLabel}
        {type === "eventDate" && <Typography variant="mandatoryStar">&nbsp;&lowast;</Typography>}
      </Typography>
    </div>
  );
};

export default EventDateLabel;
