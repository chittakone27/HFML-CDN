import { useState, useEffect } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useChrTrackerStore from "../state";
import { useShallow } from "zustand/react/shallow";

const useNcleCommunicableDiseasesRules = () => {
  const [disabledFields, setDisabledFields] = useState([]);
  const [hiddenSections, setHiddenSections] = useState([]);
  const [helpers, setHelpers] = useState({});
  const [prevDisease, setPrevDisease] = useState(null);
  const [currDisplayingSymptoms, setCurrDisplayingSymptoms] = useState([]);
  const { data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions
    }))
  );
  const { event, chrTrackerActions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      chrTrackerActions: state.actions
    }))
  );
  const { currentEvents } = data;
  const { changeDataValue } = chrTrackerActions;
  const { currentEvent } = event;
  const [props, setProps] = useState({});

  const dataValues = currentEvent.dataValues.reduce((prev, curr) => {
    prev[curr.dataElement] = curr.value;
    return prev;
  }, {});

  useEffect(() => {
    const diseaseCode = dataValues["Dyq13cMGMzT"];
    setCurrDisplayingSymptoms(diseaseSymtomps[diseaseCode]);
    return () => {
      setPrevDisease(dataValues["Dyq13cMGMzT"]);
    };
  }, [dataValues["Dyq13cMGMzT"]]);

  useEffect(() => {
    let currentHiddenSections = [];
    if (dataValues["Dyq13cMGMzT"] === "19") {
      currentHiddenSections.push("oZPPUzgazm8");
      currentHiddenSections.push("lrSDktBXrtF");
      currentHiddenSections.push("nCt9BXg0LrW");
    } else {
      currentHiddenSections.push("notification");
    }
    setHiddenSections(currentHiddenSections);
  }, [JSON.stringify(dataValues)]);

  useEffect(() => {
    if (prevDisease && diseaseSymtomps[prevDisease]) {
      diseaseSymtomps[prevDisease].forEach((id) => {
        if (id) changeDataValue(id, "");
      });
    }
  }, [prevDisease]);

  return {
    disabledFields,
    hiddenSections,
    currDisplayingSymptoms,
    helpers,
    props
  };
};

