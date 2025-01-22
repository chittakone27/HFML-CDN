import DataValueLabel from "@/ui/EventCapture/Form/DataValueLabel";
import DataValueField from "@/ui/EventCapture/Form/DataValueField";
import { INVESTIGATED_BY_OPTS } from "../const";
import "./index.css";

const InvestigateBy = () => {
  return (
    <div className="ebs-multi-options-container">
      {INVESTIGATED_BY_OPTS.map((deId) =>
        deId !== "fY7DEDfX7Z9" ? (
          <div className="ebs-multi-opt">
            <DataValueField dataElement={deId} />
            <DataValueLabel dataElement={deId} />
          </div>
        ) : (
          <div className="ebs-multi-opt">
            <div style={{ marginRight: "10px" }}>
              <DataValueLabel dataElement={deId} />
            </div>
            <DataValueField dataElement={deId} />
          </div>
        )
      )}
    </div>
  );
};

export default InvestigateBy;
