import { useEffect, useMemo } from "react";
import { Input } from "@/ui/common";
import withPadding from "@/hocs/withPadding";
import { useTranslation } from "react-i18next";
import "./ProgramDataSetSelector.css";
import { shallow } from "zustand/shallow";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import _ from "lodash";
import configs from "@/configs";
import useTrackerCaptureStore from "@/state/trackerCapture";
const { VITE_CONFIG_NAME } = import.meta.env;
const { modes, allowedDataSets, allowedPrograms } = configs[VITE_CONFIG_NAME];

const ProgramDataSetSelector = ({ disabled }) => {
  const { t } = useTranslation();
  const { programs, dataSets, me, categoryCombos } = useMetadataStore(
    (state) => ({
      programs: state.programs,
      dataSets: state.dataSets,
      me: state.me,
      categoryCombos: state.categoryCombos
    }),
    shallow
  );
  const { program, dataSet, orgUnit, period, actions, customProgramDataSetHandler } = useSelectionStore(
    (state) => ({
      orgUnit: state.orgUnit,
      program: state.program,
      dataSet: state.dataSet,
      period: state.period,
      actions: state.actions,
      customProgramDataSetHandler: state.customProgramDataSetHandler
    }),
    shallow
  );
  const { selectProgram, selectTrackerProgram, selectDataSet, selectPeriod, selectOrgUnit, selectAttributeOptionCombo, resetPeriod } = actions;
  const trackerCaptureStoreActions = useTrackerCaptureStore((state) => state.actions);
  const { setLayout } = trackerCaptureStoreActions;
  const defaultCategoryCombo = categoryCombos.find((cc) => cc.isDefault);

  const generateValueSet = (programs, dataSet) => {
    let valueSet = [];
    const eventPrograms = programs
      .filter((p) => {
        return p.organisationUnits.length > 0 && !p.registration;
      })
      .filter((p) => {
        if (allowedPrograms && allowedPrograms.length > 0) {
          return allowedPrograms.includes(p.id);
        } else {
          return true;
        }
      })
      .map((p) => ({
        orgUnits: p.organisationUnits,
        label: p.displayName,
        value: p.id,
        type: "Programs",
        typeName: t("programs"),
        icon: p.icon,
        color: p.style ? p.style.color : ""
      }));

    const currentDataSets = dataSets
      .filter((ds) => {
        return ds.organisationUnits.length > 0;
      })
      .filter((ds) => {
        if (allowedDataSets && allowedDataSets.length > 0) {
          return allowedDataSets.includes(ds.id);
        } else {
          return true;
        }
      })
      .map((ds) => ({
        orgUnits: ds.organisationUnits,
        label: ds.displayName,
        value: ds.id,
        type: "Datasets",
        typeName: t("dataSets"),
        icon: ds.icon,
        color: ds.style ? ds.style.color : ""
      }));

    const trackerPrograms = programs
      .filter((p) => {
        return p.organisationUnits.length > 0 && p.registration;
      })
      .filter((p) => {
        if (allowedPrograms && allowedPrograms.length > 0) {
          return allowedPrograms.includes(p.id);
        } else {
          return true;
        }
      })
      .map((p) => ({
        orgUnits: p.organisationUnits,
        label: p.displayName,
        value: p.id,
        type: "Trackers",
        typeName: t("trackerPrograms"),
        icon: p.icon,
        color: p.style ? p.style.color : ""
      }));

    if (!modes) {
      valueSet = [...eventPrograms, ...currentDataSets, ...trackerPrograms];
    } else {
      if (modes.includes("eventCapture")) {
        valueSet.push(...eventPrograms);
      }
      if (modes.includes("dataEntry")) {
        valueSet.push(...currentDataSets);
      }
      if (modes.includes("trackerCapture")) {
        valueSet.push(...trackerPrograms);
      }
    }
    return valueSet.filter((pd) => {
      let assignedOrgUnits = [];
      pd.orgUnits.forEach((ou) => {
        const ous = ou.path.split("/");
        assignedOrgUnits.push(...ous);
      });
      assignedOrgUnits = _.uniq(_.compact(assignedOrgUnits));
      let ownOrgUnits = me.organisationUnits.map((ou) => ou.id);
      const intersection = _.intersection(assignedOrgUnits, ownOrgUnits);
      delete pd.orgUnits;
      if (intersection.length > 0) {
        return true;
      }
    });
  };

  const valueSet = useMemo(() => generateValueSet(programs, dataSets), []);
  const selected = program ? program : dataSet ? dataSet : "";

  useEffect(() => {
    if (period.periodType !== selected.periodType) {
      selectPeriod("dhis2Period", "");
      selectPeriod("month", "");
      selectPeriod("s", "");
      selectPeriod("year", "");
      selectPeriod("week", "");
      selectPeriod("quarter", "");
      selectPeriod("date", "");
    }
  }, [program ? program.id : null, dataSet ? dataSet.id : null]);

  useEffect(() => {
    if (dataSet) {
      if (dataSet.hasAttributeCombo) {
        selectAttributeOptionCombo(null);
      } else {
        selectAttributeOptionCombo({ ...defaultCategoryCombo.categoryOptionCombos[0], isDefault: true });
      }
    }
  }, [dataSet ? dataSet.id : null]);

  return (
    <div className="programdataset-selector-container">
      <Input
        disableClearable={true}
        renderOption={(props, option) => (
          <li {...props}>
            <div
              className="programdataset-selector-item"
              style={{
                backgroundColor: option.color ? option.color : "none"
              }}
            >
              <div>
                <img src={option.icon} />
              </div>
              <div>{option.label}</div>
            </div>
          </li>
        )}
        disabled={disabled}
        value={selected.id}
        label={t("programDataSet")}
        valueType="TEXT"
        valueSet={valueSet}
        groupBy={(option) => option.typeName}
        change={async (value) => {
          const found = valueSet.find((v) => value === v.value);
          const type = found ? found.type : null;
          const foundProgramDataSet =
            type === "Programs" || type === "Trackers" ? programs.find((p) => p.id === found.value) : dataSets.find((ds) => ds.id === found.value);
          // const foundAssignedOu = foundProgramDataSet.organisationUnits.find((ou) => ou.id === orgUnit.id);
          // if (!foundAssignedOu) {
          //   selectOrgUnit(null);
          // }

          if (customProgramDataSetHandler) {
            customProgramDataSetHandler(foundProgramDataSet);
          }
          if (!type) {
            resetPeriod();
            selectProgram(null);
            selectDataSet(null);
            return;
          }
          if (type === "Trackers") {
            setLayout("layout", "layout1");
          }
          if (type === "Programs" || type === "Trackers") {
            resetPeriod();
            selectProgram(foundProgramDataSet);
            selectDataSet(null);
          } else {
            resetPeriod();
            selectDataSet(foundProgramDataSet);
            selectProgram(null);
          }
        }}
      />
    </div>
  );
};

export default withPadding(ProgramDataSetSelector);
