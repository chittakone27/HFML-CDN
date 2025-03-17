import { useMemo } from "react";
import { shallow } from "zustand/shallow";
import { generateVillageSelectorOptionsById } from "../utils";
import useMetadataStore from "@/state/metadata";
import Cascader from "@/ui/common/Cascader/Cascader";
import useTrackerCaptureStore from "@/state/trackerCapture";
import AttributeLabelNoState from "@/ui/TrackerCapture/Profile/AttributeLabelNoState";
import { useShallow } from "zustand/react/shallow";

const VillageSelectorOrgUnitNoState = ({ VillageSelectorIds, change, initValues, mandatoryFields }) => {
  const { orgUnits, me } = useMetadataStore(
    useShallow((state) => ({
      orgUnits: state.orgUnits,
      me: state.me
    }))
  );
  const { currentTei } = useTrackerCaptureStore((state) => state.data, shallow);
  const { changeAttributeValue, changeEnrollmentProperty } = useTrackerCaptureStore((state) => state.actions, shallow);
  const [provinces, districts, villages] = useMemo(() => {
    return orgUnits.reduce(
      (result, ou) => {
        ou.organisationUnitGroups.forEach((ouG) => {
          if (ouG.id === "jblbYwuvO33") result[0].push(ou);
          if (ouG.id === "Zh1inFu0Z2O") result[1].push(ou);
          if (ouG.id === "ZVH1xlLGfxn") result[2].push(ou);
        });

        return result;
      },
      [[], [], []]
    );
  }, [orgUnits]);
  const language = me.settings.keyUiLocale;
  const options = generateVillageSelectorOptionsById(provinces, districts, villages, language);
  return (
    <Cascader
      change={change}
      data={{
        data: options,
        initValues: initValues,
        ids: VillageSelectorIds,
        labels: [
          <AttributeLabelNoState attribute={VillageSelectorIds[0]} />,
          <AttributeLabelNoState attribute={VillageSelectorIds[1]} />,
          <AttributeLabelNoState attribute={VillageSelectorIds[2]} />
        ]
      }}
    />
  );
};

export default VillageSelectorOrgUnitNoState;
