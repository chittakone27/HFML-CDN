import { useState, createContext, useMemo, memo } from "react";
import _ from "lodash";

const initialStore = {
  errors: {},
  helpers: {},
  warnings: {},
  assignations: {},
  hiddenFields: {},
  hiddenOptions: {},
  disabledFields: {},
  disabledOptions: {},
};

export const profileRuleContext = createContext(initialStore);
export const eventRuleContext = createContext(initialStore);

const withRules = (Component) => (props) => {
  const [profileRules, setProfileRules] = useState(initialStore);
  const [eventRules, setEventRules] = useState(initialStore);
  const MemoComponent = useMemo(() => memo(Component), []);

  const profileActions = {
    changeRuleState: (type, value) => {
      if (type) {
        if (typeof type === "object") {
          setProfileRules((prev) => ({ ...prev, ...type }));
          return;
        }
        setProfileRules((prev) => ({ ...prev, [type]: value }));
      }
    },
    resetRuleState: () => {
      setProfileRules(initialStore);
    },
  };

  const eventActions = {
    changeRuleState: (type, value) => {
      if (type) {
        if (typeof type === "object") {
          setEventRules((prev) => ({ ...prev, ...type }));
          return;
        }
        setEventRules((prev) => ({ ...prev, [type]: value }));
      }
    },
    resetRuleState: () => {
      setEventRules(initialStore);
    },
  };

  return (
    <profileRuleContext.Provider value={{ ...profileRules, ...profileActions }}>
      <eventRuleContext.Provider value={{ ...eventRules, ...eventActions }}>
        <MemoComponent {...props} />
      </eventRuleContext.Provider>
    </profileRuleContext.Provider>
  );
};

export default withRules;
