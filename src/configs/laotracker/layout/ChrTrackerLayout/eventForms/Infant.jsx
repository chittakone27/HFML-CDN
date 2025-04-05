import useMetadataStore from "@/state/metadata";
import { useShallow } from "zustand/react/shallow";
import DataValueLabelNoState from "@/ui/TrackerCapture/EventForm/DataValueLabelNoState";
import DataValueFieldNoBlurNoState from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlurNoState";
import Row from "../Row";
import { useTranslation } from "react-i18next";
import useChrTrackerStore from "../state";
import { findAttributeValue, findDataValue } from "@/configs/laotracker/common/utils";
import _, { clone } from "lodash";
import { useEffect } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useInfantFormRules } from "./useDeliveryDetailsRules";
import AttributeLabelNoState from "@/ui/TrackerCapture/Profile/AttributeLabelNoState";
import AttributeFieldNoState from "@/ui/TrackerCapture/Profile/AttributeFieldNoState";
const Infant = ({ childIndex }) => {
  const { t } = useTranslation();
  const { programs } = useMetadataStore(
    useShallow((state) => ({
      programs: state.programs
    }))
  );
  const { data } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data
    }))
  );
  const { currentTei } = data;
  const { event, actions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      actions: state.actions
    }))
  );
  const { changeDataValue } = actions;
  const currentDeliveryEvent = event.currentEvent;
  const { editing } = event;
  const childTeisValue = findDataValue(currentDeliveryEvent.dataValues, "lYdXxom1BAG");
  const children = JSON.parse(childTeisValue);
  const currentChild = children[childIndex];
  const foundEirEnrollment = currentChild.enrollments.find((enr) => enr.program === "Yj9cJ34AXw6");
  const birthDetailsEvent = foundEirEnrollment.events.find((ev) => ev.programStage === "bwGkn5ebqkD");
  const foundEirProgram = programs.find((p) => p.id === "Yj9cJ34AXw6");
  const foundBirthDetailsStage = foundEirProgram.programStages.find((ps) => ps.id === "bwGkn5ebqkD");
  const pss = foundBirthDetailsStage.programStageSections[0];
  const dataElements = pss.dataElements.map((pssde) => pssde.id);

  const updateAttribute = (attribute, value) => {
    const cloned = _.cloneDeep(currentChild);
    const foundAttributeIndex = cloned.attributes.findIndex((attr) => attr.attribute === attribute);
    if (foundAttributeIndex === -1) {
      cloned.attributes.push({
        attribute,
        value
      });
    } else {
      cloned.attributes[foundAttributeIndex].value = value;
    }
    console.log(cloned);

    children[childIndex] = cloned;
    changeDataValue("lYdXxom1BAG", JSON.stringify(children));
  };

  const updateDataValue = (dataElement, value) => {
    const cloned = _.cloneDeep(birthDetailsEvent);
    const foundDataValueIndex = cloned.dataValues.findIndex((dv) => dv.dataElement === dataElement);
    if (foundDataValueIndex === -1) {
      cloned.dataValues.push({
        dataElement,
        value
      });
    } else {
      cloned.dataValues[foundDataValueIndex].value = value;
    }
    const foundEnrollmentIndex = children[childIndex].enrollments.findIndex((enr) => enr.program === "Yj9cJ34AXw6");
    const foundEventIndex = children[childIndex].enrollments[foundEnrollmentIndex].events.findIndex((ev) => ev.event === birthDetailsEvent.event);
    console.log(cloned);
    children[childIndex].enrollments[foundEnrollmentIndex].events[foundEventIndex] = cloned;
    changeDataValue("lYdXxom1BAG", JSON.stringify(children));
  };

  useEffect(() => {
    const childAttributes = [
      {
        deliveryTeaId: "tQeFLjYbqzv",
        eirTeaId: "tQeFLjYbqzv"
      },
      {
        deliveryTeaId: "IEE2BMhfoSc",
        eirTeaId: "RqEyvE6zcTE"
      },
      {
        deliveryTeaId: "IBLkiaYRRL3",
        eirTeaId: "WkHHrysFy3n"
      },
      {
        deliveryTeaId: "r8bZppSsIvR",
        eirTeaId: "r8bZppSsIvR"
      },
      {
        deliveryTeaId: "oVwa5LfjnvA",
        eirTeaId: "oVwa5LfjnvA"
      },
      {
        deliveryTeaId: "UNiaP6Oz7Mv",
        eirTeaId: "UNiaP6Oz7Mv"
      },
      {
        deliveryTeaId: "RwoKpuIgMmA", //lgHRdU82IJv
        eirTeaId: "DcMyN6eoyFD"
      }
    ];
    const cloned = _.cloneDeep(currentChild);
    childAttributes.forEach((attribute) => {
      let value = "";
      if (attribute.deliveryTeaId === "tQeFLjYbqzv") {
        value = findDataValue(currentDeliveryEvent.dataValues, "grMMOiF9fPj");
      } else {
        value = findAttributeValue(currentTei, attribute.deliveryTeaId);
      }
      const foundAttributeIndex = cloned.attributes.findIndex((attr) => attr.attribute === attribute.eirTeaId);
      if (foundAttributeIndex === -1) {
        cloned.attributes.push({
          attribute: attribute.eirTeaId,
          value
        });
      } else {
        cloned.attributes[foundAttributeIndex].value = value;
      }
    });
    children[childIndex] = cloned;
    changeDataValue("lYdXxom1BAG", JSON.stringify(children));
  }, []);

  const foundSex = findAttributeValue(currentChild, "DmuazFb368B");
  const foundChildHealthId = findAttributeValue(currentChild, "oPKsfqS64oE");
  const props = useInfantFormRules(birthDetailsEvent, childIndex);

  return (
    <div style={{ height: "100%" }}>
      <Row
        height={65}
        label={<div style={{ fontWeight: "bold" }}>{t("healthIdChild")}</div>}
        field={
          <div style={{ color: "#0277bd", fontWeight: "bold" }}>
            {foundChildHealthId ? foundChildHealthId : [<div>{t("childUniqueIdWarning1")}</div>, <div>{t("childUniqueIdWarning2")}</div>]}
          </div>
        }
        labelWidth={400}
      />

      <div style={{ height: "calc(100% - 65px)", overflow: "auto" }}>
        <Row
          height={65}
          label={<AttributeLabelNoState attribute="DmuazFb368B" mandatory={true} />}
          field={
            <AttributeFieldNoState
              disabled={!editing}
              value={foundSex}
              attribute="DmuazFb368B"
              change={(value) => {
                updateAttribute("DmuazFb368B", value);
              }}
            />
          }
          labelWidth={400}
        />
        {dataElements.map((de) => {
          if (props[de] && props[de].hidden) {
            return null;
          }
          return (
            <Row
              label={<DataValueLabelNoState dataElement={de} currentProgramStage={foundBirthDetailsStage} />}
              field={
                <DataValueFieldNoBlurNoState
                  disabled={!editing || (props[de] && props[de].disabled)}
                  dataElement={de}
                  currentProgramStage={foundBirthDetailsStage}
                  currentEvent={birthDetailsEvent}
                  change={(value) => {
                    updateDataValue(de, value);
                  }}
                  accept={(value) => {
                    updateDataValue(de, value);
                  }}
                />
              }
              labelWidth={400}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Infant;
