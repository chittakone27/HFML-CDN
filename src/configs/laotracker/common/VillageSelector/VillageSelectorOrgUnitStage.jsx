import { useMemo } from "react";
import { shallow } from "zustand/shallow";
import { generateVillageSelectorOptionsById } from "../utils";
import useMetadataStore from "@/state/metadata";
import Cascader from "@/ui/common/Cascader/Cascader";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";

const VillageSelectorOrgUnitStage = ({ variant, VillageSelectorIds, saveGeo, disabled }) => {
  const { i18n } = useTranslation();
  const orgUnits = useMetadataStore((state) => state.orgUnits, shallow);
  const programs = useMetadataStore((state) => state.programs, shallow);

  const { actions, layout, data } = useTrackerCaptureStore(
    useShallow((state) => ({
      actions: state.actions,
      layout: state.layout,
      data: state.data
    }))
  );
  const { currentEvent } = data;
  const { changeDataValue } = actions;
  const { eventFormEditing } = layout;

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

  const options = generateVillageSelectorOptionsById(provinces, districts, villages, i18n.language);

  // Get labels for each data element ID from metadata
  const labels = useMemo(() => {
    const stage = programs
      .find((p) => p.id === "d9eJlJsqplx") // your community death program
      ?.programStages.find((s) => s.id === "d7Q9zL8yYpA");

    const elements = stage?.programStageDataElements.map((psde) => psde.dataElement) || [];

    return VillageSelectorIds.map((id) => {
      const match = elements.find((de) => de.id === id);
      return match?.displayFormName || id;
    });
  }, [programs, VillageSelectorIds]);

  return (
    <Cascader
      disabled={!eventFormEditing || disabled}
      change={(selected) => {
        changeDataValue(VillageSelectorIds[0], selected[0]?.value || "");
        changeDataValue(VillageSelectorIds[1], selected[1]?.value || "");
        changeDataValue(VillageSelectorIds[2], selected[2]?.value || "");

        const village = selected[2];
        if (!saveGeo) return;

        if (!village?.latitude || !village?.longitude) {
          changeDataValue("geometry", null);
          return;
        }

        const geo = {
          type: "Point",
          coordinates: [parseFloat(village.longitude), parseFloat(village.latitude)]
        };
        changeDataValue("geometry", geo);
      }}
      data={{
        data: options,
        initValues: [
          currentEvent?.dataValues?.[VillageSelectorIds[0]] || "",
          currentEvent?.dataValues?.[VillageSelectorIds[1]] || "",
          currentEvent?.dataValues?.[VillageSelectorIds[2]] || ""
        ],
        ids: VillageSelectorIds,
        labels: labels
      }}
    />
  );
};

export default VillageSelectorOrgUnitStage;
