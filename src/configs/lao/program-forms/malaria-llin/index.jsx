import { Box, TableCell } from "@mui/material";
import { useEffect, useMemo } from "react";

import VillageSelector from "../../common/VillageSelector/VillageSelector";
import CustomSection from "./components/CustomSection";
import "../common/index.css";
import "./malaria-llin.css";
import useEventCaptureStore from "@/state/eventCapture";
import { useShallow } from "zustand/react/shallow";

const MalariaLlin = () => {
  const {
    currentEvent,
    actions: { setCurrentEventDataValue }
  } = useEventCaptureStore(
    useShallow((state) => ({
      currentEvent: state.currentEvent,
      actions: state.actions
    }))
  );

  useEffect(() => {
    if (currentEvent.dataValues["l0yIt0ZsGJC"] !== "MassDistribution") {
      villageSelectorIds.forEach((id) => {
        setCurrentEventDataValue(id, "");
      });
    }
  }, [currentEvent.dataValues["l0yIt0ZsGJC"]]);

  const section2Configs = useMemo(
    () => [
      // [
      //   {
      //     customCell: <VillageCell />,
      //     isCustomCellHide:
      //       currentEvent.dataValues["l0yIt0ZsGJC"] !== "MassDistribution"
      //   }
      // ],
      // [
      //   {
      //     ...commonProps,
      //     id: "cFxemJofAt5",
      //     fieldCellProps: { className: "checkbox input-field" }
      //   }
      // ],
      // [{ id: "sCfMABW2aMk", ...commonProps }],
      [{ id: "DFT4tQmbdRh", ...commonProps }],
      [{ id: "kUyk7pE1N6S", ...commonProps }],
      [{ id: "yZ4BwwboO7S", ...commonProps }],
      [{ id: "JUMW0xdt0aj", ...commonProps }],
      [{ id: "CJ6nkbRUAWC", ...commonProps }],
      [{ id: "B3uujK37Nll", ...commonProps }],
      [{ id: "ZIOj06GyZKz", ...commonProps }],
      [{ id: "hFdRIbnjY54", ...commonProps }],
      [{ id: "KyWO5yFsMJb", ...commonProps }],
      [{ id: "Du6ABMJktE1", ...commonProps }],
      [{ id: "I3F0zfFtEWF", ...commonProps }]
    ],
    [currentEvent.dataValues["l0yIt0ZsGJC"]]
  );

  return (
    <Box className="malaria-llin-form-container custom-form">
      <CustomSection
        sectionLabel="Type of Distribution"
        tableName="malaria-llin"
        dataElementConfigs={section1Configs}
      />

      <CustomSection
        sectionLabel="Sup distribution"
        tableName="malaria-llin-section-2"
        dataElementConfigs={section2Configs}
      />

      <CustomSection
        sectionLabel="Comment"
        tableName="malaria-llin-section-3"
        dataElementConfigs={section3Configs}
      />
    </Box>
  );
};

const villageSelectorIds = ["r2lL9b9n7AH", "WtqnbO4FXrx", "mrrTTvKqyi1"];

// const VillageCell = () => {
//   const { t } = useTranslation();

//   return (
//     <>
//       <TableCell>{t("currentAddress")}</TableCell>
//       <TableCell>
//         <Box className="bordered-left">
//           <VillageSelector
//             dataElementIds={villageSelectorIds}
//             storeGeometry={true}
//           />
//         </Box>
//       </TableCell>
//     </>
//   );
// };

const commonProps = {
  labelCellProps: { className: "label-field", sx: { width: "400px" } },
  fieldCellProps: { className: "input-field" }
};

const section1Configs = [[{ id: "l0yIt0ZsGJC", ...commonProps }]];

const section3Configs = [[{ id: "pxe9oaXtK0D", ...commonProps }]];

export default MalariaLlin;
