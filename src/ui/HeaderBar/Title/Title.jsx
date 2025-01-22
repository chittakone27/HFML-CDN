const Title = ({ app, instance }) => (
  <div className="header-bar-title-container">{app ? `${instance} - ${app}` : `${instance}`}</div>
);
export default Title;
