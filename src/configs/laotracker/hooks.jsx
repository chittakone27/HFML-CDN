import { Fragment, useEffect, useState, useRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Popover,
  Alert,
  AlertTitle,
  Tab
} from "@mui/material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import withPadding from "@/hocs/withPadding";
import useControlBarStore from "@/state/controlBar";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import CustomEirSearchButton from "./common/CustomEirSearchButton/CustomEirSearchButton";
import { shallow } from "zustand/shallow";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import { findAttributeValue, findDataValue } from "./common/utils";
import _ from "lodash";
import { tracker } from "@/api";
import { format } from "date-fns";
import { pull } from "@/utils/fetch";
const {
  getTeiById,
  saveTei,
  deleteEvent,
  saveEvent,
  saveEnrollment,
  deleteEnrollment,
  deleteTei
} = tracker;
import { ALL_VACCINE_FOR_FULL_IMMUNIZED } from "./program-forms/eir/Immunization/constants";
import { PDFDocument, StandardFonts, rgb, grayscale } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import birthCertificateV2 from "@/configs/laotracker/assets/example-bc.pdf";
import phetsarathFont from "@/configs/laotracker/assets/Phetsarath-OT.ttf";

import { VALUE_COORDS_CONFIGS } from "./utils/deli-registry-pdf-configs";
const { MOTHER_FIELDS, CHILD_FIELDS } = VALUE_COORDS_CONFIGS;

const ToggleActivationStatusButton = () => {
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const { program, orgUnit } = useSelectionStore(
    useShallow((state) => ({
      program: state.program,
      orgUnit: state.orgUnit
    }))
  );
  const { actions, data, layout } = useTrackerCaptureStore(
    useShallow((state) => ({
      layout: state.layout,
      data: state.data,
      actions: state.actions
    }))
  );
  const {
    setLayout,
    setCustomState,
    changeAttributeValue,
    deleteEventFromList,
    initData,
    resetState
  } = actions;
  const { currentTei, currentEvents } = data;
  const foundActivationValue = findAttributeValue(currentTei, "qFFDE1Aud9N");
  let activationStatus =
    foundActivationValue && foundActivationValue === "true"
      ? "deactivated"
      : "activated";

  const toggleActivation = async () => {
    setAnchorEl(null);
    if (activationStatus === "activated") {
      changeAttributeValue("qFFDE1Aud9N", "true");
      const newTei = _.cloneDeep(currentTei);
      newTei.attributes.push({ attribute: "qFFDE1Aud9N", value: "true" });
      await saveTei(newTei);
      const foundScheduledEvent = currentEvents.find(
        (ev) => ev.status === "SCHEDULE"
      );
      if (foundScheduledEvent) {
        deleteEventFromList(foundScheduledEvent.event);
        await deleteEvent(foundScheduledEvent);
      }
      disableEverything(true);
    } else {
      changeAttributeValue("qFFDE1Aud9N", "");
      const newTei = _.cloneDeep(currentTei);
      const foundAttributeIndex = newTei.attributes.findIndex(
        (attr) => attr.attribute === "qFFDE1Aud9N"
      );
      if (foundAttributeIndex > -1) {
        newTei.attributes[foundAttributeIndex].value = "";
      }
      await saveTei(newTei);
      const result = await getTeiById(program.id, newTei.trackedEntityInstance);
      initData(result, program.id, orgUnit.id);
      disableEverything(false);
    }
  };

  const disableEverything = (value) => {
    setTimeout(() => {
      setLayout("disableEventEditButton", value);
      setLayout("disableEventCompleteButton", value);
      setLayout("disableEventCreateButton", value);
      setLayout("disableEventDeleteButton", value);
      setLayout("disableProfileEditButton", value);
      setCustomState("isEirVillage", value);
    }, 500);
  };

  useEffect(() => {
    const deactivated = findAttributeValue(currentTei, "qFFDE1Aud9N");
    if (deactivated === "true") {
      disableEverything(true);
    }
  }, [currentTei ? currentTei.trackedEntityInstance : ""]);

  return (
    <>
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
            {t(
              activationStatus === "activated"
                ? "deactivateChildWarning"
                : "activateChildWarning"
            )}
          </Alert>
          <br />
          <LoadingButton
            loading={loading}
            color="warning"
            variant="contained"
            onClick={async () => {
              setLoading(true);
              await toggleActivation();
              setLoading(false);
              setAnchorEl(null);
            }}
          >
            {t(
              activationStatus === "activated"
                ? "deactivateChild"
                : "activateChild"
            )}
          </LoadingButton>
          &nbsp;
          <Button
            disabled={loading}
            color="primary"
            variant="contained"
            onClick={() => {
              setAnchorEl(null);
            }}
          >
            {t("cancel")}
          </Button>
        </div>
      </Popover>
      <LoadingButton
        disabled={disabled}
        color="warning"
        variant="contained"
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        {t(
          activationStatus === "activated" ? "deactivateChild" : "activateChild"
        )}
      </LoadingButton>
    </>
  );
};

