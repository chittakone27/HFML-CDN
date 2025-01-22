import UserAvatar from "./UserAvatar.jsx";
import PropTypes from "prop-types";
import React from "react";
import { joinPath } from "../utils";

const ProfileName = ({ children }) => (
  <div data-test="headerbar-profile-username" className="headerbar-profile-name">
    {children}
  </div>
);
ProfileName.propTypes = {
  children: PropTypes.string
};

const ProfileEmail = ({ children }) => (
  <div data-test="headerbar-profile-user-email" className="headerbar-profile-user-email">
    {children}
  </div>
);
ProfileEmail.propTypes = {
  children: PropTypes.string
};

const ProfileEdit = ({ children, baseUrl }) => {
  return (
    <a
      href={joinPath(baseUrl, "dhis-web-user-profile/#/profile")}
      data-test="headerbar-profile-edit-profile-link"
      className="headerbar-profile-edit-profile-link"
    >
      {children}
    </a>
  );
};

ProfileEdit.propTypes = {
  children: PropTypes.string
};

const ProfileDetails = ({ name, email, baseUrl }) => (
  <div className="headerbar-profile-details">
    <ProfileName>{name}</ProfileName>
    <ProfileEmail>{email}</ProfileEmail>
    <ProfileEdit baseUrl={baseUrl}>Edit profile</ProfileEdit>
  </div>
);

ProfileDetails.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string
};

const ProfileHeader = ({ name, email, avatarId, baseUrl }) => (
  <div className="headerbar-profile-header">
    <UserAvatar avatarId={avatarId} name={name} dataTest="headerbar-profile-menu-icon" large baseUrl={baseUrl} />
    <ProfileDetails name={name} email={email} baseUrl={baseUrl} />
  </div>
);

ProfileHeader.propTypes = {
  avatarId: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string
};
export default ProfileHeader;
