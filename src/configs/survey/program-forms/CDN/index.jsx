import React from "react";
import { useMemo, useEffect, useState } from "react";
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
import VillageSelectorOrgUnitStage from "../common/villageselectors";
import { useAgeInYearRule, useForeignerRule } from "../common/hook";
import MapTable from "../common/MapTable";
import useEventCaptureStore from "@/state/eventCapture";
import "./index.css";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import Appro from "./checkApprove"
const AUTO_ID = "EnTm3aFU6X0";
const villageSectorIds = ["iI2JhpE62WI", "OVI7tacFkR2", "TLXlYLP2V7t"];



const CDN = () => {


const [approve, setapprove] = useState(false); // matches boolean usage
  const [language, setLanguage] = useState("lo");
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");
  const langKey = isLao ? "lo" : "en";
  // Fetch user locale from DHIS2
  const [parentStatus, setParentStatus] = useState("None");

  const { currentEvent, actions } = useEventCaptureStore(
    (state) => ({
      currentEvent: state.currentEvent,
      actions: state.actions,
    }),
    shallow
  );
useEffect(() => {
  const statusapprove = parentStatus;
  const isApproved = statusapprove === "None";

  setapprove(isApproved);

  actions.setLayout("hideEventFormCompleteButton", !isApproved);
  actions.setLayout("disableEventSaveButton", !isApproved);
  actions.setLayout("hideEventDeleteButton", !isApproved);

},[parentStatus]);
  
  useEffect(() => {
    actions.setLayout("hideFormTop", true);

  }, [actions]);
  const { orgUnit, period } = useSelectionStore(
  (state) => ({
    orgUnit: state.orgUnit,
    period: state.period,
  }),
  shallow
);

  // Section open states,
  const [openProfile, setOpenProfile] = useState(true);
  const [openDeathInfo, setOpenDeathInfo] = useState(true);
  const [openInformantDetail, setOpenInformantDetail] = useState(true);
  const [openResponsible, setOpenResponsible] = useState(true);
  const [openVerbal, setOpenVerbal] = useState(true);

  useAgeInYearRule("Z1x2iwf6IIY", "VpdbpoTRlvK", "yIL1eC0xbc2");
  useForeignerRule("YOU5UrERj6L", villageSectorIds);
  // useEthnicityRule("zWd0wumpAvd", "ytpz8RquNDX");
const generateAutoValue = () => {
  // Take only the last 4 digits of orgUnit code
  const codePart = orgUnit.code.slice(0, 4).padEnd(4, "0"); 
  const random4 = String(Math.floor(Math.random() * 10000)).padStart(4, "0");

  return `CDN${codePart}${random4}`;
};
  // Auto-generate CDN number
  useEffect(() => {
    if (!currentEvent?.event) return;

    const currentValue = currentEvent?.dataValues?.[AUTO_ID];

    if (!currentValue) {
      // Generate CDN number
      actions.setCurrentEventDataValue(AUTO_ID, generateAutoValue());
      


      // Set today's date
      // const today = new Date().toISOString().split("T")[0];
    }

}, [currentEvent?.event, actions, orgUnit?.code]);
      actions.setCurrentEventProperty("eventDate", currentEvent?.dataValues["uQ9r3BuELco"]);
// Get month and map to quarter safely
let year = "";
let quarter = "";
console.log(currentEvent?.eventDate)
if (currentEvent?.eventDate) {
  const [y, m] = currentEvent.eventDate.split("-");
  year = y;
  const monthNum = parseInt(m, 10);

  if (monthNum >= 1 && monthNum <= 3) {
    quarter = "Q1";
  } else if (monthNum >= 4 && monthNum <= 6) {
    quarter = "Q2";
  } else if (monthNum >= 7 && monthNum <= 9) {
    quarter = "Q3";
  } else if (monthNum >= 10 && monthNum <= 12) {
    quarter = "Q4";
  }
}
  useEffect(() => {
    if (!currentEvent?.dataValues) return;
    const values = currentEvent?.dataValues || {};
    const isForeigner = values["YOU5UrERj6L"] === "true";
    const isknownForeigner = values["v5Jp11tHjll"] === "true";
    const isanotherdeathplace = values["ImbZ26FXqCY"] === "Other (specify)"

    const isKnownDob = values["Q9jyrprwX9y"] === "true";
    const ageYear = Number(values["VpdbpoTRlvK"] || 0);
    const ageMonth = Number(values["yIL1eC0xbc2"] || 0);
    const causeOfDeath = currentEvent?.dataValues?.["QvX65zeRteX"];
    const isSpecifydis = causeOfDeath === "Disease";
    const isSpecifyacc = causeOfDeath === "Accident";
    const isSpecifyCOD = currentEvent?.dataValues?.["GPk8DJyIJTM"] === "Others" || currentEvent?.dataValues?.["ngM7quVkD4e"] === "Others";

    const isDetailMD = causeOfDeath == "Other (specify)"
    const isanotherRelationship = currentEvent?.dataValues?.["zr7r1dtULBg"] === "Other (specify)";

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
    }
    else {
      requiredFields.push("iI2JhpE62WI", "OVI7tacFkR2", "TLXlYLP2V7t");
    }
    if (isknownForeigner) {
      requiredFields.push("kXRyqHLsX8b");
    }
    if (isanotherdeathplace) {
      requiredFields.push("utoaY7xFLon");
    }
    if (isSpecifydis) {
      requiredFields.push("GPk8DJyIJTM");
    }
     if (isSpecifyacc) {
      requiredFields.push("ngM7quVkD4e");
    }
      if (isSpecifyCOD) {
      requiredFields.push("HwYXxOEKkVm");
    }
    if (isDetailMD) {
      requiredFields.push("fyDdwAMidRI");

    }
    if (isanotherRelationship) {
      requiredFields.push("JxA90BwDj2H");

    }
  



const idVal = currentEvent?.dataValues["MnZSiIdduQb"];

const isInvalidId =
  idVal && !/^\d{4}$/.test(idVal);

const isIncomplete =
  requiredFields.some(
    (id) => !values[id] || values[id] === ""
  ) || isInvalidId;
if (!isIncomplete && parentStatus === "None"){
actions.setLayout("hideEventFormCompleteButton", false);
actions.setLayout("disableEventSaveButton", true);
}else if (parentStatus != "None" && !isIncomplete){
  actions.setLayout("hideEventFormCompleteButton", true);
actions.setLayout("disableEventSaveButton", true);
}
else if(isIncomplete){
  actions.setLayout("hideEventFormCompleteButton", true);
actions.setLayout("disableEventSaveButton", true);
}





}, [currentEvent?.dataValues, actions] [parentStatus]

);


  useEffect(() => {
    const isKnownDob = currentEvent?.dataValues?.["Q9jyrprwX9y"] === "true";
    const ismonthinyear = currentEvent?.dataValues?.["yIL1eC0xbc2"] >= 1;
    const isCountryHidden = currentEvent?.dataValues?.["v5Jp11tHjll"];
    const isVillageHidden = currentEvent?.dataValues?.["YOU5UrERj6L"] === "true";
    const isAgeinyear = currentEvent?.dataValues?.["VpdbpoTRlvK"] >= 1
    // Get today's date in YYYY-MM-DD format
    const isanotherRelationship = currentEvent?.dataValues?.["zr7r1dtULBg"] === "Other (specify)";
    const causeOfDeath = currentEvent?.dataValues?.["QvX65zeRteX"];
    const isSpecifydis = causeOfDeath === "Disease";
    const isSpecifyacc = causeOfDeath === "Accident";
    const isSpecifyCOD = currentEvent?.dataValues?.["GPk8DJyIJTM"] === "Others" || currentEvent?.dataValues?.["ngM7quVkD4e"] === "Others";

    const isDetailMD = causeOfDeath == "Other (specify)"
    const isotherplaceOfdeath = currentEvent?.dataValues?.["ImbZ26FXqCY"] === "Other (specify)";
    const definecountry=currentEvent?.dataValues?.["v5Jp11tHjll"] === "true";
      const isEthnicityOther =
      currentEvent?.dataValues?.["zWd0wumpAvd"] === "ອື່ນໆ";
          const isotherocc = currentEvent?.dataValues?.["xbAV5SzeGbB"] === "Other";
      if (!isotherocc) {
      actions.setCurrentEventDataValue("r0egoQrrpTi", null);
    }
        if (!isEthnicityOther) {
      actions.setCurrentEventDataValue("ytpz8RquNDX", null);
    }
    if (!isotherplaceOfdeath) {
      actions.setCurrentEventDataValue("utoaY7xFLon", null);
    }
    if (!isDetailMD) {
      actions.setCurrentEventDataValue("fyDdwAMidRI", null);

    }
    if (!isSpecifydis) {
      actions.setCurrentEventDataValue("GPk8DJyIJTM", null);

    }
        if (!isSpecifyacc) {
      actions.setCurrentEventDataValue("ngM7quVkD4e", null);

    }
            if (!isSpecifyCOD) {
      actions.setCurrentEventDataValue("HwYXxOEKkVm", null);

    }

    if (!isanotherRelationship) {
      actions.setCurrentEventDataValue("JxA90BwDj2H", null);

    }
    if (ismonthinyear) {
      actions.setCurrentEventDataValue("VpdbpoTRlvK", "0");
    }
    if (isAgeinyear) {
      actions.setCurrentEventDataValue("yIL1eC0xbc2", "0");
    }

 if (!definecountry) {
      actions.setCurrentEventDataValue("kXRyqHLsX8b", null);
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

    } else {
      actions.setCurrentEventDataValue("xVXPkWtC9OQ", null);
      actions.setCurrentEventDataValue("Q9I8uYEdL4O", null);


    }


  }, [
    currentEvent?.dataValues?.["Q9jyrprwX9y"],
    currentEvent?.dataValues?.["yIL1eC0xbc2"],
    currentEvent?.dataValues?.["v5Jp11tHjll"],
    currentEvent?.dataValues?.["YOU5UrERj6L"],
    currentEvent?.dataValues?.["VpdbpoTRlvK"],
    currentEvent?.dataValues?.["zr7r1dtULBg"],
    currentEvent?.dataValues?.["QvX65zeRteX"],
    currentEvent?.dataValues?.["ImbZ26FXqCY"],
    currentEvent?.dataValues?.["zWd0wumpAvd"],
    currentEvent?.dataValues?.["xbAV5SzeGbB"] ,
    currentEvent?.dataValues?.["GPk8DJyIJTM"] ,
    currentEvent?.dataValues?.["ngM7quVkD4e"] 


  ]);

  // ==============================
  // SECTIONS
  // ==============================


  const profileSection = useMemo(() => {
    const isVillageHidden = currentEvent?.dataValues?.["YOU5UrERj6L"] == "true";
    const isCountryHidden = currentEvent?.dataValues?.["v5Jp11tHjll"] === "true";
    const isKnownDob = currentEvent?.dataValues?.["Q9jyrprwX9y"] === "true";
    const isotherocc = currentEvent?.dataValues?.["xbAV5SzeGbB"] === "Other";

    const isEthnicityOther =
      currentEvent?.dataValues?.["zWd0wumpAvd"] === "ອື່ນໆ";

    const isAgeinyear =
      currentEvent?.dataValues?.["VpdbpoTRlvK"] >= 1;

    const ismonthinyear =
      currentEvent?.dataValues?.["VpdbpoTRlvK"] == 0;
const idVal = currentEvent?.dataValues?.["MnZSiIdduQb"] || "";
const showIdError =
  idVal && !/^\d{4}$/.test(idVal);    return [
      [{ id: AUTO_ID, fieldProps: { disabled: true, required: true } }],
      [{ id: "KwvHnqsDs1o",fieldProps: {disabled:!approve} }],
      [{ id: "ov0lHV2tlPH",fieldProps: {disabled:!approve}  }],
[{ 
  id: "MnZSiIdduQb",
  message: showIdError
    ? t("cdn.id4digits", {
        defaultValue: isLao
          ? "ລະບຸລະຫັດ 4 ຕົວເລກສຸດທ້າຍ"
          : "ID must be exactly 4 digits"
      })
    : "",fieldProps: {disabled:!approve} 
}],
[{ id: "e7WqWMbQBIR",fieldProps: {disabled:!approve} }],
      [{ id: "v64kYMoUHLV", fieldProps: { required: true ,disabled:!approve} }], //*
      [{ id: "gzgxzG9iVRI" ,fieldProps: {disabled:!approve} }],
      [{ id: "rRmoVaP9pK9", fieldProps: { required: true,disabled:!approve } }],
      [{ id: "Q9jyrprwX9y", fieldProps: { required: true ,disabled:!approve} }],
      ...(isKnownDob
        ? [[{ id: "Z1x2iwf6IIY", fieldProps: { required: isKnownDob ,disabled:!approve} }]] //*
        : []),
      ...(isAgeinyear || !isKnownDob ? [[{ id: "VpdbpoTRlvK", fieldProps: { disabled: currentEvent?.dataValues?.["yIL1eC0xbc2"] >= 1 || isKnownDob ||!approve, required: true } }]] : []),
      ...(ismonthinyear ? [[{ id: "yIL1eC0xbc2", fieldProps: { disabled: isKnownDob ||!approve, required: true } }]] : []),

      [{ id: "zWd0wumpAvd",fieldProps: {disabled:!approve} }], //*
      ...(isEthnicityOther ? [[{ id: "ytpz8RquNDX",fieldProps: {disabled:!approve}  }]] : []),
      [{ id: "AlD7MFvoYQs" ,fieldProps: {disabled:!approve} }],

      [{ id: "NenTvDjChyo",fieldProps: {disabled:!approve}  }],
      [{ id: "xbAV5SzeGbB",fieldProps: {disabled:!approve}  }],
      ...(isotherocc ? [[{ id: "r0egoQrrpTi",fieldProps: {disabled:!approve}  }]] : []),


      [{ id: "YOU5UrERj6L", fieldProps: { required: true ,disabled:!approve } }],
      ...(isVillageHidden ? [[{ id: "v5Jp11tHjll", fieldProps: { required: true , disabled:!approve } }]] : []),


      ...(isCountryHidden && isVillageHidden ? [[{ id: "kXRyqHLsX8b", fieldProps: { required: true,disabled:!approve } }]] : []),

      [
        {
          customCell: <VillageCell approve={approve}/>,
          isCustomCellHide: isVillageHidden,
          fieldProps: { required: false},
          

        },

      ],
      ...(!isVillageHidden ? [[{ id: "xVXPkWtC9OQ",fieldProps: {disabled:!approve}  }]] : []),
      ...(!isVillageHidden ? [[{ id: "Q9I8uYEdL4O" ,fieldProps: {disabled:!approve} }]] : []),


    ];
  }, [
    currentEvent?.dataValues?.["YOU5UrERj6L"],
    currentEvent?.dataValues?.["Q9jyrprwX9y"], // Add it to dependencies if it's important
    currentEvent?.dataValues?.["yIL1eC0xbc2"],
    currentEvent?.dataValues?.["xbAV5SzeGbB"],
  currentEvent?.dataValues?.["MnZSiIdduQb"],  // ✅ ADD THIS
    currentEvent?.dataValues?.["v5Jp11tHjll"],
    currentEvent?.dataValues?.["zWd0wumpAvd"],
    currentEvent?.dataValues?.["VpdbpoTRlvK"],
    [currentEvent?.dataValues, approve],

  ]);
  const deathInfoSection = useMemo(() => {
    const causeOfDeath = currentEvent?.dataValues?.["QvX65zeRteX"];
    const isSpecifydis = causeOfDeath === "Disease";
    const isSpecifyacc = causeOfDeath === "Accident";
    const isSpecifyCOD = currentEvent?.dataValues?.["GPk8DJyIJTM"] === "Others" || currentEvent?.dataValues?.["ngM7quVkD4e"] === "Others";

    const isDetailMD = causeOfDeath == "Other (specify)"
    const isotherplaceOfdeath = currentEvent?.dataValues?.["ImbZ26FXqCY"] === "Other (specify)";


    return [
      [{ id: "uQ9r3BuELco", fieldProps: { required: true,disabled:!approve } }],
      [{ id: "Qh9Bw2E3wbi",fieldProps: {disabled:!approve}  }],
      [{ id: "Oxhur2LfVCr",fieldProps: {disabled:!approve}  }],
      [{ id: "ImbZ26FXqCY", fieldProps: { required: true ,disabled:!approve} }],//*
      ...(isotherplaceOfdeath ? [[{ id: "utoaY7xFLon", fieldProps: { required: true,disabled:!approve  } }]] : []),
      [{ id: "QvX65zeRteX", fieldProps: { required: true,disabled:!approve  } }], //*

      ...(isSpecifydis
        ? [
          [
            {
              id: "GPk8DJyIJTM", fieldProps: { required: true,disabled:!approve  }
            },
          ]
        ]
        : []),
       

      ...(isDetailMD
        ? [
          [
            {
              id: "fyDdwAMidRI", fieldProps: { required: true ,disabled:!approve}
            },
          ]
        ]
        : []),
          ...(isSpecifyacc
        ? [
          [
            {
              id: "ngM7quVkD4e", fieldProps: { required: true,disabled:!approve }
            },
          ]
        ]
        : []),
  ...(isSpecifyCOD
        ? [
          [
            {
              id: "HwYXxOEKkVm", fieldProps: { required: true ,disabled:!approve}
            },
          ]
        ]
        : []),
        
      [
        {
          customCell: <DeathVillageCell approve={approve}/>,
        },
      ],


      [{ id: "HRwRhEljEtJ",fieldProps: {disabled:!approve}  }],

      [{ id: "lxr5gKfFrwC",fieldProps: {disabled:!approve}  }],
    ];
  }, [
    currentEvent?.dataValues?.["QvX65zeRteX"],
    currentEvent?.dataValues?.["ImbZ26FXqCY"],
    currentEvent?.dataValues?.["GPk8DJyIJTM"] ,
    currentEvent?.dataValues?.["ngM7quVkD4e"] ,
    [currentEvent?.dataValues, approve],

  ]);
 const informantSection = useMemo(() => {
  const isanotherRelationship =
    currentEvent?.dataValues?.["zr7r1dtULBg"] === "Other (specify)";

  return [
    [{ id: "HqgTB3yqJby", fieldProps: { required: true, disabled: !approve } }],
    [{ id: "SRajXU5CS08", fieldProps: { disabled: !approve } }],
    [{ id: "zr7r1dtULBg", fieldProps: { required: true, disabled: !approve } }],
    ...(isanotherRelationship
      ? [[{ id: "JxA90BwDj2H", fieldProps: { required: true, disabled: !approve } }]]
      : []),
  ];
}, [currentEvent?.dataValues, approve]);
  ;
  const responsibleSection = useMemo(
    () => [[{ id: "Pmy32RqodmK",fieldProps: {disabled:!approve } }]],
    [[currentEvent?.dataValues, approve],
]
  );

  const verbalSection = useMemo(
    () => [[{ id: "bGtSTEprQfa", fieldProps: { disabled: true } }],
    // [{ id: "Wse7ljFOmth",disabled: true}]
  ],
    [[currentEvent?.dataValues, approve],
    
]
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
               editable={true} 
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
<Appro orgUnitId={orgUnit.id} year={year} quarter={quarter} onStatusLoaded={setParentStatus}/>
    </Box>

  );
};
// ==============================
// CUSTOM CELLS
// ==============================


