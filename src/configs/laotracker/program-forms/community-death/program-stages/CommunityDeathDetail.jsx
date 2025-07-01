import React from "react";
import useMetadataStore from "@/state/metadata";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@mui/material";
import {
  RowMapper,
  withEventDate,
  withRules
} from "@/configs/laotracker/program-forms/common/tracker";
import { listTables } from "./tableMapping";
import "../CommunityDeath.css";
import VillageSelectorOrgUnitStage from "../../../common/VillageSelector/VillageSelectorOrgUnitStage";
import { useTranslation } from "react-i18next";

const CommunityDeathDetail = () => {
  const { t } = useTranslation();

  const { programs } = useMetadataStore(
    useShallow((state) => ({ programs: state.programs }))
  );

  const { layout } = useTrackerCaptureStore(
    useShallow((state) => ({ layout: state.layout }))
  );

  const communityDeathProgram = programs.find((e) => e.id === "d9eJlJsqplx");
  let programStage = null;

  if (communityDeathProgram) {
    programStage = communityDeathProgram.programStages.find(
      (e) => e.id === "d7Q9zL8yYpA"
    );
  }

  return communityDeathProgram && programStage ? (
    <div className="community-death-profile">
      {listTables.map((table) => (
        <Box key={table.tableName} sx={{ marginBottom: "10px" }}>
          <Table>
            <TableBody>
               {table.tableFields.map((row, index) => (
                <React.Fragment key={index}>
                  <RowMapper
                    context="event"
                    tableName={table.tableName}
                    rows={[row]}
                    editable={layout.eventFormEditing}
                  />

                  {/* Show Current Address right after House Number */}
                  {row.some((field) => field.id === "lxr5gKfFrwC") && (
                    <>
                      <TableRow>
                        <TableCell>{t("currentAddress")}</TableCell>
                        <TableCell>
                          <VillageSelectorOrgUnitStage
                            variant="outlined"
                            saveGeo={true}
                            disabled={false}
                            VillageSelectorIds={[
                              "J8ptEYl6IuC", // Province
                              "Dp3e82RfKhz", // District
                              "QE48InnEP6T"  // Village
                            ]}
                          />
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </Box>
      ))}
    </div>
  ) : null;
};

export default withEventDate(withRules(CommunityDeathDetail));
