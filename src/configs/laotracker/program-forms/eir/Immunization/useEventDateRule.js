import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import { useTranslation } from "react-i18next";
import moment from "moment";

import useTrackerCaptureStore from "@/state/trackerCapture";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";

const useEventDateRule = () => {
  const { t } = useTranslation();
  const { data, actions, customState } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions,
      customState: state.customState,
    }))
  );
  const { isEirVillage } = customState;
  const { currentTei, currentEvents, selectedEvent } = data;
  const { setLayout, changeEventProperty } = actions;

  const currentEvent = currentEvents.find((ev) => ev.event === selectedEvent);
  const eventDate = currentEvent?.eventDate;

  const dob = currentTei.attributes.find((attr) => attr.attribute === "tQeFLjYbqzv")?.value;

  //clear event date if duplicate
  const eventDates = currentEvents.map((e) => ({ event: e.event, eventDate: e.eventDate }));
  useEffect(() => {
    if (eventDate) {
      const found = eventDates.find(
        (e) => e.event !== currentEvent.event && e.eventDate && moment(e.eventDate).format("YYYY-MM-DD") === moment(eventDate).format("YYYY-MM-DD")
      );
      if (found) {
        toast.error(t("duplicateEventDate"), { position: toast.POSITION.BOTTOM_RIGHT });
        changeEventProperty(currentEvent.event, "eventDate", "");
      }
    }
  }, [JSON.stringify(eventDates), eventDate]);

  useEffect(() => {
    if (!eventDate) setLayout("disableEventCompleteButton", true);
  }, [eventDate]);

  return { minDate: dob, disabled: isEirVillage ? true : false };
};

export default useEventDateRule;
