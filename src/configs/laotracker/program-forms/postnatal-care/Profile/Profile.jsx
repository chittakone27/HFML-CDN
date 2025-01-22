import useProfileRules from "./useProfileRules";
// import DefaultProfile from "../../../common/DefaultProfile/DefaultProfile";
import DefaultProfile from "@/configs/laotracker/common/DefaultProfile/DefaultProfile";
import "./Profile.css";

const Profile = () => {
  const props = useProfileRules();

  return <DefaultProfile attributeProps={props} />;
  //   return <div>Hello</div>;
};

export default Profile;
