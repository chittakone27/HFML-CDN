import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";
import { shallow } from "zustand/shallow";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import EnrollmentDateLabel from "@/ui/TrackerCapture/Profile/EnrollmentDateLabel";
import EnrollmentDateField from "@/ui/TrackerCapture/Profile/EnrollmentDateField";
import FieldRow from "./FieldRow";
import { Box, Divider, Typography } from "@mui/material";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useEffect, useState } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import Cascader from "@/ui/common/Cascader/Cascader";
import useProfileRules from "./rules/useProfileRules";
import VillageSelector from "../common/tracker/VillageSelector/VillageSelector";

const Profile = () => {
  const { t, i18n } = useTranslation();
  const props = useProfileRules();
  const lang = i18n.language;
  const { data, actions } = useTrackerCaptureStore((state) => ({ data: state.data, actions: state.actions }), shallow);
  const { program, orgUnit } = useSelectionStore((state) => ({ program: state.program, orgUnit: state.orgUnit }), shallow);
  const { trackedEntityAttributes, optionSets, orgUnits } = useMetadataStore(
    (state) => ({
      trackedEntityAttributes: state.trackedEntityAttributes,
      optionSets: state.optionSets,
      orgUnits: state.orgUnits
    }),
    shallow
  );
  const { changeAttributeValue } = actions;

  const currentTeas = program.programTrackedEntityAttributes.map((ptea) => {
    const foundTea = trackedEntityAttributes.find((tea) => tea.id === ptea.trackedEntityAttribute.id);
    return foundTea;
  });
  const { currentTei, currentEnrollment, currentEvents } = data;
  const { attributes } = currentTei;

  const generateChildUniqueId = (dob, sex, currentUniqueId) => {
    const randomNumber = [
      Math.floor(Math.random() * (9 - 0 + 1)) + 0,
      Math.floor(Math.random() * (9 - 0 + 1)) + 0,
      Math.floor(Math.random() * (9 - 0 + 1)) + 0
    ];
    const extId = currentUniqueId && currentUniqueId.split("-").length === 3 ? currentUniqueId.split("-")[2] : randomNumber.join("");
    return `${moment(dob).format("DDMMYYYY")}-${sex === "M" ? "1" : "2"}-${extId}`;
  };

  const setChildUniqueId = (dob, sex, currentUniqueId) => {
    const childUniqueId = generateChildUniqueId(dob, sex, currentUniqueId);
    changeAttributeValue("zZoGQEghrHp", childUniqueId);
  };

  useEffect(() => {
    const dob = attributes.find((e) => e.attribute === "tQeFLjYbqzv")?.value;
    const sex = attributes.find((e) => e.attribute === "DmuazFb368B")?.value;
    const currentUniqueId = attributes.find((e) => e.attribute === "zZoGQEghrHp")?.value;
    if (dob && sex) {
      setChildUniqueId(dob, sex, currentUniqueId);
    }
  }, []);

  useEffect(() => {
    const currentUniqueIdAttr = attributes.find((e) => e.attribute === "zZoGQEghrHp");
    const currentUniqueId = currentUniqueIdAttr?.value;
    if (currentUniqueIdAttr?.value.split("-").length === 3 || !currentUniqueIdAttr) {
      const dob = attributes.find((e) => e.attribute === "tQeFLjYbqzv")?.value;
      const sex = attributes.find((e) => e.attribute === "DmuazFb368B")?.value;
      if (dob && sex) {
        setChildUniqueId(dob, sex, currentUniqueId);
      }
    }
  }, [JSON.stringify(attributes)]);

  const sections = [
    {
      key: "childGeneralInfo",
      attributes: [
        "zZoGQEghrHp",
        "IEE2BMhfoSc",
        "IBLkiaYRRL3",
        "tQeFLjYbqzv",
        "DmuazFb368B",
        "a7ENn4teyQd",
        "r8bZppSsIvR",
        "oVwa5LfjnvA",
        "UNiaP6Oz7Mv"
        // "afXHIJ7vIcR",
        // "ZHmuDGwi50G",
        // "RH44eXu8Wwl"
      ]
    },
    {
      key: "childGuardian",
      attributes: ["Y58VlT2JZ0h", "hyjuL8jlDbr", "rkvu8WOjGun"]
    }
  ];

  const VillageSelectorIds = ["r8bZppSsIvR", "oVwa5LfjnvA", "UNiaP6Oz7Mv"];

  const hiddenAttributes = ["oWFcp8NFmOV", "B8PuwTK2vGJ"];
  return (
    <div className="imam-profile-container">
      <div style={{ padding: 5 }}>
        <EnrollmentDateLabel />
        <EnrollmentDateField />
      </div>
      {sections.map((section) => {
        return (
          <>
            {
              <Box
                sx={{
                  padding: "10px",
                  backgroundColor: "#ededed",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Typography sx={{ fontWeight: "bold", color: "#3d3d3d" }}>{t(section.key)}</Typography>
              </Box>
            }
            {section.attributes.map((tea) => {
              if (VillageSelectorIds.includes(tea)) {
                if (tea === "r8bZppSsIvR") {
                  return (
                    <FieldRow type="custom" customLabel={t("address")}>
                      <div>
                        <VillageSelector VillageSelectorIds={VillageSelectorIds} />
                      </div>
                    </FieldRow>
                  );
                }
              } else if (hiddenAttributes.includes(tea)) {
                return null;
              } else {
                return <FieldRow type="attribute" id={tea} disabled={tea === "zZoGQEghrHp"} {...props[tea]} />;
              }
            })}
          </>
        );
      })}
    </div>
  );
};

export default Profile;
