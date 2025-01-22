import { useState } from "react";
import { Button, Popover, Alert, AlertTitle } from "@mui/material";
import withModuleSection from "@/hocs/withModuleSection";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useMetadataStore from "@/state/metadata";
import { shallow } from "zustand/shallow";
import Form from "./Form";
import ErrorDialog from "@/ui/common/ErrorDialog/ErrorDialog";
import { tracker } from "@/api";
import { toast } from "react-toastify";
import configs from "@/configs";
import "./Profile.css";
const { VITE_CONFIG_NAME } = import.meta.env;
const { saveTei, deleteTei, saveEnrollment, getTeiById } = tracker;

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [apiError, setApiError] = useState(null);
  const { t } = useTranslation();
  const { program, orgUnit } = useSelectionStore((state) => ({ program: state.program, orgUnit: state.orgUnit }), shallow);
  const { trackedEntityAttributes, optionSets } = useMetadataStore(
    (state) => ({ trackedEntityAttributes: state.trackedEntityAttributes, optionSets: state.optionSets }),
    shallow
  );
  const currentTeas = program.programTrackedEntityAttributes
    // .filter((ptea) => ptea.displayInList)
    .map((ptea) => {
      const foundTea = trackedEntityAttributes.find((tea) => tea.id === ptea.trackedEntityAttribute.id);
      return { ...foundTea, mandatory: ptea.mandatory };
    });
  const { data, actions, layout } = useTrackerCaptureStore((state) => ({ data: state.data, actions: state.actions, layout: state.layout }), shallow);
  const { setLayout, changeTeiProperty } = actions;
  const { currentTei, currentEnrollment } = data;

  const saveCurrentTei = async () => {
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
        actions.initData(result, program.id, orgUnit.id);
        setLayout("layout", "layout3");
      }
      actions.changeTeiProperty("lastSaved", new Date().toString());
    } else {
      setApiError({ teiResult: teiResult, enrResult: enrResult });
    }
  };

  let valid = true;
  currentTeas
    .filter((tea) => tea.mandatory)
    .forEach((tea) => {
      const foundAttribute = currentTei.attributes.find((attr) => attr.attribute === tea.id);
      if (!foundAttribute || !foundAttribute.value) {
        valid = false;
      }
    });

  if (layout.disableProfileSaveButton) {
    valid = false;
  }

  return (
    <div className="tracker-profile-container">
      <div>
        <Form />
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
          <Alert severity="warning">
            <AlertTitle>{t("warning")}</AlertTitle>
            {t("deleteTeiConfirmation")}
          </Alert>
          <br />
          <Button
            color="primary"
            onClick={async () => {
              const result = await deleteTei(currentTei.trackedEntityInstance);
              if (!result.ok) {
                setApiError({ ...result });
              } else {
                setLayout("layout", "layout1");
              }
            }}
          >
            {t("delete")}
          </Button>
          &nbsp;
          <Button
            color="error"
            onClick={() => {
              setAnchorEl(null);
            }}
          >
            {t("cancel")}
          </Button>
        </div>
      </Popover>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            saveCurrentTei();
          }}
          disabled={!valid}
        >
          {t("save")}
        </Button>
        &nbsp;&nbsp;
        {layout.layout !== "layout2" && (
          <Button
            variant="contained"
            color="error"
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            {t("deleteTei")}
          </Button>
        )}
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

export default withModuleSection(Profile, "profile");
