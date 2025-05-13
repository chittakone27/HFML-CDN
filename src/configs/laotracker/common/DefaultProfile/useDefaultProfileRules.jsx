import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { findAttributeValue } from "../utils";
import { IDENTIFICATION_ATTRS } from "./const";
import { format } from "date-fns";
const useDefaultProfileRules = () => {
  const { data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions
    }))
  );
  const program = useSelectionStore((state) => state.program);
  const { currentTei, currentEnrollment } = data;
  const { changeAttributeValue } = actions;
  const [props, setProps] = useState({});

  useEffect(() => {
    const currentProps = {
      BaiVwt8jVfg: { disabled: true },
      vJdG29KW1Et: { disabled: true, hidden: true },
      tQeFLjYbqzv: { maxDate: currentEnrollment.enrollmentDate }
    };
    const foundAgeInYearAttribute = program.programTrackedEntityAttributes.find((ptea) => ptea.trackedEntityAttribute.id === "BaiVwt8jVfg");
    const foundDob = currentTei.attributes.find((attr) => attr.attribute === "tQeFLjYbqzv");
    const foundCountry = findAttributeValue(currentTei, "q4lqBvHgv7u");
    if (foundDob && foundDob.value && foundAgeInYearAttribute) {
      const refDate = new Date(currentEnrollment.enrollmentDate);
      const birth = new Date(foundDob.value);
      let years = refDate.getFullYear() - birth.getFullYear();
      let months = refDate.getMonth() - birth.getMonth();
      let days = refDate.getDate() - birth.getDate();

      if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
        if (days < 0) {
          const lastMonth = new Date(refDate.getFullYear(), refDate.getMonth() - 1, 0);
          days += lastMonth.getDate();
        }
      }
      changeAttributeValue("BaiVwt8jVfg", years + "");
    }
    if (foundCountry) {
      if (foundCountry === "LA") {
        changeAttributeValue("DtqYqC9Xr5Z", "");
        currentProps["DtqYqC9Xr5Z"] = {
          hidden: true
        };
      }
    }
    setProps({ ...currentProps });

    /* IF ALL ID FIELDS IN IDENTIFICATION SECTION ARE EMPTY, DISABLE THE SAVE BUTTON  */
    // const foundIdentAttrs = Object.keys(IDENTIFICATION_ATTRS).map(
    //   (attrName) => {
    //     const foundAttribute = program.programTrackedEntityAttributes.find(
    //       (ptea) =>
    //         ptea.trackedEntityAttribute.id === IDENTIFICATION_ATTRS[attrName]
    //     );
    //     const foundAttrVl = currentTei.attributes.find(
    //       (attr) => attr.attribute === IDENTIFICATION_ATTRS[attrName]
    //     );
    //     if (foundAttribute && foundAttrVl) {
    //       if (foundAttrVl.value !== "") {
    //         return true;
    //       }
    //       return false;
    //     } else {
    //       return false;
    //     }
    //   }
    // );
    // if (foundIdentAttrs.includes(true)) {
    //   actions.setLayout("disableProfileSaveButton", false);
    // } else {
    //   actions.setLayout("disableProfileSaveButton", true);
    // }
    // console.log(currentTei.attributes, program.programTrackedEntityAttributes);
  }, [JSON.stringify(currentTei.attributes)]);

  return props;
};
export default useDefaultProfileRules;
