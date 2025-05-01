import { Typography } from "@mui/material";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import VillageSelectorOrgUnitNoState from "../../common/VillageSelector/VillageSelectorOrgUnitNoState";
import Row from "./Row";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import { Button, Popover, Alert, AlertTitle } from "@mui/material";
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
const { searchTeis, saveTei, saveEnrollment, getTeiById, deleteEnrollment } = tracker;
const TEAS1 = "oPKsfqS64oE";
const TEAS2 = ["IEE2BMhfoSc", "IBLkiaYRRL3", "DmuazFb368B", "tQeFLjYbqzv", "BaiVwt8jVfg", "vJdG29KW1Et", "RwoKpuIgMmA", "IdwH3mwSy2o", "UsQwqMatstH"];
const IDENTIFICATION_TEAS = ["lRZGCESE6v2", "corXnplgfQ7", "pjpnF7u5PQj", "ebLsZHyGHYx", "gSImG6wxCkY", "E0zWSujcGQC", "FB3Ro1hJ9ht"];
const TEAS3 = ["r8bZppSsIvR", "xbwURy2jG2K", "tJrT8GIy477", "uR9XK6AbPvE", "ERzDXXMuOdq", "UJioxXRLgpw"];
const Profile = ({ title }) => {
  const { t } = useTranslation();
  const [editProfileAnchorEl, setEditProfileAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
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
  const { currentTei, currentEnrollments } = data;
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
    }
    if (layout.layout === "layout2") {
      await doEnroll(toBeSavedTei);
      setLoading(false);
    }
    if (layout.layout === "layout3") {
      await pull(`/api/routes/chr/run?work=update&tei=${currentTei.trackedEntityInstance}`);
      setLoading(false);
    }
  };

  let valid = true;

  helpers.forEach((helper) => {
    if (helper.type === "ERROR") {
      valid = false;
    }
  });

  const generateField = (tea) => {
    const teaId = tea;
    if (hiddenFields.includes(teaId)) {
      return null;
    }
    if (teaId === "oVwa5LfjnvA" || teaId === "UNiaP6Oz7Mv") {
      return null;
    } else if (teaId === "r8bZppSsIvR") {
      return (
        <Row
          label={t("currentAddress")}
          field={
            <div style={{ width: "100%" }}>
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
              />
              {!findAttributeValue(currentTei, "UNiaP6Oz7Mv") && <Typography variant="ERROR">{t("thisFieldIsRequired")}</Typography>}
            </div>
          }
        />
      );
    } else if (teaId === "RwoKpuIgMmA") {
      let currentPhoneNo = findAttributeValue(currentTei, "RwoKpuIgMmA");
      const backNum = currentPhoneNo.substring(3);
      const frontNum = currentPhoneNo.substring(0, 3);
      return (
        <Row
          label={<AttributeLabel attribute={teaId} />}
          field={
            <div>
              <div style={{ display: "flex" }}>
                <div style={{ width: 120 }}>
                  <Input
                    disableClearable
                    change={(value) => {
                      changeAttributeValue("RwoKpuIgMmA", value + backNum);
                    }}
                    valueSet={[
                      { value: "020", label: "020" },
                      { value: "030", label: "030" }
                    ]}
                    value={frontNum}
                    valueType="TEXT"
                    disabled={disabledFields.includes(teaId) || loading || !layout.profileFormEditing}
                  />
                </div>
                &nbsp;
                <Input
                  change={(value) => {
                    changeAttributeValue("RwoKpuIgMmA", frontNum + value);
                  }}
                  value={backNum}
                  valueType="TEXT"
                  disabled={disabledFields.includes(teaId) || loading || !layout.profileFormEditing}
                />
              </div>
              {helpers
                .filter((h) => h.target === teaId)
                .map((h) => {
                  return <Typography variant="ERROR">{t(h.value)}</Typography>;
                })}
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
  };

  return (
    <div className="chr-tracker-profile-container">
      <div>
        <div className="chr-tracker-profile-title">{title ? title : t("profile")}</div>
        <div className="chr-tracker-profile-section-content">
          <div className="chr-tracker-client-health-id-row">
            <Row
              label={<AttributeLabel attribute={TEAS1} />}
              field={
                <AttributeField
                  attribute={TEAS1}
                  helpers={helpers.filter((h) => h.target === TEAS1)}
                  disabled={disabledFields.includes(TEAS1) || loading}
                />
              }
            />
          </div>
          <div style={{ overflow: "auto", height: "calc(100% - 111px)" }}>
            {TEAS2.map((tea) => {
              return generateField(tea);
            })}
            {IDENTIFICATION_TEAS.map((tea) => {
              return generateField(tea);
            })}
            {TEAS3.map((tea) => {
              return generateField(tea);
            })}
          </div>
        </div>
        <div className="chr-tracker-section-buttons chr-tracker-profile-buttons">
          {!layout.profileFormEditing && (
            <Button
              variant="contained"
              onClick={(event) => {
                setEditProfileAnchorEl(event.currentTarget);
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
          &nbsp;
          <LoadingButton
            loading={loading}
            variant="outlined"
            color="error"
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            {t("delete")}
          </LoadingButton>
          <Popover
            open={Boolean(editProfileAnchorEl)}
            anchorEl={editProfileAnchorEl}
            onClose={(event, reason) => {
              if (reason !== "backdropClick") {
                setEditProfileAnchorEl(null);
              }
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
          >
            <div className="delete-event-confirmation">
              {t("editProfileConfirmation")}
              <br />
              <br />
              <LoadingButton
                loading={loading}
                variant="contained"
                onClick={async () => {
                  setLayout("profileFormEditing", true);
                  setEditProfileAnchorEl(null);
                }}
              >
                {t("ok")}
              </LoadingButton>
              &nbsp;
              <LoadingButton
                color="error"
                variant="contained"
                onClick={() => {
                  setEditProfileAnchorEl(null);
                }}
              >
                {t("cancel")}
              </LoadingButton>
            </div>
          </Popover>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={(event, reason) => {
              if (reason !== "backdropClick") {
                setAnchorEl(null);
              }
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
          >
            <div className="delete-event-confirmation">
              <Alert severity="error" style={{ color: "#ff4538" }}>
                <AlertTitle>{t("warning")}</AlertTitle>
                {t("deleteTeiConfirmation")}
              </Alert>
              <br />
              <LoadingButton
                loading={loading}
                color="error"
                variant="contained"
                onClick={async () => {
                  setLoading(true);
                  for (let i = 0; i < currentEnrollments.length; i++) {
                    await deleteEnrollment(currentEnrollments[i].enrollment);
                  }
                  await pull(`/api/routes/chr/run?work=unenroll&tei=${currentTei.trackedEntityInstance}&program=${program.id}`);
                  setLoading(false);
                  setLayout("layout", "layout1");
                }}
              >
                {t("delete")}
              </LoadingButton>
              &nbsp;
              <LoadingButton
                loading={loading}
                color="primary"
                variant="contained"
                onClick={() => {
                  setAnchorEl(null);
                }}
              >
                {t("cancel")}
              </LoadingButton>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Profile;
