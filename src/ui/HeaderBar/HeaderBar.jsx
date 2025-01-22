import { useEffect, useState, useMemo } from "react";
import Logo from "./Logo/Logo";
import Title from "./Title/Title";
import Notifications from "./Notificattions/Notifications";
import Apps from "./Apps/Apps";
import Profile from "./Profile/Profile";
import { metadata } from "@/api";
import { joinPath } from "./utils";
import "./HeaderBar.css";
const { getHeaderBarData } = metadata;
const { VITE_BASE_URL } = import.meta.env;

const HeaderBar = () => {
  const [headerBarData, setHeaderBarData] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getHeaderBarData();
      setHeaderBarData({ ...data });
    })();
  }, []);

  const apps = useMemo(() => {
    const getPath = (path) =>
      path.startsWith("http:") || path.startsWith("https:") ? path : joinPath(VITE_BASE_URL, "api", path);

    return headerBarData?.apps.modules.map((app) => ({
      ...app,
      icon: getPath(app.icon),
      defaultAction: getPath(app.defaultAction)
    }));
  }, [headerBarData]);

  return (
    <header className="headerbar-container">
      {headerBarData && (
        <div className="main">
          <Logo baseUrl={VITE_BASE_URL} />
          <Title app="iCapture" instance={headerBarData.applicationTitle} />
          {/* <OnlineStatus /> */}
          <div className="right-control-spacer" />
          <Notifications
            interpretations={headerBarData.notifications.unreadInterpretations}
            messages={headerBarData.notifications.unreadMessageConversations}
            userAuthorities={headerBarData.user.authorities}
            baseUrl={VITE_BASE_URL}
          />
          <Apps apps={apps} baseUrl={VITE_BASE_URL} />
          <Profile
            name={headerBarData.user.name}
            email={headerBarData.user.email}
            avatarId={headerBarData.user.avatar?.id}
            helpUrl={headerBarData.help.helpPageLink}
            baseUrl={VITE_BASE_URL}
          />
        </div>
      )}
    </header>
  );
};
export default HeaderBar;
