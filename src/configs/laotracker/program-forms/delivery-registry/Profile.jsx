import { useProfileRules } from "./rules";
import DefaultProfile from "../../common/DefaultProfile/DefaultProfile";
const Profile = () => {
  const props = useProfileRules();

  return <DefaultProfile attributeProps={props} />;
};
export default Profile;
