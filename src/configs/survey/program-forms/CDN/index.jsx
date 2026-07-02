import { useMemo, useEffect, useState,useCallback } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  IconButton,
  TableRow 
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { shallow } from "zustand/shallow";
import VillageSelectorOrgUnitStage from"../common/VillageSelectorOrgUnitStage";
import { useAgeInYearRule, useForeignerRule } from "../common/hook";
import MapTable from "../common/MapTable";
import useEventCaptureStore from "@/state/eventCapture";
import "./index.css";
import { useTranslation } from "react-i18next";

const AUTO_ID = "EnTm3aFU6X0";
const villageSectorIds = ["iI2JhpE62WI", "OVI7tacFkR2", "TLXlYLP2V7t"];
    const handleChange = (selection) => {

        console.log("Province:", selection.province);
        console.log("District:", selection.district);
        console.log("Village:", selection.village);

    };
    const runtimeConfig = {
  baseUrl: import.meta.env.VITE_BASE_URL,
};
// Generate CDN + day + month + random 4 digit
const generateAutoValue = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const random4 = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  return `CDN${day}${month}${random4}`;
};

const CDN = () => {
const [language, setLanguage] = useState("lo");
 const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");
  const langKey = isLao ? "lo" : "en"; 
  // Fetch user locale from DHIS2


  // const t = (key) => translations[language]?.[key] || key;

  const { currentEvent, actions, status } = useEventCaptureStore(
    (state) => ({
      currentEvent: state.currentEvent,
      actions: state.actions,
      status: state.status,
      
    }),
    shallow
  );


  // Section open states
  const [openProfile, setOpenProfile] = useState(true);
  const [openDeathInfo, setOpenDeathInfo] = useState(true);
  const [openInformantDetail, setOpenInformantDetail] = useState(true);
  const [openResponsible, setOpenResponsible] = useState(true);
  const [openVerbal, setOpenVerbal] = useState(true);


  useAgeInYearRule("Z1x2iwf6IIY", "VpdbpoTRlvK", "yIL1eC0xbc2");
  useForeignerRule("YOU5UrERj6L", villageSectorIds);
  // useEthnicityRule("zWd0wumpAvd", "ytpz8RquNDX");

  // Auto-generate CDN number
useEffect(() => {
  if (!currentEvent?.event) return;

  const currentValue = currentEvent?.dataValues?.[AUTO_ID];

  if (!currentValue) {
    // Generate CDN number
    actions.setCurrentEventDataValue(AUTO_ID, generateAutoValue());

    // Set today's date
    const today = new Date().toISOString().split("T")[0];
    actions.setCurrentEventProperty("eventDate", today);

  }
}, [currentEvent?.event, actions]);

useEffect(() => {
  if (!currentEvent?.dataValues) return;
const values = currentEvent?.dataValues || {};
const isForeigner = values["YOU5UrERj6L"] === "true";
const isknownForeigner = values["v5Jp11tHjll"] === "true";

const isKnownDob = values["Q9jyrprwX9y"] === "true";
const ageYear = Number(values["VpdbpoTRlvK"] || 0);
const ageMonth = Number(values["yIL1eC0xbc2"] || 0);

const requiredFields = [
  "EnTm3aFU6X0",
  "v64kYMoUHLV",
  "rRmoVaP9pK9",
  "Q9jyrprwX9y",
  "YOU5UrERj6L",
  "uQ9r3BuELco",
  "ImbZ26FXqCY",
  "QvX65zeRteX",
  "J8ptEYl6IuC",
  "Dp3e82RfKhz",
  "QE48InnEP6T",
  "HqgTB3yqJby",
  "zr7r1dtULBg",
];

// DOB or Age logic
if (isKnownDob) {
  requiredFields.push("Z1x2iwf6IIY");
} else {
  if (ageYear >= 1) {
    requiredFields.push("VpdbpoTRlvK");
  } else {
    requiredFields.push("yIL1eC0xbc2");
  }
}

// Foreigner logic
if (isForeigner) {
  requiredFields.push("v5Jp11tHjll");
} else {
  requiredFields.push("iI2JhpE62WI", "OVI7tacFkR2", "TLXlYLP2V7t");
}
if (isknownForeigner) {
  requiredFields.push("kXRyqHLsX8b");
} else {
  requiredFields.push();
}


  

  const isIncomplete = requiredFields.some(
    (id) => !values[id] || values[id] === ""
  );
  actions.setLayout("hideEventFormCompleteButton", isIncomplete);

  actions.setLayout("disableEventSaveButton", isIncomplete);

    


}, [currentEvent?.dataValues, actions]);


useEffect(() => {
  const isKnownDob = currentEvent?.dataValues?.["Q9jyrprwX9y"] === "true";
  const ismonthinyear = currentEvent?.dataValues?.["yIL1eC0xbc2"] >= 1;
  const isCountryHidden = currentEvent?.dataValues?.["v5Jp11tHjll"];
    const isVillageHidden = currentEvent?.dataValues?.["YOU5UrERj6L"]==="true";
const isAgeinyear = currentEvent?.dataValues?.["VpdbpoTRlvK"] >= 1
  // Get today's date in YYYY-MM-DD format


  if (ismonthinyear) {
    actions.setCurrentEventDataValue("VpdbpoTRlvK", "0");
  }
  if (isAgeinyear) {
    actions.setCurrentEventDataValue("yIL1eC0xbc2", "0");
  }


  if (!isKnownDob) {
    actions.setCurrentEventDataValue("Z1x2iwf6IIY", null);
  }
    if (!isCountryHidden) {
    actions.setCurrentEventDataValue("kXRyqHLsX8b", null);
  }
      if (!isVillageHidden) {
    actions.setCurrentEventDataValue("kXRyqHLsX8b", null);
        actions.setCurrentEventDataValue("v5Jp11tHjll", null);

  }else{
        actions.setCurrentEventDataValue("xVXPkWtC9OQ", null);
        actions.setCurrentEventDataValue("Q9I8uYEdL4O", null);
   

  }


}, [
  currentEvent?.dataValues?.["Q9jyrprwX9y"],
  currentEvent?.dataValues?.["yIL1eC0xbc2"],
  currentEvent?.dataValues?.["v5Jp11tHjll"],
  currentEvent?.dataValues?.["YOU5UrERj6L"],
  currentEvent?.dataValues?.["VpdbpoTRlvK"],

]);

  // ==============================
  // SECTIONS
  // ==============================

const profileSection = useMemo(() => {
  const isVillageHidden = currentEvent?.dataValues?.["YOU5UrERj6L"]=="true";
  const isCountryHidden = currentEvent?.dataValues?.["v5Jp11tHjll"]==="true";
    const isKnownDob = currentEvent?.dataValues?.["Q9jyrprwX9y"]==="true";
    const isotherocc = currentEvent?.dataValues?.["xbAV5SzeGbB"]==="Other";

  const isEthnicityOther =
    currentEvent?.dataValues?.["zWd0wumpAvd"] === "ອື່ນໆ";
    
  const isAgeinyear =
    currentEvent?.dataValues?.["VpdbpoTRlvK"] >= 1;
  
  const ismonthinyear =
    currentEvent?.dataValues?.["VpdbpoTRlvK"] == 0;
  return [
    [{ id: AUTO_ID, fieldProps: { disabled: true,required: true } }],
    [{ id: "KwvHnqsDs1o" }],
    [{ id: "ov0lHV2tlPH" }],
    [{ id: "MnZSiIdduQb" }],
    [{ id: "e7WqWMbQBIR" }],
    [{ id: "v64kYMoUHLV", fieldProps: { required: true } }], //*
    [{ id: "gzgxzG9iVRI" }],
    [{ id: "rRmoVaP9pK9", fieldProps: { required: true } }],
    [{ id: "Q9jyrprwX9y", fieldProps: { required: true } }],
   ...(isKnownDob
  ? [[{ id: "Z1x2iwf6IIY", fieldProps: { required: isKnownDob }}]] //*
  : []),
  ...(isAgeinyear || !isKnownDob ? [[{ id: "VpdbpoTRlvK",fieldProps: { disabled: currentEvent?.dataValues?.["yIL1eC0xbc2"] >= 1 || isKnownDob,required: true} }]] : []),
  ...(ismonthinyear ? [[{ id: "yIL1eC0xbc2",fieldProps: { disabled: isKnownDob,required: true } }]] : []),

    [{ id: "zWd0wumpAvd" }], //*
    ...(isEthnicityOther ? [[{ id: "ytpz8RquNDX" }]] : []),
    [{ id: "AlD7MFvoYQs" }],
    [{ id: "NenTvDjChyo" }],
    [{ id: "xbAV5SzeGbB" }],
    ...(isotherocc ? [[{ id: "r0egoQrrpTi" }]] : []),

    
    [{ id: "YOU5UrERj6L",fieldProps: { required: true }  }],
        ...(isVillageHidden ? [[{ id: "v5Jp11tHjll",fieldProps: { required: true } }]] : []),

    
        ...(isCountryHidden && isVillageHidden ? [[{ id: "kXRyqHLsX8b",fieldProps: { required: true }  }]] : []),

[
  {
    customCell: <VillageCell />,
    isCustomCellHide: isVillageHidden,
    fieldProps: { required: false },
  },
],
        ...(!isVillageHidden ? [[{ id: "xVXPkWtC9OQ" }]] : []),
    ...(!isVillageHidden ? [[{ id: "Q9I8uYEdL4O" }]] : []),


  ];
}, [
    currentEvent?.dataValues?.["YOU5UrERj6L"],
  currentEvent?.dataValues?.["Q9jyrprwX9y"], // Add it to dependencies if it's important
    currentEvent?.dataValues?.["yIL1eC0xbc2"],
      currentEvent?.dataValues?.["xbAV5SzeGbB"],

  currentEvent?.dataValues?.["v5Jp11tHjll"],
  currentEvent?.dataValues?.["zWd0wumpAvd"],
  currentEvent?.dataValues?.["VpdbpoTRlvK"],
]);
const deathInfoSection = useMemo(() => {
  const causeOfDeath =
    currentEvent?.dataValues?.["QvX65zeRteX"];
const isSpecifyCOD = causeOfDeath === "Disease" || causeOfDeath === "Accident";
const isDetailMD = causeOfDeath == "Other (specify)"
const isotherplaceOfdeath = currentEvent?.dataValues?.["ImbZ26FXqCY"]==="Other (specify)";


  return [
    [{ id: "uQ9r3BuELco", fieldProps: { required: true } }],
    [{ id: "Qh9Bw2E3wbi" }],
    [{ id: "Oxhur2LfVCr" }],
    [{ id: "ImbZ26FXqCY", fieldProps: { required: true } }],//*
    ...(isotherplaceOfdeath ? [[{ id: "utoaY7xFLon" }]] : []),
    [{ id: "QvX65zeRteX", fieldProps: { required: true } }], //*

...(isSpecifyCOD
  ? [
      [
        { 
          id: "HwYXxOEKkVm", 
        },
      ]
    ]
  : []),

...(isDetailMD
  ? [
      [
        { 
          id: "fyDdwAMidRI", 
        },
      ]
    ]
  : []),
    [
      {
        customCell: <DeathVillageCell/>,
      },
    ],

    [{ id: "HRwRhEljEtJ" }],
    [{ id: "lxr5gKfFrwC" }],
  ];
}, [
  currentEvent?.dataValues?.["QvX65zeRteX"],
  currentEvent?.dataValues?.["ImbZ26FXqCY"],
  language,
]);
const informantSection = useMemo(() => {
  const isanotherRelationship = currentEvent?.dataValues?.["zr7r1dtULBg"] === "Other (specify)";

  return [
    [{ id: "HqgTB3yqJby", fieldProps: { required: true } }], //*
    [{ id: "SRajXU5CS08" }],
    [{ id: "zr7r1dtULBg" ,fieldProps: { required: true } }],
    ...(isanotherRelationship
      ? [
          [
            { 
              id: "JxA90BwDj2H", fieldProps: { required: true } 
            },
          ]
        ]
      : []),
  ];
}, [currentEvent?.dataValues?.["zr7r1dtULBg"]]);
  const responsibleSection = useMemo(
    () => [[{ id: "Pmy32RqodmK" }]],
[]
  );

  const verbalSection = useMemo(
    () => [[{ id: "bGtSTEprQfa" , fieldProps: { disabled: true }}]],
[]
  );
  // ==============================
  // RENDER
  // ==============================

  const renderSection = (title, isOpen, toggleOpen, dataConfigs) => (
    <>
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: "18px",
          marginBottom: "8px",
          padding: "8px 0",
          borderBottom: "2px solid #1976d2",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={toggleOpen}
      >
        <Box sx={{ flexGrow: 1 }}>{title}</Box>
        <IconButton size="small">
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      {isOpen && (
        <Table>
          <TableBody>
            <MapTable
              dataElementConfigs={dataConfigs}
              tableName="cdn-event"
            />
          </TableBody>
        </Table>
      )}
    </>
  );

  return (

    <Box id="cdn-event-form-container" className="custom-form">
     {renderSection(
  t("cdn.profileSection", { defaultValue: isLao ? "1. ຂໍ້ມູນຜູ້ເສຍຊີວິດ" : "1. Profile" }),
  openProfile,
  () => setOpenProfile(!openProfile),
  profileSection
)}

{renderSection(
  t("cdn.deathSection", { defaultValue: isLao ? "2. ການເສຍຊີວິດ" : "2. Death Information" }),
  openDeathInfo,
  () => setOpenDeathInfo(!openDeathInfo),
  deathInfoSection
)}

{renderSection(
  t("cdn.informantSection", { defaultValue: isLao ? "3. ຜູ້ໃຫ້ຂໍ້ມູນ" : "3. Informant Details" }),
  openInformantDetail,
  () => setOpenInformantDetail(!openInformantDetail),
  informantSection
)}

{renderSection(
  t("cdn.responsibleSection", { defaultValue: isLao ? "4. ອສບ ຜູ້ລາຍງານ" : "4. Responsible VHV" }),
  openResponsible,
  () => setOpenResponsible(!openResponsible),
  responsibleSection
)}

{renderSection(
  t("cdn.verbalSection", { defaultValue: isLao ? "5. ການລົງສໍາພາດຄົວເຮືອນ ເພື່ອຊອກຫາສາເຫດການເສຍຊີວິດ" : "5. Verbal Autopsy" }),
  openVerbal,
  () => setOpenVerbal(!openVerbal),
  verbalSection
)}
    </Box>

  );
};
// ==============================
// CUSTOM CELLS
// ==============================

const VillageCell = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <TableCell>
        {t("currentAddress", { defaultValue: i18n.language.startsWith("lo") ? "ທີ່ຢູ່ປະຈຸບັນ" : "Current Address" })}
        <span style={{ color: "red", marginLeft: 4 }}>*</span>
      </TableCell>
      <TableCell>
        <Box className="bordered-left">
          <VillageSelectorOrgUnitStage
            variant="outlined"
            saveGeo={true}
            disabled={false}
            VillageSelectorIds={["iI2JhpE62WI", "OVI7tacFkR2", "TLXlYLP2V7t"]}
          />
        </Box>
      </TableCell>
    </>
  );
};

const DeathVillageCell = () => {
  const { t } = useTranslation();

  return (
    <>
      <TableCell>
        {t("PlaceOfDeath")}
        <span style={{ color: "red", marginLeft: 4 }}>*</span>
      </TableCell>

      <TableCell>
        <Box className="bordered-left">
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
        </Box>
      </TableCell>
    </>
  );
};

export default CDN;