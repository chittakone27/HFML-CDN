// src/.../useProfileRules.jsx
import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { getOrgUnitNameById } from "@/api/icapture/metadata";

const TEA_ORGUNIT_NAME = "Z9V1f5YzXXj";

const convertListToObj = (list, keyProperty, valueProperty) =>
  Array.isArray(list)
    ? list.reduce((result, current) => {
        result[current[keyProperty]] = valueProperty ? current[valueProperty] : current;
        return result;
      }, {})
    : {};

const useProfileRules = () => {
  const { currentTei } = useTrackerCaptureStore(
    useShallow((state) => state.data)
  );

  const attributes = useMemo(
    () => (currentTei ? convertListToObj(currentTei.attributes, "attribute", "value") : {}),
    [currentTei?.lastSaved]
  );

  const sourceOfFunding = attributes["VDtUCd4xomY"];

  const [props, setProps] = useState({
    warnings: {},
    hiddenFields: {},
    assignations: {},
    disabledFields: {},
    hiddenOptions: {},
  });

  useEffect(() => {
    setProps((prev) => {
      const hiddenFields = { ...prev.hiddenFields };
      if (sourceOfFunding !== "other") hiddenFields["soRnoQqwciC"] = true;
      else delete hiddenFields["soRnoQqwciC"];
      return { ...prev, hiddenFields };
    });
  }, [sourceOfFunding]);

  useEffect(() => {
    let cancelled = false;

    const orgUnitId =
      currentTei?.enrollments?.[0]?.orgUnit || currentTei?.orgUnit || null;

    if (!orgUnitId) return;

    (async () => {
      const ouName = await getOrgUnitNameById(orgUnitId);
      if (cancelled) return;

      if (ouName) {
        setProps((prev) => ({
          ...prev,
          assignations: {
            ...prev.assignations,
            [TEA_ORGUNIT_NAME]: ouName, 
          },

          disabledFields: {
            ...prev.disabledFields,
            [TEA_ORGUNIT_NAME]: true,
          },
        }));
      } else {
        setProps((prev) => ({
          ...prev,
          warnings: {
            ...prev.warnings,
            __orgUnitLookup: "Could not read org unit name.",
          },
        }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [currentTei?.enrollments?.[0]?.orgUnit, currentTei?.orgUnit]);

  return props;
};

export default useProfileRules;
