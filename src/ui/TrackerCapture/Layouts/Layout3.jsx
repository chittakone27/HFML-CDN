import Profile from "../Profile/Profile";
import FormContainer from "../EventForm/FormContainer";
import useTrackerCaptureStore from "@/state/trackerCapture";
import "./Layout3.css";

const Layout3 = () => {
  const layout = useTrackerCaptureStore((state) => state.layout);

  const returnLayout = () => {
    if (layout.hideProfile) {
      return (
        <div className="tracker-capture-form-wrapper-full">
          <FormContainer />
        </div>
      );
    } else {
      return [
        <div className="tracker-capture-form-wrapper">
          <FormContainer />
        </div>,
        <div className="tracker-capture-profile-wrapper">
          <Profile />
        </div>
      ];
    }
  };

  return <div className="tracker-capture-layout3-container">{returnLayout()}</div>;
};

export default Layout3;
