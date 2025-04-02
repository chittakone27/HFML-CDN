const Row = ({ label, field, labelWidth }) => {
  const labelStyle = labelWidth ? { width: labelWidth } : { width: 270 };
  const fieldStyle = labelWidth ? { width: `calc(100% - ${labelWidth}px)` } : { width: `calc(100% - 270px)` };
  return (
    <div className="chr-tracker-field-row">
      <div style={labelStyle}>{label}</div>
      <div style={fieldStyle}>{field}</div>
    </div>
  );
};
export default Row;
