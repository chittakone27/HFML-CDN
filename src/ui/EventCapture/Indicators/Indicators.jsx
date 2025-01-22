import withModuleSection from "@/hocs/withModuleSection";
import wip from "@/assets/wip.png";
import "./Indicators.css";

const Indicators = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        opacity: 0.3,
        backgroundColor: "#d6d6d6"
      }}
    >
      <img src={wip} max-width="100%" height="auto" />
    </div>
  );
};

export default withModuleSection(Indicators, "indicatorsFor");
