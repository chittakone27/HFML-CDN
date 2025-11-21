import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useMemo, useState } from "react";

const TEA = {
  districtId: "R4mULOs2f6M",        // no longer used, but kept for compatibility
  hfType: "A81fBn53hAD",            // no longer used
  seqNum: "GwphHuSwouj",            // no longer used

  facilityId: "sO0ItF0Dr0p",
  nearbyType: "SxKvvxpzop9",        // Type of nearby health facility

  province: "pvY01Pt3GTk",          // selector province

  customFacilityName: "f9d4P9maZEq",
  addressProvince: "kFHo6CSy7B0",
  addressDistrict: "MFb4L2Ju4iu",
  addressVillage: "U4k2WoPO2dN",
};

const normalize = (s) => String(s ?? "").trim().toLowerCase();

const NEARBY_EXISTING_HF_CODES = new Set([
  "EXIST_PUBLIC_HF", 
]);

const toObj = (list) =>
  Array.isArray(list)
    ? list.reduce((a, x) => ((a[x.attribute] = x.value), a), {})
    : {};

const EXISTING_HF_REQUIRED = [
  TEA.facilityId, // sO0ItF0Dr0p (auto-filled from orgUnit code)
  TEA.province,   // pvY01Pt3GTk
];

const CUSTOM_HF_REQUIRED = [
  TEA.customFacilityName, // f9d4P9maZEq
  TEA.addressProvince,    // kFHo6CSy7B0
  TEA.addressDistrict,    // MFb4L2Ju4iu
  TEA.addressVillage,     // U4k2WoPO2dN
];

const useProfileRules = () => {
  const { currentTei, mandatoryAttributes } = useTrackerCaptureStore(
    useShallow((s) => s.data)
  );
  const { setData } = useTrackerCaptureStore(useShallow((s) => s.actions));

  const A = useMemo(
    () => toObj(currentTei?.attributes || []),
    [currentTei?.attributes]
  );

  const [props, setProps] = useState({
    warnings: {},
    hiddenFields: {},
    assignations: {},
    disabledFields: {},
    hiddenOptions: {},
  });

  useEffect(() => {
    const assignations = {}; 

    const nearbyTypeVal = A[TEA.nearbyType];
    const isExistingPublicHF =
      NEARBY_EXISTING_HF_CODES.has(nearbyTypeVal) ||
      normalize(nearbyTypeVal) === normalize("Existing public health facility");

    const prevMandatory = mandatoryAttributes || [];
    const nextMandatory = new Set(prevMandatory);

    const hasSelection =
      !!nearbyTypeVal && String(nearbyTypeVal).trim() !== "";

    nextMandatory.add(TEA.nearbyType);

    EXISTING_HF_REQUIRED.forEach((id) => nextMandatory.delete(id));
    CUSTOM_HF_REQUIRED.forEach((id) => nextMandatory.delete(id));

    if (isExistingPublicHF) {

      EXISTING_HF_REQUIRED.forEach((id) => nextMandatory.add(id));
    } else if (hasSelection) {
      CUSTOM_HF_REQUIRED.forEach((id) => nextMandatory.add(id));
    }


    const nextMandatoryArr = Array.from(nextMandatory);

    if (
      nextMandatoryArr.length !== prevMandatory.length ||
      nextMandatoryArr.some((id, idx) => id !== prevMandatory[idx])
    ) {
      setData("mandatoryAttributes", nextMandatoryArr);
    }

    setProps((p) => ({ ...p, assignations }));
  }, [
    A[TEA.nearbyType],
    mandatoryAttributes,
    setData,
  ]);

  return props;
};

export default useProfileRules;
