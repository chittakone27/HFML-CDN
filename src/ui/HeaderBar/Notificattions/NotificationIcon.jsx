import { ForumOutlined, MailOutlineOutlined } from "@mui/icons-material";
import React from "react";

function icon(kind) {
  if (kind === "message") {
    return <ForumOutlined sx={{ color: "#ffffff" }} />;
  } else {
    return <MailOutlineOutlined sx={{ color: "#ffffff" }} />;
  }
}

const NotificationIcon = ({ count, href, kind, dataTestId }) => (
  <a href={href} data-test={dataTestId} className="notification-icon-a">
    {icon(kind)}
    {count > 0 && (
      <span data-test={`${dataTestId}-count`} className="notification-icon-span">
        {count}
      </span>
    )}
  </a>
);
export default NotificationIcon;
