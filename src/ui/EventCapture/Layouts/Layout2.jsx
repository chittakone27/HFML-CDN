import { IconButton, Tooltip } from "@mui/material";
import { Close, ArrowRight } from "@mui/icons-material";
import Form from "../Form/Form";
import List from "../List/List";
import FilterButton from "./FilterButton";
import SortButton from "./SortButton";
import DownloadButton from "./DownloadButton";
import useSelectionStore from "@/state/selection";
import useEventCaptureStore from "@/state/eventCapture";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import "./Layout2.css";

//LAYOUT 2:
//ON THE LEFT: FORM
//ON THE RIGHT: TOP: EVENT LIST, BOTTOM: INDICATORS

const Layout2 = () => {
  const { t } = useTranslation();
  const { program } = useSelectionStore((state) => ({ program: state.program }));
  const { actions, layout } = useEventCaptureStore((state) => ({ actions: state.actions, layout: state.layout }), shallow);
  const { close, setLayout } = actions;
  const { indicatorsLoading, listLoading, formLoading } = layout;
  // return (
  //   <div className="event-capture-layout2-container">
  //     <div>
  //       <Form
  //         loading={formLoading}
  //         buttons={[
  //           <Tooltip title={t("close")} placement="bottom" key={0}>
  //             <IconButton
  //               key="closeButton"
  //               size="small"
  //               onClick={() => {
  //                 close();
  //               }}
  //             >
  //               <Close />
  //             </IconButton>
  //           </Tooltip>,
  //           <Tooltip title={t("expand")} placement="bottom" key={1}>
  //             <IconButton
  //               key="expandCollapseButton"
  //               size="small"
  //               onClick={() => {
  //                 setLayout("layout", "layout3");
  //               }}
  //             >
  //               <ArrowRight />
  //             </IconButton>
  //           </Tooltip>
  //         ]}
  //       />
  //     </div>
  //     {program.periodType ? (
  //       <div>
  //         <div>
  //           <List loading={listLoading} buttons={[<FilterButton key="filterButton" />]} />
  //         </div>
  //         <div>
  //           <Indicators loading={indicatorsLoading} />
  //         </div>
  //       </div>
  //     ) : (
  //       <div className="event-capture-layout2-no-period-type-container">
  //         <div>
  //           <List loading={listLoading} buttons={[<FilterButton key="filterButton" />]} />
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
  return (
    <div className="event-capture-layout2-container">
      <div>
        <Form
          loading={formLoading}
          buttons={[
            <Tooltip title={t("close")} placement="bottom" key={0}>
              <IconButton
                key="closeButton"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                <Close />
              </IconButton>
            </Tooltip>,
            <Tooltip title={t("expand")} placement="bottom" key={1}>
              <IconButton
                key="expandCollapseButton"
                size="small"
                onClick={() => {
                  setLayout("layout", "layout3");
                }}
              >
                <ArrowRight />
              </IconButton>
            </Tooltip>
          ]}
        />
      </div>
      <div className="event-capture-layout2-no-period-type-container">
        <div>
          <List
            loading={listLoading}
            buttons={[
              <DownloadButton key="downloadButton" />,
              // <SortButton key="sortButton" />,
              <FilterButton key="filterButton" />
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout2;
