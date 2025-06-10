import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useTranslation } from "react-i18next";

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
  //"FB3Ro1hJ9ht", // COVID-19 Vaccination ID (CVID)
  //"corXnplgfQ7", // System CVID
  //"lRZGCESE6v2", // National ID
  "uR9XK6AbPvE", // Nationality
  "tJrT8GIy477", // Ethnicity
  "kgszUgf3OdN", // Marital Status
  "UJioxXRLgpw", // Education
  "ERzDXXMuOdq", // Occupation
  "W8WZcI1SUjC", // House Number
  "xbwURy2jG2K", // Unit of Village
  "K3T7S0c17kc", // Village
  "bxSvU1LK2Sn", // Current Province
  "JYpq5unNinA", // Current District
  "rreM2sBjjoT", // Current Village
  "DtqYqC9Xr5Z", // Is Foreigner
  "q4lqBvHgv7u" // Country
];


const CommunityDeathProfile = () => {
  const { t } = useTranslation();
  const { data } = useTrackerCaptureStore();
  const { currentTei } = data;

  return (
    <Table>
      <TableBody>
        {attributes.map((attrId, index) => (
          <TableRow key={attrId}>
            <TableCell style={{ width: "25%" }}>
              <AttributeLabel attribute={attrId} />
            </TableCell>
            <TableCell>
              <AttributeField attribute={attrId} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CommunityDeathProfile;
