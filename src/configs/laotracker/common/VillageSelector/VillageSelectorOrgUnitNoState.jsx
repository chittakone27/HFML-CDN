import { useMemo } from "react";
import { shallow } from "zustand/shallow";
import { generateVillageSelectorOptionsById } from "../utils";
import useMetadataStore from "@/state/metadata";
import Cascader from "@/ui/common/Cascader/Cascader";
import useTrackerCaptureStore from "@/state/trackerCapture";
import AttributeLabelNoState from "@/ui/TrackerCapture/Profile/AttributeLabelNoState";
import { useShallow } from "zustand/react/shallow";
import DataValueLabelNoState from "@/ui/TrackerCapture/EventForm/DataValueLabelNoState";

const VillageSelectorOrgUnitNoState = ({ VillageSelectorIds, change, initValues, mandatoryFields, disabled, type, currentProgramStage }) => {
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
  let labels = [];
  if (type === "dataElements") {
    labels = [
      <DataValueLabelNoState
        currentProgramStage={currentProgramStage}
        mandatory={mandatoryFields.includes(VillageSelectorIds[0])}
        dataElement={VillageSelectorIds[0]}
      />,
      <DataValueLabelNoState
        currentProgramStage={currentProgramStage}
        mandatory={mandatoryFields.includes(VillageSelectorIds[1])}
        dataElement={VillageSelectorIds[1]}
      />,
      <DataValueLabelNoState
        currentProgramStage={currentProgramStage}
        mandatory={mandatoryFields.includes(VillageSelectorIds[2])}
        dataElement={VillageSelectorIds[2]}
      />
    ];
  } else {
    labels = [
      <AttributeLabelNoState mandatory={mandatoryFields.includes(VillageSelectorIds[0])} attribute={VillageSelectorIds[0]} />,
      <AttributeLabelNoState mandatory={mandatoryFields.includes(VillageSelectorIds[1])} attribute={VillageSelectorIds[1]} />,
      <AttributeLabelNoState mandatory={mandatoryFields.includes(VillageSelectorIds[2])} attribute={VillageSelectorIds[2]} />
    ];
  }

  return (
    <Cascader
      disabled={disabled}
      change={change}
      data={{
        data: options,
        initValues: initValues,
        ids: VillageSelectorIds,
        labels: labels
      }}
    />
  );
};

export default VillageSelectorOrgUnitNoState;
