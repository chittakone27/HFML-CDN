const Row = ({ label, field }) => {
  return (
    <div className="chr-tracker-field-row">
      <div>{label}</div>
      <div>{field}</div>
    </div>
  );
};
export default Row;
