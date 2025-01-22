import { useEffect, useState } from "react";
import Layout1 from "./Layouts/Layout1";
import Layout2 from "./Layouts/Layout2";
import Layout3 from "./Layouts/Layout3";
import IsDirtyWarningDialog from "./Dialogs/IsDirtyWarningDialog";
import { event, completeness } from "@/api";
import { shallow } from "zustand/shallow";
import useSelectionStore from "@/state/selection";
import useEventCaptureStore from "@/state/eventCapture";
import "./EventCapture.css";
import { useShallow } from "zustand/react/shallow";
const { getEvents } = event;
const { getCompleteness } = completeness;

const EventCapture = () => {
  const { layout, paging, filter, currentEvent } = useEventCaptureStore(
    useShallow((state) => ({
      currentEvent: state.currentEvent,
      layout: state.layout,
      paging: state.paging,
      filter: state.filter
    }))
  );
  const { setEvents, setPaging, setFilter, close, resetEventCaptureState, setLayout, fetchEvents } = useEventCaptureStore((state) => state.actions);
  const { program, orgUnit, period } = useSelectionStore(
    (state) => ({
      program: state.program,
      orgUnit: state.orgUnit,
      period: state.period
    }),
    shallow
  );

  const getEventList = async (page, filters) => {
    setLayout("listLoading", true);
    let result = await getEvents(program, orgUnit.id, page, period, filters);
    setEvents(result);
    setPaging("totalPages", result.metaData.pager.pageCount);
    setLayout("listLoading", false);
  };

  useEffect(() => {
    (async () => {
      setPaging("page", 1);
      setFilter("filters", []);
      fetchEvents();
    })();
  }, [program.id, orgUnit.id, period ? period.dhis2Period : null]);

  // useEffect(() => {
  //   (async () => {
  //     await getEventList(paging.page, filter.filters);
  //   })();
  // }, [paging.page]);

  // useEffect(() => {
  //   (async () => {
  //     await getEventList(paging.page, filter.filters);
  //   })();
  // }, [JSON.stringify(filter.filters)]);

  // useEffect(() => {
  //   (async () => {
  //     await getEventList(paging.page, filter.filters);
  //   })();
  // }, [paging.reload]);

  // useEffect(() => {
  //   if (program.periodType) {
  //     (async () => {
  //       let completenessResult = await getCompleteness(program.dataSet.id, orgUnit.id, period.dhis2Period);
  //       // action.setEventCaptureCompleteness(completenessResult);
  //     })();
  //   }
  // }, [program.id, orgUnit.id, period ? period.dhis2Period : null]);

  // console.log(currentEvent, layout);
  return (
    <div className="event-capture-container">
      <IsDirtyWarningDialog />
      {layout.layout === "layout1" && <Layout1 />}
      {layout.layout === "layout2" && <Layout2 />}
      {layout.layout === "layout3" && <Layout3 />}
    </div>
  );
};

export default EventCapture;