const useDefaultOrgUnitSelection = (ready) => {
  const { program, dataSet } = useSelectionStore(
    (state) => ({ program: state.program, dataSet: state.dataSet }),
    shallow
  );
  const { me, orgUnits } = useMetadataStore(
    (state) => ({ me: state.me, orgUnits: state.orgUnits }),
    shallow
  );
  const { selectOrgUnit } = useSelectionStore((state) => state.actions);

  useEffect(() => {
    if ((ready && me.organisationUnits.length === 1) || program || dataSet) {
      const foundOu = orgUnits.find(
        (ou) => ou.id === me.organisationUnits[0].id
      );
      const foundOuGroup = foundOu.organisationUnitGroups.find(
        (oug) => oug.id === "zk3lBJfnL6b"
      );
      if (foundOuGroup) {
        selectOrgUnit(foundOu);
      }
    }
  }, [ready, program ? program.id : null, dataSet ? dataSet.id : null]);
};

const useDisableEirRegisterButton = () => {
  const villageOrgUnitGroups = ["ZVH1xlLGfxn", "pJl5AXZFxRu", "dGSmKUusVZG"];
  const { layout, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      layout: state.layout,
      actions: state.actions
    }))
  );
  const { program, orgUnit } = useSelectionStore(
    useShallow((state) => ({
      program: state.program,
      orgUnit: state.orgUnit
    }))
  );
  const { setLayout, setCustomState } = actions;

  useEffect(() => {
    if (program && program.id === "Yj9cJ34AXw6") {
      setLayout("hideRegisterButton", true);
      setLayout("hideSearchButton", true);
    } else {
      setLayout("hideRegisterButton", false);
      setLayout("hideSearchButton", false);
    }
  }, [program ? program.id : ""]);

  useEffect(() => {
    if (program && orgUnit) {
      const ouGroups = orgUnit.organisationUnitGroups.map((oug) => oug.id);
      let foundVillageGroup = false;
      ouGroups.forEach((oug) => {
        if (villageOrgUnitGroups.includes(oug)) foundVillageGroup = true;
      });
      if (program.id === "Yj9cJ34AXw6" && foundVillageGroup) {
        setLayout("disableRegisterButton", true);
        setLayout("disableEventEditButton", true);
        setLayout("disableEventCompleteButton", true);
        setLayout("disableEventCreateButton", true);
        setLayout("disableEventDeleteButton", true);
        setLayout("disableProfileEditButton", true);
        setCustomState("isEirVillage", true);
      } else {
        setLayout("disableRegisterButton", false);
        setLayout("disableEventEditButton", false);
        setLayout("disableEventCompleteButton", false);
        setLayout("disableEventCreateButton", false);
        setLayout("disableEventDeleteButton", false);
        setLayout("disableProfileEditButton", false);
        setCustomState("isEirVillage", false);
      }
    }
  }, [
    program ? program.id : "",
    orgUnit ? orgUnit.id : "",
    layout ? layout.layout : ""
  ]);
};

const useCustomSearchForEir = () => {
  const { program, orgUnit } = useSelectionStore(
    useShallow((state) => ({
      program: state.program,
      orgUnit: state.orgUnit
    }))
  );
  const layout = useTrackerCaptureStore((state) => state.layout);
  const controlBarActions = useControlBarStore((state) => state.actions);
  const { setLayout } = controlBarActions;

  useEffect(() => {
    if (
      program &&
      program.id === "Yj9cJ34AXw6" &&
      orgUnit &&
      layout &&
      layout.layout === "layout1"
    ) {
      setLayout("customControlBarComponent", <CustomEirSearchButton />);
    } else {
      setLayout("customControlBarComponent", null);
    }
  }, [
    program ? program.id : "",
    layout ? layout.layout : "",
    orgUnit ? orgUnit.id : ""
  ]);
};

