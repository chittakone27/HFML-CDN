import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useTrackerCaptureStore from "@/state/trackerCapture";

const norm = (s) => String(s ?? "").toLowerCase().trim();
const convertListToObj = (list, keyProperty, valueProperty) =>
  Array.isArray(list)
    ? list.reduce((acc, cur) => {
        acc[cur[keyProperty]] = valueProperty ? cur[valueProperty] : cur;
        return acc;
      }, {})
    : {};

const pad2 = (v) => {
  const s = String(v ?? "").replace(/\D/g, "");
  if (!s) return "";
  return s.padStart(2, "0");
};

const pad3 = (v) => {
  const s = String(v ?? "").replace(/\D/g, "");
  if (!s) return "";
  return s.padStart(3, "0");
};

const toAsciiDigits = (str = "") =>
  String(str).replace(
    /[\u0E50-\u0E59\u0ED0-\u0ED9\u0660-\u0669\u06F0-\u06F9\u0966-\u096F]/g,
    (ch) => {
      const c = ch.charCodeAt(0);
      if (c >= 0x0e50 && c <= 0x0e59) return String(c - 0x0e50); 
      if (c >= 0x0ed0 && c <= 0x0ed9) return String(c - 0x0ed0); 
      if (c >= 0x0660 && c <= 0x0669) return String(c - 0x0660); 
      if (c >= 0x06f0 && c <= 0x06f9) return String(c - 0x06f0); 
      if (c >= 0x0966 && c <= 0x096f) return String(c - 0x0966); 
      return ch;
    }
  );

const ID = {
  sourceOfFunding: "VDtUCd4xomY",
  specifyPayer: "tDri5optbSF",

  deviceType: "xQrdgnlPcC3",
  code: "y6RfdAq2zmQ",
  hf: "odDm8AxiL1j",          
  hftype: "STdn1v1AxLa",
  hfSequence: "xgb9vCptedt",
  num: "KZ5D0DFEqdf",
  deviceId: "RyN09GsWd64",
};

const DEVICE_CODE = { laptop: "L", tablet: "T", desktop: "D", "smart phone": "S" };

const useProfileRules = () => {
  const { currentTei } = useTrackerCaptureStore(useShallow((state) => state.data));
  const attributes =
    currentTei ? convertListToObj(currentTei.attributes, "attribute", "value") : {};

  const sourceOfFunding = norm(attributes[ID.sourceOfFunding]);
  const deviceType = norm(attributes[ID.deviceType]);

  const hf = toAsciiDigits(String(attributes[ID.hf] ?? "")).replace(/\D/g, "").slice(0, 4);

  const hftype = String(attributes[ID.hftype] ?? "").trim();
  const hfSequence = String(attributes[ID.hfSequence] ?? "").trim();
  const hfSequencePadded = pad2(hfSequence);
  const numRaw = String(attributes[ID.num] ?? "").trim();
  const num = pad3(numRaw);

  const codeAuto = DEVICE_CODE[deviceType] ?? "";
  const deviceId =
    hf && hftype && hfSequencePadded && codeAuto && num
      ? `${hf}${hftype}${hfSequencePadded}-${codeAuto}${num}`
      : "";

  const [props, setProps] = useState({
    warnings: {},
    hiddenFields: {},
    assignations: {},
    disabledFields: {},
    hiddenOptions: {},
  });

  useEffect(() => {
    const hidden = {};
    const disabled = {};
    const assignations = {};

    hidden[ID.specifyPayer] = sourceOfFunding !== "other";

    const hideFor = {
      laptop: ["XRdw8EK5FJg"],
      tablet: ["leCxCv4ZFaX", "rIHJFrYHA27"],
      desktop: [ "XRdw8EK5FJg"],
      "smart phone": ["rIHJFrYHA27", "leCxCv4ZFaX"],
      smartphone: ["rIHJFrYHA27", "leCxCv4ZFaX"],
    };
    (hideFor[deviceType] ?? []).forEach((attrId) => (hidden[attrId] = true));

    assignations[ID.code] = codeAuto || "";
    disabled[ID.code] = true;

    assignations[ID.deviceId] = deviceId;
    disabled[ID.deviceId] = true;

    setProps((prev) => ({
      ...prev,
      hiddenFields: hidden,
      disabledFields: disabled,
      assignations,
    }));
  }, [sourceOfFunding, deviceType, codeAuto, deviceId]);

  return props;
};

export default useProfileRules;
