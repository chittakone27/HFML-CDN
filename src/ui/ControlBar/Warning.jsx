import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import withPadding from "@/hocs/withPadding";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
const Warning = () => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t("eventCompletenessWarning")}>
      <IconButton color="warning" variant="outlined" onClick={() => {}}>
        <FontAwesomeIcon icon={faTriangleExclamation} />
      </IconButton>
    </Tooltip>
  );
};

export default withPadding(Warning);
