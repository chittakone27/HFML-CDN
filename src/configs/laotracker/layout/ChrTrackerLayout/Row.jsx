const Row = ({ label, field, labelWidth, height }) => {
  const labelStyle = labelWidth ? { width: labelWidth } : { width: 270 };
  const fieldStyle = labelWidth ? { width: `calc(100% - ${labelWidth}px)` } : { width: `calc(100% - 270px)` };
  const containerStyle = height ? { height } : undefined;
  return (
    <div className="chr-tracker-field-row" style={containerStyle}>
      <div style={labelStyle}>{label}</div>
      <div style={fieldStyle}>{field}</div>
    </div>
  );
};
export default Row;
