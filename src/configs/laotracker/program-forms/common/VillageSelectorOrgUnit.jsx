import { useMemo } from "react";
import { shallow } from "zustand/shallow";
import { generateVillageSelectorOptionsById } from "./utils";
import useMetadataStore from "@/state/metadata";
import Cascader from "@/ui/common/Cascader/Cascader";
import useTrackerCaptureStore from "@/state/trackerCapture";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";

const VillageSelectorOrgUnit = ({ VillageSelectorIds, saveGeo, disabled }) => {
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

  const setTeiGeo = (value) => {
    // setTeiProperty("geometry", value);
  };
  const setEnrGeo = (value) => {
    changeEnrollmentProperty("geometry", value);
  };

  return (
    <Cascader
      disabled={disabled}
      change={(selected) => {
        changeAttributeValue(VillageSelectorIds[0], selected[0]?.value || "");
        changeAttributeValue(VillageSelectorIds[1], selected[1]?.value || "");
        changeAttributeValue(VillageSelectorIds[2], selected[2]?.value || "");
        const village = selected[2];
        if (!saveGeo) return;
        if (!village?.latitude || !village?.longitude) {
          setTeiGeo(null);
          setEnrGeo(null);
          return;
        }

        const geo = Object.assign(
          {},
          {
            type: "Point",
            coordinates: [parseFloat(village.longitude), parseFloat(village.latitude)]
          }
        );
        setTeiGeo(geo);
        setEnrGeo(geo);
      }}
      data={{
        data: options,
        initValues: [
          currentTei.attributes.find((e) => e.attribute === VillageSelectorIds[0])?.value,
          currentTei.attributes.find((e) => e.attribute === VillageSelectorIds[1])?.value,
          currentTei.attributes.find((e) => e.attribute === VillageSelectorIds[2])?.value
        ],
        ids: VillageSelectorIds,
        labels: [
          <AttributeLabel attribute={VillageSelectorIds[0]} />,
          <AttributeLabel attribute={VillageSelectorIds[1]} />,
          <AttributeLabel attribute={VillageSelectorIds[2]} />
        ]
      }}
    />
  );
};

export default VillageSelectorOrgUnit;
