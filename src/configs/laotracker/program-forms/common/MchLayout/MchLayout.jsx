import Layout1 from "@/ui/TrackerCapture/Layouts/Layout1";
import Layout2 from "@/ui/TrackerCapture/Layouts/Layout2";
import TrackerProfile from "@/ui/TrackerCapture/Profile/Profile";
import Deliveries from "../../delivery-registry/Deliveries";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import useSelectionStore from "@/state/selection";
import "./MchLayout.css";

const MchLayout = () => {
  const { layout, trackerCaptureActions } = useTrackerCaptureStore(
    useShallow((state) => ({
      layout: state.layout,
      trackerCaptureActions: state.actions
    }))
  );
  const { setLayout } = trackerCaptureActions;
  const { program } = useSelectionStore(
    useShallow((state) => ({
      program: state.program
    }))
  );

  const returnEventForm = () => {
    if (program) {
      if (program.id === "AyPkCOMmgdd") {
        return <Deliveries />;
      } else {
        return null;
      }
    }
  };

  const returnLayout = () => {
    switch (layout.layout) {
      case "layout1":
        return <Layout1 />;
      case "layout2":
        return <Layout2 />;
      case "layout3":
        if (layout.hideProfile) {
          return <div className="mch-layout-events-full">{returnEventForm()}</div>;
        } else {
          return [
            <div className="mch-layout-events">{returnEventForm()}</div>,
            <div className="mch-layout-profilee">
              <TrackerProfile />
            </div>
          ];
        }
      default:
        break;
    }
  };

  const handleSetLayout = () => {
    setLayout("hideProfile", !layout.hideProfile);
  };

  const icon = layout.hideProfile ? faArrowLeft : faArrowRight;
  const color = layout.hideProfile ? "#363f4d" : "#ffffff";
  return (
    <div className="mch-layout-container">
      {layout.layout === "layout3" && (
        <div className="mch-layout-layout-button">
          <IconButton variant="contained" onClick={handleSetLayout}>
            <FontAwesomeIcon icon={icon} style={{ color }} />
          </IconButton>
        </div>
      )}
      {returnLayout()}
    </div>
  );
};

export default MchLayout;
