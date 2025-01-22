import { useEffect, useState } from "react";
import { completeness, dataValue } from "@/api";
import moment from "moment";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import useDataEntryStore from "@/state/dataEntry";
const { getCompleteness } = completeness;
const { getDataValues } = dataValue;

const useDataEntryLogics = () => {
  const { dataSet, orgUnit, period, attributeOptionCombo } = useSelectionStore(
    (state) => ({
      dataSet: state.dataSet,
      orgUnit: state.orgUnit,
      period: state.period,
      attributeOptionCombo: state.attributeOptionCombo
    }),
    shallow
  );
  const { actions, dataValues } = useDataEntryStore((state) => ({ actions: state.actions, dataValues: state.dataValues }), shallow);
  const { setCompleteness, setDataValues, setStatus } = actions;
  const [loading, setLoading] = useState(true);
  const { expiryDays } = dataSet;

  useEffect(() => {
    (async () => {
      setDataValues([]);
      setLoading(true);
      let dataValues = await getDataValues(dataSet.id, orgUnit.id, period.dhis2Period);
      setDataValues(dataValues);
      setStatus("selectedField", null);
      setStatus("error", null);
      if (expiryDays === 0) {
        setStatus("isLocked", false);
      } else {
        if (moment().isAfter(moment(period.endDate).add(expiryDays - 1, "days"))) {
          setStatus("isLocked", true);
        } else {
          setStatus("isLocked", false);
        }
      }
      setLoading(false);
    })();
  }, [dataSet.id, orgUnit.id, period.dhis2Period]);

  useEffect(() => {
    (async () => {
      if (dataSet && orgUnit && period) {
        setLoading(true);
        let completenessResult = await getCompleteness(dataSet.id, orgUnit.id, period.dhis2Period, attributeOptionCombo);
        setCompleteness(completenessResult);
        setLoading(false);
      }
    })();
  }, [dataSet.id, orgUnit.id, period.dhis2Period, attributeOptionCombo.id]);

  useEffect(() => {
    if (dataSet.compulsoryFieldsCompleteOnly) {
      let canBeCompleted = true;
      dataSet.compulsoryDataElementOperands.forEach((cdeo) => {
        const mandatoryDe = cdeo.id.split(".")[0];
        const mandatoryCoc = cdeo.id.split(".")[1];
        if (!dataValues[`${mandatoryDe}-${mandatoryCoc}-${orgUnit.id}`] || !dataValues[`${mandatoryDe}-${mandatoryCoc}-${orgUnit.id}`].value) {
          canBeCompleted = false;
        }
      });
      setStatus("canBeCompleted", canBeCompleted);
    } else {
      setStatus("canBeCompleted", true);
    }
  }, [JSON.stringify(dataValues)]);

  return { loading };
};

export default useDataEntryLogics;
