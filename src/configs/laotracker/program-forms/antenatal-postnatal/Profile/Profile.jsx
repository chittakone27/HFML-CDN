import useProfileRules from "./useProfileRules";
import DefaultProfile from "../../../common/DefaultProfile/DefaultProfile";
import "../AncPnc.css";

const Profile = () => {
  const props = useProfileRules();

  return <DefaultProfile attributeProps={props} />;
};

export default Profile;
