import { Box, Table, TableBody } from "@mui/material";

import "../common/index.css";

import Section from "./components/Section";

const MscHealthCentre = () => {
  return (
    <Box id="msc-health-centre-form-container" className="custom-form">
      <div>hello</div>
      {/* <Section dataElementConfigs={dataElementConfigs} /> */}
    </Box>
  );
};

const commonProps = {
  fieldCellProps: { className: "checkbox" },
};

const dataElementConfigs = [[[{ display: "text", text: "hello" }]]];

export default MscHealthCentre;
