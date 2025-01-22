import useControlBarStore from "@/state/controlBar";
import useEventCaptureStore from "@/state/eventCapture";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";

const useDefaultOrgUnitSelection = (ready) => {
  const { program, dataSet } = useSelectionStore((state) => ({ program: state.program, dataSet: state.dataSet }), shallow);
  const { me, orgUnits } = useMetadataStore((state) => ({ me: state.me, orgUnits: state.orgUnits }), shallow);
  const { selectOrgUnit } = useSelectionStore((state) => state.actions);

  useEffect(() => {
    if ((ready && me.organisationUnits.length === 1) || program || dataSet) {
      const foundOu = orgUnits.find((ou) => ou.id === me.organisationUnits[0].id);
      const foundOuGroup = foundOu.organisationUnitGroups.find((oug) => oug.id === "zk3lBJfnL6b");
      if (foundOuGroup) {
        selectOrgUnit(foundOu);
      }
    }
  }, [ready, program ? program.id : null, dataSet ? dataSet.id : null]);
};

const useHideEventFormCompleteButton = (ready) => {
  const { program, dataSet } = useSelectionStore((state) => ({ program: state.program, dataSet: state.dataSet }), shallow);
  const { setLayout } = useEventCaptureStore((state) => state.actions);

  useEffect(() => {
    if (program && program.id) {
      setLayout("hideEventFormCompleteButton", true);
    }
  });
};
const useHideStatusEventListColumn = (ready) => {
  const { program, dataSet } = useSelectionStore((state) => ({ program: state.program, dataSet: state.dataSet }), shallow);
  const { setLayout } = useEventCaptureStore((state) => state.actions);

  useEffect(() => {
    if (program && program.id) {
      setLayout("hiddenEventListColumns", ["status"]);
    }
  });
};
const useHideCompleteButtonForEpiChild = () => {
  const program = useSelectionStore((state) => state.program);
  const { setLayout } = useControlBarStore((state) => state.actions);

  useEffect(() => {
    if (program && program.id) {
      if (program.id === "UXiVDCcnmoJ") {
        setLayout("hideCompleteButton", true);
      } else {
        setLayout("hideCompleteButton", false);
      }
    }
  }, [program ? program.id : null]);
};
const hooks = [useDefaultOrgUnitSelection, useHideEventFormCompleteButton, useHideStatusEventListColumn, useHideCompleteButtonForEpiChild];
export default hooks;
