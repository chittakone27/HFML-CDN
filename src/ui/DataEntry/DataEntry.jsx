import DefaultForm from "./Form/DefaultForm";
import CustomForm from "./Form/CustomForm";
import SectionForm from "./Form/SectionForm";
import EntryFormInfo from "./EntryFormInfo/EntryFormInfo";
import useSelectionStore from "@/state/selection";
import "./DataEntry.css";
import configs from "@/configs";
const { VITE_CONFIG_NAME } = import.meta.env;
const { customForms } = configs[VITE_CONFIG_NAME];

const DataEntry = () => {
  const dataSet = useSelectionStore((state) => state.dataSet);
  let formType = "default";
  if (dataSet.sections.length > 0) {
    formType = "section";
  }
  if (customForms[dataSet.id]) {
    formType = "custom";
  }
  return (
    <div className="data-entry-container">
      <div>
        {formType === "default" && <DefaultForm buttons={[<EntryFormInfo />]} />}
        {formType === "section" && <SectionForm buttons={[<EntryFormInfo />]} />}
        {formType === "custom" && <CustomForm buttons={[<EntryFormInfo />]} />}
      </div>
      {/* <div>
        <RightPanel />
      </div> */}
    </div>
  );
};

export default DataEntry;
