import LogoImage from "./LogoImage";

const Logo = ({ baseUrl }) => {
  return (
    <div className="header-bar-logo-container">
      <a href={baseUrl} className="logo-a">
        <LogoImage />
      </a>
    </div>
  );
};
export default Logo;
