import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import "./Loader.css";

const Loader = (props) => {
  const { children, type } = props;
  return type === "fullscreen" ? (
    <div className="loading-fullscreen-container">
      <div>
        <CircularProgress size={80} thickness={2} sx={{ marginBottom: 2 }} />
        <Typography>{children}</Typography>
      </div>
    </div>
  ) : (
    <div className="loading-container">
      <CircularProgress size={80} thickness={2} sx={{ marginBottom: 2 }} />
      <Typography>{children}</Typography>
    </div>
  );
};

export default Loader;
