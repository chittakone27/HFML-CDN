import { Button } from "@mui/material";
import withModuleSection from "@/hocs/withModuleSection";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useMetadataStore from "@/state/metadata";
import { shallow } from "zustand/shallow";
import configs from "@/configs";
import "./Profile.css";
const { VITE_CONFIG_NAME } = import.meta.env;

const Form = () => {
  const { customForms } = configs[VITE_CONFIG_NAME];
  const { t } = useTranslation();
  const { program, orgUnit } = useSelectionStore((state) => ({ program: state.program, orgUnit: state.orgUnit }), shallow);
  const { trackedEntityAttributes, optionSets } = useMetadataStore(
    (state) => ({ trackedEntityAttributes: state.trackedEntityAttributes, optionSets: state.optionSets }),
    shallow
  );
  const currentTeas = program.programTrackedEntityAttributes
    .filter((ptea) => ptea.displayInList)
    .map((ptea) => {
      const foundTea = trackedEntityAttributes.find((tea) => tea.id === ptea.trackedEntityAttribute.id);
      return foundTea;
    });

  const ProfileCustomForm = customForms[program.id] && customForms[program.id].profile;

  return <div className="tracker-custom-profile-container">{ProfileCustomForm ? <ProfileCustomForm /> : null}</div>;
};

export default Form;
