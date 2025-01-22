import withModuleSection from "@/hocs/withModuleSection";
import _ from "lodash";
import "./Form.css";
import { Loader } from "@/ui/common";
import useSelectionStore from "@/state/selection";
import useDataEntryLogics from "../hooks/useDataEntryLogics";
import configs from "@/configs";
const { VITE_CONFIG_NAME } = import.meta.env;
const { customForms } = configs[VITE_CONFIG_NAME];

const CustomForm = () => {
  const { loading } = useDataEntryLogics();
  const dataSet = useSelectionStore((state) => state.dataSet);
  const CurrentCustomForm = customForms[dataSet.id];
  return <div className="data-entry-form-container">{loading ? <Loader /> : <CurrentCustomForm />}</div>;
};

export default withModuleSection(CustomForm, "entryForm");
