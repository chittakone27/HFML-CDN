import { useTranslation } from "react-i18next";

const Event = ({ title }) => {
  const { t } = useTranslation();
  return (
    <div className="chr-tracker-event-container">
      <div>
        <div className="chr-tracker-event-title">{title ? title : t("eventForm")}</div>
        <div className="chr-tracker-section-content"></div>
        <div className="chr-tracker-section-buttons chr-tracker-event-buttons">asdasd</div>
      </div>
    </div>
  );
};
export default Event;
