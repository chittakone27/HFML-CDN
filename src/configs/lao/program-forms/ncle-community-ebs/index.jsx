// import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import DataValueLabel from "@/ui/EventCapture/Form/DataValueLabel";
import DataValueField from "@/ui/EventCapture/Form/DataValueField";
import "./ncle-community-ebs.css";
import useEventCaptureStore from "@/state/eventCapture";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import InvestigateBy from "../common/Ebs/InvestigateBy";
import { INVESTIGATED_BY_OPTS } from "../common/Ebs/const";

const NcleCommunityEbs = () => {
  // const { dataElements } = useMetadataStore((state) => state.dataElements);
  const { currentEvent, actions, status } = useEventCaptureStore(
    useShallow((state) => ({
      currentEvent: state.currentEvent,
      actions: state.actions,
      status: state.status
    }))
  );
  const { setCurrentEventDataValue } = actions;
  const { hiddenFields } = status;
  const program = useSelectionStore((state) => state.program);
  const sections = program.programStages[0].programStageSections;
  const foundFinalAssessmentSection = sections.find((section) => section.id === "uXSDa2jRbSM");
  const [props, setProps] = useState({});
  useEffect(() => {
    const currentProps = {};
    const eventResponsed = currentEvent.dataValues.NGUG0to27Yf;
    if (eventResponsed === "true") {
      currentProps.hideFinalAssessmentSection = false;
    } else {
      currentProps.hideFinalAssessmentSection = true;
      foundFinalAssessmentSection.dataElements.forEach((de) => {
        setCurrentEventDataValue(de.id, "");
      });
    }
    setProps({ ...currentProps });
  }, [JSON.stringify(currentEvent)]);
  return (
    <div className="ncle-community-ebs-form-container">
      {sections.map((section) => {
        if (section.id === "uXSDa2jRbSM" && props.hideFinalAssessmentSection) {
          return null;
        }
        return (
          <div className="ncle-community-ebs-section-container">
            <div className="ncle-community-ebs-section-label">{section.displayName}</div>
            {section.dataElements.map((de) => {
              if (hiddenFields.includes(de.id) || INVESTIGATED_BY_OPTS.includes(de.id)) {
                return null;
              }
              return de.id !== "PWnpVKZKxpq" ? (
                <div className="ncle-community-ebs-form-row">
                  <DataValueLabel dataElement={de.id} />
                  <DataValueField dataElement={de.id} />
                </div>
              ) : (
                <div className="ncle-community-ebs-form-row">
                  <DataValueLabel dataElement={de.id} />
                  <InvestigateBy />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default NcleCommunityEbs;
