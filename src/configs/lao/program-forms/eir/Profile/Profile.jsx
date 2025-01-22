import { useMemo } from "react";
import { Box, Table, TableBody } from "@mui/material";

import {
  RowMapper,
  VillageSelector,
  withRules,
} from "@/configs/lao/program-forms/common/tracker";
import useProfileRules from "./useProfileRules";

import useTrackerCaptureStore from "@/state/trackerCapture";
import { shallow } from "zustand/shallow";
import "../eir.css";

const Profile = () => {
  const layout = useTrackerCaptureStore(
    (state) => state.layout.layout,
    shallow
  );
  const { currentEnrollment } = useTrackerCaptureStore(
    (state) => state.data,
    shallow
  );

  const isProfile = layout === "layout3";
  useProfileRules(isProfile);

  const attributeConfigs = useMemo(
    () => [
      [{ id: "IEE2BMhfoSc" }],
      [{ id: "IBLkiaYRRL3" }],
      [{ id: "DmuazFb368B" }],
      [
        {
          id: "tQeFLjYbqzv",
          fieldProps: {
            maxDate: currentEnrollment?.enrollmentDate,
          },
        },
      ],
      [{ id: "uR9XK6AbPvE" }],
      [{ id: "tJrT8GIy477" }],
      [{ id: "vJdG29KW1Et" }],
      [{ id: "kYfmiyR4KyW" }],
      [{ id: "hOjDbY1814K" }],
      [{ id: "RqEyvE6zcTE" }],
      [{ id: "WkHHrysFy3n" }],
      [{ id: "DcMyN6eoyFD" }],
      [
        { display: "text", text: "currentAddress" },
        { customCell: <VillageSelectorCell /> },
      ],
      // [{ id: "r8bZppSsIvR" }],
      // [{ id: "oVwa5LfjnvA" }],
      // [{ id: "UNiaP6Oz7Mv" }],
      [{ id: "xbwURy2jG2K" }],
      [{ id: "gSImG6wxCkY" }],
      // [{ id: "M41B0OLdXww" }],
      // [{ id: "IdwH3mwSy2o" }],
      // [{ id: "WiuXRd1B6Wu" }],
      // [{ id: "zf7F68AsXEH" }],
      [{ id: "oPKsfqS64oE" }],
    ],
    [currentEnrollment?.enrollmentDate]
  );

  return (
    <div
      className={"eir-form" + (isProfile ? "" : " registration")}
      id="profile-form"
    >
      <Table>
        <TableBody>
          <RowMapper rows={attributeConfigs} tableName="eir-profile" />
        </TableBody>
      </Table>
    </div>
  );
};

const villageSelectorIds = ["r8bZppSsIvR", "oVwa5LfjnvA", "UNiaP6Oz7Mv"];

const VillageSelectorCell = () => (
  <Box className="bordered-left">
    <VillageSelector VillageSelectorIds={villageSelectorIds} saveGeo />
  </Box>
);

export default withRules(Profile);
