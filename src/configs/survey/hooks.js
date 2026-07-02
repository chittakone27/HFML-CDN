import { useEffect } from "react";
import useMetadataStore from "@/state/metadata";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useSelectionStore from "@/state/selection";
import { useShallow } from "zustand/react/shallow";

const RESTRICTED_PROGRAMS = new Set([
  "wkUHtogPKUL", 
  "sBkMdki30ua"  
]);

const PRIVILEGED_GROUP_ID = "elrZ3jvh1SL";

const useDisableRegisterButtonForSurvey = () => {
  const me = useMetadataStore((state) => state.me);

  const { program } = useSelectionStore(
    useShallow((state) => ({
      program: state.program
    }))
  );

  const { actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      actions: state.actions
    }))
  );

  const { setLayout } = actions;

  useEffect(() => {
    if (!me || !program) return;

    const isInPrivilegedGroup = (me.userGroups || []).some(
      (ug) => ug.id === PRIVILEGED_GROUP_ID
    );

    const isRestrictedProgram = RESTRICTED_PROGRAMS.has(program.id);

    if (isInPrivilegedGroup || !isRestrictedProgram) {
      setLayout("disableRegisterButton", false);
      setLayout("disableSearchButton", false);
    } else {
      setLayout("disableRegisterButton", true);
      setLayout("disableSearchButton", true);
    }
  }, [me?.username, program?.id, setLayout]);
};

const hooks = [useDisableRegisterButtonForSurvey];

export default hooks;
