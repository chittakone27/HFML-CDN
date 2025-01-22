import "./Section.css";

const Section = ({ title, children }) => {
  return (
    <div className="imam-section-container">
      <div>{title}</div>
      <div>{children}</div>
    </div>
  );
};

export default Section;
