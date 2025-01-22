import { Card } from "@mui/material";
// import { MenuItem } from "@dhis2-ui/menu";
import { MenuList, MenuItem, ListItemText, ListItemIcon } from "@mui/material";
import { colors } from "../constants";
// import { IconSettings24, IconInfo24, IconLogOut24, IconUser24, IconQuestion24 } from "@dhis2/ui-icons";
import { SettingsOutlined, AccountBoxOutlined, HelpOutlineOutlined, InfoOutlined, Logout } from "@mui/icons-material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { joinPath } from "../utils";
import ProfileHeader from "./ProfileHeader";

const ProfileContents = ({ name, email, avatarId, helpUrl, baseUrl }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Card>
      <div className="headerbar-profile-contents">
        <ProfileHeader name={name} email={email} avatarId={avatarId} baseUrl={baseUrl} />
        <ul data-test="headerbar-profile-menu" className="headerbar-profile-contents-ul">
          {/* <MenuItem
            href={joinPath(baseUrl, "dhis-web-user-profile/#/settings")}
            label={i18n.t("Settings")}
            value="settings"
            icon={<IconSettings24 color={colors.grey700} />}
          />
          <MenuItem
            href={joinPath(baseUrl, "dhis-web-user-profile/#/account")}
            label={i18n.t("Account")}
            value="account"
            icon={<IconUser24 color={colors.grey700} />}
          />
          {helpUrl && (
            <MenuItem
              href={helpUrl}
              label={i18n.t("Help")}
              value="help"
              icon={<IconQuestion24 color={colors.grey700} />}
            />
          )}
          <MenuItem
            href={joinPath(baseUrl, "dhis-web-user-profile/#/aboutPage")}
            label={i18n.t("About DHIS2")}
            value="about"
            icon={<IconInfo24 color={colors.grey700} />}
          />
          <MenuItem
            href={joinPath(baseUrl, "dhis-web-commons-security/logout.action")}
            // NB: By MenuItem implementation, this callback
            // overwrites default navigation behavior but maintains
            // the href attribute
            onClick={async () => {
              setLoading(true);
              await clearSensitiveCaches();
              setLoading(false);
              window.location.assign(joinPath(baseUrl, "dhis-web-commons-security/logout.action"));
            }}
            label={i18n.t("Logout")}
            value="logout"
            icon={<IconLogOut24 color={colors.grey700} />}
          /> */}
          <MenuList>
            <MenuItem
              sx={{ padding: 1.5 }}
              onClick={() => {
                window.location.assign(joinPath(baseUrl, "dhis-web-user-profile/#/settings"));
              }}
            >
              <ListItemIcon>
                <SettingsOutlined />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </MenuItem>
            <MenuItem
              sx={{ padding: 1.5 }}
              onClick={() => {
                window.location.assign(joinPath(baseUrl, "dhis-web-user-profile/#/account"));
              }}
            >
              <ListItemIcon>
                <AccountBoxOutlined />
              </ListItemIcon>
              <ListItemText>Account</ListItemText>
            </MenuItem>
            {helpUrl && (
              <MenuItem
                sx={{ padding: 1.5 }}
                onClick={() => {
                  window.location.assign(helpUrl);
                }}
              >
                <ListItemIcon>
                  <HelpOutlineOutlined />
                </ListItemIcon>
                <ListItemText>Help</ListItemText>
              </MenuItem>
            )}
            <MenuItem
              sx={{ padding: 1.5 }}
              onClick={() => {
                window.location.assign(joinPath(baseUrl, "dhis-web-user-profile/#/aboutPage"));
              }}
            >
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText>About DHIS2</ListItemText>
            </MenuItem>
            <MenuItem
              sx={{ padding: 1.5 }}
              onClick={() => {
                window.location.assign(joinPath(baseUrl, "dhis-web-commons-security/logout.action"));
              }}
            >
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </MenuList>
        </ul>
      </div>
    </Card>
  );
};

ProfileContents.propTypes = {
  avatarId: PropTypes.string,
  email: PropTypes.string,
  helpUrl: PropTypes.string,
  name: PropTypes.string
};

const ProfileMenu = ({ avatarId, name, email, helpUrl, baseUrl }) => (
  <div data-test="headerbar-profile-menu" className="headerbar-profile-menu">
    <ProfileContents name={name} email={email} avatarId={avatarId} helpUrl={helpUrl} baseUrl={baseUrl} />
  </div>
);

export default ProfileMenu;
