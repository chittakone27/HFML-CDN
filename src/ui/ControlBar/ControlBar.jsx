import ProgramDataSetSelector from "./ProgramDataSetSelector/ProgramDataSetSelector";
import OrgUnitSelector from "./OrgUnitSelector/OrgUnitSelector";
import PeriodSelector from "./PeriodSelector/PeriodSelector";
import NewEventButton from "./NewEventButton";
import NewTeiButton from "./NewTeiButton";
import TrackerGoBackButton from "./TrackerGoBackButton";
import TrackerSearchButton from "./TrackerSearchButton";
import CompleteButton from "./CompleteButton";
import AttributeComboSelector from "./AttributeComboSelector/AttributeComboSelector";
import RunValidationsButton from "./RunValidationsButton";
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  Divider,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCircleQuestion,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import Warning from "./Warning";
import useControlBarLogics from "./hooks/useControlBarLogics";
import useCompleteness from "./hooks/useCompleteness";
import useSelectionStore from "@/state/selection";
import { useTranslation } from "react-i18next";
import "./ControlBar.css";
import Welcome from "./Welcome/Welcome";
import { useState } from "react";
import configs from "@/configs";
const { VITE_CONFIG_NAME } = import.meta.env;
const { customControlBarComponent } = configs[VITE_CONFIG_NAME];
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import useControlBarStore from "@/state/controlBar";

const ControlBar = () => {
  const { t } = useTranslation();
  const [help, setHelp] = useState(false);
  const [content, setContent] = useState(false);
  const layout = useControlBarStore((state) => state.layout);
  const {
    renderOrgUnitSelector,
    renderPeriodSelector,
    renderAttributeComboSelector,
    renderNewEventButton,
    renderTrackerGoBackButton,
    renderNewTeiButton,
    renderTrackerSearchButton,
    renderCompleteButton,
    disableCompleteButton,
    renderRunValidationsButton,
    disabled,
  } = useControlBarLogics();

  const { completeness } = useCompleteness();
  const { program } = useSelectionStore();
  let CustomControlBarComponent = null;
  let props;
  if (
    program &&
    customControlBarComponent &&
    customControlBarComponent[program.id]
  ) {
    CustomControlBarComponent = customControlBarComponent[program.id];
    props = {
      renderOrgUnitSelector,
      renderPeriodSelector,
      renderAttributeComboSelector,
      renderNewEventButton,
      renderTrackerGoBackButton,
      renderNewTeiButton,
      renderTrackerSearchButton,
      renderCompleteButton,
      renderRunValidationsButton,
      disabled,
    };
  }
  const generateDefaultButtons = () => {
    return [
      renderAttributeComboSelector && (
        <AttributeComboSelector disabled={disabled} />
      ),
      renderNewEventButton && <NewEventButton disabled={completeness} />,
      renderTrackerGoBackButton && <TrackerGoBackButton />,
      renderNewTeiButton && <NewTeiButton />,
      renderTrackerSearchButton && <TrackerSearchButton />,
      renderCompleteButton && !layout.hideCompleteButton && (
        <CompleteButton disabled={disabled || disableCompleteButton} />
      ),
      renderRunValidationsButton && <RunValidationsButton />,
      program && completeness && <Warning />,
      layout.customControlBarComponent
        ? layout.customControlBarComponent
        : null,
    ];
  };

  return (
    <div className="controlbar-container">
      <ProgramDataSetSelector disabled={disabled} />
      {renderOrgUnitSelector && <OrgUnitSelector disabled={disabled} />}
      {renderPeriodSelector && <PeriodSelector disabled={disabled} />}
      {CustomControlBarComponent ? (
        <CustomControlBarComponent {...props} />
      ) : (
        generateDefaultButtons()
      )}
      <div className="control-bar-right-buttons">
        {layout.customElements}
        <Tooltip title={t("help")}>
          <div>
            <IconButton
              onClick={() => {
                setHelp(true);
              }}
            >
              <FontAwesomeIcon icon={faCircleQuestion} />
            </IconButton>
          </div>
        </Tooltip>
      </div>
      <Dialog
        open={help}
        fullWidth
        maxWidth="xl"
        onClose={() => {
          setHelp(false);
          setContent(null);
        }}
      >
        <DialogTitle id="customized-dialog-title">
          {t("help")}
          <IconButton
            aria-label="close"
            onClick={() => {
              setHelp(false);
              setContent(null);
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 12,
            }}
          >
            <FontAwesomeIcon icon={faClose} fontSize={24} />
          </IconButton>
        </DialogTitle>
        <Divider />
        <div className="help-dialog-content-container">
          <Slide direction="right" in={!content} mountOnEnter unmountOnExit>
            <div className="help-dialog-content-home">
              <Welcome
                select={(doc) => {
                  setContent(doc);
                }}
              />
            </div>
          </Slide>
          <Slide direction="left" in={content} mountOnEnter unmountOnExit>
            <div className="help-content">
              {(() => {
                if (content) {
                  if (content.type === "googleDoc") {
                    return (
                      <iframe
                        src={content.url + `&time=${new Date()}`}
                        width="900px"
                        height="100%"
                        frameBorder="0"
                      ></iframe>
                    );
                  } else if (content.type === "docx") {
                    return (
                      <DocViewer
                        documents={[{ uri: content.url }]}
                        pluginRenderers={DocViewerRenderers}
                      />
                    );
                  } else if (content.type === "component") {
                    return content.component;
                  } else {
                    return null;
                  }
                }
              })()}
            </div>
          </Slide>
        </div>
        <Divider />
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setContent(null);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ControlBar;
