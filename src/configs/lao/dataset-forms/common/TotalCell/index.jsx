import useDataEntryStore from "@/state/dataEntry";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";

const TotalCell = ({ listData }) => {
  if (!listData.length) return <>0</>;
  const dataValues = useDataEntryStore((state) => state.dataValues, shallow);
  const orgUnit = useSelectionStore((state) => state.orgUnit, shallow);
  const attributeOptionCombo = useSelectionStore(
    (state) => state.attributeOptionCombo,
    shallow
  );

  const total = listData.reduce(
    (prev, curr) =>
      prev +
      (dataValues[`${curr}-${orgUnit.id}-${attributeOptionCombo.id}`]?.value *
        1 || 0),
    0
  );

  return <>{total}</>;
};

export default TotalCell;
