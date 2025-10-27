// useProfileRules.js
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

const ID = {
  // Funding rule
  sourceOfFunding: "VDtUCd4xomY",
  specifyPayer: "tDri5optbSF",

  // Device identity rules
  deviceType: "xQrdgnlPcC3", // Laptop/Tablet/Desktop/Smart Phone
  code: "y6RfdAq2zmQ",       // auto from device type (L/T/D/SET) — disabled
  hf: "odDm8AxiL1j",         // HF ID (user)
  hftype: "STdn1v1AxLa",    // HF type (user)
  hfSequence: "xgb9vCptedt", // HF sequence number (user)
  num: "KZ5D0DFEqdf",        // Number (user, 3-digit)
  deviceId: "RyN09GsWd64",   // <hf>-<code><num> — disabled
};

const DEVICE_CODE = {
  laptop: "L",
  tablet: "T",
  desktop: "D",
  "smart phone": "S",
  // smartphone: "S",
};

const useProfileRules = () => {
  const { currentTei } = useTrackerCaptureStore(
    useShallow((state) => state.data)
  );

  const attributes = currentTei
    ? convertListToObj(currentTei.attributes, "attribute", "value")
    : {};

  const sourceOfFunding = norm(attributes[ID.sourceOfFunding]);
  const deviceType = norm(attributes[ID.deviceType]);

  const hf = String(attributes[ID.hf] ?? "").trim();
  const hftype = String(attributes[ID.hftype] ?? "").trim();
  const hfSequence = String(attributes[ID.hfSequence] ?? "").trim();
  const hfSequencePadded = pad2(hfSequence);
  const numRaw = String(attributes[ID.num] ?? "").trim();
  const num = pad3(numRaw);

  // derive code from device type
  const codeAuto = DEVICE_CODE[deviceType] ?? "";

  // compose deviceId if all parts exist
  const deviceId = hf && hftype && hfSequencePadded && codeAuto && num ? `${hf}${hftype}${hfSequencePadded}-${codeAuto}${num}` : "";

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

    // Show "Specify Payer" only if Source of funding == "other"
    hidden[ID.specifyPayer] = sourceOfFunding !== "other";

    // --- Device-type-specific hides (restored) ------------------------------
    const hideFor = {
      laptop: ["XRdw8EK5FJg"],
      tablet: ["leCxCv4ZFaX", "rIHJFrYHA27"],
      desktop: ["leCxCv4ZFaX", "rIHJFrYHA27", "XRdw8EK5FJg"],
      "smart phone": ["rIHJFrYHA27","leCxCv4ZFaX"],
      smartphone: ["rIHJFrYHA27","leCxCv4ZFaX"],
    };
    (hideFor[deviceType] ?? []).forEach((attrId) => {
      hidden[attrId] = true;
    });

    // Auto-assign code & lock it
    assignations[ID.code] = codeAuto || "";
    disabled[ID.code] = true;

    // Auto-assign composed deviceId & lock it
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
