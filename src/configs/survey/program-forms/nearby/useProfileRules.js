import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useMemo, useState } from "react";

const TEA = {
  districtId: "R4mULOs2f6M",
  hfType: "A81fBn53hAD",
  seqNum: "GwphHuSwouj",
  facilityId: "sO0ItF0Dr0p",
  nearbyType: "SxKvvxpzop9", // Type of nearby health facility

  province: "pvY01Pt3GTk",       // selector province
  extraExisting: "sO0ItF0Dr0p",

  customFacilityName: "f9d4P9maZEq",
  addressProvince: "kFHo6CSy7B0",
  addressDistrict: "MFb4L2Ju4iu",
  addressVillage: "U4k2WoPO2dN",
};

const toAsciiDigits = (str = "") => {
  const s = String(str);
  const bases = [0x0660, 0x06f0, 0x0e50, 0x0ed0];
  return s.replace(
    /[0-9\u0660-\u0669\u06F0-\u06F9\u0966-\u096F\u0E50-\u0E59\u0ED0-\u0ED9]/g,
    (ch) => {
      const code = ch.charCodeAt(0);
      if (code >= 0x30 && code <= 0x39) return ch;
      for (const base of bases) {
        if (code >= base && code <= base + 9) {
          return String.fromCharCode(0x30 + (code - base));
        }
      }
      return "";
    }
  );
};

const normalize = (s) => String(s ?? "").trim().toLowerCase();

const NEARBY_EXISTING_HF_CODES = new Set([
  "EXIST_PUBLIC_HF", 
]);

const toObj = (list) =>
  Array.isArray(list)
    ? list.reduce((a, x) => ((a[x.attribute] = x.value), a), {})
    : {};

const composeFacilityId = (districtId, hfType, seq) => {
  const d4 = toAsciiDigits(districtId).replace(/\D/g, "").slice(0, 4);
  const t = String(hfType ?? "").trim().toUpperCase().replace(/\s+/g, "");
  const s3raw = toAsciiDigits(seq).replace(/\D/g, "").slice(0, 3);
  if (d4.length !== 4 || !t || !s3raw) return undefined;
  const s3 = s3raw.padStart(2, "0"); // 2-digit sequence
  return `${d4}${t}${s3}`;
};

const EXISTING_HF_REQUIRED = [
  TEA.districtId,     // R4mULOs2f6M
  TEA.hfType,         // A81fBn53hAD
  TEA.seqNum,         // GwphHuSwouj
  TEA.extraExisting,  // sO0ItF0Dr0p
  TEA.province,       // pvY01Pt3GTk
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
  const { setData } = useTrackerCaptureStore(
    useShallow((s) => s.actions)
  );

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

    if (isExistingPublicHF) {
      const nextId = composeFacilityId(
        A[TEA.districtId],
        A[TEA.hfType],
        A[TEA.seqNum]
      );
      if (typeof nextId !== "undefined") {
        assignations[TEA.facilityId] = nextId;
      }
    }

    const prevMandatory = mandatoryAttributes || [];
    const nextMandatory = new Set(prevMandatory);

    const hasSelection =
      !!nearbyTypeVal && String(nearbyTypeVal).trim() !== "";

    nextMandatory.add(TEA.nearbyType);

    if (isExistingPublicHF) {
      EXISTING_HF_REQUIRED.forEach((id) => nextMandatory.add(id));
      CUSTOM_HF_REQUIRED.forEach((id) => nextMandatory.delete(id));
    } else if (hasSelection) {
      CUSTOM_HF_REQUIRED.forEach((id) => nextMandatory.add(id));
      EXISTING_HF_REQUIRED.forEach((id) => nextMandatory.delete(id));
    } else {
      EXISTING_HF_REQUIRED.forEach((id) => nextMandatory.delete(id));
      CUSTOM_HF_REQUIRED.forEach((id) => nextMandatory.delete(id));
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
    A[TEA.districtId],
    A[TEA.hfType],
    A[TEA.seqNum],
    A[TEA.nearbyType],
    mandatoryAttributes,
    setData,
  ]);

  return props;
};

export default useProfileRules;
