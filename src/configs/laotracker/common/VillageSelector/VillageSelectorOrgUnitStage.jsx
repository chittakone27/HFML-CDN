import { useMemo } from "react";
import { shallow } from "zustand/shallow";
import { generateVillageSelectorOptionsById } from "../utils";
import useMetadataStore from "@/state/metadata";
import Cascader from "@/ui/common/Cascader/Cascader";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import { pickTranslation } from "@/utils/utils";

const VillageSelectorOrgUnitStage = ({ variant, VillageSelectorIds, saveGeo, disabled }) => {
  const { i18n } = useTranslation();
  const { orgUnits, programs, dataElements } = useMetadataStore(
    useShallow((state) => ({
      orgUnits: state.orgUnits,
      programs: state.programs,
      dataElements: state.dataElements
    }))
  );

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

  const labels = useMemo(() => {
    return VillageSelectorIds.map((id) => {
      const match = dataElements.find((de) => de.id === id);
      return match ? pickTranslation(match, i18n.language, "FORM_NAME") : "";
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
