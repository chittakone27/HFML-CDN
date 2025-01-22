import Profile from "../Profile-old/Profile";
import EventForm from "../EventForm-old/EventForm";
import EventTabularForm from "../EventForm-old/EventTabularForm";
import EventTabStageForm from "../EventForm-old/EventTabStageForm";
import configs from "@/configs";
const { VITE_CONFIG_NAME } = import.meta.env;
import "./Layout3.css";
import useSelectionStore from "@/state/selection";

const Layout3 = () => {
  const { trackerFormTypes, customProfile } = configs[VITE_CONFIG_NAME];
  const program = useSelectionStore((state) => state.program);
  let isTabular = false;
  let isTabStage = false;

  if (trackerFormTypes[program.id]) {
    isTabular = trackerFormTypes[program.id].includes("tabular");
    isTabStage = trackerFormTypes[program.id].includes("tabStage");
  }
  const ProfileForm = customProfile ? customProfile[program.id] : null;

  const renderEventForm = () => {
    if (isTabular) {
      return <EventTabularForm />;
    } else if (isTabStage) {
      return <EventTabStageForm />;
    } else {
      return <EventForm />;
    }
  };

  return (
    <div className="tracker-capture-layout3-container-old">
      <div>{renderEventForm()}</div>
      <div>{ProfileForm ? <ProfileForm /> : <Profile />}</div>
    </div>
  );
};

export default Layout3;