const useEirToggleActivationStatusButton = () => {
  const program = useSelectionStore((state) => state.program);
  const { actions, layout } = useTrackerCaptureStore(
    useShallow((state) => ({
      actions: state.actions,
      layout: state.layout
    }))
  );
  const { setLayout } = actions;
  useEffect(() => {
    if (program && program.id) {
      if (program.id === "Yj9cJ34AXw6" && layout.layout === "layout3") {
        setLayout("customProfileFormButtons", <ToggleActivationStatusButton />);
      } else {
        setLayout("customProfileFormButtons", null);
      }
    }
  }, [program ? program.id : "", layout ? layout.layout : ""]);
};

const useEirDisableCreateEventButton = () => {
  const program = useSelectionStore((state) => state.program);
  const { data, actions, layout } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions,
      layout: state.layout
    }))
  );
  const { currentEvents } = data;
  const { setLayout } = actions;
  const { selectedProgramStage } = layout;

  const isGiven = (dataElement) => {
    let given = false;
    if (currentEvents?.length) {
      currentEvents.forEach((pEv) => {
        pEv.dataValues.forEach((de) => {
          if (de.dataElement === dataElement && de.value === "true") {
            given = true;
          }
        });
      });
    }

    return given;
  };

  useEffect(() => {
    let disabled = false;
    if (
      program &&
      program.id === "Yj9cJ34AXw6" &&
      selectedProgramStage === "hCTTxOH8FOa"
    ) {
      let fullyImmunized = true;
      let foundActiveOrScheduledEvent = false;
      ALL_VACCINE_FOR_FULL_IMMUNIZED.forEach((id) => {
        if (!isGiven(id)) {
          fullyImmunized = false;
        }
      });
      if (!isGiven("qyJMInEjWtJ") && !isGiven("O8drIFUt4j8")) {
        fullyImmunized = false;
      }
      if (currentEvents) {
        currentEvents
          .filter((ce) => ce.programStage === "hCTTxOH8FOa")
          .forEach((ce) => {
            if (ce.status === "ACTIVE" || ce.status === "SCHEDULE") {
              foundActiveOrScheduledEvent = true;
            }
          });
      }

      disabled = fullyImmunized || foundActiveOrScheduledEvent;
    }
    setLayout("disableEventCreateButton", disabled);
  }, [
    program ? program.id : "",
    JSON.stringify(currentEvents),
    selectedProgramStage
  ]);
};

const CloseButton = () => {
  const { t } = useTranslation();
  const { selectEvent } = useTrackerCaptureStore((state) => state.actions);
  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => {
        selectEvent("");
      }}
    >
      {t("close")}
    </Button>
  );
};

