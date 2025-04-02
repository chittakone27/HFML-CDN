import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import useCurrentEvent from "./useCurrentEvent";
import { pickExecutionDateLabel, pickDueDateLabel } from "@/utils/utils";

const EventDateLabelNoState = ({ type, currentProgramStage }) => {
  const { t } = useTranslation();
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

export default EventDateLabelNoState;
