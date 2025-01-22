import { Typography } from "@mui/material";
import useSelectionStore from "@/state/selection";
import { useTranslation } from "react-i18next";

const EventDateLabel = () => {
  const program = useSelectionStore((state) => state.program);
  const { t } = useTranslation();
  return (
    <Typography variant="inputFieldLabel">
      {program.programStages[0].displayExecutionDateLabel
        ? program.programStages[0].displayExecutionDateLabel
        : program.programStages[0].executionDateLabel
        ? program.programStages[0].executionDateLabel
        : t("eventDate")}
      <Typography variant="mandatoryStar">&nbsp;&lowast;</Typography>
    </Typography>
  );
};

export default EventDateLabel;
