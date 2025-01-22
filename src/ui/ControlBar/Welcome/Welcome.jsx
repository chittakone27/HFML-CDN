import "./Welcome.css";
import icon from "@/assets/icon.png";
import configs from "@/configs";
import { useTranslation } from "react-i18next";
const { VITE_CONFIG_NAME } = import.meta.env;
const { documents } = configs[VITE_CONFIG_NAME];

const Welcome = ({ select }) => {
  const { t } = useTranslation();
  return (
    <div className="welcome-screen-container">
      <div>
        <div>
          <img src={icon} width={60} />
        </div>
        <div className="welcome-screen-title">{t("welcomeToIcapture")}</div>
        <div>{t("version2.0")}</div>
        <br />
        <br />
        <div className="instructions-list">
          <ul className="instructions-list-ul">
            <li>{t("icaptureDescription")}</li>
            <li>
              <b>{t("gettingStarted")}</b>
            </li>
            <ul>
              <li>{t("step1")}</li>
              <li>{t("step2")}</li>
              <li>{t("step3")}</li>
            </ul>
          </ul>
        </div>
        <br />
        <div className="welcome-screen-title">{t("usefulDocuments")}</div>
        <div className="instructions-list">
          <ul className="instructions-list-ul selectable">
            {documents.map((doc) => {
              return (
                <li
                  onClick={() => {
                    if (doc.type !== "text") {
                      select(doc);
                    }
                  }}
                >
                  {t(doc.label)}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
