import UserAvatar from "./UserAvatar";
import React from "react";
import ProfileMenu from "./ProfileMenu";
class Profile extends React.Component {
  state = {
    show: false
  };

  componentDidMount() {
    document.addEventListener("click", this.onDocClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.onDocClick);
  }

  onDocClick = (evt) => {
    if (this.elContainer && !this.elContainer.contains(evt.target)) {
      this.setState({ show: false });
    }
  };

  handleToggle = () => this.setState({ show: !this.state.show });

  render() {
    const { name, email, avatarId, helpUrl, baseUrl } = this.props;
    return (
      <div ref={(c) => (this.elContainer = c)} data-test="headerbar-profile" className="headerbar-profile">
        <button className="headerbar-profile-btn" onClick={this.handleToggle}>
          <UserAvatar avatarId={avatarId} name={name} dataTest="headerbar-profile-icon" medium baseUrl={baseUrl} />
        </button>
        {this.state.show ? (
          <ProfileMenu avatarId={avatarId} name={name} email={email} helpUrl={helpUrl} baseUrl={baseUrl} />
        ) : null}
      </div>
    );
  }
}

export default Profile;
