import { IconButton, Tooltip } from "@mui/material";
import { Close, ArrowLeft } from "@mui/icons-material";
import Form from "../Form/Form";
import "./Layout3.css";
import useEventCaptureStore from "@/state/eventCapture";
import { shallow } from "zustand/shallow";
import { useTranslation } from "react-i18next";

const Layout3 = () => {
  const { t } = useTranslation();
  const { actions, layout } = useEventCaptureStore((state) => ({ actions: state.actions, layout: state.layout }), shallow);
  const { close, setLayout } = actions;
  const { formLoading } = layout;
  return (
    <div className="event-capture-layout3-container">
      <Form
        loading={formLoading}
        buttons={[
          <Tooltip title={t("close")} placement="bottom">
            <IconButton key="closeButton" size="small" onClick={close}>
              <Close />
            </IconButton>
          </Tooltip>,
          <Tooltip title={t("collapse")} placement="bottom">
            <IconButton
              key="expandCollapseButton"
              size="small"
              onClick={() => {
                setLayout("layout", "layout2");
              }}
            >
              <ArrowLeft />
            </IconButton>
          </Tooltip>
        ]}
      />
    </div>
  );
};

export default Layout3;
