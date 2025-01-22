import { Box, Table, TableBody, TableCell, TableHead, TableRow, styled } from "@mui/material";
import { useAgeInYearRule, useForeignerRule } from "../common/hook";
import VillageSelector from "../../common/VillageSelector/VillageSelector";
import MapTable from "../common/MapTable";
import "../common/index.css";
import "./epi-child.css";
import { useTranslation } from "react-i18next";
import useEventCaptureStore from "@/state/eventCapture";
import { useEffect, useMemo } from "react";
import { shallow } from "zustand/shallow";
import { useShallow } from "zustand/react/shallow";

const StyledTable = styled(Table)({
  border: "1px solid #bdbdbd",
  "& td": { border: "1px solid #bdbdbd" }
});

const EpiChild = () => {
  useAgeInYearRule("Z1x2iwf6IIY", "DIdyGwQaUnv");
  useForeignerRule("jaan5ZI8EnJ", villageSelectorIds);

  const { currentEvent, layout, actions } = useEventCaptureStore(
    useShallow((state) => ({
      currentEvent: state.currentEvent,
      layout: state.layout,
      actions: state.actions
    }))
  );
  const { setLayout, setCurrentEventProperty } = actions;

  useEffect(() => {
    if (currentEvent.isNew) {
      setLayout("hideFormTop", true);
    } else {
      setLayout("hideFormTop", false);
    }
    setCurrentEventProperty("status", "COMPLETED");
    setLayout("hideEventDeleteButton", true);
    setCurrentEventProperty("isDirty", false);
  });

  const section1Configs = useMemo(
    () => [
      [
        {
          id: "YrWCXDYIy46",
          labelCellProps: {
            ...s1CommonProps.labelCellProps,
            sx: { width: "400px" }
          }
        }
      ],
      [{ id: "Z1x2iwf6IIY", ...s1CommonProps }],
      [{ id: "CC9BpgSQbfh", ...s1CommonProps }],
      [{ id: "jaan5ZI8EnJ", ...s1CommonProps }],
      [
        {
          customCell: <VillageCell />,
          isCustomCellHide: currentEvent.dataValues["jaan5ZI8EnJ"]
        }
      ],
      [{ id: "Nsv148saunk", ...s1CommonProps }],
      [{ id: "PytdxISwHbE", ...s1CommonProps }]
    ],
    [currentEvent.dataValues["jaan5ZI8EnJ"]]
  );

  return currentEvent.isNew ? (
    [
      <div className="epi-child-warning">
        ເຖີງຜູ້ໃຊ້ທຸກທ່ານ,
        <br />
        ການປ້ອນຂໍ້ມູນສຳລັບໂປຣແກຣມ EPI Child ໄດ້ຖືກປິດການນຳໃຊ້ຕັ້ງແຕ່ເດືອນມິຖຸນາ 2024, ທ່ານສາມາດເບິ່ງຂໍ້ມູນໄດ້ເທົ່ານັ້ນ. ຖ້າຕ້ອງການປ້ອນຂໍ້ມູນໃໝ່,ອັບເດດ
        ຫຼື ແກ້ໄຂຂໍ້ມູນ ກະລຸນາປ່ຽນໄປໃຊ້ EIR ທີ່: <a href="https://laos-his.gov.la/dhis">https://laos-his.gov.la/dhis</a>. ຂໍຂອບ ໃຈ
        ໃນຄວາມເຂົ້າໃຈຂອງທ່ານ.
      </div>,
      <div className="epi-child-warning">
        Dear users,
        <br />
        Data entry for EPI Child program has been disabled since June 2024, you can only view the data. if you want to add new, update, edit, please
        switch to EIR, which is being implemented on: <a href="https://laos-his.gov.la/dhis">https://laos-his.gov.la/dhis</a>. Thank you for your
        understanding."
      </div>
    ]
  ) : (
    <Box id="epi-child-form-container" className="custom-form">
      <div className="epi-child-warning">
        ເຖີງຜູ້ໃຊ້ທຸກທ່ານ,
        <br />
        ການປ້ອນຂໍ້ມູນສຳລັບໂປຣແກຣມ EPI Child ໄດ້ຖືກປິດການນຳໃຊ້ຕັ້ງແຕ່ເດືອນມິຖຸນາ 2024, ທ່ານສາມາດເບິ່ງຂໍ້ມູນໄດ້ເທົ່ານັ້ນ. ຖ້າຕ້ອງການປ້ອນຂໍ້ມູນໃໝ່,ອັບເດດ
        ຫຼື ແກ້ໄຂຂໍ້ມູນ ກະລຸນາປ່ຽນໄປໃຊ້ EIR ທີ່: <a href="https://laos-his.gov.la/dhis">https://laos-his.gov.la/dhis</a>. ຂໍຂອບ ໃຈ
        ໃນຄວາມເຂົ້າໃຈຂອງທ່ານ.
      </div>
      <div className="epi-child-warning">
        Dear users,
        <br />
        Data entry for EPI Child program has been disabled since June 2024, you can only view the data. if you want to add new, update, edit, please
        switch to EIR, which is being implemented on: <a href="https://laos-his.gov.la/dhis">https://laos-his.gov.la/dhis</a>. Thank you for your
        understanding."
      </div>
      <StyledTable>
        <TableBody>
          <MapTable dataElementConfigs={section1Configs} tableName="epi-child" />
        </TableBody>
      </StyledTable>
      <StyledTable id="epi-child-section-2">
        <TableHead>
          <TableRow>
            <TableCell
              className="strong-tex"
              sx={{
                backgroundColor: "#2c6693",
                color: "#ffffff",
                padding: "10px",
                fontSize: 16
              }}
              colSpan={8}
            >
              Child Vaccination
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={section2Configs} tableName="epi-child-section-2" />
        </TableBody>
      </StyledTable>
    </Box>
  );
};

