import Layout1 from "@/ui/TrackerCapture/Layouts-old/Layout1";
import Layout2 from "@/ui/TrackerCapture/Layouts-old/Layout2";
import Layout3 from "@/ui/TrackerCapture/Layouts-old/Layout3";
import useTrackerCaptureStore from "@/state/trackerCapture";
// import "./TbTransferLayout.css";

const ImamLayout = () => {
  const layout = useTrackerCaptureStore((state) => state.layout);
  return [layout.layout === "layout1" && <Layout1 />, layout.layout === "layout2" && <Layout2 />, layout.layout === "layout3" && <Layout3 />];
};

export default ImamLayout;
