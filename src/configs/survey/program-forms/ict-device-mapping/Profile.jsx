import { Box } from "@mui/material";
import { useMemo, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";

import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";

import useProfileRules from "./useProfileRules";

const ID = {
  deviceType: "xQrdgnlPcC3",
  code: "y6RfdAq2zmQ",
  hf: "odDm8AxiL1j",
  hftype: "STdn1v1AxLa",
  hfSequence: "xgb9vCptedt",
  num: "KZ5D0DFEqdf",        // <-- this one
  deviceId: "RyN09GsWd64",
};

const SPECIAL = [ID.code, ID.hf, ID.hftype, ID.hfSequence, ID.num, ID.deviceId];

const toAttrMap = (tei) =>
  Array.isArray(tei?.attributes)
    ? tei.attributes.reduce((a, cur) => {
        a[cur.attribute] = cur.value;
        return a;
      }, {})
    : {};

const getHelpers = (target, { errors = {}, helpers = {}, warnings = {} } = {}) => {
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

const mapDeviceTypeToCode = (deviceType) => {
  if (!deviceType) return "";
  const label = String(deviceType).toLowerCase();

  if (label.includes("desktop")) return "D";
  if (label.includes("laptop")) return "L";
  if (label.includes("tablet")) return "T";
  if (label.includes("phone") || label.includes("mobile")) return "P";

  return String(deviceType).trim().charAt(0).toUpperCase();
};

const NUM_INPUT_PROPS = {
  inputProps: {
    inputMode: "numeric",
    pattern: "[0-9]*",
    maxLength: 3,
    placeholder: "###",
  },
};

const leadingZeroMessage = (lang) => {
  const isLao = String(lang || "").toLowerCase().startsWith("lo");
  return isLao
    ? "ໃຫ້ໃສ່ຕົວເລກ ໂດຍບໍ່ມີເລກສູນທາງໜ້າ (ຕົວຢ່າງ ເລກ 1 ບໍ່ແມ່ນ 01)."
    : "Invalid format: don’t use leading zeros (use 1, not 01).";
};

const Profile = () => {
  const { i18n } = useTranslation();

  const { program, orgUnit } = useSelectionStore(
    useShallow((s) => ({ program: s.program, orgUnit: s.orgUnit }))
  );

  const { actions, data } = useTrackerCaptureStore(
    useShallow((s) => ({ actions: s.actions, data: s.data }))
  );

  const rules = useProfileRules();

  const currentTei = data?.currentTei;
  const currentAttrMap = useMemo(() => toAttrMap(currentTei), [currentTei]);

  const numValue = String(currentAttrMap[ID.num] ?? "");
  const deviceTypeValue = String(currentAttrMap[ID.deviceType] ?? "");
  const leadingZeroError = useMemo(() => {
    const v = String(numValue ?? "");
    if (!v) return {};
    if (/^0\d+$/.test(v)) {
      return {
        [ID.num]: leadingZeroMessage(i18n?.language),
      };
    }
    return {};
  }, [numValue, i18n?.language]);

  const props = useMemo(
    () => ({
      ...rules,
      errors: { ...(rules?.errors || {}), ...leadingZeroError },
    }),
    [rules, leadingZeroError]
  );

  const orgUnitCode = useMemo(() => {
    if (!orgUnit) return "";
    if (orgUnit.code) return String(orgUnit.code);
    const label = orgUnit.displayName || orgUnit.name || "";
    const m = label.match(/\(([^)]+)\)/);
    return m ? m[1] : "";
  }, [orgUnit]);

  const orgUnitParts = useMemo(() => {
    if (!orgUnitCode) return {};
    const m = orgUnitCode.match(/^(\d{4})([A-Za-z]{2})(\d{2})$/);
    if (!m) return {};
    return { did: m[1], hfType: m[2], hfSeq: m[3] };
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

  useEffect(() => {
    if (!data?.currentTei) return;
    const raw = String(numValue ?? "");
    if (!raw) return;

    const cleaned = raw.replace(/\D/g, "").slice(0, 3);
    if (cleaned !== raw) {
      actions.changeAttributeValue(ID.num, cleaned);
    }
  }, [numValue, data?.currentTei, actions]);

  useEffect(() => {
    if (!props?.hiddenFields) return;
    const cur = toAttrMap(data?.currentTei);

    Object.entries(props.hiddenFields).forEach(([attr, isHidden]) => {
      if (!isHidden) return;
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
        return;
      }
      const current = cur[attr] ?? "";
      if (String(current) !== String(value)) {
        actions.changeAttributeValue(attr, value);
      }
    });
  }, [actions, data?.currentTei, props?.assignations]);

  useEffect(() => {
    if (!data?.currentTei) return;
    const { did, hfType, hfSeq } = orgUnitParts;
    if (!did || !hfType || !hfSeq) return;

    const cur = toAttrMap(data.currentTei);
    const updates = [];

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

  useEffect(() => {
    if (!data?.currentTei) return;

    const cur = toAttrMap(data.currentTei);

    if (!deviceTypeValue || !numValue) {
      if (cur[ID.deviceId]) {
        actions.changeAttributeValue(ID.deviceId, "");
      }
      return;
    }

    const { did, hfType, hfSeq } = orgUnitParts;
    if (!did || !hfType || !hfSeq) return;

    const devCode = mapDeviceTypeToCode(deviceTypeValue);

    const hfSeq2 = hfSeq;
    const basePrefix = `${did}${hfType}${hfSeq2}`;

    const n = parseInt(numValue, 10);
    if (!Number.isFinite(n)) return;

    const suffix = String(n).padStart(3, "0");
    const newDeviceId = `${basePrefix}-${devCode}${suffix}`;

    const updates = [];
    if (cur[ID.code] !== devCode) updates.push([ID.code, devCode]);
    if (cur[ID.deviceId] !== newDeviceId) updates.push([ID.deviceId, newDeviceId]);

    if (!updates.length) return;
    updates.forEach(([attr, value]) => actions.changeAttributeValue(attr, value));
  }, [data?.currentTei, orgUnitParts, deviceTypeValue, numValue, actions]);

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
      <Box key={ID.deviceId} className="custom-tracker-profile-field-row" sx={{ mb: 1.5 }}>
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
