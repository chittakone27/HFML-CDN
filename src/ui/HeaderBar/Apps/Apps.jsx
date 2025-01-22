import { Card, TextField } from "@mui/material";
import { colors, theme } from "../constants";
import { Apps as IconApps24, SettingsOutlined } from "@mui/icons-material";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { joinPath } from "../utils";

/**
 * Copied from here:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
 */

const escapeRegExpCharacters = (text) => {
  return text.replace(/[/.*+?^${}()|[\]\\]/g, "\\$&");
};

const Search = ({ value, onChange, baseUrl }) => {
  return (
    <div className="headerbar-search-div">
      <div>
        <TextField
          fullWidth
          value={value}
          name="filter"
          label="Search apps"
          onChange={(event) => {
            onChange({ value: event.target.value });
          }}
          autoFocus
        />
      </div>
      <div>
        <a href={joinPath(baseUrl, "dhis-web-menu-management")}>
          <SettingsOutlined sx={{ color: colors.grey700 }} />
        </a>
      </div>
    </div>
  );
};

const Item = ({ name, path, img }) => {
  return (
    <a href={path} className="headerbar-apps-a">
      <img src={img} alt="app logo" className="headerbar-apps-img" />
      <div className="headerbar-apps-item-div">{name}</div>
    </a>
  );
};

const List = ({ apps, filter }) => {
  return (
    <div data-test="headerbar-apps-menu-list" className="headerbar-apps-list">
      {apps
        .filter(({ displayName, name }) => {
          const appName = displayName || name;
          const formattedAppName = appName.toLowerCase();
          const formattedFilter = escapeRegExpCharacters(filter).toLowerCase();
          return filter.length > 0 ? formattedAppName.match(formattedFilter) : true;
        })
        .map(({ displayName, name, defaultAction, icon }, idx) => (
          <Item key={`app-${name}-${idx}`} name={displayName || name} path={defaultAction} img={icon} />
        ))}
    </div>
  );
};

const AppMenu = ({ apps, filter, onFilterChange, baseUrl }) => (
  <div data-test="headerbar-apps-menu" className="headerbar-apps-menu">
    <Card>
      <Search value={filter} onChange={onFilterChange} baseUrl={baseUrl} />
      <List apps={apps} filter={filter} />
    </Card>
  </div>
);

const Apps = ({ apps, baseUrl }) => {
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState("");

  const handleVisibilityToggle = useCallback(() => setShow(!show), [show]);
  const handleFilterChange = useCallback(({ value }) => {
    setFilter(value);
  }, []);

  const containerEl = useRef(null);
  const onDocClick = useCallback((evt) => {
    if (containerEl.current && !containerEl.current.contains(evt.target)) {
      setShow(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div ref={containerEl} data-test="headerbar-apps" className="headerbar-apps">
      <button onClick={handleVisibilityToggle} data-test="headerbar-apps-icon" className="headerbar-apps-button">
        <IconApps24 sx={{ color: "#ffffff" }} />
      </button>
      {show ? <AppMenu apps={apps} filter={filter} onFilterChange={handleFilterChange} baseUrl={baseUrl} /> : null}
    </div>
  );
};

export default Apps;
