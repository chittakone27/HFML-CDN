import { IconButton, Tooltip } from "@mui/material";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useEventCaptureStore from "@/state/eventCapture";
import { useTranslation } from "react-i18next";

const FilterButton = () => {
  const { t } = useTranslation();
  const { filter } = useEventCaptureStore((state) => ({
    filter: state.filter
  }));
  const { setFilter } = useEventCaptureStore((state) => state.actions);
  const hightlight = filter.filters ? filter.filters.filter((f) => f.value !== "").length > 0 : false;
  return (
    <Tooltip title={t("search")} placement="bottom">
      <IconButton
        color={hightlight ? "warning" : undefined}
        size="small"
        onClick={() => {
          setFilter("dialog", true);
        }}
      >
        <div style={{ width: 22 }}>
          <FontAwesomeIcon icon={faFilter} fontSize={20} />
        </div>
      </IconButton>
    </Tooltip>
  );
};

export default FilterButton;
