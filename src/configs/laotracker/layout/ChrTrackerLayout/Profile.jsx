import { Typography } from "@mui/material";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import VillageSelectorOrgUnitNoState from "../../common/VillageSelector/VillageSelectorOrgUnitNoState";
import Row from "./Row";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import useSelectionStore from "@/state/selection";
import { useShallow } from "zustand/react/shallow";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useChrTrackerStore from "./state";
import { useEffect, useState } from "react";
import { findAttributeValue } from "../../common/utils";
import useProfileRules from "./useProfileRules";
import { tracker } from "@/api";
import { format } from "date-fns";
import { pull } from "@/utils/fetch";
import { generateUid } from "@/utils/utils";
import { toast } from "react-toastify";
import _ from "lodash";
import { Input } from "@/ui/common";
const { searchTeis, saveTei, saveEnrollment, getTeiById } = tracker;

const Profile = ({ title }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { profile } = useChrTrackerStore(
    useShallow((state) => ({
      profile: state.profile
    }))
  );
  const { layout, actions, data } = useTrackerCaptureStore(
    useShallow((state) => ({
      layout: state.layout,
      actions: state.actions,
      data: state.data
    }))
  );
  const { program, orgUnit } = useSelectionStore(
    useShallow((state) => ({
      program: state.program,
      orgUnit: state.orgUnit
    }))
  );
  const { currentTei } = data;
  const { helpers, disabledFields, hiddenFields } = profile;
  const { setLayout, changeAttributeValue, changeTeiProperty } = actions;
  useProfileRules();

  const createCurrentProgramEnrollment = (tei) => {
    const currentDate = format(new Date(), "yyyy-MM-dd");
    const newEnrollment = {
      enrollmentDate: currentDate,
      incidentDate: currentDate,
      enrollment: generateUid(),
      program: program.id,
      trackedEntityInstance: tei.trackedEntityInstance,
      orgUnit: orgUnit.id,
      attributes: []
    };

    const events = [];
    program.programStages.forEach((programStage) => {
      if (programStage.autoGenerateEvent) {
        events.push({
          event: generateUid(),
          eventDate: currentDate,
          dueDate: currentDate,
          program: program.id,
          orgUnit: orgUnit.id,
          programStage: programStage.id,
          dataValues: []
        });
      }
    });

    if (events.length) newEnrollment.events = events;
    return newEnrollment;
  };

  const doEnroll = async (tei) => {
    const currentProgramEnrollment = createCurrentProgramEnrollment(tei);
    const currProgramEnrResult = await saveEnrollment(currentProgramEnrollment);
    const chrEnrollmentResult = await pull(
      `/api/routes/chr/run?work=register&tei=${currentProgramEnrollment.trackedEntityInstance}&program=${program.id}`
    );
    if (chrEnrollmentResult && currProgramEnrResult.ok) {
      const result = await getTeiById(program.id, tei.trackedEntityInstance);
      actions.initData(result, program.id, orgUnit.id);
      actions.setLayout("layout", "layout3");
    }
  };

  const save = async () => {
    const toBeSavedTei = _.cloneDeep(currentTei);
    setLoading(true);
    let newClientHealthId = "";
    if (layout.layout === "layout2") {
      while (true) {
        const dob = findAttributeValue(currentTei, "tQeFLjYbqzv");
        const splitted = dob.split("-");
        const sex = findAttributeValue(currentTei, "DmuazFb368B");
        const randomNumbers = [
          Math.floor(Math.random() * (9 - 0 + 1)) + 0,
          Math.floor(Math.random() * (9 - 0 + 1)) + 0,
          Math.floor(Math.random() * (9 - 0 + 1)) + 0,
          Math.floor(Math.random() * (9 - 0 + 1)) + 0
        ];
        const number = randomNumbers.join("");
        newClientHealthId = `${splitted[2]}${splitted[1]}${splitted[0]}-${sex === "M" ? "1" : "2"}-${number}`;
        const found = await searchTeis({ oPKsfqS64oE: newClientHealthId }, null, "IWp9dQGM0bS", "MCPQUTHX1Ze");
        if (found.trackedEntityInstances.length === 0) {
          break;
        }
      }
    }
    if (layout.layout === "layout2") {
      toBeSavedTei.attributes.push({
        attribute: "oPKsfqS64oE",
        value: newClientHealthId
      });
    }
    const teiResult = await saveTei(toBeSavedTei);
    if (teiResult.ok) {
      toast.success(t("saved"), {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      });
      changeTeiProperty("lastSaved", new Date().toString());
      setLoading(false);
    } else {
      setLoading(false);
    }
    if (layout.layout === "layout2") {
      await doEnroll(toBeSavedTei);
      setLoading(false);
    }
    if (layout.layout === "layout3") {
      await pull(`/api/routes/chr/run?work=update&tei=${currentTei.trackedEntityInstance}`);
    }
  };

  let valid = true;

  helpers.forEach((helper) => {
    if (helper.type === "ERROR") {
      valid = false;
    }
  });

  return (
    <div className="chr-tracker-profile-container">
      <div>
        <div className="chr-tracker-profile-title">{title ? title : t("profile")}</div>
        <div className="chr-tracker-section-content">
          {program.programTrackedEntityAttributes
            .filter((ptea) => {
              const teaId = ptea.trackedEntityAttribute.id;
              return !hiddenFields.includes(teaId);
            })
            .map((ptea) => {
              const teaId = ptea.trackedEntityAttribute.id;
              if (teaId === "oVwa5LfjnvA" || teaId === "UNiaP6Oz7Mv") {
                return null;
              } else if (teaId === "r8bZppSsIvR") {
                return (
                  <Row
                    label={t("currentAddress")}
                    field={[
                      <VillageSelectorOrgUnitNoState
                        disabled={!layout.profileFormEditing || loading}
                        VillageSelectorIds={["r8bZppSsIvR", "oVwa5LfjnvA", "UNiaP6Oz7Mv"]}
                        change={(values) => {
                          changeAttributeValue("r8bZppSsIvR", values[0] ? values[0].value : "");
                          changeAttributeValue("oVwa5LfjnvA", values[1] ? values[1].value : "");
                          changeAttributeValue("UNiaP6Oz7Mv", values[2] ? values[2].value : "");
                        }}
                        initValues={[
                          findAttributeValue(currentTei, "r8bZppSsIvR"),
                          findAttributeValue(currentTei, "oVwa5LfjnvA"),
                          findAttributeValue(currentTei, "UNiaP6Oz7Mv")
                        ]}
                        mandatoryFields={["r8bZppSsIvR", "oVwa5LfjnvA", "UNiaP6Oz7Mv"]}
                      />,
                      !findAttributeValue(currentTei, "UNiaP6Oz7Mv") && <Typography variant="ERROR">{t("thisFieldIsRequired")}</Typography>
                    ]}
                  />
                );
              } else if (teaId === "RwoKpuIgMmA") {
                let value = findAttributeValue(currentTei, "RwoKpuIgMmA");
                value = value.substring(3);
                return (
                  <Row
                    label={<AttributeLabel attribute={teaId} />}
                    field={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span>020</span>&nbsp;
                        <div>
                          <Input
                            change={(value) => {
                              changeAttributeValue("RwoKpuIgMmA", "020" + value);
                            }}
                            value={value}
                            valueType="TEXT"
                            helpers={helpers.filter((h) => h.target === teaId)}
                            disabled={disabledFields.includes(teaId) || loading || !layout.profileFormEditing}
                          />
                        </div>
                      </div>
                    }
                  />
                );
              } else {
                return (
                  <Row
                    label={<AttributeLabel attribute={teaId} />}
                    field={
                      <AttributeField
                        attribute={teaId}
                        helpers={helpers.filter((h) => h.target === teaId)}
                        disabled={disabledFields.includes(teaId) || loading}
                      />
                    }
                  />
                );
              }
            })}
        </div>
        <div className="chr-tracker-section-buttons chr-tracker-profile-buttons">
          {!layout.profileFormEditing && (
            <Button
              variant="contained"
              onClick={() => {
                setLayout("profileFormEditing", true);
              }}
            >
              {t("edit")}
            </Button>
          )}
          {layout.profileFormEditing && (
            <LoadingButton
              disabled={!valid}
              loading={loading}
              variant="contained"
              color="success"
              onClick={async () => {
                await save();
                setLayout("profileFormEditing", false);
              }}
            >
              {t("save")}
            </LoadingButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
