import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./ui/App/App";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "./i18n";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./font.css";
import "leaflet/dist/leaflet.css";
import "@inovua/reactdatagrid-community/index.css";
const font = import.meta.env.VITE_FONT;
const style = document.createElement("style");
style.innerHTML = `
  *, * * {
    font-family: ${font}
  }
  `;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <ToastContainer pauseOnFocusLoss={false} theme="colored" />
      <App />
    </RecoilRoot>
  </ThemeProvider>
);
``;
