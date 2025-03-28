import Layout1 from "./Layout1";
import Layout2 from "./Layout2";
import Layout3 from "./Layout3";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import "./ChrTrackerLayout.css";

const ChrTrackerLayout = () => {
  const { layout } = useTrackerCaptureStore(
    useShallow((state) => ({
      layout: state.layout
    }))
  );
  return (
    <div className="chr-tracker-layout">
      {layout.layout === "layout1" && <Layout1 />}
      {layout.layout === "layout2" && <Layout2 />}
      {layout.layout === "layout3" && <Layout3 />}
    </div>
  );
};

export default ChrTrackerLayout;
