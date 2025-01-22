import { useMemo } from "react";
import { shallow } from "zustand/shallow";

import { generateVillageSelectorOptionsById } from "../utils";
import useMetadataStore from "@/state/metadata";
import Cascader from "@/ui/common/Cascader/Cascader";
import useTrackerCaptureStore from "@/state/trackerCapture";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";

const VillageSelectorWithoutHandler = ({ labels, change, values }) => {
  const orgUnits = useMetadataStore((state) => state.orgUnits, shallow);
  const { currentTei } = useTrackerCaptureStore((state) => state.data, shallow);
  const { changeAttributeValue, changeEnrollmentProperty } = useTrackerCaptureStore((state) => state.actions, shallow);

  const [provinces, districts, villages] = useMemo(() => {
    return orgUnits.reduce(
      (result, ou) => {
        ou.organisationUnitGroups.forEach((ouG) => {
          if (ouG.id === "jblbYwuvO33") result[0].push(ou);
          if (ouG.id === "Zh1inFu0Z2O") result[1].push(ou);
          if (ouG.id === "dGSmKUusVZG") result[2].push(ou);
        });

        return result;
      },
      [[], [], []]
    );
  }, [orgUnits]);

  const options = generateVillageSelectorOptionsById(provinces, districts, villages);

  return (
    <Cascader
      change={(selected) => {
        change(selected);
      }}
      data={{
        data: options,
        initValues: values,
        labels: labels
      }}
    />
  );
};

export default VillageSelectorWithoutHandler;
