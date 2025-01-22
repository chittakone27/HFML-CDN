import DataValueField from "@/ui/DataEntry/Form/DataValueField";
import DataElementTotalField from "@/ui/DataEntry/Form/DataElementTotalField";
import useSelectionStore from "@/state/selection";

const DungTest = () => {
  const dataSet = useSelectionStore((state) => state.dataSet);
  console.log(dataSet);
  return (
    <div>
      <DataValueField dsde="h8KiBz2888q" cc="FU2zdnyL2tq" coc="eFXrDqXA2WQ" />
      <DataValueField dsde="h8KiBz2888q" cc="FU2zdnyL2tq" coc="z1oXoHKWhla" />
      <DataValueField dsde="h8KiBz2888q" cc="FU2zdnyL2tq" coc="BaKsAyoQBud" />
      <DataElementTotalField dsde="h8KiBz2888q" />
    </div>
  );
};

export default DungTest;