const DeliveryRegistryCompleteEnrollmentButton = () => {
  const [validToComplete, setValidToComplete] = useState(false);
  const [openCompleteDialog, setOpenCompleteDialog] = useState(false);
  const [uniqueIdLoading, setUniqueIdLoading] = useState(false);
  const [eirEnrollmentLoading, setEirEnrollmentLoading] = useState(false);
  const [completeDeliveryLoading, setCompleteDeliveryLoading] = useState(false);
  const [showSummaryTable, setShowSummaryTable] = useState(false);

  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions
    }))
  );
  const { setData, changeDataValue } = actions;
  const {
    currentEnrollments,
    currentEnrollment,
    currentEvents,
    currentTei,
    childTeis
  } = data;
  const { currentEvent } = useCurrentEvent();
  const enrollmentId = currentEnrollment.enrollment;
  const foundEnrollment = currentEnrollments.find(
    (fde) => fde.enrollment === enrollmentId
  );
  const deliveryEvent = currentEvents.find(
    (ce) => ce.programStage === "YOHVx1Xmpgr" && ce.enrollment === enrollmentId
  );
  const foundListOfChildren = deliveryEvent
    ? deliveryEvent.dataValues.find((dv) => dv.dataElement === "pRlMcY5Ubn5")
    : null;
  const foundDateOfDelivery = findDataValue(
    deliveryEvent.dataValues,
    "grMMOiF9fPj"
  );
  const foundLiveBirths = findDataValue(
    deliveryEvent.dataValues,
    "OcT4N2illVT"
  );

  const disabled = !foundDateOfDelivery || !foundLiveBirths || !validToComplete;

  const findAttributeValue = (tei, attribute) => {
    const found = tei
      ? tei.attributes.find((attr) => attr.attribute === attribute)
      : null;
    return found ? found.value : "";
  };

  useEffect(() => {
    let valid = true;
    if (childTeis) {
      childTeis.forEach((childTei) => {
        const foundSex = findAttributeValue(childTei, "DmuazFb368B");
        if (!foundSex) {
          valid = false;
        }
      });
    } else {
      valid = false;
    }
    setValidToComplete(valid);
  }, [JSON.stringify(childTeis)]);

  const checkDuplicateHealthId = async (healthId, currentTei) => {
    let flag = true;
    while (flag) {
      const result = await pull(
        `/api/trackedEntityInstances.json?filter=oPKsfqS64oE:EQ:${healthId}&program=Yj9cJ34AXw6&ou=IWp9dQGM0bS&ouMode=DESCENDANTS&skipPaging=true&fields=trackedEntityInstance`
      );
      if (result.trackedEntityInstances.length > 0) {
        if (
          result.trackedEntityInstances[0].trackedEntityInstance !==
          currentTei.trackedEntityInstance
        ) {
          const randomNumber = [
            Math.floor(Math.random() * (9 - 0 + 1)) + 0,
            Math.floor(Math.random() * (9 - 0 + 1)) + 0,
            Math.floor(Math.random() * (9 - 0 + 1)) + 0
            //Math.floor(Math.random() * (9 - 0 + 1)) + 0,
          ];
          healthId = `${healthId.split("-")[0]}-${
            healthId.split("-")[1]
          }-${randomNumber.join("")}`;
        } else {
          flag = false;
        }
      } else {
        flag = false;
      }
    }
    return healthId;
  };

  const generateHealthIds = async () => {
    const newChildTeis = _.cloneDeep(childTeis);
    for (let i = 0; i < newChildTeis.length; i++) {
      const newChildTei = _.cloneDeep(newChildTeis[i]);
      const foundSex = findAttributeValue(newChildTei, "DmuazFb368B");
      const sex = foundSex ? (foundSex === "M" ? "1" : "2") : "";
      const foundDob = findAttributeValue(newChildTei, "tQeFLjYbqzv");
      const dob = format(new Date(foundDob), "ddMMyyyy");

      const randomNumber = [
        Math.floor(Math.random() * (9 - 0 + 1)) + 0,
        Math.floor(Math.random() * (9 - 0 + 1)) + 0,
        Math.floor(Math.random() * (9 - 0 + 1)) + 0
        //Math.floor(Math.random() * (9 - 0 + 1)) + 0,
      ];
      const healthId = await checkDuplicateHealthId(
        [dob, sex, randomNumber.join("")].join("-"),
        newChildTei
      );
      newChildTei.attributes.push({
        attribute: "oPKsfqS64oE",
        value: healthId
      });
      newChildTeis[i] = { ...newChildTei };
    }
    setData("childTeis", newChildTeis);
    changeDataValue(
      deliveryEvent.event,
      "lYdXxom1BAG",
      JSON.stringify(newChildTeis)
    );
    const newCurrentEvent = _.cloneDeep(deliveryEvent);
    const foundCurrentChildTeisDataValue = newCurrentEvent.dataValues.findIndex(
      (dv) => dv.dataElement === "lYdXxom1BAG"
    );
    newCurrentEvent.dataValues[foundCurrentChildTeisDataValue].value =
      JSON.stringify(newChildTeis);
    await saveEvent(newCurrentEvent);
    setUniqueIdLoading(false);
    return newChildTeis;
  };

  const enrollEir = async (teis) => {
    for (let i = 0; i < teis.length; i++) {
      await saveTei(teis[i]);
    }
  };

  const completeEnrollment = async () => {
    // setOpenCompleteDialog(true);
    // setUniqueIdLoading(true);
    // setEirEnrollmentLoading(true);
    // setCompleteDeliveryLoading(true);
    // const teis = await generateHealthIds();
    // await enrollEir(teis);
    // setEirEnrollmentLoading(false);
    // const newEnroll = _.cloneDeep(currentEnrollment);
    // newEnroll.status = "COMPLETED";
    // actions.changeEnrollmentProperty("status", "COMPLETED");
    // actions.setLayout("eventFormEditing", false);
    // const clonedEnrollments = _.cloneDeep(currentEnrollments);
    // const foundEnrollmentIndex = clonedEnrollments.findIndex((ce) => ce.enrollment === enrollmentId);
    // clonedEnrollments[foundEnrollmentIndex].status = "COMPLETED";
    // setData("currentEnrollments", clonedEnrollments);
    // await saveEnrollment(newEnroll);
    // setCompleteDeliveryLoading(false);
    // setShowSummaryTable(true);

    //TEMPORARY DISABLE ENR LINKAGE FOR NOW
    setOpenCompleteDialog(true);
    // setUniqueIdLoading(true);
    // setEirEnrollmentLoading(true);
    setCompleteDeliveryLoading(true);
    // const teis = await generateHealthIds();
    // await enrollEir(teis);
    // setEirEnrollmentLoading(false);
    const newEnroll = _.cloneDeep(currentEnrollment);
    newEnroll.status = "COMPLETED";
    actions.changeEnrollmentProperty("status", "COMPLETED");
    actions.setLayout("eventFormEditing", false);
    const clonedEnrollments = _.cloneDeep(currentEnrollments);
    const foundEnrollmentIndex = clonedEnrollments.findIndex(
      (ce) => ce.enrollment === enrollmentId
    );
    clonedEnrollments[foundEnrollmentIndex].status = "COMPLETED";
    setData("currentEnrollments", clonedEnrollments);
    await saveEnrollment(newEnroll);
    setCompleteDeliveryLoading(false);
    setOpenCompleteDialog(false);
    // setShowSummaryTable(true);
  };

  const loadingRowStyle = {
    display: "flex",
    alignItems: "center",
    padding: 5
  };

  return (
    <>
      {currentEnrollment.status !== "COMPLETED" && (
        <LoadingButton
          disabled={disabled}
          loading={loading}
          variant="contained"
          color="success"
          onClick={completeEnrollment}
        >
          {t("completeThisDelivery")}
        </LoadingButton>
      )}
      <Dialog open={openCompleteDialog} maxWidth="md">
        <div
          style={{
            padding: 20,
            width: "600px"
          }}
        >
          {/* //TEMPORARY DISABLE ENR LINKAGE FOR NOW */}
          {/* <div style={loadingRowStyle}>
            {uniqueIdLoading ? <CircularProgress size={20} /> : <FontAwesomeIcon icon={faCheck} color="green" />}
            &nbsp; {t("generatingChildHealthId")}
          </div>
          <div style={loadingRowStyle}>
            {eirEnrollmentLoading ? <CircularProgress size={20} /> : <FontAwesomeIcon icon={faCheck} color="green" />}
            &nbsp; {t("enrollingToEirProgram")}
          </div> */}
          <div
            style={{
              paddingLeft: 5,
              paddingTop: 5,
              paddingRight: 5,
              display: "flext",
              alignItems: "center"
            }}
          >
            {completeDeliveryLoading ? (
              <CircularProgress size={20} />
            ) : (
              <FontAwesomeIcon icon={faCheck} color="green" />
            )}
            &nbsp; {t("completingCurrentDelivery")}
          </div>
          {showSummaryTable ? (
            <div>
              <div
                style={{
                  paddingTop: "13px",
                  paddingBottom: "13px",
                  fontSize: "15px"
                }}
              >
                <b>
                  {t("eirEnrolledMessage", {
                    numberOfChild: childTeis.length,
                    childText: childTeis.length > 1 ? "childrens" : "children"
                  })}
                </b>
              </div>{" "}
              <TableContainer component={Paper}>
                <Table aria-label="simple table" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>{t("childHealthId")}</TableCell>
                      <TableCell>{t("sex")}</TableCell>
                      <TableCell>{t("dateOfBirth")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {childTeis.map((tei) => {
                      const foundHealthId = tei.attributes.find(
                        (e) => e.attribute === "oPKsfqS64oE"
                      );
                      const foundSex = tei.attributes.find(
                        (e) => e.attribute === "DmuazFb368B"
                      );
                      const foundDob = tei.attributes.find(
                        (e) => e.attribute === "tQeFLjYbqzv"
                      );
                      return (
                        <TableRow>
                          <TableCell>
                            {foundHealthId ? foundHealthId.value : ""}
                          </TableCell>
                          <TableCell>
                            {foundSex
                              ? foundSex.value === "F"
                                ? t("Female")
                                : t("Male")
                              : ""}
                          </TableCell>
                          <TableCell>
                            {foundDob
                              ? format(new Date(foundDob.value), "yyyy-MM-dd")
                              : ""}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : null}
        </div>
        <DialogActions>
          <Button
            autoFocus
            disabled={!showSummaryTable}
            onClick={() => {
              setShowSummaryTable(false);
              setOpenCompleteDialog(false);
            }}
          >
            {t("ok")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
const PrintBirthCertificateButton = () => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState("1");
  const childCertPdfUrls = useRef([]);
  const { optionSets, me, orgUnits } = useMetadataStore(
    useShallow((state) => ({
      optionSets: state.optionSets,
      me: state.me,
      orgUnits: state.orgUnits
    }))
  );
  const { orgUnit } = useSelectionStore(
    useShallow((state) => ({ orgUnit: state.orgUnit }))
  );
  const { data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions
    }))
  );

  const { childTeis, currentTei } = data;
  const { attributes } = currentTei;
  // console.log(childTeis);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    (async () => {
      // console.log(childTeis);
      if (childTeis) {
        // console.log("Print certificate");
        const childCertPdfPromises = childTeis.map(async (childTei) => {
          const pdfUrl = await generatePdfUrl(childTei);
          return { tei: childTei["trackedEntityInstance"], url: pdfUrl };
        });
        const childCertPdfResps = await Promise.all(childCertPdfPromises);
        // console.log(childCertPdfResps);
        childCertPdfUrls.current = [...childCertPdfResps];
      }
    })();
  }, [JSON.stringify(data)]);

  const getAttrValue = (attrs, id) => {
    const valueObj = attrs.find((attr) => attr["attribute"] === id);
    return valueObj ? valueObj["value"] : "";
  };

  const renderDateStr = (pdfPage, valueStr, dateCoords, drawConfigs) => {
    const { width, height, textConfigs } = drawConfigs;
    const dateElements = valueStr.split("-");
    const dateCoordElementNames = Object.keys(dateCoords);
    for (const [index, dateElementStr] of dateElements.entries()) {
      const coordObj = dateCoords[dateCoordElementNames[index]];
      // console.log(index, dateElementStr, coordObj);
      pdfPage.drawText(dateElementStr, {
        x: width - coordObj["xMinusCoord"],
        y: height - coordObj["yMinusCoord"],
        size: 10.5,
        ...textConfigs
      });
    }
  };

  const renderOptionTypeValue = (
    pdfPage,
    valueField,
    valueStr,
    locale,
    drawConfigs
  ) => {
    const { width, height, textConfigs } = drawConfigs;
    const optSetObj = optionSets.find(
      (optSet) => optSet["id"] === valueField["optSetId"]
    );
    // console.log(valueStr);
    const mappedObj = optSetObj["options"].find(
      (opt) => opt["code"] === valueStr
    );
    // console.log(optSetObj["options"], mappedObj);
    let finalText = "";
    if (locale !== "en") {
      const translationObj = mappedObj
        ? mappedObj["translations"].find(
            (translation) =>
              translation["locale"] === locale &&
              translation["property"] === "NAME"
          )
        : "";
      finalText = translationObj["value"];
    } else {
      finalText = mappedObj ? mappedObj["displayName"] : "";
    }
    // console.log(finalText);
    pdfPage.drawText(finalText, {
      x: width - valueField["xMinusCoord"],
      y: height - valueField["yMinusCoord"],
      size: 12,
      ...textConfigs
    });
  };

  const renderOrgUnitValue = (
    pdfPage,
    valueField,
    valueStr,
    locale,
    drawConfigs
  ) => {
    const { width, height, textConfigs } = drawConfigs;
    const ouObj = orgUnits.find((ou) => ou["id"] === valueStr);
    let finalOuText = "";
    if (locale !== "en") {
      const translationObj = ouObj["translations"].find(
        (translation) =>
          translation["locale"] === locale && translation["property"] === "NAME"
      );
      finalOuText = translationObj["value"];
    } else {
      finalOuText = ouObj["displayName"];
    }
    pdfPage.drawText(finalOuText, {
      x: width - valueField["xMinusCoord"],
      y: height - valueField["yMinusCoord"],
      size: 10.5,
      ...textConfigs
    });
    if (valueField.hasOwnProperty("titleCoords")) {
      pdfPage.drawText(finalOuText, {
        x: width - valueField["titleCoords"]["xMinusCoord"],
        y: height - valueField["titleCoords"]["yMinusCoord"],
        size: 10.5,
        ...textConfigs
      });
    }
  };

  const renderRegularText = (pdfPage, valueField, valueStr, drawConfigs) => {
    const { width, height, textConfigs } = drawConfigs;
    pdfPage.drawText(valueStr, {
      x: width - valueField["xMinusCoord"],
      y: height - valueField["yMinusCoord"],
      size: 12,
      ...textConfigs
    });
  };

  const generatePdfUrl = async (childTei) => {
    // Load the PDF template
    const existingPdfBytes = await fetch(birthCertificateV2).then((res) =>
      res.arrayBuffer()
    );
    const fontFile = await fetch(phetsarathFont);
    const reponseFontBuffer = await fontFile.arrayBuffer();
    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    // Embed a font for adding text
    const font = await pdfDoc.embedFont(reponseFontBuffer);
    // Get the first page of the PDF
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    const textConfigs = {
      font: font,
      lineHeight: 24,
      color: rgb(0, 0, 0)
    };
    const drawConfigs = {
      width: width,
      height: height,
      textConfigs: { ...textConfigs }
    };
    // Define the text and its location
    for (const valueField of MOTHER_FIELDS) {
      const valueStr = getAttrValue(attributes, valueField["ID"]);
      switch (valueField["valueType"]) {
        case "DATE":
          renderDateStr(
            firstPage,
            valueStr,
            valueField["dateCoords"],
            drawConfigs
          );
          break;
        case "OPTIONS":
          renderOptionTypeValue(
            firstPage,
            valueField,
            valueStr,
            me.settings.keyUiLocale,
            drawConfigs
          );
          break;
        case "ORG_UNIT":
          renderOrgUnitValue(
            firstPage,
            valueField,
            valueStr,
            me.settings.keyUiLocale,
            drawConfigs
          );
          break;
        default:
          renderRegularText(firstPage, valueField, valueStr, drawConfigs);
          break;
      }
    }
    for (const childVlField of CHILD_FIELDS) {
      let childValueStr = "";
      if (childVlField["valueSrc"] === "ATTR") {
        const attrObj = childTei.attributes.find(
          (attr) => attr["attribute"] === childVlField["ID"]
        );
        childValueStr = attrObj ? attrObj["value"] : "";
      } else if (childVlField["valueSrc"] === "PARENT_ATTR") {
        childValueStr = getAttrValue(attributes, childVlField["ID"]);
      } else {
        const eirEnroll = childTei.enrollments.find(
          (enroll) => enroll["program"] === "Yj9cJ34AXw6"
        );
        const birthDetailsStage = eirEnroll.events.find(
          (evt) => evt["programStage"] === "bwGkn5ebqkD"
        );
        const dataVlObj = birthDetailsStage.dataValues.find(
          (dataVl) => dataVl["dataElement"] === childVlField["ID"]
        );
        childValueStr = dataVlObj ? dataVlObj["value"] : "";
      }
      switch (childVlField["valueType"]) {
        case "DATE":
          renderDateStr(
            firstPage,
            childValueStr,
            childVlField["dateCoords"],
            drawConfigs
          );
          break;
        case "SEX":
          if (childValueStr === "M") {
            firstPage.drawCircle({
              x: width - childVlField["maleCoord"]["xMinusCoord"],
              y: height - childVlField["maleCoord"]["yMinusCoord"],
              size: 1.4,
              borderWidth: 5,
              color: rgb(0, 0, 0),
              borderOpacity: 0.75
            });
          } else {
            firstPage.drawCircle({
              x: width - childVlField["femaleCoord"]["xMinusCoord"],
              y: height - childVlField["femaleCoord"]["yMinusCoord"],
              size: 1.4,
              borderWidth: 5,
              color: rgb(0, 0, 0),
              borderOpacity: 0.75
            });
          }
          break;
        case "OPTIONS":
          renderOptionTypeValue(
            firstPage,
            childVlField,
            childValueStr,
            me.settings.keyUiLocale,
            drawConfigs
          );
          break;
        case "ORG_UNIT":
          renderOrgUnitValue(
            firstPage,
            childVlField,
            childValueStr,
            me.settings.keyUiLocale,
            drawConfigs
          );
          break;
        default:
          renderRegularText(
            firstPage,
            childVlField,
            childValueStr,
            drawConfigs
          );
          break;
      }
    }
    // Serialize the PDFDocument to bytes
    const pdfBytes = await pdfDoc.save();
    // Create a Blob and download the PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  };

  // console.log(childTeis);
  return [
    <Button
      variant="contained"
      color="success"
      onClick={() => {
        setIsDialogOpen(true);
      }}
    >
      {t("printBirthCertificate")}
    </Button>,
    <Dialog
      open={isDialogOpen}
      fullWidth
      maxWidth="xl"
      onClose={() => {
        setIsDialogOpen(false);
      }}
    >
      <div>
        <TabContext value={tabValue}>
          <div sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              // aria-label="lab API tabs example"
            >
              {childTeis &&
                childTeis.map((childTei, index) => (
                  <Tab
                    key={`label${index}}`}
                    label={`Infant ${index + 1}`}
                    value={`${index + 1}`}
                  />
                ))}
            </TabList>
          </div>
          <div>
            {childTeis &&
              childTeis.map((childTei, index) => {
                const teiUrlObj = childCertPdfUrls.current.find(
                  (urlObj) =>
                    urlObj["tei"] === childTei["trackedEntityInstance"]
                );
                // console.log(teiUrlObj);
                return (
                  <Fragment key={`tab${index}}`}>
                    <TabPanel value={`${index + 1}`}>
                      <iframe
                        src={teiUrlObj ? teiUrlObj["url"] : birthCertificateV2}
                        width="100%"
                        height="500px"
                      />
                    </TabPanel>
                  </Fragment>
                );
              })}
          </div>
        </TabContext>
      </div>
    </Dialog>
  ];
};

const useDeliveryRegistryCompleteEnrollmentButton = () => {
  const program = useSelectionStore((state) => state.program);
  const { t } = useTranslation();
  const { layout, actions, data } = useTrackerCaptureStore(
    useShallow((state) => ({
      layout: state.layout,
      actions: state.actions,
      data: state.data
    }))
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const { setLayout, selectEvent } = actions;
  const { currentEnrollment, currentEnrollments, currentTei } = data;

  useEffect(() => {
    if (program && program.id === "AyPkCOMmgdd") {
      // setLayout("customEventFormButtons", [
      //   <DeliveryRegistryCompleteEnrollmentButton />,
      //   <div>&nbsp;</div>,
      //   <PrintBirthCertificateButton />,
      //   <div>&nbsp;</div>,
      //   <CloseButton />
      // ]);
      setLayout("customEventFormButtons", [
        <CloseButton />,
        currentEnrollment && currentEnrollment.status === "ACTIVE" && (
          <>
            &nbsp;
            <Button
              variant="outlined"
              color="error"
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
            >
              {t("delete")}
            </Button>
          </>
        ),
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
              {t("deleteDeliveryConfirmation")}
            </Alert>
            <br />
            <Button
              color="error"
              variant="contained"
              onClick={async () => {
                const length = currentEnrollments.length;
                const result = await deleteEnrollment(
                  currentEnrollment.enrollment
                );
                if (length === 1) {
                  const result1 = await pull(
                    `/api/routes/chr/run?work=unenroll&tei=${currentEnrollment.trackedEntityInstance}&program=${program.id}`
                  );
                  const result2 = await deleteTei(
                    currentTei.trackedEntityInstance
                  );
                }
                if (!result.ok) {
                  setApiError({ ...result });
                } else {
                  setLayout("layout", "layout1");
                }
                setAnchorEl(null);
              }}
            >
              {t("delete")}
            </Button>
            &nbsp;
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                setAnchorEl(null);
              }}
            >
              {t("cancel")}
            </Button>
          </div>
        </Popover>,
        <div style={{ marginLeft: "auto" }}>
          <DeliveryRegistryCompleteEnrollmentButton />
          &nbsp;&nbsp;
          <PrintBirthCertificateButton />
        </div>
      ]);
    } else {
      setLayout("customEventFormButtons", null);
    }
  }, [
    program ? program.id : "",
    layout.layout,
    currentEnrollment ? currentEnrollment.enrollment : "",
    anchorEl
  ]);

  useEffect(() => {
    if (
      program &&
      program.id === "AyPkCOMmgdd" &&
      currentEnrollment &&
      currentEnrollment.status === "COMPLETED"
    ) {
      setLayout("disableEventEditButton", true);
    } else {
      setLayout("disableEventEditButton", false);
    }
  }, [
    currentEnrollment
      ? currentEnrollment.enrollment + currentEnrollment.status
      : ""
  ]);
};