const villageSelectorIds = ["r2lL9b9n7AH", "WtqnbO4FXrx", "mrrTTvKqyi1"];

const VillageCell = () => {
  const { t } = useTranslation();

  return (
    <>
      <TableCell className="label">{t("currentAddress")}</TableCell>
      <TableCell>
        <Box>
          <VillageSelector dataElementIds={villageSelectorIds} storeGeometry={true} />
        </Box>
      </TableCell>
    </>
  );
};

const s1CommonProps = {
  labelCellProps: { className: "label" }
};

const s2CommonProps = {
  labelCellProps: { className: "label" },
  fieldCellProps: { className: "checkbox" }
};

const section2Configs = [
  [
    { id: "G9kw7qj1duL", ...s2CommonProps },
    { id: "TFIM3NzVlzn", ...s2CommonProps },
    { id: "wQNvIFAlWdA", ...s2CommonProps },
    { id: "JPxlkjfWRAm", ...s2CommonProps }
  ],
  [
    { id: "O8drIFUt4j8", ...s2CommonProps },
    { id: "eb5xGUCIGw3", ...s2CommonProps },
    { id: "yEMXv73bX9g", ...s2CommonProps },
    { id: "p6r3CmynN3p", ...s2CommonProps }
  ],
  [
    { id: "qyJMInEjWtJ", ...s2CommonProps },
    { id: "TvfJjKrHq7m", ...s2CommonProps },
    { id: "iuJuFQqTSMt", ...s2CommonProps },
    { id: "g1NaOGHcdoT", ...s2CommonProps }
  ],
  [
    {
      display: "empty",
      cellProps: {
        colSpan: 8,
        sx: { backgroundColor: "#2c6693", padding: "5px !important" }
      }
    }
  ],
  [
    { id: "EdCjK8sy4WH", ...s2CommonProps },
    { id: "E4YaV9wahBu", ...s2CommonProps },
    { id: "uQ6miuyuEle", ...s2CommonProps },
    { id: "qrZ2UmofOdm", ...s2CommonProps }
  ],
  [
    { id: "lqCdsjZrHgk", ...s2CommonProps },
    { id: "nychtGVm46H", ...s2CommonProps },
    { id: "x1aaFGkMUtF", ...s2CommonProps },
    { id: "rfG1xJCKQtm", ...s2CommonProps }
  ],
  [
    { id: "n6rveUjp5h1", ...s2CommonProps },
    { id: "kI35yRT54NZ", ...s2CommonProps },
    { id: "TXdcfWEjnCG", ...s2CommonProps },
    { display: "empty", cellProps: { className: "label" } },
    { display: "empty" }
  ],
  [
    { id: "muKXN4AOrnm", ...s2CommonProps },
    { id: "u6ioEgMJf8j", ...s2CommonProps },
    { display: "empty", cellProps: { className: "label" } },
    { display: "empty" },
    { display: "empty", cellProps: { className: "label" } },
    { display: "empty" }
  ]
];

export default EpiChild;
