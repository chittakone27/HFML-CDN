import { useEffect, useState } from "react";
import DataValueLabel from "@/ui/TrackerCapture/EventForm/DataValueLabel";
import DataValueFieldNoBlurNoState from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlurNoState";
import AttributeLabelNoState from "@/ui/TrackerCapture/Profile/AttributeLabelNoState";
import AttributeFieldNoState from "@/ui/TrackerCapture/Profile/AttributeFieldNoState";
import NoBlurForm from "@/ui/TrackerCapture/EventForm/NoBlurForm";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import { useShallow } from "zustand/react/shallow";
import { tracker } from "@/api";
import { generateUid } from "@/utils/utils";
import { push } from "@/utils/fetch";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { useInfantFormRules } from "./rules";
import { findAttributeValue } from "../../common/utils";
import _ from "lodash";
const { VITE_ECRVS_API } = import.meta.env;

const { getTeiById, saveTei } = tracker;

const ChildForm = ({ teiId }) => {
  const { t } = useTranslation();
  // const [childTei, setChildTei] = useState(null);
  const programs = useMetadataStore((state) => state.programs);
  const orgUnit = useSelectionStore((state) => state.orgUnit);
  const { data, layout, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      layout: state.layout,
      data: state.data,
      actions: state.actions
    }))
  );
  const { setData } = actions;
  const { currentTei, currentEvents, childTeis } = data;
  const childTei = childTeis.find((ct) => ct.trackedEntityInstance === teiId);
  const childTeiIndex = childTeis.findIndex((ct) => ct.trackedEntityInstance === teiId);
  const { currentEvent } = useCurrentEvent();
  const foundEirProgram = programs.find((p) => p.id === "Yj9cJ34AXw6");
  const foundBirthDetailsStage = foundEirProgram.programStages.find((ps) => ps.id === "bwGkn5ebqkD");
  const pss = foundBirthDetailsStage.programStageSections[0];
  const dataElements = pss.dataElements.map((pssde) => pssde.id);
  const findAttributeValue = (attribute) => {
    const found = childTei ? childTei.attributes.find((attr) => attr.attribute === attribute) : null;
    return found ? found.value : "";
  };
  const foundSex = findAttributeValue("DmuazFb368B");
  const sex = foundSex ? (foundSex === "M" ? "1" : "2") : "";
  const dob = format(new Date(currentEvent.eventDate), "ddMMyyyy");
  const healthId = findAttributeValue("oPKsfqS64oE");
  const foundEnrollmentIndex = childTei.enrollments.findIndex((enr) => enr.program === "Yj9cJ34AXw6");
  const foundEventIndex =
    childTei && childTei.enrollments ? childTei.enrollments[foundEnrollmentIndex].events.findIndex((ev) => ev.programStage === "bwGkn5ebqkD") : null;

  // useEffect(() => {
  //   if (dob && sex) {
  //     const randomNumber = [
  //       Math.floor(Math.random() * (9 - 0 + 1)) + 0,
  //       Math.floor(Math.random() * (9 - 0 + 1)) + 0,
  //       Math.floor(Math.random() * (9 - 0 + 1)) + 0,
  //       Math.floor(Math.random() * (9 - 0 + 1)) + 0
  //     ];
  //     const newHealthId = [dob, sex, randomNumber.join("")].join("-");
  //     if (!healthId) {
  //       changeAttributeValue("oPKsfqS64oE", newHealthId);
  //     } else {
  //       const currentSex = healthId.split("-")[1];
  //       if (currentSex !== sex) {
  //         changeAttributeValue("oPKsfqS64oE", newHealthId);
  //       }
  //     }
  //   }
  // }, [dob, sex]);

  const changeAttributeValue = (attribute, value) => {
    const newChildTei = _.cloneDeep(childTei);
    const foundAttributeValueIndex = newChildTei.attributes.findIndex((attr) => attr.attribute === attribute);
    if (foundAttributeValueIndex === -1) {
      newChildTei.attributes.push({
        attribute,
        value
      });
    } else {
      newChildTei.attributes[foundAttributeValueIndex].value = value;
    }
    const newChildTeis = _.cloneDeep(childTeis);
    newChildTeis[childTeiIndex] = { ...newChildTei };
    setData("childTeis", newChildTeis);
  };

  const changeDataValue = (dataElement, value) => {
    if (!childTei) return;
    const newChildTei = _.cloneDeep(childTei);
    const foundEvent = newChildTei.enrollments[foundEnrollmentIndex].events[foundEventIndex];
    const foundDataValueIndex = foundEvent.dataValues.findIndex((dv) => dv.dataElement === dataElement);
    if (foundDataValueIndex === -1) {
      newChildTei.enrollments[foundEnrollmentIndex].events[foundEventIndex].dataValues.push({
        dataElement,
        value
      });
    } else {
      newChildTei.enrollments[foundEnrollmentIndex].events[foundEventIndex].dataValues[foundDataValueIndex].value = value;
    }

    const newChildTeis = _.cloneDeep(childTeis);
    // newChildTei.enrollments[foundEnrollmentIndex].events[foundEventIndex] = { ...foundEvent };

    newChildTeis[childTeiIndex] = { ...newChildTei };
    setData("childTeis", newChildTeis);
  };
  const props = useInfantFormRules(
    childTei ? childTei.enrollments[foundEnrollmentIndex].events[foundEventIndex] : null,
    childTeis,
    childTei,
    setData
  );

  const handleSave = async () => {
    // const ninResult = await push(VITE_ECRVS_API, {
    //   firstName: "",
    //   lastName: "",
    //   lga: "",
    //   nationality: "",
    //   gender: sex === "1" ? "Male" : "Female",
    //   dateOfBirth: format(new Date(currentEvent.eventDate), "yyyy-MM-dd")
    // });
    const result = await saveTei(childTei);
    return result;
  };
  let disableSave = findAttributeValue("DmuazFb368B") ? false : true;
  return (
    childTei && (
      <div style={{ height: "100%" }}>
        <div className="delivery-registry-stage-field-row" style={{ height: "70px" }}>
          <div>{t("healthIdChild")}</div>
          <div style={{ color: "#0277bd", fontWeight: "bold" }}>
            {healthId ? healthId : [<div>{t("childUniqueIdWarning1")}</div>, <div>{t("childUniqueIdWarning2")}</div>]}
          </div>
        </div>
        <div style={{ height: "calc(100% - 70px)", overflow: "auto" }}>
          <div className="delivery-registry-stage-field-row">
            <AttributeLabelNoState attribute="DmuazFb368B" mandatory={true} />
            <AttributeFieldNoState
              disabled={!layout.eventFormEditing}
              attribute="DmuazFb368B"
              value={findAttributeValue("DmuazFb368B")}
              change={(value) => {
                changeAttributeValue("DmuazFb368B", value);
              }}
            />
          </div>
          {dataElements.map((de) => {
            if (props[de] && props[de].hidden) return null;
            if (de === "grMMOiF9fPj") {
              return (
                <div className="delivery-registry-stage-field-row">
                  <div>{t("dateOfBirth")}</div>
                  <DataValueFieldNoBlurNoState
                    dataElement={de}
                    currentProgramStage={foundBirthDetailsStage}
                    currentEvent={childTei.enrollments[foundEnrollmentIndex].events[foundEventIndex]}
                    change={(value) => {
                      changeDataValue(de, value);
                    }}
                    accept={(value) => {
                      changeDataValue(de, value);
                    }}
                    {...props[de]}
                    disabled={!layout.eventFormEditing || (props[de] && props[de].disabled)}
                  />
                </div>
              );
            }
            return (
              <div className="delivery-registry-stage-field-row">
                <DataValueLabel dataElement={de} currentProgramStage={foundBirthDetailsStage} />
                <DataValueFieldNoBlurNoState
                  dataElement={de}
                  currentProgramStage={foundBirthDetailsStage}
                  currentEvent={childTei.enrollments[foundEnrollmentIndex].events[foundEventIndex]}
                  change={(value) => {
                    changeDataValue(de, value);
                  }}
                  accept={(value) => {
                    changeDataValue(de, value);
                  }}
                  {...props[de]}
                  disabled={!layout.eventFormEditing || (props[de] && props[de].disabled)}
                  helpers={de === "YesvM1AYsNy" && [{ type: "HELPER", value: "ຂໍ້ມູນນີ້ຈະຖືກຕືມອັດຕະໂນມັດໂດຍລະບົບ" }]}
                />
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default ChildForm;
