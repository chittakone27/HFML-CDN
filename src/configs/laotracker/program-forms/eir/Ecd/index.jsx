import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useSelectionStore from "@/state/selection";
//
import TrackerTableSection from "../../common/TrackerTableSection";
//
import moment from "moment";
//
import "./index.css";
//
import { ECD_STAGE_ID, DOB_ATTR_ID, ASSESSMENT_SECTION_ID } from "./const";

const Ecd = () => {
  const [pssFilter, setPssFilter] = useState([]);
  const { currentEvent } = useCurrentEvent();
  const { program } = useSelectionStore(
    useShallow((state) => ({
      program: state.program
    }))
  );
  const { data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions
    }))
  );
  const { currentTei } = data;
  const ecdStage = program.programStages.find(
    (progState) => progState.id === ECD_STAGE_ID
  );
  const { programStageSections } = ecdStage;

  useEffect(() => {
    for (const pss of programStageSections) {
      if (!pssFilter.includes(pss.id)) {
        pss.dataElements.forEach((de) => {
          actions.changeDataValue(currentEvent.event, de.id, "");
        });
      }
    }
  }, [pssFilter]);

  useEffect(() => {
    const dobObj = currentTei.attributes.find(
      (attr) => attr["attribute"] === DOB_ATTR_ID
    );
    if (currentEvent.eventDate && dobObj && dobObj.value) {
      const evtDateSubStrs = currentEvent.eventDate.split("T");
      const formattedEvtDate = moment(evtDateSubStrs[0]);
      const formattedDob = moment(dobObj.value);
      const diffWeeks = formattedEvtDate.diff(formattedDob, "weeks");
      const diffMonths = formattedEvtDate.diff(formattedDob, "months");
      const diffYears = formattedEvtDate.diff(formattedDob, "years");
      switch (true) {
        case diffWeeks < 6:
          setPssFilter([ASSESSMENT_SECTION_ID, "wcFGDbS7sBu"]);
          break;
        case diffWeeks >= 6 && diffMonths < 2:
          setPssFilter([ASSESSMENT_SECTION_ID, "czkODN1oO4r"]);
          break;
        case diffMonths >= 2 && diffMonths < 3:
          setPssFilter([ASSESSMENT_SECTION_ID, "lZ2AxMOmuDs"]);
          break;
        case diffMonths >= 3 && diffMonths < 6:
          setPssFilter([ASSESSMENT_SECTION_ID, "NEnjbszbGGP"]);
          break;
        case diffMonths >= 6 && diffMonths < 9:
          setPssFilter([ASSESSMENT_SECTION_ID, "darnqpZofBM"]);
          break;
        case diffMonths >= 9 && diffMonths <= 12:
          setPssFilter([ASSESSMENT_SECTION_ID, "nlsw1Vsn7tV"]);
          break;
        case diffMonths > 12 && diffMonths < 24:
          setPssFilter([ASSESSMENT_SECTION_ID, "a0XE8gWnFqc"]);
          break;
        case diffYears >= 2 && diffYears < 3:
          setPssFilter([ASSESSMENT_SECTION_ID, "W3YbMLjZlKe"]);
          break;
        case diffYears >= 3 && diffYears < 4:
          setPssFilter([ASSESSMENT_SECTION_ID, "aN85Vqk1G3o"]);
          break;
        case diffYears >= 4 && diffYears < 5:
          setPssFilter([ASSESSMENT_SECTION_ID, "sWgSCR9hQSr"]);
          break;
        case diffYears <= 5:
          setPssFilter([ASSESSMENT_SECTION_ID, "cQKCa55QgkV"]);
          break;
        default:
          setPssFilter([ASSESSMENT_SECTION_ID, "Hux3mGP8z0H"]);
          break;
      }
    }
  }, [JSON.stringify(currentTei), JSON.stringify(currentEvent)]);

  return (
    <div className="ecd-container">
      {programStageSections &&
        programStageSections
          .filter((pss) => pssFilter.includes(pss.id))
          .map((pss) => {
            const sectionDeConfigs = pss.dataElements.map((de) => {
              return [
                {
                  id: de.id,
                  labelCellProps: {
                    sx: {
                      padding: "5px"
                    }
                  },
                  fieldCellProps: {
                    sx: {
                      width: "50%",
                      padding: "5px"
                    }
                  }
                }
              ];
            });
            return (
              <TrackerTableSection
                dataElementConfigs={sectionDeConfigs}
                sectionTitle={pss.displayName}
                sx={{
                  border: "2px solid #CFD8DC",
                  marginBottom: "15px"
                }}
              />
            );
          })}
    </div>
  );
};

export default Ecd;
