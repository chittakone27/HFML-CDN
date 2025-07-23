// CommunityDeathDetail.jsx
import React from "react";
import useMetadataStore from "@/state/metadata";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";
import {
  RowMapper,
  withEventDate,
  withRules
} from "@/configs/laotracker/program-forms/common/tracker";
import { listTables } from "./tableMapping";
import "../CommunityDeath.css";
import VillageSelectorOrgUnitStage from "../../../common/VillageSelector/VillageSelectorOrgUnitStage";
import { useTranslation } from "react-i18next";
import useCommunityDeathDetailRules from "./useCommunityDeathDetailRules";

const CommunityDeathDetail = () => {
  const { t } = useTranslation();
  const { programs } = useMetadataStore(
    useShallow((state) => ({ programs: state.programs }))
  );
  const { layout } = useTrackerCaptureStore(
    useShallow((state) => ({ layout: state.layout }))
  );

  const { hiddenFields } = useCommunityDeathDetailRules();

  const communityDeathProgram = programs.find((e) => e.id === "d9eJlJsqplx");
  let programStage = null;

  if (communityDeathProgram) {
    programStage = communityDeathProgram.programStages.find(
      (e) => e.id === "d7Q9zL8yYpA"
    );
  }

  const shouldDisplayRow = (row) => {
    return !row.some(field => hiddenFields.includes(field.id));
  };

  return communityDeathProgram && programStage ? (
    <div className="community-death-profile">
      {listTables.map((table) => (
        <Box key={table.tableName} sx={{ marginBottom: "10px" }}>
          <Table>
            <TableBody>
              {table.tableFields
                .filter(shouldDisplayRow)
                .map((row, index) => (
                  <React.Fragment key={index}>
                    <RowMapper
                      context="event"
                      tableName={table.tableName}
                      rows={[row]}
                      editable={layout.eventFormEditing}
                    />

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
                                "J8ptEYl6IuC",
                                "Dp3e82RfKhz",
                                "QE48InnEP6T"
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