const useDisableEventCreateButtonIfThereAreUncompletedEvents = () => {
  const programs = ["u1Na9wCGY6d", "fflLsS1lm3g", "PBLmYwloRHu", "vqNgkw4gfw7"];
  const program = useSelectionStore((state) => state.program);
  const { data, actions, layout } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions,
      layout: state.layout
    }))
  );
  const { selectedProgramStage } = layout;
  const { currentEvents } = data;
  const { setLayout } = actions;
  useEffect(() => {
    if (program && programs.includes(program.id) && selectedProgramStage) {
      const currentProgramStageEvents = currentEvents.filter(
        (ce) => ce.programStage === selectedProgramStage
      );
      const foundUncompletedEvents = currentProgramStageEvents.find(
        (ce) => ce.status === "ACTIVE"
      );
      if (foundUncompletedEvents) {
        setLayout("disableEventCreateButton", true);
      } else {
        setLayout("disableEventCreateButton", false);
      }
    }
  }, [selectedProgramStage, JSON.stringify(currentEvents)]);
};

const hooks = [
  useDefaultOrgUnitSelection,
  useDisableEirRegisterButton,
  useCustomSearchForEir,
  useEirToggleActivationStatusButton,
  useEirDisableCreateEventButton,
  useDeliveryRegistryCompleteEnrollmentButton,
  useDisableEventCreateButtonIfThereAreUncompletedEvents
];
export default hooks;
