// React imports
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Third-party library imports
import { Button, Popover, Alert, AlertTitle } from "@mui/material";
import { toast } from "react-toastify";
import { shallow } from "zustand/shallow";
import parse from "html-react-parser";

// Local component imports
import withModuleSection from "@/hocs/withModuleSection";
import SectionForm from "./SectionForm";
import DataValueField from "./DataValueField";
import DataValueLabel from "./DataValueLabel";
import ErrorDialog from "@/ui/common/ErrorDialog/ErrorDialog";
import { Loader } from "@/ui/common";
import FormTop from "./FormTop";

// Local hook imports
import useEventRuleEngine from "../hooks/useEventRuleEngine";
import useSelectionStore from "@/state/selection";
import useEventCaptureStore from "@/state/eventCapture";
import useMetadataStore from "@/state/metadata";

// Local utility imports
import { event } from "@/api";
import { convertToDhis2Event } from "@/utils/eventData";
import configs from "@/configs";

// Styles
import "./Form.css";
import { format } from "date-fns";

const { VITE_CONFIG_NAME, VITE_TRACKER_API } = import.meta.env;
const { customForms, eventSaveInjections, generateFormPlugin } = configs[VITE_CONFIG_NAME];

const Form = ({ loading }) => {
  const [CustomForm, setCustomForm] = useState(null);
  const [scripts, setScripts] = useState([]);
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [apiError, setApiError] = useState(null);
  const me = useMetadataStore((state) => state.me);
  const { program, orgUnit } = useSelectionStore((state) => ({ program: state.program, orgUnit: state.orgUnit }), shallow);
  const { currentEvent, status, completeness, layout, actions } = useEventCaptureStore(
    (state) => ({
      currentEvent: state.currentEvent,
      status: state.status,
      completeness: state.completeness,
      layout: state.layout,
      actions: state.actions
    }),
    shallow
  );
  const { close, setLayout, fetchEvents, setCurrentEventProperty } = actions;

  const programStageSections = program.programStages[0].programStageSections;
  const programDataElements = program.programStages[0].programStageDataElements;
  const { featureType, dataEntryForm } = program.programStages[0];
  let formType = "default";
  let ICustomForm;
  if (programStageSections && programStageSections.length !== 0) formType = "section";
  // if (dataEntryForm && dataEntryForm.htmlCode) {
  //   formType = "custom";
  // }
  if (customForms[program.id]) {
    formType = "icustom";
    ICustomForm = customForms[program.id];
  }
  const completed = currentEvent.status === "COMPLETED" ? true : false;
  const isValid = status.valid;
  const isDataSetCompleted = completeness ? true : false;
  const eventSaveHandlers = eventSaveInjections.filter((evi) => evi.program === program.id);
  useEventRuleEngine();
  useEffect(() => {
    if (formType === "custom") {
      window.iCapture = {
        eventCapture: { ...actions }
      };

      const Form = () => {
        const htmlCode = dataEntryForm.htmlCode;
        return (
          <div style={{ width: "100%" }}>
            {parse(htmlCode, {
              replace: (domNode) => {
                if (domNode.type === "script") {
                  const currentScript = domNode.children[0].data;
                  eval(currentScript);
                  return null;
                } else if (domNode.attribs) {
                  const { name } = domNode.attribs;
                  if (name) {
                    const deId = name.split("-")[2];
                    if (name.includes("de-label")) {
                      return (
                        <div>
                          <DataValueLabel dataElement={deId} />
                        </div>
                      );
                    } else if (name.includes("de-field")) {
                      return <DataValueField dataElement={deId} />;
                    } else if (name === "plugin") {
                      const { pluginname, plugindata } = domNode.attribs;
                      return generateFormPlugin(pluginname, plugindata);
                    }
                  }
                } else {
                  return null;
                }
              }
            })}
          </div>
        );
      };
      setCustomForm(<Form />);
    } else {
      window.iCapture = {};
    }
  }, []);
  useEffect(() => {
    if (formType === "custom") {
      if (window.iCapture && window.iCapture.eventCapture.change) {
        window.iCapture.eventCapture.change(currentEvent);
      }
    }
  }, [JSON.stringify(currentEvent)]);

  return loading ? (
    <Loader>{t("loading")}</Loader>
  ) : (
    <div className="event-capture-form-container">
      <div>
        {!layout.hideFormTop && <FormTop />}
        {formType === "default" &&
          programDataElements.map((pde) => {
            return (
              <div style={{ padding: 10 }}>
                <DataValueLabel dataElement={pde.dataElement.id} />
                <DataValueField dataElement={pde.dataElement.id} />
              </div>
            );
          })}
        {formType === "section" && <SectionForm />}
        {formType === "icustom" && <ICustomForm />}
        {formType === "custom" && CustomForm && CustomForm}
      </div>
      <div>
        {layout.eventSaveButton ? (
          layout.eventSaveButton
        ) : (
          <Button
            variant="contained"
            disabled={!isValid || !currentEvent.isDirty || isDataSetCompleted || layout.disableEventSaveButton}
            onClick={async () => {
              if (currentEvent.isDirty) {
                setLayout("formLoading", true);
                const result = await event.saveEvent(convertToDhis2Event(currentEvent));
                if (result.ok) {
                  toast.success(t("eventSaved"), {
                    position: "bottom-center",
                    autoClose: 3000,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined
                  });
                  fetchEvents();
                  if (eventSaveHandlers.length > 0) {
                    eventSaveHandlers.forEach((evh) => {
                      evh.handler(currentEvent);
                    });
                  }
                } else {
                  setApiError({ ...result });
                }
                setLayout("formLoading", false);
                setCurrentEventProperty("isDirty", false);
                setCurrentEventProperty("isNew", false);
              }
            }}
          >
            {t("save")}
          </Button>
        )}
        {!layout.hideEventFormCompleteButton ? (
          completed ? (
            <Button
              variant="contained"
              disabled={!me.canUncompleteEvent || isDataSetCompleted}
              color="warning"
              onClick={async () => {
                setLayout("formLoading", true);
                const toBeSavedEvent = { ...currentEvent, status: "ACTIVE" };
                const result = await event.saveEvent(convertToDhis2Event(toBeSavedEvent));
                if (result.ok) {
                  toast.success(t("eventIncompleted"), {
                    position: "bottom-center",
                    autoClose: 3000,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined
                  });
                  fetchEvents();
                } else {
                  setApiError({ ...result });
                }
                setCurrentEventProperty("status", "ACTIVE");
                setCurrentEventProperty("isDirty", false);
                setLayout("formLoading", false);
              }}
            >
              {t("incomplete")}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              disabled={!isValid || isDataSetCompleted}
              onClick={async () => {
                setLayout("formLoading", true);
                const toBeSavedEvent = { ...currentEvent, status: "COMPLETED" };
                if (VITE_TRACKER_API === "new") {
                  toBeSavedEvent.completedAt = format(new Date(), "yyyy-MM-dd");
                }
                const result = await event.saveEvent(convertToDhis2Event(toBeSavedEvent));
                if (result.ok) {
                  toast.success(t("eventCompleted"), {
                    position: "bottom-center",
                    autoClose: 3000,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined
                  });
                  fetchEvents();
                } else {
                  setApiError({ ...result });
                }
                setCurrentEventProperty("status", "COMPLETED");
                setCurrentEventProperty("isDirty", false);
                setLayout("formLoading", false);
              }}
            >
              {t("complete")}
            </Button>
          )
        ) : null}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            close();
          }}
        >
          {t("close")}
        </Button>
        {!layout.hideEventDeleteButton && (
          <div style={{ marginLeft: "auto", marginRight: 10 }}>
            <Button
              disabled={currentEvent.isNew || isDataSetCompleted}
              variant="contained"
              color="error"
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
            >
              {t("deleteEvent")}
            </Button>
          </div>
        )}
      </div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
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
            {t("deleteEventConfirmation")}
          </Alert>
          <br />
          <Button
            color="primary"
            onClick={async () => {
              setLayout("formLoading", true);
              const result = await event.deleteEvent({
                event: currentEvent.event
              });
              if (result.ok) {
                toast.success(t("eventDeleted"), {
                  position: "bottom-center",
                  autoClose: 3000,
                  closeOnClick: false,
                  pauseOnHover: false,
                  draggable: false,
                  progress: undefined
                });
                setCurrentEventProperty("isDirty", false);
                close();
                fetchEvents();
              } else {
                setApiError({ ...result });
              }
              setAnchorEl(null);
              setLayout("formLoading", false);
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

export default withModuleSection(Form, "eventEntryForm");