export const VillageCell = ({ approve }) => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").startsWith("lo");

  const { currentEvent, actions } = useEventCaptureStore((state) => ({
    currentEvent: state.currentEvent,
    actions: state.actions,
  }));

  const getVal = (id) => currentEvent?.dataValues?.[id] || "";

  const isDisabled =
    currentEvent?.status === "COMPLETED";

  return (
    <>
      <TableCell>
        <Box sx={{ display: "flex" }}>
          {t("currentAddress", {
            defaultValue: isLao ? "ທີ່ຢູ່ປະຈຸບັນ" : "Current Address",
          })}
          <span style={{ color: "red", marginLeft: 4 }}>*</span>
        </Box>
      </TableCell>

      <TableCell>
        <VillageSelectorOrgUnitStage
          provinceGroupId="jblbYwuvO33"
          districtGroupId="Zh1inFu0Z2O"
          villageGroupId="dGSmKUusVZG"
          disabled={isDisabled || !approve}
          init={{
            province: getVal("iI2JhpE62WI"),
            district: getVal("OVI7tacFkR2"),
            village: getVal("TLXlYLP2V7t"),
          }}
          onChange={({ province, district, village }) => {
            actions.setCurrentEventDataValue("iI2JhpE62WI", province || "");
            actions.setCurrentEventDataValue("OVI7tacFkR2", district || "");
            actions.setCurrentEventDataValue("TLXlYLP2V7t", village || "");
          }}
        />
      </TableCell>
    </>
  );
};
// ======================
// DeathVillageCell
// ======================


