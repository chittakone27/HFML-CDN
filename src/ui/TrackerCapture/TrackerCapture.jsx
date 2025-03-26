import useTrackerCaptureStore from "@/state/trackerCapture";
import Layout1 from "./Layouts/Layout1";
import Layout2 from "./Layouts/Layout2";
import Layout3 from "./Layouts/Layout3";
import "./TrackerCapture.css";
import { shallow } from "zustand/shallow";
import useSelectionStore from "@/state/selection";
import { useEffect } from "react";
import configs from "@/configs";
const { VITE_CONFIG_NAME } = import.meta.env;
const { customTrackerLayout } = configs[VITE_CONFIG_NAME];
const TrackerCapture = () => {
  const { layout, actions } = useTrackerCaptureStore((state) => ({ layout: state.layout, actions: state.actions }), shallow);
  const { program, orgUnit } = useSelectionStore((state) => ({ program: state.program, orgUnit: state.orgUnit }), shallow);
  const { setLayout } = actions;
  let CustomTrackerLayout;
  if (program && program.id && customTrackerLayout && customTrackerLayout[program.id]) {
    CustomTrackerLayout = customTrackerLayout[program.id];
  }
  useEffect(() => {
    setLayout("layout", "layout1");
  }, [program.id, orgUnit.id]);

  useEffect(() => {
    if (!program.access.data.write) {
      disableEverything(true);
    } else {
      disableEverything(false);
    }
  }, [layout.layout]);

  const disableEverything = (value) => {
    setTimeout(() => {
      setLayout("disableEventEditButton", value);
      setLayout("disableEventCompleteButton", value);
      setLayout("disableEventCreateButton", value);
      setLayout("disableEventDeleteButton", value);
      setLayout("disableProfileEditButton", value);
      setLayout("hideProfileDeleteButton", value);
    }, 500);
  };

  const renderLayout = () => {
    if (CustomTrackerLayout) {
      return <CustomTrackerLayout />;
    } else {
      return [layout.layout === "layout1" && <Layout1 />, layout.layout === "layout2" && <Layout2 />, layout.layout === "layout3" && <Layout3 />];
    }
  };

  return <div className="tracker-capture-container">{renderLayout()}</div>;
};

export default TrackerCapture;
