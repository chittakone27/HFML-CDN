import { useMemo, useRef, useEffect } from "react";
import { shallow } from "zustand/shallow";
import { generateVillageSelectorOptionsById } from "./utlis2";
import useMetadataStore from "@/state/metadata";
import Cascader from "@/ui/common/Cascader/Cascader";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import { pickTranslation } from "@/utils/utils";

const VillageSelectorOrgUnitStage = ({ variant, VillageSelectorIds, saveGeo, disabled }) => {

  console.log("test ",VillageSelectorIds)
  const { i18n } = useTranslation();

  const { orgUnits, dataElements } = useMetadataStore(
    useShallow((state) => ({
      orgUnits: state.orgUnits,
      dataElements: state.dataElements
    }))
  );

  const { actions, layout } = useTrackerCaptureStore(
    useShallow((state) => ({
      actions: state.actions,
      layout: state.layout
    }))
  );
  const { changeDataValue, changeEventProperty } = actions || {};
  const { eventFormEditing } = layout || {};

  const { currentEvent } = useCurrentEvent() || {};
  const eventId = currentEvent?.event ?? null;

  const pending = useRef(null);
  const flushPending = () => {
    if (eventId && pending.current) {
      const { prov, dist, vill, geo } = pending.current;
      changeDataValue(eventId, VillageSelectorIds[0], prov ?? "");
      changeDataValue(eventId, VillageSelectorIds[1], dist ?? "");
      changeDataValue(eventId, VillageSelectorIds[2], vill ?? "");
      if (saveGeo && typeof changeEventProperty === "function") {
        changeEventProperty("geometry", geo ?? null, eventId);
      }
      pending.current = null;
    }
  };
  useEffect(() => {
    flushPending();
  }, [eventId]);

  const getDEValue = (evt, deId) =>
    evt?.dataValues?.find((dv) => dv.dataElement === deId)?.value ?? "";

  const [provinces, districts, villages] = useMemo(() => {
    return (orgUnits || []).reduce(
      (result, ou) => {
        (ou.organisationUnitGroups || []).forEach((ouG) => {
          if (ouG.id === "jblbYwuvO33") result[0].push(ou); // Province
          if (ouG.id === "Zh1inFu0Z2O") result[1].push(ou); // District
          if (ouG.id === "ZVH1xlLGfxn") result[2].push(ou); // Village
        });
        return result;
      },
      [[], [], []]
    );
  }, [orgUnits]);

  const options = useMemo(
    () => generateVillageSelectorOptionsById(provinces, districts, villages, i18n.language),
    [provinces, districts, villages, i18n.language]
  );

  // labels (use your pickTranslation)
  const labels = useMemo(() => {
    return VillageSelectorIds.map((id) => {
      const match = (dataElements || []).find((de) => de.id === id);
      return match ? pickTranslation(match, i18n.language, "FORM_NAME") : "";
    });
  }, [dataElements, i18n.language, VillageSelectorIds]);

  // init from stored UIDs (array of { dataElement, value })
  const initSelectedIds = useMemo(() => {
    const provId = getDEValue(currentEvent, VillageSelectorIds[0]) || "";
    const distId = getDEValue(currentEvent, VillageSelectorIds[1]) || "";
    const villId = getDEValue(currentEvent, VillageSelectorIds[2]) || "";
    return [provId, distId, villId];
  }, [currentEvent, VillageSelectorIds]);

  // disabled by default unless caller explicitly overrides
  const isDisabled = (disabled !== undefined) ? disabled : !eventFormEditing;

  const handleChange = (selected) => {
    const selProv = selected?.[0] || null;
    const selDist = selected?.[1] || null;
    const selVill = selected?.[2] || null;

    const provUid = selProv?.value ?? "";
    const distUid = selDist?.value ?? "";
    const villUid = selVill?.value ?? "";

    // optional geometry
    let geo = null;
    if (saveGeo && selVill?.latitude && selVill?.longitude) {
      const lon = parseFloat(selVill.longitude);
      const lat = parseFloat(selVill.latitude);
      if (Number.isFinite(lon) && Number.isFinite(lat)) {
        geo = { type: "Point", coordinates: [lon, lat] };
      }
    }

    if (eventId) {
      changeDataValue(eventId, VillageSelectorIds[0], provUid);
      changeDataValue(eventId, VillageSelectorIds[1], distUid);
      changeDataValue(eventId, VillageSelectorIds[2], villUid);
      if (saveGeo && typeof changeEventProperty === "function") {
        changeEventProperty("geometry", geo ?? null, eventId);
      }
    } else {
      pending.current = { prov: provUid, dist: distUid, vill: villUid, geo };
    }
  };

  return (
    <Cascader
      disabled={isDisabled}
      inputProps={{ readOnly: true }}
      change={handleChange}
      data={{
        data: options,
        initValues: initSelectedIds,
        ids: VillageSelectorIds,
        labels
      }}
    />
  );
};

export default VillageSelectorOrgUnitStage;
