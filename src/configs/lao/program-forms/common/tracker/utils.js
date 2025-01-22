const sortFunctionId = (a, b) => {
  const codeA = a.label; // ignore upper and lowercase
  const codeB = b.label; // ignore upper and lowercase
  if (codeA < codeB) {
    return -1;
  }
  if (codeA > codeB) {
    return 1;
  }
  return 0;
};

export const generateVillageSelectorOptionsById = (
  provinces,
  districts,
  villages
) => {
  let options = [];
  provinces.sort((a, b) => a.displayName - b.displayName);
  districts.sort((a, b) => a.displayName - b.displayName);
  villages.sort((a, b) => a.displayName - b.displayName);
  villages.forEach((village) => {
    const coordinates = village.geometry;
    const foundProvinceOu = provinces.find((p) => {
      const provinceAttributeId = "AExdcxSHkXj";
      const foundVillageAttr = village.attributeValues.find(({ attribute }) => {
        return attribute.id === provinceAttributeId;
      });
      if (foundVillageAttr && foundVillageAttr.value === p.id) {
        return p;
      }
    });
    const foundDistrictOu = districts.find((d) => {
      const districtAttributeId = "DUuCROLcoik";
      const foundVillageAttr = village.attributeValues.find(({ attribute }) => {
        return attribute.id === districtAttributeId;
      });
      if (foundVillageAttr && foundVillageAttr.value === d.id) {
        return d;
      }
    });
    const villageId = village.id;
    const villageName = village.displayName;
    if (!foundProvinceOu || !foundDistrictOu) return;
    const provinceName = foundProvinceOu.displayName;
    const districtName = foundDistrictOu.displayName;
    const latitude = coordinates ? `${coordinates.coordinates[1]}` : null;
    const longitude = coordinates ? `${coordinates.coordinates[0]}` : null;
    const foundProvince = options.find((o) => o.value === foundProvinceOu.id);
    if (!foundProvince) {
      options.push({
        value: foundProvinceOu.id,
        label: provinceName,
        children: [],
      });
    }
    const foundProvinceIndex = options.findIndex(
      (o) => o.value === foundProvinceOu.id
    );
    const foundDistrict = options[foundProvinceIndex].children.find(
      (d) => d.value === foundDistrictOu.id
    );
    if (!foundDistrict) {
      options[foundProvinceIndex].children.push({
        value: foundDistrictOu.id,
        label: districtName,
        children: [],
      });
    }
    const foundDistrictIndex = options[foundProvinceIndex].children.findIndex(
      (o) => o.value === foundDistrictOu.id
    );
    options[foundProvinceIndex].children[foundDistrictIndex].children.push({
      value: villageId,
      label: villageName,
      latitude,
      longitude,
    });
  });
  options = options.sort(sortFunctionId);
  options.forEach((o) => {
    o.children = o.children.sort(sortFunctionId);
  });
  return options;
};

export const convertListToObj = (list, keyProperty, valueProperty) =>
  list
    ? list.reduce((result, current) => {
        result[current[keyProperty]] = valueProperty
          ? current[valueProperty]
          : current;

        return result;
      }, {})
    : {};
