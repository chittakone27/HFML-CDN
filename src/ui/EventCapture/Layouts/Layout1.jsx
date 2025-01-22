import List from "../List/List";
import Indicators from "../Indicators/Indicators";
import FilterButton from "./FilterButton";
import SortButton from "./SortButton";
import DownloadButton from "./DownloadButton";
import "./Layout1.css";
import useSelectionStore from "@/state/selection";
import useEventCaptureStore from "@/state/eventCapture";
//LAYOUT 1: INDICATORS ON THE LEFT, EVENT LIST ON THE RIGHT

const Layout1 = () => {
  const program = useSelectionStore((state) => state.program);
  const { indicatorsLoading, listLoading } = useEventCaptureStore((state) => state.layout);

  // return program.periodType ? (
  //   <div className="event-capture-layout1-container">
  //     <div>
  //       <Indicators loading={indicatorsLoading} />
  //     </div>
  //     <div>
  //       <List loading={listLoading} buttons={[<FilterButton key="filterButton" />]} />
  //     </div>
  //   </div>
  // ) : (
  //   <div className="event-capture-layout1-no-period-type-container">
  //     <div>
  //       <List loading={listLoading} buttons={[<FilterButton key="filterButton" />]} />
  //     </div>
  //   </div>
  // );

  return (
    <div className="event-capture-layout1-no-period-type-container">
      <div>
        <List
          loading={listLoading}
          buttons={[
            <DownloadButton key="downloadButton" />,
            //  <SortButton key="sortButton" />,
            <FilterButton key="filterButton" />
          ]}
        />
      </div>
    </div>
  );
};

export default Layout1;
