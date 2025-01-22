import { useTranslation } from "react-i18next";

const withModuleSection = (Component, title) => {
  const WrappedComponent = ({ style, buttons, ...props }) => {
    const { t } = useTranslation();
    return (
      <div
        style={{
          border: "2px solid #2c6693",
          borderRadius: 3,
          width: "100%",
          height: "100%",

          ...style
        }}
      >
        <div
          style={{
            padding: "0px 5px 0px 5px",
            display: "flex",
            alignItems: "center",
            height: 40,
            borderBottom: "2px solid #2c6693",
            fontWeight: "bold",
            fontSize: 16,
            color: "#2c6693"
            // backgroundColor: "#2c6693"
          }}
        >
          <div>{t(title)}</div>
          <div
            style={{
              height: "100%",
              marginLeft: "auto",
              display: "flex",
              alignItems: "center"
            }}
          >
            {buttons}
          </div>
        </div>
        <div style={{ overflow: "auto", height: "calc(100% - 40px)" }}>
          <Component {...props} />
        </div>
      </div>
    );
  };
  return WrappedComponent;
};

export default withModuleSection;
