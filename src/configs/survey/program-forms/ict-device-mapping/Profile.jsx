// Profile.jsx
import { Box } from "@mui/material";
import { useMemo, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";

import useProfileRules from "./useProfileRules";

// --- Layout knobs ------------------------------------------------------------
const LABEL_COL_W = 210; // keep aligned with other rows

// Fixed widths (adjust here)
const HF_W   = 180; // HF ID input width
const CODE_W = 65; // Code input width
const NUM_W  = 110; // Number input width

// --- Attribute IDs -----------------------------------------------------------
const ID = {
  deviceType: "xQrdgnlPcC3", // render first
  code: "y6RfdAq2zmQ",       // Code (auto from device type) — disabled
  hf: "odDm8AxiL1j",         // HF ID (user input)
  num: "KZ5D0DFEqdf",        // Number (user input)
  deviceId: "RyN09GsWd64",   // Composed Device ID (auto, disabled)
};

const SPECIAL = [ID.code, ID.hf, ID.num, ID.deviceId];

const toAttrMap = (tei) =>
  Array.isArray(tei?.attributes)
    ? tei.attributes.reduce((a, cur) => {
        a[cur.attribute] = cur.value;
        return a;
      }, {})
    : {};

const Profile = () => {
  const { program } = useSelectionStore(
    useShallow((s) => ({ program: s.program }))
  );

  const { actions, data } = useTrackerCaptureStore(
    useShallow((s) => ({ actions: s.actions, data: s.data }))
  );

  const props = useProfileRules();

  // Clear values for hidden fields
  useEffect(() => {
    if (!props?.hiddenFields) return;
    const cur = toAttrMap(data?.currentTei);
    Object.entries(props.hiddenFields).forEach(([attr, isHidden]) => {
      if (isHidden && cur[attr]) actions.changeAttributeValue(attr, "");
    });
  }, [actions, data?.currentTei, props?.hiddenFields]);

  // Apply auto-assignments only if changed
  useEffect(() => {
    if (!props?.assignations) return;
    const cur = toAttrMap(data?.currentTei);
    Object.entries(props.assignations).forEach(([attr, value]) => {
      if (typeof value === "undefined") return;
      const current = cur[attr] ?? "";
      if (String(current) !== String(value)) {
        actions.changeAttributeValue(attr, value);
      }
    });
  }, [actions, data?.currentTei, props?.assignations]);

  const allAttributes = useMemo(
    () =>
      (program?.programTrackedEntityAttributes ?? []).map(
        (ptea) => ptea.trackedEntityAttribute.id
      ),
    [program?.programTrackedEntityAttributes]
  );

  const deviceIdx = allAttributes.indexOf(ID.deviceType);

  const beforeDevice = (deviceIdx > -1 ? allAttributes.slice(0, deviceIdx) : [])
    .filter((a) => !SPECIAL.includes(a));

  const afterDevice = (deviceIdx > -1 ? allAttributes.slice(deviceIdx + 1) : allAttributes)
    .filter((a) => !SPECIAL.includes(a));

  const renderRow = (attribute) => {
    if (props?.hiddenFields?.[attribute]) return null;
    return (
      <Box key={attribute} className="custom-tracker-profile-field-row">
        <AttributeLabel attribute={attribute} />
        <AttributeField
          attribute={attribute}
          disabledManualFields
          disabled={!!props?.disabledFields?.[attribute]}
        />
      </Box>
    );
  };

  // Inline compact trio aligned like age inputs: HF | Code | Number
  const renderInlineTrioRow = () => {
    if (
      props?.hiddenFields?.[ID.hf] &&
      props?.hiddenFields?.[ID.code] &&
      props?.hiddenFields?.[ID.num]
    )
      return null;

    const widths = {
      [ID.hf]: HF_W,
      [ID.code]: CODE_W,
      [ID.num]: NUM_W,
    };

    return (
      <Box className="custom-tracker-profile-field-row" sx={{ alignItems: "flex-start", mb: 1 }}>
        {/* ghost label keeps alignment with normal rows */}
        <Box sx={{ width: LABEL_COL_W, minWidth: LABEL_COL_W, pr: 2 }} />

        {/* value column with three fixed-width cells */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `${HF_W}px ${CODE_W}px ${NUM_W}px`,
            gap: 1.5,
            alignItems: "start",
          }}
        >
          {[ID.hf, ID.code, ID.num].map((attribute) =>
            props?.hiddenFields?.[attribute] ? null : (
              <Box key={attribute} sx={{ display: "grid", gap: 0.5, width: widths[attribute] }}>
                <AttributeLabel attribute={attribute} />
                <Box sx={{ width: widths[attribute] }}>
                  <AttributeField
                    attribute={attribute}
                    disabledManualFields
                    disabled={attribute === ID.code || !!props?.disabledFields?.[attribute]} // Code locked
                    size="small"
                    sx={{
                      "& .MuiInputBase-root": { height: 36, width: widths[attribute] },
                      "& .MuiInputBase-input, & .MuiSelect-select": { py: 0.5, fontSize: "0.9rem" },
                    }}
                  />
                </Box>
              </Box>
            )
          )}
        </Box>
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
          disabled // always disabled; auto-composed
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
      {renderInlineTrioRow()}
      {renderDeviceId()}
      {afterDevice.map(renderRow)}
    </>
  );
};

export default Profile;
