import useIndicatorEngine from "../hooks/useIndicatorEngine";
import { Input } from "@/ui/common";

const IndicatorField = ({ id }) => {
  const value = useIndicatorEngine(id);
  return (
    <div className="data-entry-input-field-container">
      <Input disabled={true} valueType="TEXT" value={value} />
    </div>
  );
};

export default IndicatorField;
