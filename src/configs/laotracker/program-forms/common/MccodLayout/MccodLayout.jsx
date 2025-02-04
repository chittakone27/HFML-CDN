import { useTranslation } from "react-i18next";
import "./MccodLayout.css";
const MccodLayout = () => {
  const { t } = useTranslation();
  return (
    <div className="mccod-layout-container">
      {t("mccodHelper")} <a href="/api/apps/ICD-10-Cause-of-Death/index.html">{t("link")}</a>
    </div>
  );
};

export default MccodLayout;
