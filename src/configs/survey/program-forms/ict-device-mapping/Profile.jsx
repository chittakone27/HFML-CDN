// src/configs/laotracker/program-forms/ict/Profile.jsx

import { Box } from "@mui/material";
import { useMemo, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";

import useProfileRules from "./useProfileRules";

// --- Attribute IDs -----------------------------------------------------------
const ID = {
  deviceType: "xQrdgnlPcC3", // ICT - Type of ICT device
  code: "y6RfdAq2zmQ",       // ICT - Device ID - Code (D/L/…)
  hf: "odDm8AxiL1j",         // ICT - Device ID - District ID
  hftype: "STdn1v1AxLa",     // ICT - Device ID - HF type
  hfSequence: "xgb9vCptedt", // ICT - Device ID - HF Sequence
  num: "KZ5D0DFEqdf",        // ICT - Device ID - Number (user input)
  deviceId: "RyN09GsWd64",   // ICT - Device ID (full: 0201PH01-L01)
};

// Fields we never render as normal rows
const SPECIAL = [ID.code, ID.hf, ID.hftype, ID.hfSequence, ID.num, ID.deviceId];

const toAttrMap = (tei) =>
  Array.isArray(tei?.attributes)
    ? tei.attributes.reduce((a, cur) => {
        a[cur.attribute] = cur.value;
        return a;
      }, {})
    : {};

const getHelpers = (target, { errors = [], helpers = [], warnings = [] }) => {
  const result = [];
  Object.keys(errors).forEach((key) => {
    if (key === target) result.push({ type: "ERROR", value: errors[key] });
  });
  Object.keys(helpers).forEach((key) => {
    if (key === target) result.push({ type: "HELPER", value: helpers[key] });
  });
  Object.keys(warnings).forEach((key) => {
    if (key === target) result.push({ type: "WARNING", value: warnings[key] });
  });
  return result;
};

// Map "Laptop" / "Desktop" → L / D etc.
const mapDeviceTypeToCode = (deviceType) => {
  if (!deviceType) return "";
  const label = String(deviceType).toLowerCase();

  if (label.includes("desktop")) return "D";
  if (label.includes("laptop")) return "L";
  if (label.includes("tablet")) return "T";
  if (label.includes("phone") || label.includes("mobile")) return "P";

  // Fallback: first letter upper-case
  return String(deviceType).trim().charAt(0).toUpperCase();
};

// Light hint for the input; real enforcement is in useEffect.
const NUM_INPUT_PROPS = {
  inputProps: {
    inputMode: "numeric",
    pattern: "[0-9]*",
    maxLength: 2,
    placeholder: "##",
  },
};

const Profile = () => {
  const { program, orgUnit } = useSelectionStore(
    useShallow((s) => ({ program: s.program, orgUnit: s.orgUnit }))
  );

  const { actions, data } = useTrackerCaptureStore(
    useShallow((s) => ({ actions: s.actions, data: s.data }))
  );

  const props = useProfileRules();

  // --- Org unit code: "0201PH01" from code or "(0201PH01) PH …" label ---
  const orgUnitCode = useMemo(() => {
    if (!orgUnit) return "";
    if (orgUnit.code) return String(orgUnit.code);
    const label = orgUnit.displayName || orgUnit.name || "";
    const m = label.match(/\(([^)]+)\)/); // takes 0201PH01 from "(0201PH01) PH ..."
    return m ? m[1] : "";
  }, [orgUnit]);

  const orgUnitParts = useMemo(() => {
    if (!orgUnitCode) return {};
    // 0201PH01 -> ["0201","PH","01"]
    const m = orgUnitCode.match(/^(\d{4})([A-Za-z]{2})(\d{2})$/);
    if (!m) return {};
    return {
      did: m[1],    // "0201"
      hfType: m[2], // "PH"
      hfSeq: m[3],  // "01"
    };
  }, [orgUnitCode]);

  const allAttributes = useMemo(
    () =>
      (program?.programTrackedEntityAttributes ?? []).map(
        (ptea) => ptea.trackedEntityAttribute.id
      ),
    [program?.programTrackedEntityAttributes]
  );

  const deviceIdx = allAttributes.indexOf(ID.deviceType);

  const beforeDevice = (deviceIdx > -1 ? allAttributes.slice(0, deviceIdx) : []).filter(
    (a) => !SPECIAL.includes(a)
  );
  const afterDevice = (deviceIdx > -1 ? allAttributes.slice(deviceIdx + 1) : allAttributes).filter(
    (a) => !SPECIAL.includes(a)
  );

  const renderRow = (attribute) => {
    if (props?.hiddenFields?.[attribute]) return null;
    const helpers = getHelpers(attribute, props);

    return (
      <Box key={attribute} className="custom-tracker-profile-field-row">
        <AttributeLabel attribute={attribute} />
        <AttributeField
          attribute={attribute}
          disabledManualFields
          disabled={!!props?.disabledFields?.[attribute]}
          helpers={helpers}
        />
      </Box>
    );
  };

  // ---- Current TEI + values -------------------------------------------------
  const currentTei = data?.currentTei;
  const currentAttrMap = useMemo(() => toAttrMap(currentTei), [currentTei]);

  const numValue = String(currentAttrMap[ID.num] ?? "");
  const deviceTypeValue = String(currentAttrMap[ID.deviceType] ?? "");

  // --- Enforce: Number is max 2 digits --------------------------------------
  useEffect(() => {
    if (!data?.currentTei) return;
    const raw = String(numValue ?? "");
    if (!raw) return;

    const cleaned = raw.replace(/\D/g, "").slice(0, 2);
    if (cleaned !== raw) {
      actions.changeAttributeValue(ID.num, cleaned);
    }
  }, [numValue, data?.currentTei, actions]);

  // --- Clean hidden fields from useProfileRules (but NEVER our ID parts) -----
  useEffect(() => {
    if (!props?.hiddenFields) return;
    const cur = toAttrMap(data?.currentTei);

    Object.entries(props.hiddenFields).forEach(([attr, isHidden]) => {
      if (!isHidden) return;
      // Don't fight with our ID logic:
      if (
        attr === ID.hf ||
        attr === ID.hftype ||
        attr === ID.hfSequence ||
        attr === ID.code ||
        attr === ID.num ||
        attr === ID.deviceId
      ) {
        return;
      }
      if (cur[attr]) {
        actions.changeAttributeValue(attr, "");
      }
    });
  }, [actions, data?.currentTei, props?.hiddenFields]);

  // --- Assignations from useProfileRules, but skip our ID fields -------------
  useEffect(() => {
    if (!props?.assignations) return;
    const cur = toAttrMap(data?.currentTei);
    Object.entries(props.assignations).forEach(([attr, value]) => {
      if (typeof value === "undefined") return;
      if (
        attr === ID.hf ||
        attr === ID.hftype ||
        attr === ID.hfSequence ||
        attr === ID.code ||
        attr === ID.num ||
        attr === ID.deviceId
      ) {
        // let our ICT logic control these
        return;
      }
      const current = cur[attr] ?? "";
      if (String(current) !== String(value)) {
        actions.changeAttributeValue(attr, value);
      }
    });
  }, [actions, data?.currentTei, props?.assignations]);

  // --- Keep HF info in hidden fields based on org unit -----------------------
  useEffect(() => {
    if (!data?.currentTei) return;
    const { did, hfType, hfSeq } = orgUnitParts;
    if (!did || !hfType || !hfSeq) return;

    const cur = toAttrMap(data.currentTei);
    const updates = [];

    // HF sequence in attributes should be unpadded number ("1"), to match your old data
    const hfSeqNum =
      !Number.isNaN(parseInt(hfSeq, 10)) && hfSeq !== ""
        ? String(parseInt(hfSeq, 10))
        : hfSeq;

    if (cur[ID.hf] !== did) updates.push([ID.hf, did]);
    if (cur[ID.hftype] !== hfType) updates.push([ID.hftype, hfType]);
    if (cur[ID.hfSequence] !== hfSeqNum) updates.push([ID.hfSequence, hfSeqNum]);

    if (!updates.length) return;
    updates.forEach(([attr, value]) => actions.changeAttributeValue(attr, value));
  }, [data?.currentTei, orgUnitParts, actions]);

  // --- Build / keep Device ID in sync (from Type + Number + OU) --------------
  useEffect(() => {
    if (!data?.currentTei) return;

    const cur = toAttrMap(data.currentTei);

    // If device type or number is empty → clear Device ID
    if (!deviceTypeValue || !numValue) {
      if (cur[ID.deviceId]) {
        actions.changeAttributeValue(ID.deviceId, "");
      }
      return;
    }

    const { did, hfType, hfSeq } = orgUnitParts;
    if (!did || !hfType || !hfSeq) return;

    const devCode = mapDeviceTypeToCode(deviceTypeValue);

    // Use the padded seq from org unit code ("01")
    const hfSeq2 = hfSeq;
    const basePrefix = `${did}${hfType}${hfSeq2}`;

    const n = parseInt(numValue, 10);
    if (!Number.isFinite(n)) return;

    const suffix = String(n).padStart(2, "0");
    const newDeviceId = `${basePrefix}-${devCode}${suffix}`;

    const updates = [];

    // Keep code in hidden field
    if (cur[ID.code] !== devCode) updates.push([ID.code, devCode]);

    // Only update deviceId if different (avoid loops)
    if (cur[ID.deviceId] !== newDeviceId) {
      updates.push([ID.deviceId, newDeviceId]);
    }

    if (!updates.length) return;
    updates.forEach(([attr, value]) => actions.changeAttributeValue(attr, value));
  }, [data?.currentTei, orgUnitParts, deviceTypeValue, numValue, actions]);

  // --- Number row (full-width, editable) -------------------------------------
  const renderNumberRow = () => {
    if (props?.hiddenFields?.[ID.num]) return null;
    const helpers = getHelpers(ID.num, props);
    const disableNumber = !!props?.disabledFields?.[ID.num];

    return (
      <Box key={ID.num} className="custom-tracker-profile-field-row">
        <AttributeLabel attribute={ID.num} />
        <AttributeField
          attribute={ID.num}
          disabledManualFields
          disabled={disableNumber}
          helpers={helpers}
          {...NUM_INPUT_PROPS}
        />
      </Box>
    );
  };

  const renderDeviceId = () =>
    props?.hiddenFields?.[ID.deviceId] ? null : (
      <Box
        key={ID.deviceId}
        className="custom-tracker-profile-field-row"
        sx={{ mb: 1.5 }}
      >
        <AttributeLabel attribute={ID.deviceId} />
        <AttributeField
          attribute={ID.deviceId}
          disabledManualFields
          disabled
          size="small"
          sx={{
            "& .MuiInputBase-root": { height: 36 },
            "& .MuiInputBase-input": { py: 0.5, fontSize: "0.9rem" },
          }}
        />
      </Box>
    );

  return (
    <>
      {beforeDevice.map(renderRow)}
      {deviceIdx > -1 && renderRow(ID.deviceType)}
      {renderNumberRow()}
      {renderDeviceId()}
      {afterDevice.map(renderRow)}
    </>
  );
};

export default Profile;
