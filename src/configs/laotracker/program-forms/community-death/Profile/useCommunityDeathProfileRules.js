import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";

const useCommunityDeathProfileRules = () => {
  const { currentTei } = useTrackerCaptureStore(
    useShallow((state) => ({ currentTei: state.data.currentTei }))
  );

  const getAttributeValue = (attributeId) =>
    currentTei?.attributes?.find((a) => a.attribute === attributeId)?.value?.trim();

  const dateOfBirth = getAttributeValue("tQeFLjYbqzv"); // DOB
  const isForeigner = getAttributeValue("DtqYqC9Xr5Z") === "true";

  let derivedAgeYears = "";
  let derivedAgeMonths = "";

  if (dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const today = new Date();

    // Calculate years
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < dob.getDate())) {
      years--;
      months += 12;
    }

    if (today.getDate() < dob.getDate()) {
      months--;
      if (months < 0) {
        months += 12;
        years--;
      }
    }

    derivedAgeYears = years.toString();
    derivedAgeMonths = months.toString();
  }

  const shouldShowGuardianFields =
    (derivedAgeYears === "" || derivedAgeYears === "0") &&
    (derivedAgeMonths !== "");

  return {
    shouldShowGuardianFields,
    shouldShowCountryField: isForeigner,
    derivedAgeYears,
    derivedAgeMonths,
  };
};

export default useCommunityDeathProfileRules;
