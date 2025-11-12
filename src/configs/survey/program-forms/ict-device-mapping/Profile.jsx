import { Box } from "@mui/material";
import { useMemo, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";

import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";

import useProfileRules from "./useProfileRules";

const LABEL_COL_W = 210; 

// Fixed widths (adjust here)
const HF_W = 80;           
const HFSEQUENCE_W = 50;   
const HFTYPE_W = 80;       
const CODE_W = 50;         
const NUM_W = 65;          

const ID = {
  deviceType: "xQrdgnlPcC3",  
  code: "y6RfdAq2zmQ",        
  hf: "odDm8AxiL1j",          
  hftype: "STdn1v1AxLa",      
  hfSequence: "xgb9vCptedt", 
  num: "KZ5D0DFEqdf",         
}
const SPECIAL = [ID.code, ID.hf, ID.hftype, ID.hfSequence, ID.num, ID.deviceId];

const toAttrMap = (tei) =>
  Array.isArray(tei?.attributes)
    ? tei.attributes.reduce((a, cur) => {
        a[cur.attribute] = cur.value;
        return a;
      }, {})
    : {};

const Profile = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const { program } = useSelectionStore(
    useShallow((s) => ({ program: s.program }))
  );

  const { actions, data } = useTrackerCaptureStore(
    useShallow((s) => ({ actions: s.actions, data: s.data }))
  );

  const props = useProfileRules();

  useEffect(() => {
    if (!props?.hiddenFields) return;
    const cur = toAttrMap(data?.currentTei);
    Object.entries(props.hiddenFields).forEach(([attr, isHidden]) => {
      if (isHidden && cur[attr]) actions.changeAttributeValue(attr, "");
    });
  }, [actions, data?.currentTei, props?.hiddenFields]);

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

  const beforeDevice = (deviceIdx > -1
    ? allAttributes.slice(0, deviceIdx)
    : []
  ).filter((a) => !SPECIAL.includes(a));

  const afterDevice = (deviceIdx > -1
    ? allAttributes.slice(deviceIdx + 1)
    : allAttributes
  ).filter((a) => !SPECIAL.includes(a));

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

  const currentAttrMap = toAttrMap(data?.currentTei);
  const hfValue = String(currentAttrMap[ID.hf] ?? "");
  const hfValid = /^\d{4}$/.test(hfValue);

  const trHFExact4 = t("profile.hf.exact4digits", {
    defaultValue: isLao ? "ກະລຸນາໃສ່ເລກ 4 ໂຕແນ່ນອນ" : "Enter exactly 4 digits.",
  });

  const HF_DIGIT_GUARDS = {
    inputProps: {
      inputMode: "numeric",
      pattern: "[0-9]*",
      maxLength: 4,
      placeholder: "####",
      "aria-invalid": !hfValid ? "true" : undefined,
      "aria-describedby": !hfValid ? "hf-help" : undefined,
    },
    onKeyDown: (e) => {
      if (["e", "E", "+", "-", ".", ",", " "].includes(e.key)) return e.preventDefault();
      if (/^\d$/.test(e.key)) {
        const el = e.target;
        const val = String(el.value ?? "").replace(/\D/g, "");
        const hasSelection = (el.selectionEnd ?? 0) - (el.selectionStart ?? 0) > 0;
        if (!hasSelection && val.length >= 4) return e.preventDefault();
      }
    },
    onPaste: (e) => {
      const txt = (e.clipboardData || window.clipboardData).getData("text") || "";
      const clean = txt.replace(/\D/g, "");
      if (!clean) return e.preventDefault();

      e.preventDefault();
      const el = e.target;
      const start = el.selectionStart ?? 0;
      const end = el.selectionEnd ?? 0;
      const next =
        String(el.value ?? "").slice(0, start) +
        clean +
        String(el.value ?? "").slice(end);
      el.value = next.replace(/\D/g, "").slice(0, 4);
      el.dispatchEvent(new Event("input", { bubbles: true }));
    },
    onInput: (e) => {
      const s = String(e.target.value ?? "");
      const digits4 = s.replace(/\D/g, "").slice(0, 4);
      if (s !== digits4) e.target.value = digits4;
    },
  };

  const renderInlineTrioRow = () => {
    if (
      props?.hiddenFields?.[ID.hf] &&
      props?.hiddenFields?.[ID.hftype] &&
      props?.hiddenFields?.[ID.hfSequence] &&
      props?.hiddenFields?.[ID.code] &&
      props?.hiddenFields?.[ID.num]
    )
      return null;

    const widths = {
      [ID.hf]: HF_W,
      [ID.hftype]: HFTYPE_W,
      [ID.hfSequence]: HFSEQUENCE_W,
      [ID.code]: CODE_W,
      [ID.num]: NUM_W,
    };

    return (
      <Box
        className="custom-tracker-profile-field-row"
        sx={{ alignItems: "flex-start", mb: 1 }}
      >
     <Box sx={{ width: LABEL_COL_W, minWidth: LABEL_COL_W, pr: 2 }} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `${HF_W}px ${HFTYPE_W}px ${HFSEQUENCE_W}px ${CODE_W}px ${NUM_W}px`,
            gap: 1.5,
            alignItems: "start",
          }}
        >
          {[ID.hf, ID.hftype, ID.hfSequence, ID.code, ID.num].map((attribute) =>
            props?.hiddenFields?.[attribute] ? null : (
              <Box
                key={attribute}
                sx={{ display: "grid", gap: 0.5, width: widths[attribute] }}
              >
                <AttributeLabel attribute={attribute} />
                <Box sx={{ width: widths[attribute] }}>
                  <AttributeField
                    attribute={attribute}
                    disabledManualFields
                    disabled={
                      attribute === ID.code || !!props?.disabledFields?.[attribute]
                    } // Code locked
                    size="small"
                    {...(attribute === ID.hf ? HF_DIGIT_GUARDS : {})}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: 36,
                        width: widths[attribute],
                        ...(attribute === ID.hf && !hfValid
                          ? { borderColor: "#d32f2f", borderWidth: 1, borderStyle: "solid" }
                          : {}),
                      },
                      "& .MuiInputBase-input, & .MuiSelect-select": {
                        py: 0.5,
                        fontSize: "0.9rem",
                      },
                    }}
                  />
                  {attribute === ID.hf && !hfValid && (
                    <Box
                      id="hf-help"
                      sx={{ mt: 0.5, fontSize: 12, lineHeight: "16px", color: "#d32f2f" }}
                    >
                      {trHFExact4}
                    </Box>
                  )}
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
      {renderInlineTrioRow()}
      {renderDeviceId()}
      {afterDevice.map(renderRow)}
    </>
  );
};

export default Profile;
