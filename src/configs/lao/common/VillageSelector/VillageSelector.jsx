import useEventCaptureStore from "@/state/eventCapture";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import Cascader from "@/ui/common/Cascader/Cascader";
import { shallow } from "zustand/shallow";
import { useEffect, useState } from "react";
import { pull } from "@/utils/fetch";
import * as turf from "@turf/turf";

const findAttribute = (attributes, attributeId) => {
  const found = attributes.find((attr) => attr.attribute.id === attributeId);
  if (found) {
    return found.value;
  } else {
    return null;
  }
};

const sortFunction = (a, b) => {
  const codeA = a.value; // ignore upper and lowercase
  const codeB = b.value; // ignore upper and lowercase
  if (codeA < codeB) {
    return -1;
  }
  if (codeA > codeB) {
    return 1;
  }
  return 0;
};

const generateVillageSelectorOptions = (optionSets) => {
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
    const foundOptionProvince = provinceOptionSet.options.find((province) => province.code === provinceCode);
    const foundOptionDistrict = districtOptionSet.options.find((district) => district.code === districtCode);
    if (!foundOptionProvince || !foundOptionDistrict) return;
    const provinceName = foundOptionProvince.displayName;
    const districtName = foundOptionDistrict.displayName;

    const latitude = coordinates ? coordinates.split(",")[0] : null;
    const longitude = coordinates ? coordinates.split(",")[1] : null;
    const foundProvince = options.find((o) => o.value === provinceCode);
    if (!foundProvince) {
      options.push({ value: provinceCode, label: provinceName, children: [] });
    }
    const foundProvinceIndex = options.findIndex((o) => o.value === provinceCode);
    const foundDistrict = options[foundProvinceIndex].children.find((d) => d.value === districtCode);
    if (!foundDistrict) {
      options[foundProvinceIndex].children.push({
        value: districtCode,
        label: districtName,
        children: []
      });
    }
    const foundDistrictIndex = options[foundProvinceIndex].children.findIndex((o) => o.value === districtCode);

    options[foundProvinceIndex].children[foundDistrictIndex].children.push({
      value: villageCode,
      label: villageName,
      latitude,
      longitude
    });
  });
  options = options.sort(sortFunction);
  options.forEach((o) => {
    o.children = o.children.sort(sortFunction);
  });
  return options;
};

const VillageSelector = ({ disabled, dataElementIds, storeGeometry }) => {
  const { optionSets, dataElements, orgUnits } = useMetadataStore(
    (state) => ({
      optionSets: state.optionSets,
      dataElements: state.dataElements,
      orgUnits: state.orgUnits
    }),
    shallow
  );
  const { currentEvent, actions, completeness } = useEventCaptureStore(
    (state) => ({
      currentEvent: state.currentEvent,
      actions: state.actions,
      completeness: state.completeness
    }),
    shallow
  );
  const program = useSelectionStore((state) => state.program);
  const programStage = program.programStages[0];
  const { setCurrentEventDataValue, setCurrentEventGeometry } = actions;
  const options = generateVillageSelectorOptions(optionSets);
  const isDataSetCompleted = completeness ? true : false;
  const [currentOrgUnit, setCurrentOrgUnit] = useState(null);

  if (currentEvent.status !== "ACTIVE" || isDataSetCompleted) {
    disabled = true;
  }

  const getOrgUnitGeometry = async () => {
    const result = await pull(`/api/organisationUnits/${currentEvent.orgUnit}.json?fields=id,name,geometry`);
    setCurrentOrgUnit(result);
  };

  const assignGeometry = () => {
    if (currentOrgUnit.geometry) {
      const point = turf.centroid(currentOrgUnit.geometry);
      if (point.geometry.coordinates && point.geometry.coordinates.length > 1) {
        setCurrentEventGeometry(parseFloat(point.geometry.coordinates[1]), parseFloat(point.geometry.coordinates[0]));
      } else {
        setCurrentEventGeometry("", "");
      }
    } else {
      setCurrentEventGeometry("", "");
    }
  };

  useEffect(() => {
    (async () => {
      await getOrgUnitGeometry();
    })();
  }, [currentEvent.event]);

  useEffect(() => {
    (async () => {
      if (!currentEvent.dataValues[dataElementIds[2]] && currentOrgUnit) {
        assignGeometry();
      }
    })();
  }, [currentOrgUnit, currentEvent.dataValues[dataElementIds[2]]]);

  return (
    <Cascader
      disabled={disabled}
      change={async (selected) => {
        setCurrentEventDataValue(dataElementIds[0], selected[0] ? selected[0].value : "");
        setCurrentEventDataValue(dataElementIds[1], selected[1] ? selected[1].value : "");
        setCurrentEventDataValue(dataElementIds[2], selected[2] ? selected[2].value : "");
        if (storeGeometry) {
          if (selected[2] && selected[2].latitude) {
            setCurrentEventGeometry(parseFloat(selected[2].latitude), parseFloat(selected[2].longitude));
          } else {
            if (currentOrgUnit) {
              assignGeometry();
            }
            //setCurrentEventGeometry("", "");
          }
        }
      }}
      data={{
        data: options,
        initValues: [
          currentEvent.dataValues[dataElementIds[0]],
          currentEvent.dataValues[dataElementIds[1]],
          currentEvent.dataValues[dataElementIds[2]]
        ],
        ids: dataElementIds,
        mandatoryFields: dataElementIds
          .filter((id) => {
            const foundPsde = programStage.programStageDataElements.find((psde) => psde.dataElement.id === id);
            return foundPsde.compulsory;
          })
          .map((id) => {
            const found = dataElements.find((de) => de.id === id);
            return found ? found.displayFormName : id;
          }),
        labels: dataElementIds.map((id) => {
          const found = dataElements.find((de) => de.id === id);
          return found ? found.displayFormName : id;
        })
      }}
    />
  );
};

export default VillageSelector;
