import EventDateField from "@/ui/TrackerCapture/EventForm-old/EventDateField";
import EventDateLabel from "@/ui/TrackerCapture/EventForm-old/EventDateLabel";
import { useTranslation } from "react-i18next";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";

const withEventDate =
  (Component, label = "") =>
  (props) => {
    const { currentEvent } = useCurrentEvent();
    const { t } = useTranslation();

    return (
      <>
        <EventDateLabel type="eventDate" label={t(label)} />
        <EventDateField type="eventDate" />
        {currentEvent.eventDate && <Component {...props} />}
      </>
    );
  };

export default withEventDate;