const diseaseSymtomps = {
  1: ["SIRX3h55H4t", "gi77vJH30YB", "E1CizKSDcKM", "FxVHR6J1033", "Pt17tqRwsWx", "xITefDCj3jK", "wOvVjobAQZC"],
  2: ["Z6hO3eXouPz", "U9JBMssWfAJ", "kktesDFdpdL", "ym1HeXGXEs2", "JujiJ2ksu7S", "NValp9x7DQq", "SIRX3h55H4t", "usd5JbByPUq"],
  3: ["KfA3nYD3O4F", "gojYZvklOpF", "qMOMy1V1Pwc", "PcjPdJPU6hr"],
  4: ["VVQFhwUjHmI", "VRsOR8syb7X", "rtZZErWT7nO"],
  5: ["Xy3hjKLw4QK", "S4WFjhrTKDj", "jbmrvuj8kyh", "Zm41ecXvamH", "SIRX3h55H4t", "rek3dTE7OhH", "WqfOVmMEULs", "q5C3whwzVA5", "tqC1NORG6AG"],
  6: ["dI2BBMH8Tp9", "ym1HeXGXEs2", "MDQ8S54eeXJ", "kuQGUFr9qQt"],
  8: ["zyOLSCtjMSF", "JujiJ2ksu7S", "SIRX3h55H4t", "HN17Gig2SUF"],
  9: ["Bfohld7XN2E", "JujiJ2ksu7S", "SIRX3h55H4t", "k6I49LZ1hWo", "HN17Gig2SUF"],
  10: ["zyOLSCtjMSF", "JujiJ2ksu7S", "Ef85tZETz0d", "SIRX3h55H4t", "VzdhayX3oAF", "vjlayJNT17s", "HN17Gig2SUF", "Pmc9Fh19fDR"],
  11: ["zyOLSCtjMSF", "DVzt535AcjM", "Y7dmGdKPJkw", "FNtcnQx8iKc", "NValp9x7DQq", "Zm41ecXvamH", "fnl0yTfo1Ki", "o9ulQ9pviEF", "pdCojKJ5pxA"],
  12: [
    "DVzt535AcjM",
    "KfA3nYD3O4F",
    "uZoUS2kMJEJ",
    "YgVxYCesuQ1",
    "SIRX3h55H4t",
    "JAduxpCJbpl",
    "TkoCGASREZU",
    "exM4rH5K10A",
    "VzdhayX3oAF",
    "gFGWrtKAHLE",
    "t53n26YfOTi",
    "Pmc9Fh19fDR"
  ],
  13: ["xtbLyF9Euaq", "DVzt535AcjM", "SIRX3h55H4t", "xVfnSQjCR1E", "o9ulQ9pviEF"],
  14: [
    "NBKbOxMEY7M",
    "aRGrqiJqcrl",
    "K9wXRvwNgIE",
    "KfA3nYD3O4F",
    "Vh7MQuXAxF6",
    "fnl0yTfo1Ki",
    "eHz1iOlmkFw",
    "VzdhayX3oAF",
    "fYpWeaE6bBC",
    "usd5JbByPUq",
    "Pmc9Fh19fDR"
  ],
  15: [
    "NBKbOxMEY7M",
    "K9wXRvwNgIE",
    "VJGRPMwkjEB",
    "KfA3nYD3O4F",
    "guI8DrDPhKk",
    "Zm41ecXvamH",
    "AvSPZACYO37",
    "HfpVFYwQD0p",
    "FxVHR6J1033",
    "dp5Kq1PboxE",
    "epI8kXMeYeT",
    "Pmc9Fh19fDR"
  ],
  16: ["SIRX3h55H4t", "o9ulQ9pviEF", "XqwTeKhB6Jy", "N2PcxxzVT9W", "HLlMIORAgEK", "mGpdmcCIG9Q", "fnl0yTfo1Ki", "WWx1lUNOxpn", "a5oIrymizFr"],
  17: ["ym1HeXGXEs2", "DWE0kcAvauK", "zl4bpFr4xCe", "WqfOVmMEULs"],
  18: ["wvxfI5GZaIi", "SKLaDugpruy", "Gkm3fHUYObW"],
  7.1: ["hGDGGfkd6us", "SIRX3h55H4t", "fnl0yTfo1Ki", "VzdhayX3oAF", "usd5JbByPUq", "hjwUHpPBihj", "Pmc9Fh19fDR"],
  7.2: [
    "zyOLSCtjMSF",
    "hGDGGfkd6us",
    "CDuWEhBZXnH",
    "SIRX3h55H4t",
    "eHz1iOlmkFw",
    "QiH1mKo7j0G",
    "DLclC43ImXG",
    "VzdhayX3oAF",
    "Xfo7Ejyg48v",
    "usd5JbByPUq",
    "maXpqwwcGNw",
    "hjwUHpPBihj",
    "Pmc9Fh19fDR"
  ],
  7.3: [
    "lxRYbQmORBR",
    "hGDGGfkd6us",
    "CDuWEhBZXnH",
    "ixKT6MISgEt",
    "SIRX3h55H4t",
    "hoyikxYll6N",
    "NDAvVfSjXGV",
    "eHz1iOlmkFw",
    "QiH1mKo7j0G",
    "DLclC43ImXG",
    "VzdhayX3oAF",
    "nuRhJ6bcqGs",
    "Xfo7Ejyg48v",
    "usd5JbByPUq",
    "mKGHjmCOQGB",
    "maXpqwwcGNw",
    "dUfQQtJ6rG9",
    "T0WSJCAZoaa",
    "hjwUHpPBihj",
    "Pmc9Fh19fDR"
  ]
};

export default useNcleCommunicableDiseasesRules;
