import _ from "lodash";
import useMetadataStore from "@/state/metadata";
import { shallow } from "zustand/shallow";

const DataValueLabel = ({ dsde }) => {
  const { dataElements } = useMetadataStore(
    (state) => ({
      dataElements: state.dataElements
    }),
    shallow
  );
  const foundDe = dataElements.find((de) => de.id === dsde);

  return foundDe.displayFormName;
};

export default DataValueLabel;
