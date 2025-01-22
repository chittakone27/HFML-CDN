import moment from "moment";

export const generateVillageSelectorOptions = (optionSets) => {
  //console.log(optionSets);
  let options = [];
  const provinceOptionSet = optionSets.find((os) => os.id === "quAw9R43Hcc");
  const districtOptionSet = optionSets.find((os) => os.id === "Fo4t7THmuHx");
  const villageOptionSet = optionSets.find((os) => os.id === "SYbcOcQqrWK");
  provinceOptionSet.options.sort((a, b) => a.name - b.name);
  districtOptionSet.options.sort((a, b) => a.name - b.name);
  villageOptionSet.options.sort((a, b) => a.name - b.name);

  villageOptionSet.options.forEach((village) => {
    const coordinates = findAttribute(village.attributeValues, "E4BKRTaQKot");
    const provinceCode = findAttribute(village.attributeValues, "REMLxBe9c4w");
    const districtCode = findAttribute(village.attributeValues, "GabcHXoJJWG");
    const villageCode = village.code;
    const villageName = village.displayName;
    const foundOptionProvince = provinceOptionSet.options.find(
      (province) => province.code === provinceCode
    );
    const foundOptionDistrict = districtOptionSet.options.find(
      (district) => district.code === districtCode
    );
    if (!foundOptionProvince || !foundOptionDistrict) return;
    const provinceName = foundOptionProvince.displayName;
    const districtName = foundOptionDistrict.displayName;

    const latitude = coordinates ? coordinates.split(",")[0] : null;
    const longitude = coordinates ? coordinates.split(",")[1] : null;
    const foundProvince = options.find((o) => o.value === provinceCode);
    if (!foundProvince) {
      options.push({ value: provinceCode, label: provinceName, children: [] });
    }
    const foundProvinceIndex = options.findIndex(
      (o) => o.value === provinceCode
    );
    const foundDistrict = options[foundProvinceIndex].children.find(
      (d) => d.value === districtCode
    );
    if (!foundDistrict) {
      options[foundProvinceIndex].children.push({
        value: districtCode,
        label: districtName,
        children: [],
      });
    }
    const foundDistrictIndex = options[foundProvinceIndex].children.findIndex(
      (o) => o.value === districtCode
    );

    options[foundProvinceIndex].children[foundDistrictIndex].children.push({
      value: villageCode,
      label: villageName,
      latitude,
      longitude,
    });
  });
  options = options.sort(sortFunction);
  options.forEach((o) => {
    o.children = o.children.sort(sortFunction);
  });
  return options;
};

export const calculateDiff = (startDate, endDate) => {
  let yearDiff;
  let monthDiff;
  let dayDiff;
  if (!endDate) return;
  if (moment(startDate) > moment(endDate) || !startDate) {
    return {
      years: "",
      months: "",
      days: "",
    };
  }
  yearDiff = moment(endDate).diff(moment(startDate), "years");
  monthDiff = moment(endDate)
    .subtract(yearDiff, "years")
    .diff(moment(startDate), "months");
  dayDiff = moment(endDate)
    .subtract(yearDiff, "years")
    .subtract(monthDiff, "months")
    .diff(moment(startDate), "days");
  return {
    years: yearDiff === 0 ? "" : yearDiff + "",
    months: monthDiff === 0 ? "" : monthDiff + "",
    days: dayDiff === 0 ? "" : dayDiff + "",
  };
};
