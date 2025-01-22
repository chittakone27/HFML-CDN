import { joinPath } from "../utils";
import NotificationIcon from "./NotificationIcon";

/*
 AUTHORITIES:
 - ALL: superuser
 - M_dhis-web-interpretation: access to interpretations app
 - M_dhis-web-messaging: access to messaging app
 */

const hasAuthority = (userAuthorities, authId) =>
  Array.isArray(userAuthorities) && userAuthorities.some((userAuthId) => userAuthId === "ALL" || userAuthId === authId);

const Notifications = ({ baseUrl, interpretations, messages, userAuthorities }) => {
  return (
    <div className="notifications-container">
      {hasAuthority(userAuthorities, "M_dhis-web-interpretation") && (
        <NotificationIcon
          count={interpretations}
          href={joinPath(baseUrl, "dhis-web-interpretation")}
          kind="message"
          dataTestId="headerbar-interpretations"
        />
      )}

      {hasAuthority(userAuthorities, "M_dhis-web-messaging") && (
        <NotificationIcon
          message="email"
          count={messages}
          href={joinPath(baseUrl, "dhis-web-messaging")}
          kind="interpretation"
          dataTestId="headerbar-messages"
        />
      )}
    </div>
  );
};

export default Notifications;
