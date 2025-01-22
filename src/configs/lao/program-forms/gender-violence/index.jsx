import VillageSelector from "../../common/VillageSelector/VillageSelector";
import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";
import DataValueField from "@/ui/EventCapture/Form/DataValueField";
import DataValueLabel from "@/ui/EventCapture/Form/DataValueLabel";
import MapTable from "../common/MapTable";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useEventCaptureStore from "@/state/eventCapture";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { isNull } from "lodash";
import { pull } from "@/utils/fetch";
import "./index.css";

const GenderViolence = () => {
  const { currentEvent, actions } = useEventCaptureStore(
    useShallow((state) => ({
      currentEvent: state.currentEvent,
      actions: state.actions
    }))
  );
  const [isCheckingDuplicated, setIsCheckingDuplicated] = useState(false);
  const { setCurrentEventDataValue, setLayout } = actions;
  const { event: currEventId, isNew } = currentEvent;
  const currentPatientId = currentEvent.dataValues?.uvXb6u3uo3t;
  const currentGender = currentEvent.dataValues?.CC9BpgSQbfh;
  const currentDoB = currentEvent.dataValues?.Z1x2iwf6IIY;
  const isValidPatientId = (patientId) =>
    /^\d{8}-[12]{1}-\d{4}$/g.test(patientId);

  useEffect(() => {
    let newPatientId = "";
    if (currentPatientId && isValidPatientId(currentPatientId)) {
      const generatedNumber = currentPatientId.split("-")[2];
      newPatientId = generatePatientId(generatedNumber);
    } else {
      newPatientId = generatePatientId();
    }
    if (newPatientId !== currentPatientId) {
      setCurrentEventDataValue("uvXb6u3uo3t", newPatientId);
    }
  }, [currentGender, currentDoB]);

  useEffect(() => {
    (async () => {
      if (isNew && isValidPatientId(currentPatientId)) {
        let flag = true;
        setLayout("disableEventSaveButton", true);
        setIsCheckingDuplicated(true);
        while (flag) {
          if (isValidPatientId(currentPatientId)) {
            const result = await pull(
              `/api/tracker/events?filter=uvXb6u3uo3t:EQ:${currentPatientId}&programStage=IsMKHq70RCd&orgUnit=IWp9dQGM0bS&skipPaging=true&fields=event,programStage,dataValues&ouMode=DESCENDANTS`
            );
            if (result.instances.length > 0) {
              const filteredEventsList = result.instances.filter(
                (event) => event.event !== currEventId
              );
              if (filteredEventsList.length > 0) {
                // Generate another ID...
                const newNoDuplicatedId = generatePatientId();
                setCurrentEventDataValue("uvXb6u3uo3t", newNoDuplicatedId);
              } else {
                flag = false;
              }
            } else {
              flag = false;
            }
          }
        }
        setLayout("disableEventSaveButton", false);
        setIsCheckingDuplicated(false);
      }
    })();
  }, [currentPatientId]);

  const randomNumber = [
    Math.floor(Math.random() * (9 - 0 + 1)) + 0,
    Math.floor(Math.random() * (9 - 0 + 1)) + 0,
    Math.floor(Math.random() * (9 - 0 + 1)) + 0,
    Math.floor(Math.random() * (9 - 0 + 1)) + 0
  ].join("");

  const generatePatientId = (generatedNumber = null) => {
    const mappedGenderValue = currentGender === "M" ? "1" : "2";
    const mappedDob = moment(currentDoB).format("DDMMYYYY");
    return isNull(generatedNumber)
      ? `${mappedDob}-${mappedGenderValue}-${randomNumber}`
      : `${mappedDob}-${mappedGenderValue}-${generatedNumber}`;
  };

  return (
    <Box sx={{ marginTop: "5px" }}>
      <Table id="gender-violence">
        <TableBody>
          {/* Patient ID */}
          <TableRow>
            <TableCell>
              <DataValueLabel dataElement={"uvXb6u3uo3t"} />
            </TableCell>
            <TableCell>
              <DataValueField dataElement={"uvXb6u3uo3t"} disabled={true} />
              {isCheckingDuplicated && (
                <span style={{ color: "blue !important", fontWeight: "bold" }}>
                  {"Checking duplicated ID..."}
                </span>
              )}
            </TableCell>
          </TableRow>
          {/* End Patient ID */}
          <MapTable
            dataElementConfigs={dataElementConfigs}
            tableName="gender-violence"
          />
        </TableBody>
      </Table>
    </Box>
  );
};

const VillageCell = () => {
  const { t } = useTranslation();
  return (
    <>
      <TableCell>{t("currentAddress")}</TableCell>
      <TableCell>
        <Box>
          <VillageSelector
            dataElementIds={["r2lL9b9n7AH", "ugp0nVXOksN", "BeK74KWSngP"]}
            storeGeometry={true}
          />
        </Box>
      </TableCell>
    </>
  );
};

const dataElementConfigs = [
  [{ id: "CC9BpgSQbfh" }],
  [{ id: "l83MdUzCjBh" }],
  [{ id: "Z1x2iwf6IIY" }],
  [{ id: "dTgxxtW8uqU" }],
  [{ id: "oDhFA52qtyM" }],
  [{ id: "exbBMXJNLw6" }],
  [{ id: "aOzwmUVHmFI" }],
  [{ customCell: <VillageCell /> }],
  [{ id: "dI9L5oRACSV" }],
  [{ id: "jGhtLDXLT3f" }],
  [{ id: "zVUBheJam7m" }],
  [{ id: "WLIIxqQm73K" }],
  [{ id: "uQaHfHvtWah" }],
  [{ id: "lo91vJQCjCw" }],
  [{ id: "Ly6JPjZbFet" }],
  [{ id: "IRmVvjpgAqx" }],
  [{ id: "s1yruF9GdZ9" }], //[{ id: "J2OQW0xlw9p" }],
  [{ id: "fcs1zLVx0We" }],
  [{ id: "ANLopkgKYeE" }]
  // [{ id: "fXEq7uQgcOw" }]
];

export default GenderViolence;
