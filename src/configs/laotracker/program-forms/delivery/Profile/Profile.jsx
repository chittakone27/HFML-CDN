import useMetadataStore from "@/state/metadata";
import { shallow } from "zustand/shallow";
import { Box, Table, TableBody } from "@mui/material";
import {
  RowMapper,
  VillageSelector,
  withRules
} from "@/configs/lao/program-forms/common/tracker";
import "../delivery.css";

const Profile = () => {
  const programs = useMetadataStore((state) => state.programs, shallow);
  const deliveryProgram = programs.find((e) => e.id === "QBy4wo6YZ0O");
  let attributeConfigs = [];
  if (deliveryProgram) {
    deliveryProgram.programTrackedEntityAttributes.forEach((e) => {
      if (e.trackedEntityAttribute.id === "r8bZppSsIvR") {
        attributeConfigs.push([
          { display: "text", text: "currentAddress" },
          { customCell: <VillageSelectorCell /> },
        ]);
      } else {
        if (
          e.trackedEntityAttribute.id !== "oVwa5LfjnvA" &&
          e.trackedEntityAttribute.id !== "UNiaP6Oz7Mv"
        ) {
          attributeConfigs.push([e.trackedEntityAttribute]);
        }
      }
    });
  }

  return deliveryProgram && attributeConfigs.length > 0 ? (
    <div className="delivery-form" id="profile-form">
      <Table>
        <TableBody>
          <RowMapper rows={attributeConfigs} tableName="delivery-profile" />
        </TableBody>
      </Table>
    </div>
  ) : null;
};

const villageSelectorIds = ["r8bZppSsIvR", "oVwa5LfjnvA", "UNiaP6Oz7Mv"];

const VillageSelectorCell = () => (
  <Box className="bordered-left">
    <VillageSelector VillageSelectorIds={villageSelectorIds} saveGeo />
  </Box>
);

export default withRules(Profile);
