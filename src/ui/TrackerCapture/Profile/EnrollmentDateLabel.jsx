import { Typography } from "@mui/material";
import useSelectionStore from "@/state/selection";
import { pickEnrollmentDateLabel } from "@/utils/utils";
import { useTranslation } from "react-i18next";

const EnrollmentDateLabel = ({ label }) => {
  const { t } = useTranslation();
  const program = useSelectionStore((state) => state.program);
  const currentLabel = label ? label : pickEnrollmentDateLabel(program, t);
  return (
    <span>
      <strong>{currentLabel}</strong>
      <Typography variant="mandatoryStar">&nbsp;&lowast;</Typography>
    </span>
  );
};

export default EnrollmentDateLabel;
