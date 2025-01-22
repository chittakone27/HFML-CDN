import { IconButton, Tooltip } from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { shallow } from "zustand/shallow";

const FilterButton = () => {
  const { t } = useTranslation();
  const { filter, actions } = useTrackerCaptureStore(
    (state) => ({
      filter: state.filter,
      actions: state.actions
    }),
    shallow
  );
  const { setFilter } = actions;
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
        <FilterAlt />
      </IconButton>
    </Tooltip>
  );
};

export default FilterButton;
