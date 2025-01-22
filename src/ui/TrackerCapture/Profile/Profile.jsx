import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Button, Popover, Alert, AlertTitle } from "@mui/material";
import ErrorDialog from "@/ui/common/ErrorDialog/ErrorDialog";
import configs from "@/configs";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { toast } from "react-toastify";
import { tracker } from "@/api";
import "./Profile.css";
const { VITE_CONFIG_NAME } = import.meta.env;
const { saveTei, deleteTei, saveEnrollment, getTeiById } = tracker;

const Profile = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [saving, setSaving] = useState(false);
  const { data, actions, layout, handlers } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions,
      layout: state.layout,
      handlers: state.handlers
    }))
  );
  const { currentTei, currentEnrollment, currentEvents, mandatoryAttributes } = data;
  const { setLayout, initData, changeTeiProperty } = actions;
  const { program, orgUnit } = useSelectionStore(
    useShallow((state) => ({
      program: state.program,
      orgUnit: state.orgUnit
    }))
  );
  const { customForms } = configs[VITE_CONFIG_NAME];
  const ProfileCustomForm = customForms[program.id] && customForms[program.id].profile;
  const saveCurrentTei = async () => {
    if (handlers.profileSave) {
      setSaving(true);
      setLayout("profileFormEditing", false);
      await handlers.profileSave(currentTei, currentEnrollment, currentEvents);
      setSaving(false);
    } else {
      setSaving(true);
      const teiResult = await saveTei(currentTei);
      const enrResult = await saveEnrollment(currentEnrollment);
      if (teiResult.ok && enrResult.ok) {
        toast.success(t("saved"), {
          position: "bottom-center",
          autoClose: 3000,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined
        });
        if (layout.layout === "layout2") {
          const result = await getTeiById(program.id, currentTei.trackedEntityInstance);
          initData(result, program.id, orgUnit.id);
          setLayout("layout", "layout3");
        }
        changeTeiProperty("lastSaved", new Date().toString());
      } else {
        setApiError({ teiResult: teiResult, enrResult: enrResult });
      }
      setLayout("profileFormEditing", false);
      setSaving(false);
    }
  };

  useEffect(() => {
    if (layout.layout === "layout2") {
      setLayout("profileFormEditing", true);
    }
  }, [layout.layout]);

  let valid = true;

  program.programTrackedEntityAttributes
    .filter((ptea) => ptea.mandatory)
    .forEach((ptea) => {
      const foundTeaValue = currentTei.attributes.find((attr) => attr.attribute === ptea.trackedEntityAttribute.id);
      if (!foundTeaValue || !foundTeaValue.value) {
        valid = false;
        return;
      }
    });
  if (mandatoryAttributes) {
    mandatoryAttributes.forEach((tea) => {
      const foundTeaValue = currentTei.attributes.find((attr) => attr.attribute === tea);
      if (!foundTeaValue || !foundTeaValue.value) {
        valid = false;
        return;
      }
    });
  }

  if (layout.disableProfileSaveButton) {
    valid = false;
  }

  return (
    <div className="tracker-profile-container">
      <div>{t("profile")}</div>
      <div>
        <ProfileCustomForm />
      </div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            setAnchorEl(null);
          }
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <div className="delete-event-confirmation">
          <Alert severity="error" style={{ color: "#ff4538" }}>
            <AlertTitle>{t("warning")}</AlertTitle>
            {t("deleteTeiConfirmation")}
          </Alert>
          <br />
          <Button
            color="error"
            variant="contained"
            onClick={async () => {
              if (handlers.profileDelete) {
                handlers.profileDelete(currentTei);
              } else {
                const result = await deleteTei(currentTei.trackedEntityInstance);
                if (!result.ok) {
                  setApiError({ ...result });
                } else {
                  setLayout("layout", "layout1");
                }
              }
            }}
          >
            {t("delete")}
          </Button>
          &nbsp;
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setAnchorEl(null);
            }}
          >
            {t("cancel")}
          </Button>
        </div>
      </Popover>
      <div>
        {!layout.profileFormEditing && (
          <LoadingButton
            disabled={layout.disableProfileEditButton}
            loading={saving}
            variant="contained"
            onClick={() => {
              setLayout("profileFormEditing", true);
            }}
          >
            {t("edit")}
          </LoadingButton>
        )}
        {layout.profileFormEditing && (
          <LoadingButton disabled={!valid} loading={saving} variant="contained" color="success" onClick={saveCurrentTei}>
            {t("save")}
          </LoadingButton>
        )}
        {layout.layout === "layout2" && (
          <LoadingButton
            variant="contained"
            color="error"
            loading={saving}
            onClick={() => {
              setLayout("layout", "layout1");
            }}
          >
            {t("cancel")}
          </LoadingButton>
        )}
        {layout.layout !== "layout2" && !layout.hideProfileDeleteButton && (
          <LoadingButton
            loading={saving}
            color="error"
            variant="outlined"
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            {t("delete")}
          </LoadingButton>
        )}
        {layout.customProfileFormButtons ? layout.customProfileFormButtons : null}
      </div>
      {apiError && (
        <ErrorDialog
          error={JSON.stringify(apiError)}
          handleClose={() => {
            setApiError(null);
          }}
        />
      )}
    </div>
  );
};

export default Profile;
