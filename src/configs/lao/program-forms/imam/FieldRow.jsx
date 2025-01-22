import AttributeLabel from "@/ui/TrackerCapture/Profile-old/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile-old/AttributeField";
import DataValueLabel from "@/ui/TrackerCapture/EventForm-old/DataValueLabel";
import DataValueField from "@/ui/TrackerCapture/EventForm-old/DataValueField";
import EventDateField from "@/ui/TrackerCapture/EventForm-old/EventDateField";
import EventDateLabel from "@/ui/TrackerCapture/EventForm-old/EventDateLabel";
import "./FieldRow.css";

const FieldRow = (props) => {
  let { customLabel, type, id, children, labelWidth, inputWidth, label } = props;
  return type === "customCheckList" ? (
    <div className="field-row-checklist-container">{props.children}</div>
  ) : (
    <div className={type === "checkBox" ? "field-row-checkbox-container" : "field-row-container"}>
      {type === "attribute" && [
        <div style={{ width: labelWidth ? labelWidth : "250px" }}>{customLabel ? <div>{customLabel}</div> : <AttributeLabel attribute={id} />}</div>,
        <AttributeField attribute={id} {...props} />
      ]}
      {type === "dataElement" && [
        <div style={{ width: labelWidth ? labelWidth : "250px" }}>
          {customLabel ? <div>{customLabel}</div> : <DataValueLabel dataElement={id} />}
        </div>,
        <div style={{ width: inputWidth ? inputWidth : "40%" }}>
          <DataValueField dataElement={id} {...props} />
        </div>
      ]}
      {type === "date" && [
        <div style={{ width: labelWidth ? labelWidth : "250px" }}>{customLabel ? <div>{customLabel}</div> : <EventDateLabel label={label} />}</div>,
        <div style={{ width: inputWidth ? inputWidth : "40%" }}>
          <EventDateField dataElement={id} {...props} />
        </div>
      ]}
      {type === "checkBox" && (
        <div style={{ width: labelWidth ? labelWidth : "250px" }}>
          <DataValueField dataElement={id} {...props} label={customLabel ? customLabel : ""} />
        </div>
      )}
      {type === "custom" && [<div>{customLabel}</div>, props.children]}
    </div>
  );
};
export default FieldRow;
