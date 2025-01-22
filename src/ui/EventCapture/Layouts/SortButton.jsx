import { IconButton, Tooltip } from "@mui/material";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useEventCaptureStore from "@/state/eventCapture";
import { useTranslation } from "react-i18next";

const SortButton = () => {
  const { t } = useTranslation();
  const { sort } = useEventCaptureStore((state) => ({
    sort: state.sort
  }));
  const { setSort } = useEventCaptureStore((state) => state.actions);
  const hightlight = sort.sorts ? sort.sorts.filter((s) => s.value !== "" && s.value !== null).length > 0 : false;
  return (
    <Tooltip title={t("sort")} placement="bottom">
      <IconButton
        color={hightlight ? "warning" : undefined}
        size="small"
        onClick={() => {
          setSort("dialog", true);
        }}
      >
        <div style={{ width: 22 }}>
          <FontAwesomeIcon icon={faSort} fontSize={20} />
        </div>
      </IconButton>
    </Tooltip>
  );
};

export default SortButton;
