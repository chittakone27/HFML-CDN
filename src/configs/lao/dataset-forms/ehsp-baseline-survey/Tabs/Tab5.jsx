import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { tableCellStyles } from "../styles/styles";
import MapTable from "../../common/MapTable";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import "../ehsp-baseline-survey.css";
import DataValueField from "@/ui/DataEntry/Form/DataValueField";

const Tab5 = () => {
  const { t } = useTranslation();

  const { orgUnit } = useSelectionStore((state) => state, shallow);
  const [orgUnitGroup, setOrgUnitGroup] = useState(0);
  const [headerTable5, setHeaderTable5] = useState([]);

  const lstSections = [
    [
      {
        assignOrg: [true, true, true, true],
        location: "Reception",
        id: "4.3.1.4",
        text: "The assessor observes signs to navigate patients in the facility.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XZDKtFcA71g",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Reception",
        id: "4.3.1.5",
        text: "The assessor observes at least one wheelchair available for patients at entrance.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "VFVl7pA9klm",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Reception",
        id: "4.1.1.11",
        text: "The assessor observes at least one water tank for drinking available for patients at the waiting area.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "dPTt10ncade",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Reception",
        id: "4.1.1.15",
        text: "The assessor observes at least 1 feedback box to collect comments from patients",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XZDKtFcA71g",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Reception",
        id: "2.2.4.1",
        text: " Assessor observes that entitlements and obligations of NHI users (board or table that explain services covered, co-payment rates, and exemptions) are visibly from the reception and cashier.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "VFVl7pA9klm",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Reception",
        id: "4.3.1.6",
        text: " The assessor observes health education documents, books, vouchers, newspapers, magazines for patient the waiting area.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "dPTt10ncade",
        },
      },
      {
        assignOrg: [false, true, false, true],
        location: "Reception",
        id: "2.1.3.2",
        text: " The assessor observes that village distance bands and referral distance list is posted in an area where all patients can easily see in health facility",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XZDKtFcA71g",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Reception",
        id: "2.1.2.14",
        text: "The assessor observes a written hospital vision on a visible place for patients",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "VFVl7pA9klm",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Reception",
        id: "4.1.1.9",
        text: " The assessor observes a sign prepared at the reception desk to inform patients about operation time and contact number in case reception staff needs to leave the desk.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "dPTt10ncade",
        },
      },
      {
        assignOrg: [true, false, true, false],
        location: "Reception",
        id: "4.1.1.12",
        text: "The assessor observes a microphone and speaker available to call patients at the waiting area. If yes, mark Yes, If not, mark No.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XZDKtFcA71g",
        },
      },
      {
        assignOrg: [true, false, true, false],
        location: "Reception",
        id: "4.1.1.13",
        text: "The assessor observes announcement on hospital rules (hospital decree) is posted in the waiting areas.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "VFVl7pA9klm",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Reception",
        id: "4.3.1.9",
        text: "The assessor observes queue cards avaiable for patients at reception to facilitate them to see doctors in order.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "dPTt10ncade",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Reception",
        id: "2.7.1.2",
        text: "The assessor observes the 2 standard precausion is easily accessible to all staff (Eg. poster or printed protocol available): (1) Hand Hygiene, (2) Respiratory Hygiene and cough etiquette (BOTH have to be there to mark &quot;YES&quot;)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XZDKtFcA71g",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Reception",
        id: "4.1.1.1",
        text: "The assessor observess staff in the hospital wears uniform and a name tag. (randomly check 5 staffs, if any of them did not wear uniform and name tag mark No)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "VFVl7pA9klm",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Reception",
        id: "4.1.1.2",
        text: "The assessor observes no health staff plays on mobile phone or watched TV in front of patient. Observe in OPD if no one plays on mobile mark Yes, if some one watch TV or plays on mobile mark No",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "dPTt10ncade",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Reception",
        id: "4.1.1.7",
        text: "The assessor observes staff who can speak minotiry language at least 1 staff (In case only Lao is spoken in the area, mark &quot;YES&quot;",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "dPTt10ncade",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        location: "Toilet",
        id: "1.1.5.1",
        text: "The assessor observes toilets for patients. For hospitals: at least four toilets or improved toilet (1 for male, 1 female, 1 for staff and 1 for person with disability) in outpatient area of a hospital. For health centers: at least 1 toilet",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "zKXiDQ6QZLR",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Toilet",
        id: "4.2.1.4",
        text: "The assessor observes in toilet, no leakage from soakaway, nor pipelines, toilet is not blocked, no visible pool of stagnant water",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "r7z9upKuTkY",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Toilet",
        id: "4.2.1.3",
        text: "The assessor observes a daily cleaning schedule is shown on the walls of toilets with signatures of responsible person everyday.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "fhwbYXnQqKf",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, false],
        location: "Outside",
        id: "4.3.1.1",
        text: "The assessor observes a space where an ambulance or car sending patients can park nearby entrance or emergency room.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "y4XUyUkSWOH",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Outside",
        id: "1.1.3.4",
        text: "The assessor observes a functional ambulance OR other vehicle for emergency transportation. (If not functional mark NO)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ctgr0bOasbO",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Outside",
        id: "4.2.1.8",
        text: "The assessor observes there is no medical and sharp waste in the yard.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Hidik759zWM",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Outside",
        id: "4.2.1.9",
        text: "The assessor observes of no animal excrement in the yard of hospital.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "kyWDGzMss1a",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Outside",
        id: "4.2.1.6",
        text: "The assessor observes at least 1 garbage bin is placed in the yard.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "E4WcOURWNN0",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Outside",
        id: "1.1.1.1",
        text: "The assessor observes a building with intact walls and roof with no holes.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "EqKxpEoMPml",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Outside",
        id: "1.1.1.s",
        text: "If there is a need of renovation, assessor specify",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "CRYutVCkRjN",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Outside",
        id: "1.1.4.s",
        text: "What is the most commonly used source of water for the facility at the time of visit",
        data: {
          customCell: (
            <Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DataValueField
                  {...{
                    cc: "TiHjDIadDIL",
                    coc: "lmbxvugTvKr",
                    dsde: "uNPP1Gnuo9G",
                  }}
                />
                <div>1. Piped / Nam Papa system</div>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DataValueField
                  {...{
                    cc: "TiHjDIadDIL",
                    coc: "lmbxvugTvKr",
                    dsde: "gktsiHzFfKm",
                  }}
                />
                <div>
                  2. Protected dug well / Borehole / Spring / Gravity-fed system
                </div>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DataValueField
                  {...{
                    cc: "TiHjDIadDIL",
                    coc: "lmbxvugTvKr",
                    dsde: "c9yJfayYbUC",
                  }}
                />
                <div>3. Rainwater / Rainwater harvesting system</div>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DataValueField
                  {...{
                    cc: "TiHjDIadDIL",
                    coc: "lmbxvugTvKr",
                    dsde: "Bo7rTXgpkiP",
                  }}
                />
                <div>4. Unprotected dug well / Borehole / Spring</div>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DataValueField
                  {...{
                    cc: "TiHjDIadDIL",
                    coc: "lmbxvugTvKr",
                    dsde: "AXB8E1GQOw4",
                  }}
                />
                <div>5. River / Lake / Canal</div>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DataValueField
                  {...{
                    cc: "TiHjDIadDIL",
                    coc: "lmbxvugTvKr",
                    dsde: "f0uyKCIuxqj",
                  }}
                />
                <div>6. Tanker truck</div>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DataValueField
                  {...{
                    cc: "TiHjDIadDIL",
                    coc: "lmbxvugTvKr",
                    dsde: "tAVElSaRSlO",
                  }}
                />
                <div>7. No water sources</div>
              </Box>
            </Box>
          ),
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Outside",
        id: "1.1.4.1",
        text: "The assessor observes a functioning basic water supply system on the facility permises (either piped Nam papa system or non-piped Nam saat system with borehole/well and water storage tank.)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "t7k8w6kp8YX",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Outside",
        id: "1.1.5.4",
        text: "The assessor observes evidence of on-site treatment of wastewater (i.e. septic tank or soakaway pit) which is functional",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "AkxAj237CAF",
        },
      },
      {
        assignOrg: [true, false, true, false],
        location: "Outside",
        id: "1.1.2.2",
        text: "The assesser observes a functioning back-up electrical power: either operational generator with fuel or solar panel (the assessor observe its functionality)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "LG2SoTs4425",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        location: "ER",
        id: "4.1.1.10",
        text: "The assessor observes a doctor (or other staff) duty schedule visible for patients",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "rq54g9HTHZC",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "ER",
        id: "2.3.1.5",
        text: "The assessor observes a written names and contact details of staff available for emergencies outside working hours",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "lcBUlK4CIre",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "ER",
        id: "4.3.1.12",
        text: "The assessor observes a standard operation procedure (SOP) to move patient to an inpatient ward in case of hospitalization.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "uZ8lpMInp2C",
        },
      },
      {
        assignOrg: [false, true, false, true],
        location: "ER",
        id: "2.1.4.2",
        text: "The assessor observes a written contact names and numbers for referral cases to higher referral hospital on the wall for easy access",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "exG5Jb8Vpyc",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "ER",
        id: "2.1.4.1",
        text: "The assessor observes a written guideline / SOP on patient referral of any kind",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "jSANfDjdSRb",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "ER",
        id: "2.1.4.3",
        text: "The assessor observes a referral record or forms within the past 3 months",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "KPDa22tYFbb",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "ER",
        id: "2.1.4.4",
        text: "The assessor observes an evidence of counter referral or feedback to the referred cases",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "m1wpoMTXl47",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        location: "OPD",
        id: "1.1.2.1",
        text: "The assessor observes evidence of electric power at the time of visit (Any one place to check the facility has electric power)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ynzgunITksH",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "OPD",
        id: "1.1.1.4",
        text: "The assessor observes sufficient natural ventilation (such as large opening windows or ventilation fan)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "K0Gijk3N6UG",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "OPD",
        id: "2.1.1.1",
        text: "The assessor observes evidence of entries in register are made during the weekend and night time (Service availability 24 / 7)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "SsLr8JS4HSy",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "OPD",
        id: "4.3.1.3",
        text: "The assessor observes chairs for patients in the waiting area.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "dbQtkGhhEfu",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "OPD",
        id: "4.2.1.7",
        text: "The assessor observes every garbage bin in randomly selected 2 places (OPD and reception) are not full and lid can be closed.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "K9LxpX4qf27",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "OPD",
        id: "4.3.1.8",
        text: "The assessor observes a written protocol of DHR for triage at OPD.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "wCUmp1PhKkW",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "OPD",
        id: "4.2.1.1",
        text: "The assessor observes daily cleaning schedule is on the walls in the facility with signatures of responsible person",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "pVcf61d57yN",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "OPD",
        id: "1.1.1.2",
        text: "The assessor observes at least one separate consultation room with visual and auditory privacy",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "q316ZUBsTXk",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "OPD",
        id: "4.2.1.5",
        text: " The assessor observes at least one trash bin with lid for the contaminated items available in each of randomly selected 2 rooms. If it is available in every selected room, mark Yes. If not every room mark No.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "TMqGTs9eBZG",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "OPD",
        id: "4.2.1.2",
        text: "The assessor observes floors of randomly selected 2 rooms are clean.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "bvhcI08NeHr",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "OPD",
        id: "4.3.1.2",
        text: "The assessor observes a record book for appointment with complete information of patients. Check records of previous one month. If there is a book and is with complete infromation, mark Yes. If not, mark No.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "L0M52i2mYGH",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "OPD",
        id: "4.3.1.13",
        text: "The assessor observes a record book with information of name of patients, and their visiting schedule to follow up patients who have appointment",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "WhZGNBGwqZh",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        location: "OPD and IPD",
        id: "2.3.1.3",
        text: "The assessor observes all staff in the duty table is present at the time of visit. For hospitals: pick one OPD unit and one IPD unit and identify everyone on the table. For health centers: identify everyone on the table",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "izXAIwOMZFv",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "OPD and IPD",
        id: "2.7.2.6",
        text: "The assessor observes that soap or alcohol handrub solution are available at sink including towel paper and general wast bin ? For hospitals: both in outpatient and inpatient rooms For health centers: at all sinks",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "wU7dhbJqiBJ",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "OPD and IPD",
        id: "2.7.4.1",
        text: "The assessor observes infectious waste containers separated from the general waste. For hospitals: &quot;Yes&quot; if both waste bins available at outpatient and inpatient rooms .For health centers: &quot; Yes&quot; if at all waste bins at all service sites",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "t4Npnk2vStk",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "OPD and IPD",
        id: "2.7.4.2",
        text: "The assessor observes containers (safety box) for sharps and needles at sites where sharps and needles are used. For hospitals: both in outpatient and inpatient rooms For health centers: at all waste bins at all service sites",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "KqKqDkaBJNG",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, false],
        location: "IPD",
        id: "4.3.1.10",
        text: "The assessor observes a number attached in each bed in inpatient rooms of randomly selected 2 units is linked with a patient&#39;s number in a medical record.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "tRfpr21TkCH",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "IPD",
        id: "2.7.2.4",
        text: "The assessor observes that beds have no stains such as blood",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "EfLPINNjeU7",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "IPD",
        id: "1.1.5.3",
        text: " The assessor observes running water source available for hand washing within 5 meters from the toilet",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "xLnxhQXQFxG",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "IPD",
        id: "1.1.4.2",
        text: " The assessor observes at least one shower room with running water per 40 inpatient beds.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "w9rpoXJazfm",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "IPD",
        id: "1.1.5.2",
        text: "The assessor observes one toilet per 20 users in inpatient departments",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "G8KykwcIJcu",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "IPD",
        id: "2.4.1.5",
        text: "The assessor randomly observes records from the IPD register and checks if names, addresses, date of birth, date of admission, date of discharge, insurance type are noted for each in-patient.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "pthzViPYv4D",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "IPD",
        id: "2.2.4.6",
        text: "Assessor compares facility case-based claims and reimbursement for the previous quarters and observes that the facility&#39;s claims were within 5% of amount approved and reimbursed by NHIB following verification. (ramdom select of IPD for child under 5 years old)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "WBEbOQEQ392",
        },
      },
    ],
    [
      {
        assignOrg: [true, false, true, false],
        location: "Isolation room",
        id: "1.1.1.5",
        text: "The assessor observes at least one isolation room.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "GOfK16Jmf4z",
        },
      },
    ],
    [
      {
        assignOrg: [true, false, true, false],
        location: "OR",
        id: "1.1.1.4",
        text: "The assessor observes at least one functioning operation room.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Uap0Nhy3H2N",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        location: "Delivery room",
        id: "1.1.1.3",
        text: "The assessor observes at least one delivery room with a functioning delivery bed.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XVzo7Hvi87R",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        location: "Laboratory",
        id: "3.1.3.1",
        text: "The assessor observes laboratory testing fee visible placed in patient waiting area",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "fQSaBAuniqZ",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Laboratory",
        id: "3.1.1.2",
        text: " The assessor observes a sign that limits entrance to authorized personnel at the entrance with a lock.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "TnKnebeLN3Y",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Laboratory",
        id: "3.1.2.3",
        text: "The assessor observes clean running water and soap or alcohol based handrub available in the laboratory room",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "PmNNutAkp5C",
        },
      },
      {
        assignOrg: [true, false, true, false],
        location: "Laboratory",
        id: "3.1.2.4",
        text: "The assessor observes a functioning refregerator that can keep blood products",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Z8heTxG88Qz",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Laboratory",
        id: "3.1.2.5",
        text: "The assessor observes Personal Protective Equipment (PPE) including at least latex (1) gloves, (2) gowns, and (3) masks available and used properly",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "iDL1pzDRLEE",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Laboratory",
        id: "3.1.1.1",
        text: "The assessor observes a written SOPs for all laboratory tests available",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "vD1f9y0bD2D",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Laboratory",
        id: "3.1.1.3",
        text: "The assessor observes a written protocol for decontamination of spill infectious material in the laboratory",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "jsKds5Xz8uE",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Laboratory",
        id: "3.1.2.1",
        text: "The assessor observes an inventory record of laboratory reagent supply and equipment",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "zcuq9eYAuvA",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Laboratory",
        id: "3.1.2.2",
        text: "The assessor observes a record of monitoring of internal quality controls used in the laboratory",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "hfBegg848vy",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        location: "Pharmacy",
        id: "2.5.4.2",
        text: "The assessor observes that drugs are stored in clean cupboard, labelled shelves at pharmacy",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "jxqOGvEgoXi",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Pharmacy",
        id: "2.5.4.3",
        text: "The assessor observes that the shelves for narcotic drugs are stored separately with lock at pharmacy",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "oxGOTXf31XQ",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Pharmacy",
        id: "2.5.4.4",
        text: "The assessor observes that drugs are stored in order by category in pharmacy",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Q8x3vOyDbQo",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Pharmacy",
        id: "2.5.4.5",
        text: "The assessor observes no expired drugs or comsumables are on the shelf phamacy (Sampling 3 drugs and 2 consumables)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "IpNm0oN5pt5",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Pharmacy",
        id: "2.5.4.1",
        text: "The assessor observes recording book (or excel) in pharmacy",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "oiXKOWgH9yz",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, false],
        location: "Warehouse",
        id: "2.5.2.2",
        text: "The assessor observes that there is a thermometer in the warehouse and the temperature of the storage is kept less 30 degrees Celsius with monitoring sheet",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "O9Jpi2Q1qvb",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Warehouse",
        id: "2.5.2.3",
        text: "The assessor observes that there is a refregelator for drugs in warehouse",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "MvzErXBgWUM",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Warehouse",
        id: "2.5.1.1",
        text: "The assessor observes availability of essential medicines is not less than 85% based on the medicine list in the health facility (check the stock report if any out of stock medicine for the past 3 months)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "y8phKUTSORe",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Warehouse",
        id: "2.5.1.2",
        text: "The list of medicine used in the health facility is updated: Select 5 drugs in the store to see whether their name are ALL in that medicine list",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "yTtpa43sGMd",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Warehouse",
        id: "2.5.1.3",
        text: "The assessor observes that recorded number of supply on stock card or register corresponds with the ammount of physical supply (for all randomly sampled 5 drugs)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "eHuEiwCec5L",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Warehouse",
        id: "2.5.2.1",
        text: " The assessor observe national-standardized SOP for Good Storage Practice (GSP) is avaialable.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "YC39hAdu0qf",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Warehouse",
        id: "2.5.3.1",
        text: "The assessor observes that the drug that will first expiry is placed in front in warehouse (for randomly sampled 5 drugs) = FEFO = first expiry, first out",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "uW0dKQAyiRZ",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Warehouse",
        id: "2.5.5.1",
        text: "Availability of TOR of the responsible staff on recording and reporting of the adverse drug reaction (ADR) including case and monthly report",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Zwt1hPAn2LH",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Warehouse",
        id: "2.5.5.2",
        text: "The assessor observes monthly Adverse Drug Reaction (ADR) (with zero report)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "kqhjf2UlfYX",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, false],
        location: "emergency and disater",
        id: "2.8.1.5",
        text: " The assessor observes official document of a Hospital Emergency Committee with clear roles and responsibilities",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "saRJGKGA0GB",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "emergency and disater",
        id: "2.8.1.1",
        text: "The assessor observes a written disaster or facility safety plan",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "jiouzK6A80q",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "emergency and disater",
        id: "2.8.1.2",
        text: " The assessor observes a written all-hazards emergency response plan",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "hNkacGbE6wz",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "emergency and disater",
        id: "2.8.1.3",
        text: "The assessor observes a report of the 18 notifiable diseases for the previous month (including a zero report - if no case, they should record and report &quot;0&quot; If not recorded, Mark &quot;NO&quot;)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "gafmNLXqAia",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "emergency and disater",
        id: "2.8.1.4",
        text: "The assessor observes any evidence of reporting through event-based surveillance or through interviewing staff of whether they have ever reported an event before.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "C1UYj9rLVRv",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        location: "Admin room",
        id: "1.1.3.1",
        text: "The assessor observes a functioning computer at the time of visit (At least at a administration room or data management room)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "l0nWpt5GgrV",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Admin room",
        id: "1.1.3.3",
        text: "The assessor observes evidence of internet connectivity at the time of visit (The assessor can connect to internet through phone or computer)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "wDsPJWxkrgh",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Admin room",
        id: "1.1.3.2",
        text: "The assessor observes at least one fixed or mobile phone.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "bg0E0OMjrBf",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Admin room",
        id: "2.3.1.4",
        text: "The assessor observes availability of time card (written record form of working time)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "pfJQy0dYQaB",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Admin room",
        id: "2.3.1.2",
        text: "The assessor observes a written duty table that identify staff on duty of the day of visit",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "H7HBFCLjsGO",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Admin room",
        id: "2.1.2.2",
        text: "The assessor observes a written regulation of hospital management",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "sz4VTcO07fG",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Admin room",
        id: "2.1.2.1",
        text: "The assessor observes record or other sources of evidence that a management committee has met at least 1 time in the past 3months",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "oPj6dmAiI6X",
        },
      },
      {
        assignOrg: [false, true, false, true],
        location: "Admin room",
        id: "2.1.3.1",
        text: "The assessor observes an evidence of any routine (at least once a year) system for including community representation for some aspects of the management (Eg. A minute of annual meeting with input of community representatives)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "I0epkfyrzAS",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Admin room",
        id: "2.3.1.1",
        text: "The assessor observes a written official form that identifies responsible persons for each task based on decree role and function of health center / hospital",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "tstX03kAwCL",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Admin room",
        id: "2.7.5.1",
        text: "The assessor observes Patient Safety guidelines or procedures to prevent patient&#39; injuries and accident, and management of injuries and accident procedures",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "LmKkKAn1tIC",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Admin room",
        id: "2.3.2.1",
        text: "The assessor observes a written SOP for working conditions and environmental sanitation.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Cgs5JwU70mz",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Admin room",
        id: "2.3.3.1",
        text: "The assessor observes a TCIS (Training Course Information System) or other forms of monitoring of trainings the staff recevied) updated within the previous 1 year",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "iuoSi9hwqJs",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Admin room",
        id: "2.3.3.2",
        text: "The assessor observes certificate or any kind of document that the director or the management division head has received a management training in the past.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "tKOIdIH3tCO",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Admin room",
        id: "4.1.1.16",
        text: "The assessor observes comments from patients are summaized in the recording/reporting book in adimistration office.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "jN3xqFYretj",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Admin room",
        id: "2.6.1.1",
        text: "The assessor observes a written document (standard, guideline, SOP etc) that staff refer to improve quality of health care in the facility",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "wicoJVLsaoh",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Admin room",
        id: "2.6.1.s",
        text: "If the document exists (&quot;YES&quot; in the previous question), which areas does it cover?:(1) Hospital management; (2) General hospital services (Cleaness, Convinience, Warm welcome etc); (3) Clinical area (eg RMNCAH, TB etc)",
        data: {
          customCell: (
            <Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DataValueField
                  {...{
                    cc: "TiHjDIadDIL",
                    coc: "lmbxvugTvKr",
                    dsde: "a9iPuVSoNzi",
                  }}
                />
                <div>Hospital management</div>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DataValueField
                  {...{
                    cc: "TiHjDIadDIL",
                    coc: "lmbxvugTvKr",
                    dsde: "QdMdHFVOftH",
                  }}
                />
                <div>
                  General hospital services (Cleaness, Convinience, Warm welcome
                  etc)
                </div>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DataValueField
                  {...{
                    cc: "TiHjDIadDIL",
                    coc: "lmbxvugTvKr",
                    dsde: "apcmlYZdDfD",
                  }}
                />
                <div>Clinical area (eg RMNCAH, TB etc)</div>
              </Box>
            </Box>
          ),
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Admin room",
        id: "2.6.2.1",
        text: "The assessor observes evidence of quality assessment activity (Eg. record of action plans from quality assessment) within the facility in the last 6 months",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "PAq9wnXvkdZ",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Admin room",
        id: "2.6.2.2",
        text: "The assessor observes evidence of quality improvement activity within the facility in the last 6 months (Eg. record of response to action plans from quality assessment, record of in-facility training) * NOT including external team coming to conduct training",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "KIfWmO7NXZS",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Admin room",
        id: "2.6.2.3",
        text: "The assessor observes evidence (Eg. record or report) of supervision visits for responsible facilities ( for the past 1 year)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XUXFaVrtD29",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Admin room",
        id: "2.7.1.4",
        text: "The assessor observes evidence (Eg. minutes) of regular monitoring and evaluations (M and E) process of implementation of IPC standard and additional precautions. (at least 1 time in the past 6 months)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "xPObjY0y8JD",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Admin room",
        id: "2.7.1.5",
        text: "The assessor observes evidence (Eg. Record) of regular in-facility refresher training on IPC standard. (at least 1 time in the past 1 year), not include training by external",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "HIClgnr980c",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Admin room",
        id: "2.7.5.2",
        text: "The assessor observes evidence of surveillance system (record) to monitor patient injuries and accident. Check report for the last 3 months including zero report - if no case, they should record and report &quot;0&quot; If not recorded, Mark &quot;NO&quot;)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "rqs3bMTfl9K",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Admin room",
        id: "2.7.2.3",
        text: "The assessor observes evidence of a system in the facility to investigate in-facility outbreaks of infectious diseases (report of in-facility outbreak including zero report)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "v06gYYP1rM8",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Admin room",
        id: "2.7.1.3",
        text: "The assessor observes a job description of IPC committee with member&#39;s name",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "i4qKq1b1A85",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Admin room",
        id: "2.7.2.2",
        text: "The assessor observes evidence of needle stick/ sharps injuries surveillance following rates and trends (report of in-facility outbreak including zero report)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "FsTJXOtMAAj",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Admin room",
        id: "2.7.2.5",
        text: "The assessor observes a written standard, guideline or protocol on health care associated infection",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "I4k9Rv6jA0u",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Admin room",
        id: "2.7.1.1",
        text: "The assessor observes a written guideline for infection prevention and control (eg. WHO Infection Prevention and Control Assessment Framework: IPCAF)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "uMMU5WtY17e",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Admin room",
        id: "2.7.2.1",
        text: "The assessor observes evidence of routine (at least every three months) surveillance of most common nosocominal infection (SSI, UTI, CABSI, nosocomial pneumonia) (Eg. Record, report with rates and trends)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "yU6hNzqdrtH",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Admin room",
        id: "2.7.3.1",
        text: "The assessor observes a test result for E.Coli within the last 1 year",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "aeluNa8MCBR",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Admin room",
        id: "2.7.3.2",
        text: "The test result of E.coli meets the national standard of E,coli less than 10cfu/100mL",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "LoBrdcMyYWn",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Admin room",
        id: "2.7.3.3",
        text: "The assessor observces a record of 13 parameters&#39; teststed within the past one year, according to the National Drinking Water Quality Standards.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "VthvOsi9yQI",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        location: "Financial unit",
        id: "2.2.1.1",
        text: "The assessor observes that one book keeping/recording system is used by the facility, provided by MOH (e.g. 5 light blue books at PH and DH): (1) daily book keeping on expenditure management (2) Daily book keeping on technical revenue management (3) Daily book keeping on cash management (4) Daily legder book keeping (5) Daily book keeping on petty cash management",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "r0HF2O687Bq",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Financial unit",
        id: "2.2.1.2",
        text: "The assessor check availability of daily general record for revenue and source of revenue",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "OQQOo3b7jKe",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Financial unit",
        id: "2.2.1.3",
        text: "The assessor observes that facility records revenues by source (e.g. technical revenues, NHI)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "S3ajtYPqiIU",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Financial unit",
        id: "2.2.1.4",
        text: "The assessor observes that facility records source of expenditures by chapter of the chart of accounts (e.g. Chapter 62 administration), with latest record no more than 7 days old",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ZA6bgm5ReHU",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Financial unit",
        id: "2.2.4.4",
        text: "The assessor observes records of exempted from co-payment that were (poor, pregnant women, childrend under 5) and of users that received food and transportation allowances (poor), with latest record no more than 7 days old. (randomly selected delivery registration, admitted children under 5)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "YnhfIyz5BLR",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Financial unit",
        id: "2.2.4.2",
        text: "The assessor observes availability of recording book for co-payments by users",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "bR8QV0Jo6Df",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Financial unit",
        id: "2.2.4.3",
        text: "The assessor observes if there are the record of users paying co-payments in the book",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Vyd9neXzoeI",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Financial unit",
        id: "2.2.1.5",
        text: "The assessor verifies that the expenditures have adequate supporting documents (randomly selects 2 records expenditures and observes the below suppoting document: (1) invoice, (2) payment order , (3) receipts with signatures of payer and recieve, 4) summary sheet for item purchase with ammount paid).",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "yl1vKqvapL4",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Financial unit",
        id: "2.2.1.6",
        text: "The assessor verifies that cash amount has been recorded in the cash book within 7 days prior to the visit.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "aorWp2ZiUsN",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Financial unit",
        id: "2.2.1.7",
        text: "The assessor observes existence of safety box to keep cash and that cash is actually kept there.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "xWTceWCswa2",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Financial unit",
        id: "2.2.2.1",
        text: "The assessor verifies that previous quarter&#39;s report contains date of signature, and that quarterly financial report was submitted to health office on time, according to the guidelines of DOF: from HC by the 5th, from DH by the 10th, from PH by the 15th of the first month of the following quarter.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "gfX3AmpC7jg",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Financial unit",
        id: "2.2.3.1",
        text: "Assessor observes in quarterly financial report the percentage of technical revenues allocated to staff incentives (between 0% and 15%)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "mtglVOZSMbd",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Financial unit",
        id: "2.2.3.2",
        text: "The assessor observed a written policy including clear criteria on how incentives are awarded to staff.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "MfbMSLKq9XL",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Financial unit",
        id: "2.2.4.5",
        text: "Assessor observes that faclity&#39;s claims in the previous four quarters were submitted on time, as per guidelines: from HC, DH, PH by 15th of the following month.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "kVtxI5dCSMA",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Financial unit",
        id: "2.2.4.7",
        text: "Assessor reviews the records of the NHI complaint line and NHIB verification process and observes that no complaints were registered about charges to patients in excess of the co-payment rates established under the NHI law.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "VwWyRBjGLb7",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, false],
        location: "Statistics unit",
        id: "2.4.1.3",
        text: "The assessor observes the Health Statistician/health worker trained in DHIS2 is working in the facility",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "beoHrJaVzpX",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Statistics unit",
        id: "2.4.1.1",
        text: "The assessor observes up-to-date data register forms. Random sample to be checked : HMIS reporting form, Delivery Register,OPD Register, Family planning Register)",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "zaFqzx1IwoT",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Statistics unit",
        id: "2.4.1.2",
        text: "The assessor observes the SOPs/guidelines on reporting",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "gnX8QV0GnHM",
        },
      },
      {
        assignOrg: [true, false, true, false],
        location: "Statistics unit",
        id: "2.6.3.1",
        text: "The assessor observes records of monitoring of any specific indicator for surgical services / outcomes in their own facility",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Ii6UNHVl4JL",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Statistics unit",
        id: "2.6.3.2",
        text: "The assessor observes records or reporting of death cases in the health facility",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "QgN1CPABf1M",
        },
      },
      {
        assignOrg: [true, true, true, false],
        location: "Statistics unit",
        id: "2.6.3.3",
        text: "The assessor observe the record of death case review in health facility within the past one year.",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "cEStymfnPTY",
        },
      },
      {
        assignOrg: [true, true, true, true],
        location: "Statistics unit",
        id: "2.4.1.4",
        text: "The assessor observes HMIS reports filed by month with readable labels",
        data: {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "OyNCxKDE2wU",
        },
      },
    ],
  ];
  useEffect(() => {
    if (
      orgUnit.organisationUnitGroups.find((group) => group.id === "Ky8EJEqdpGP")
    ) {
      setOrgUnitGroup(0);
    } else if (
      orgUnit.organisationUnitGroups.find((group) => group.id === "ZcbWJfYaX5n")
    ) {
      setOrgUnitGroup(1);
    } else if (
      orgUnit.organisationUnitGroups.find((group) => group.id === "GiRpQWVJ24q")
    ) {
      setOrgUnitGroup(2);
    } else if (
      orgUnit.organisationUnitGroups.find((group) => group.id === "U53tdte60Ku")
    ) {
      setOrgUnitGroup(3);
    }
  }, [orgUnit]);

  const tableConfigs5 = useMemo(() => {
    let stt = 1;
    let payload = [];
    let newSections = [];
    let headerTable = [
      t("Instruction Assessor goes to reception"),
      t("Instruction Assessor goes to Toilet"),
      t("Instruction Assessor goes outside the building"),
      t("Instruction Assessor goes to Emergency unit"),
      t("Instruction Assessor goes to OPD"),
      t("Instruction Assessor goes to OPD and IPD"),
      t("Instruction Assessor goes to IPD"),
      t("Instruction Assessor goes to Isolation room"),
      t("Instruction Assessor goes to operation room"),
      t("Instruction Assessor goes to delivery room"),
      t("Instruction Assessor goes to laboratory"),
      t("Instruction Assessor goes to Pharmacy"),
      t("Instruction Assessor goes to Warehouse"),
      t(
        "Instruction Assessor goes to unit responsible for emergency and disater"
      ),
      t("Instruction Assessor goes to administration unit"),
      t("Instruction Assessor goes to financial unit"),
      t("Instruction Assessor goes to statistic unit"),
    ];
    lstSections.forEach((lstDe, i) => {
      let lstDeInSection = [];
      lstDe.forEach((de) => {
        const { assignOrg, location, id, text, data } = de;
        if (assignOrg[orgUnitGroup]) {
          lstDeInSection.push(
            [
              { display: "text", text: stt, cellProps: tableCellStyles.no },
              {
                display: "text",
                text: t(location),
                cellProps: tableCellStyles.no,
              },
              { display: "text", text: id, cellProps: tableCellStyles.no },
              { display: "text", text: text, cellProps: tableCellStyles.value },
            ].concat({ ...data, cellProps: tableCellStyles.value })
          );
          stt++;
        }
      });
      if (lstDeInSection.length > 0) {
        newSections.push(headerTable[i]);
        payload.push(lstDeInSection);
      }
    });
    setHeaderTable5(newSections);
    return payload;
  }, [orgUnitGroup]);

  return (
    <Box className="ehsp-baseline-survey-tab">
      {tableConfigs5.length > 0 && (
        <Table id="ehsp-baseline-survey-table-2">
          {headerTable5.map((header, i) => {
            return (
              <>
                <TableHead key={i}>
                  <TableRow>
                    <TableCell className="cell-header-table">
                      {t("Question number")}
                    </TableCell>
                    <TableCell className="cell-header-table">
                      {t("Location")}
                    </TableCell>
                    <TableCell className="cell-header-table">
                      {t("ID")}
                    </TableCell>
                    <TableCell className="cell-header-table">
                      {t(header)}
                    </TableCell>
                    <TableCell className="cell-header-table"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <MapTable dataElementConfigs={tableConfigs5[i]} />
                </TableBody>
              </>
            );
          })}
        </Table>
      )}
    </Box>
  );
};

export default Tab5;
