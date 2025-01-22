import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import withPadding from "@/hocs/withPadding";
import useCompleteness from "./hooks/useCompleteness";

const CompleteButton = ({ disabled }) => {
  const { t } = useTranslation();
  const { completeness, complete } = useCompleteness();
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    await complete();
    setLoading(false);
  };

  return (
    <LoadingButton loading={loading} disabled={disabled} variant="contained" onClick={handleComplete} color={completeness ? "secondary" : "success"}>
      {t(completeness ? "controlBarIncomplete" : "controlBarComplete")}
    </LoadingButton>
  );
};

export default withPadding(CompleteButton);
