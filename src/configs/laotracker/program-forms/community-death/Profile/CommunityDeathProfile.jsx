import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useTranslation } from "react-i18next";
import VillageSelectorOrgUnit from "../../../common/VillageSelector/VillageSelectorOrgUnit";
import "../CommunityDeath.css";

const attributes = [
  "hHJcHtdHy1U", // system ID
  "E0zWSujcGQC", // Lao Green National ID (Bottom)
  "gSImG6wxCkY", // Family Book Number
  "oPKsfqS64oE", // Client Health ID
  "pjpnF7u5PQj", // Passport Number
  "IEE2BMhfoSc", // First Name
  "IBLkiaYRRL3", // Last Name
  "tQeFLjYbqzv", // Date of Birth
  "BaiVwt8jVfg", // Age in Years
  "qqIRVyMw68b", // Age in Months
  "OsoaGZLlAgx",  // Select the Guardian (for child below 1 year)
  "vj8fQVCfEdD", // Name of Guardian
  "DmuazFb368B", // Sex
  "uR9XK6AbPvE", // Nationality
  "tJrT8GIy477", // Ethnicity
  "kgszUgf3OdN", // Marital Status
  "UJioxXRLgpw", // Education
  "ERzDXXMuOdq", // Occupation
  "W8WZcI1SUjC", // House Number
  "xbwURy2jG2K", // Unit of Village
  "UNiaP6Oz7Mv", // Village (hierarchy)
  "DtqYqC9Xr5Z", // Is Foreigner
  "q4lqBvHgv7u" // Country
];

const CommunityDeathProfile = () => {
  const { t } = useTranslation();
  const { data } = useTrackerCaptureStore();
  const { currentTei } = data;

return (
  <div className="community-death-profile" id="profile-form">
    <Table>
      <TableBody>
        {attributes.map((attrId) =>
          attrId === "UNiaP6Oz7Mv" ? (
            <TableRow key={attrId}>
              <TableCell>
                <div>{t("currentAddress")}</div>
              </TableCell>
              <TableCell>
                <VillageSelectorOrgUnit
                  variant="outlined"
                  saveGeo
                  disabled={false}
                  VillageSelectorIds={["r8bZppSsIvR", "oVwa5LfjnvA", "UNiaP6Oz7Mv"]}
                />
              </TableCell>
            </TableRow>
          ) : (
            <TableRow key={attrId}>
              <TableCell>
                <AttributeLabel attribute={attrId} />
              </TableCell>
              <TableCell>
                <AttributeField attribute={attrId} />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  </div>
);

};

export default CommunityDeathProfile;
