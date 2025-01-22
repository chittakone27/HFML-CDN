import { useState } from "react";
import { Loader } from "@/ui/common";
import { Button, Dialog, DialogTitle } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import withPadding from "@/hocs/withPadding";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import { dataValue } from "@/api";
import useMetadataStore from "@/state/metadata";
const { runValidations } = dataValue;
const { VITE_FONT } = import.meta.env;

const RunValidationsButton = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const { t } = useTranslation();
  const validationRules = useMetadataStore((state) => state.validationRules);
  const { dataSet, attributeOptionCombo, orgUnit, period } = useSelectionStore(
    (state) => ({
      dataSet: state.dataSet,
      attributeOptionCombo: state.attributeOptionCombo,
      orgUnit: state.orgUnit,
      period: state.period
    }),
    shallow
  );

  const run = async () => {
    const operatorMapping = {
      greater_than: ">",
      greater_than_or_equal_to: ">=",
      equal_to: "=",
      less_than: "<",
      less_than_or_equal_to: "<="
    };

    setOpen(true);
    setLoading(true);
    const result = await runValidations(dataSet.id, orgUnit.id, period.dhis2Period, attributeOptionCombo);
    const transformed = result.validationRuleViolations.map((vrv) => {
      const foundVr = validationRules.find((vr) => vr.id === vrv.validationRule.id);
      return {
        id: vrv.validationRule.id,
        name: vrv.validationRule.displayName,
        operator: operatorMapping[foundVr.operator],
        leftSideValue: vrv.leftsideValue,
        rightSideValue: vrv.rightsideValue
      };
    });
    setDataSource([...transformed]);
    setLoading(false);
  };

  const columns = [
    {
      field: "name",
      headerName: t("name"),
      flex: 5
    },
    { field: "leftSideValue", headerName: t("leftSideValue"), flex: 1 },
    { field: "operator", headerName: t("operator"), flex: 1 },
    { field: "rightSideValue", headerName: t("rightSideValue"), flex: 1 }
  ];

  return [
    <Button variant="contained" color="primary" onClick={run}>
      {t("runValidations")}
    </Button>,
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth="lg"
      onClose={() => {
        setOpen(false);
      }}
    >
      <DialogTitle>{t("validationRuleResults")}</DialogTitle>
      <div className="validation-rule-results-container">
        {loading && <Loader />}
        {!loading && <DataGrid rows={dataSource} columns={columns} />}
      </div>
    </Dialog>
  ];
};

export default withPadding(RunValidationsButton);
