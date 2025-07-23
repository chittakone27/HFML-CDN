import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import { Table, TableBody, TableCell, TableRow, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import useTrackerCaptureStore from "@/state/trackerCapture";
import VillageSelectorOrgUnit from "../../../common/VillageSelector/VillageSelectorOrgUnit";
import "../CommunityDeath.css";
import useCommunityDeathProfileRules from "./useCommunityDeathProfileRules";

const attributes = [
  "hHJcHtdHy1U", // System ID
  "E0zWSujcGQC", // Lao Green National ID
  "gSImG6wxCkY", // Family Book Number
  "oPKsfqS64oE", // Client Health ID
  "pjpnF7u5PQj", // Passport Number
  "IEE2BMhfoSc", // First Name
  "IBLkiaYRRL3", // Last Name
  "DmuazFb368B", // Sex
  "tQeFLjYbqzv", // Date of Birth
  "BaiVwt8jVfg", // Age in Years (computed)
  "qqIRVyMw68b", // Age in Months (computed)
  "tJrT8GIy477", // Ethnicity
  "kgszUgf3OdN", // Marital Status
  "aUKCRTkqOFh", // CDN education
  "ERzDXXMuOdq", // Occupation
  "W8WZcI1SUjC", // House Number
  "xbwURy2jG2K", // Unit of Village
  "UNiaP6Oz7Mv", // Village (hierarchy)
  "DtqYqC9Xr5Z", // Is Foreigner
  "q4lqBvHgv7u", // Country 
  "OsoaGZLlAgx", // Guardian selection (shown for <1 year)
  "vj8fQVCfEdD", // Name of Guardian
  "XmZ0lTX3dku" // Relationship please specify 
];

const CommunityDeathProfile = () => {
  const { t } = useTranslation();
  const {
    shouldShowGuardianFields,
    shouldShowGuardianAge,
    shouldShowCountryField,
    derivedAgeYears,
    derivedAgeMonths
  } = useCommunityDeathProfileRules();

  return (
    <div className="community-death-profile" id="profile-form">
      <Table>
        <TableBody>
          {attributes.map((attrId) => {
            if (
              ["OsoaGZLlAgx", "vj8fQVCfEdD", "XmZ0lTX3dku"].includes(attrId) &&
              !shouldShowGuardianFields
            ) return null;

            if (attrId === "XmZ0lTX3dku" && !shouldShowGuardianAge) return null;

            if (attrId === "q4lqBvHgv7u" && !shouldShowCountryField) return null;

            if (attrId === "UNiaP6Oz7Mv") {
              return (
                <TableRow key={attrId}>
                  <TableCell>{t("currentAddress")}</TableCell>
                  <TableCell>
                    <VillageSelectorOrgUnit
                      variant="outlined"
                      saveGeo
                      disabled={false}
                      VillageSelectorIds={[
                        "r8bZppSsIvR",
                        "oVwa5LfjnvA",
                        "UNiaP6Oz7Mv"
                      ]}
                    />
                  </TableCell>
                </TableRow>
              );
            }

            if (attrId === "BaiVwt8jVfg") {
              return (
                <TableRow key={attrId}>
                  <TableCell><AttributeLabel attribute={attrId} /></TableCell>
                  <TableCell>
                    <TextField
                      value={derivedAgeYears}
                      fullWidth
                      size="small"
                      variant="outlined"
                      disabled
                    />
                  </TableCell>
                </TableRow>
              );
            }

            if (attrId === "qqIRVyMw68b") {
              return (
                <TableRow key={attrId}>
                  <TableCell><AttributeLabel attribute={attrId} /></TableCell>
                  <TableCell>
                    <TextField
                      value={derivedAgeMonths}
                      fullWidth
                      size="small"
                      variant="outlined"
                      disabled
                    />
                  </TableCell>
                </TableRow>
              );
            }

            return (
              <TableRow key={attrId}>
                <TableCell><AttributeLabel attribute={attrId} /></TableCell>
                <TableCell><AttributeField attribute={attrId} /></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommunityDeathProfile;
