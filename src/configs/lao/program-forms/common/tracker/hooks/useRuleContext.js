import { useContext } from "react";
import { eventRuleContext, profileRuleContext } from "../hocs/withRules";

const useRuleContext = (context) => {
  const profile = useContext(profileRuleContext);
  const event = useContext(eventRuleContext);
  return context === "event" ? event : profile;
};

export default useRuleContext;