export const DeathVillageCell = ({ approve }) => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const { currentEvent, actions } = useEventCaptureStore((state) => ({
    currentEvent: state.currentEvent,
    actions: state.actions,
  }));

  const getVal = (id) => currentEvent?.dataValues?.[id] || "";

  const isDisabled =
    currentEvent?.status === "COMPLETED";

  return (
    <>
      <TableCell>
        <Box sx={{ display: "flex" }}>
          {t("PlaceOfDeath", {
            defaultValue: isLao ? "ສະຖານທີ່ເສຍຊີວິດ" : "Place Of Death",
          })}
          <span style={{ color: "red", marginLeft: 4 }}>*</span>
        </Box>
      </TableCell>

      <TableCell>
        <VillageSelectorOrgUnitStage
          provinceGroupId="jblbYwuvO33"
          districtGroupId="Zh1inFu0Z2O"
          villageGroupId="dGSmKUusVZG"
          disabled={isDisabled || !approve}
          init={{
            province: getVal("J8ptEYl6IuC"),
            district: getVal("Dp3e82RfKhz"),
            village: getVal("QE48InnEP6T"),
          }}
          onChange={({ province, district, village }) => {
            actions.setCurrentEventDataValue("J8ptEYl6IuC", province || "");
            actions.setCurrentEventDataValue("Dp3e82RfKhz", district || "");
            actions.setCurrentEventDataValue("QE48InnEP6T", village || "");
          }}
        />
      </TableCell>
    </>
  );
};
export default CDN;