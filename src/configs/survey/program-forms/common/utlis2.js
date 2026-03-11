import { pickTranslation } from "@/utils/utils";

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
const generateVillageSelectorOptionsById = (provinces, districts, villages, language) => {
  let options = [];
  provinces.sort((a, b) => pickTranslation(a, language, "name") - pickTranslation(b, language, "name"));
  districts.sort((a, b) => pickTranslation(a, language, "name") - pickTranslation(b, language, "name"));
  villages.sort((a, b) => pickTranslation(a, language, "name") - pickTranslation(b, language, "name"));
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
    const villageName = pickTranslation(village, language, "name");
    if (!foundProvinceOu || !foundDistrictOu) return;
    const provinceName = pickTranslation(foundProvinceOu, language, "name");
    const districtName = pickTranslation(foundDistrictOu, language, "name");
    const latitude = coordinates ? `${coordinates.coordinates[1]}` : null;
    const longitude = coordinates ? `${coordinates.coordinates[0]}` : null;
    const foundProvince = options.find((o) => o.value === foundProvinceOu.id);
    if (!foundProvince) {
      options.push({
        value: foundProvinceOu.id,
        label: provinceName,
        children: []
      });
    }
    const foundProvinceIndex = options.findIndex((o) => o.value === foundProvinceOu.id);
    const foundDistrict = options[foundProvinceIndex].children.find((d) => d.value === foundDistrictOu.id);
    if (!foundDistrict) {
      options[foundProvinceIndex].children.push({
        value: foundDistrictOu.id,
        label: districtName,
        children: []
      });
    }
    const foundDistrictIndex = options[foundProvinceIndex].children.findIndex((o) => o.value === foundDistrictOu.id);
    options[foundProvinceIndex].children[foundDistrictIndex].children.push({
      value: villageId,
      label: villageName,
      latitude,
      longitude
    });
  });
  options = options.sort(sortFunctionId);
  options.forEach((o) => {
    o.children = o.children.sort(sortFunctionId);
  });
  return options;
};

const calculateAge = (date, dob) => {
  dob = new Date(dob);
  date = new Date(date);
  const diff = new Date(dob.getTime() - date.getTime());
  const years = diff.getUTCFullYear() - 1970;
  const months = diff.getUTCMonth();
  const days = diff.getUTCDate() - 1;
  return { years, months, days };
};

const findDataValue = (dataValues, dataElement) => {
  const foundDataValue = dataValues.find((dv) => dv.dataElement === dataElement);
  return foundDataValue ? foundDataValue.value : "";
};
const findAttributeValue = (tei, attribute) => {
  const found = tei ? tei.attributes.find((attr) => attr.attribute === attribute) : null;
  return found ? found.value : "";
};
export { generateVillageSelectorOptionsById, calculateAge, findDataValue, findAttributeValue };
