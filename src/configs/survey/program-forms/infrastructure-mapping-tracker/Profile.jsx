import { useEffect, useState } from "react";
import useSelectionStore from "@/state/selection";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import { Box } from "@mui/material";
import useProfileRules from "./useProfileRules";

const IDS = {
  A: "s9TfhXLCYgD",
  B: "nZjzEldORWw",
  C: "Z9V1f5YzXXj", 
};

const MANUAL_DISABLE = new Set([
  // IDS.A,
  IDS.B,
  // IDS.C,  <-- keep commented; we'll control C by group
]);

// Hide (don’t render at all)
const MANUAL_HIDE = new Set([
  IDS.A,
  // IDS.B,
  // IDS.C,
]);

const ADMIN_GROUP_ID = "Ft6NncNAjeG";

const getApiBaseUrl = () => {
  if (typeof window !== "undefined" && window.DHIS_CONFIG?.baseUrl) {
    return window.DHIS_CONFIG.baseUrl.replace(/\/$/, "");
  }
  const envBase = import.meta.env.VITE_BASE_URL;
  if (envBase) return String(envBase).replace(/\/$/, "");
  return "";
};

const buildApiUrl = (path) => {
  const base = getApiBaseUrl();
  const cleaned = path.replace(/^\//, "");
  return base ? `${base}/${cleaned}` : `/${cleaned}`;
};

const getAuthHeaders = () => {
  const user = import.meta.env.VITE_USERNAME;
  const pass = import.meta.env.VITE_PASSWORD;
  if (!user || !pass) return {};
  const token = btoa(`${user}:${pass}`);
  return { Authorization: `Basic ${token}` };
};


const Profile = () => {
  const { program } = useSelectionStore((s) => ({ program: s.program }));
  const { hiddenFields = {}, disabledFields = {} } = useProfileRules() || {};

  const attributes =
    program?.programTrackedEntityAttributes?.map(
      (ptea) => ptea.trackedEntityAttribute.id
    ) || [];

  const [canDeleteTei, setCanDeleteTei] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchMe = async () => {
      try {
        const url = buildApiUrl(
          "/api/me.json?fields=id,userGroups[id,name]"
        );
        const res = await fetch(url, {
          headers: {
            Accept: "application/json",
            ...getAuthHeaders(),
          },
        });
        const ct = res.headers.get("content-type") || "";
        if (!res.ok || !ct.includes("application/json")) {
          if (!cancelled) setCanDeleteTei(false);
          return;
        }

        const json = await res.json();
        const groups = json.userGroups || [];
        const inAdminGroup = groups.some(
          (g) => g && g.id === ADMIN_GROUP_ID
        );

        if (!cancelled) {
          setCanDeleteTei(inAdminGroup);
        }
      } catch (e) {
        if (!cancelled) setCanDeleteTei(false);
      }
    };

    fetchMe();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (canDeleteTei === null) return;
    if (canDeleteTei === true) return;

    const isInsidePopup = (btn) => {
      if (!btn) return false;
      return !!btn.closest(
        [
          '[role="dialog"]',
          '[role="alertdialog"]',
          ".MuiDialog-root",
          ".MuiDialog-paper",
          '[class*="dialog"]',
          '[class*="Dialog"]',
          '[class*="modal"]',
          '[class*="Modal"]',
          '[data-test*="dialog"]',
          '[data-test*="Dialog"]',
          '[data-test*="modal"]',
          '[data-test*="Modal"]',
        ].join(", ")
      );
    };

    const hideTeiDeleteButtons = () => {
      const buttons = Array.from(
        document.querySelectorAll("button, .MuiButton-root")
      );

      buttons.forEach((btn) => {
        if (!btn) return;
        const text = (btn.textContent || "").trim();
        if (text !== "Delete" && text !== "ລຶບ") return;
        if (isInsidePopup(btn)) return;

        btn.style.display = "none";
        btn.disabled = true;
        btn.setAttribute("aria-hidden", "true");
      });
    };

    hideTeiDeleteButtons();
    const observer = new MutationObserver(hideTeiDeleteButtons);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [canDeleteTei]);

  return (
    <>
      {attributes.map((attribute) => {
        if (MANUAL_HIDE.has(attribute)) return null;
        if (hiddenFields?.[attribute]) return null;

        const lockCForNonAdmin =
          attribute === IDS.C && canDeleteTei === false;

        const isDisabled =
          MANUAL_DISABLE.has(attribute) ||
          !!disabledFields?.[attribute] ||
          lockCForNonAdmin;

        return (
          <Box key={attribute} className="custom-tracker-profile-field-row">
            <AttributeLabel attribute={attribute} />
            <AttributeField
              attribute={attribute}
              disabledManualFields
              disabled={isDisabled}
            />
          </Box>
        );
      })}
    </>
  );
};

export default Profile;
