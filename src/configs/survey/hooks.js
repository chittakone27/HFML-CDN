import { useEffect } from "react";
import useMetadataStore from "@/state/metadata";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useSelectionStore from "@/state/selection";
import { useShallow } from "zustand/react/shallow";

const useDisableRegisterButtonForSurvey = () => {
  const me = useMetadataStore((state) => state.me);
  const { program, orgUnit } = useSelectionStore(
    useShallow((state) => ({
      program: state.program,
      orgUnit: state.orgUnit
    }))
  );
  const { actions, layout } = useTrackerCaptureStore(
    useShallow((state) => ({
      actions: state.actions,
      layout: state.layout
    }))
  );

  const { setLayout } = actions;

  useEffect(() => {
    if (me && program) {
      const foundGroup = me.userGroups.find((ug) => ug.id === "elrZ3jvh1SL");
      if (foundGroup) {
        setLayout("disableRegisterButton", false);
        setLayout("disableSearchButton", false);
      } else {
        setLayout("disableRegisterButton", true);
        setLayout("disableSearchButton", true);
      }
    }
  }, [me ? me.username : "", program ? program.id : "", orgUnit ? orgUnit.id : "", layout]);
};

const hooks = [useDisableRegisterButtonForSurvey];

export default hooks;
