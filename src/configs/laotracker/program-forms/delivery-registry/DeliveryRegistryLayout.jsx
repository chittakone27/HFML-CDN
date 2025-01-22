import { useEffect } from "react";
import Layout1 from "@/ui/TrackerCapture/Layouts/Layout1";
import List from "@/ui/TrackerCapture/List/List";
import Profile from "./Profile";
import Stage from "./Stage";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import "./DeliveryRegistryLayout.css";

const DeliveryRegistryLayout = () => {
  const { layout, data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      layout: state.layout,
      actions: state.actions,
      data: state.data,
    }))
  );
  const { currentEvents } = data;

  useEffect(() => {
    try {
      if (layout.layout === "layout3") {
        const foundEvent = currentEvents.find(
          (ce) => ce.programStage === "YOHVx1Xmpgr"
        );
        if (foundEvent) {
          actions.selectProgramStage("YOHVx1Xmpgr");
          actions.selectEvent(foundEvent.event);
        } else {
          actions.initNewEvent("YOHVx1Xmpgr");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [layout.layout]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {(() => {
        switch (layout.layout) {
          case "layout1":
            return <Layout1 />;
          case "layout2":
            return (
              <div className="delivery-registry-layout2">
                <Profile />
              </div>
            );
          case "layout3":
            return (
              <div className="delivery-registry-layout3">
                <div>
                  <Stage />
                </div>
                <div>
                  <Profile />
                </div>
              </div>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default DeliveryRegistryLayout;
