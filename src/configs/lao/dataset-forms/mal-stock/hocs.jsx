import useSelectionStore from "@/state/selection";
import { pull } from "@/utils/fetch";
import {
  createContext,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { shallow } from "zustand/shallow";

const openingStockContext = createContext();
export const useOpeningStockStore = () => useContext(openingStockContext);

export const withOpeningStockContext =
  (Component, openingStocks) => (props) => {
    const [openingVals, setOpeningVals] = useState({});
    const MemoComponent = useMemo(() => memo(Component), []);

    const orgUnit = useSelectionStore((state) => state.orgUnit, shallow);
    const period = useSelectionStore((state) => state.period, shallow);
    const attributeOptionCombo = useSelectionStore(
      (state) => state.attributeOptionCombo,
      shallow
    );

    const getLastMonth = () => {
      let year = parseInt(period.dhis2Period.slice(0, 4));
      let month = parseInt(period.dhis2Period.slice(4, 6));
      if (month == 1) {
        month = 12;
        year -= 1;
      } else if (month >= 11) {
        month -= 1;
      } else {
        month -= 1;
        month = "0" + month;
      }
      const pe = "" + year + month;
      return pe;
    };

    useEffect(() => {
      (async () => {
        try {
          const lastMonth = getLastMonth();
          const result = await pull(
            `/api/dataValueSets.json?dataSet=lX2gNwsdZwV&period=${lastMonth}&orgUnit=${orgUnit.id}`
          );

          if (result.dataValues != null || result.dataValues != "undefined") {
            const resultVals = openingStocks.reduce(
              (resultDataValues, { dsde, coc }) => {
                result.dataValues.forEach(function (item) {
                  if (
                    item.dataElement === dsde &&
                    item.categoryOptionCombo === coc &&
                    item.attributeOptionCombo === attributeOptionCombo.id
                  ) {
                    resultDataValues[`${dsde}-${coc}`] = item.value;
                  }
                });
                return resultDataValues;
              },
              {}
            );

            setOpeningVals(resultVals);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }, []);

    return (
      <openingStockContext.Provider value={openingVals}>
        <MemoComponent {...props} />
      </openingStockContext.Provider>
    );
  };
