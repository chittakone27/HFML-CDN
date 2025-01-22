import withModuleSection from "@/hocs/withModuleSection";
import DataValueField from "./DataValueField";
import _ from "lodash";
import "./Form.css";
import { SectionTabs, SectionVertical } from "./Section";
import { Loader } from "@/ui/common";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";
import useDataEntryLogics from "../hooks/useDataEntryLogics";
import { shallow } from "zustand/shallow";

const SectionForm = () => {
  const { loading } = useDataEntryLogics();
  const { t } = useTranslation();
  const { dataSet, orgUnit, period } = useSelectionStore(
    (state) => ({
      dataSet: state.dataSet,
      orgUnit: state.orgUnit,
      period: state.period
    }),
    shallow
  );
  const { categoryCombos, dataElements } = useMetadataStore(
    (state) => ({
      categoryCombos: state.categoryCombos,
      dataElements: state.dataElements
    }),
    shallow
  );

  const generateColumns = (categories, index, previousCo, dscc) => {
    const columns = [];
    if (categories[index]) {
      categories[index].categoryOptions.forEach((co) => {
        const column = { Header: dscc.isDefault ? t("value") : co.displayName };
        if (index === categories.length - 1) {
          const cos = previousCo + "-" + co.id;
          const sourceCos = cos.split("-").sort().join("");
          const foundCoc = dscc.categoryOptionCombos.find((coc) => {
            const targetCos = coc.categoryOptions
              .map((cc) => cc.id)
              .sort()
              .join("");
            return sourceCos === targetCos;
          });
          column.accessor = foundCoc.id;
        }
        column.columns = generateColumns(categories, index + 1, previousCo ? previousCo + "-" + co.id : co.id, dscc);
        columns.push(column);
      });
      return columns;
    }
  };

  const generateChildSections = (section, dataSetCategoryCombos) => {
    const greyedFields = section.greyedFields.length > 0 ? section.greyedFields.map((gf) => gf.id).join(";") : "";
    return dataSetCategoryCombos.map((dscc, index) => {
      const columns = generateColumns(dscc.categories, 0, "", dscc);
      columns.unshift({ Header: t("dataElement"), accessor: "de" });
      const data = dscc.dataElements.map((de) => {
        const row = { de: de.displayFormName };
        dscc.categoryOptionCombos.forEach((coc) => {
          row[coc.id] = <DataValueField dsde={de.id} cc={de.categoryCombo.id} coc={coc.id} disabled={greyedFields.includes(`${de.id}.${coc.id}`)} />;
        });
        return row;
      });
      return {
        title: dscc.isDefault ? "" : dscc.displayName,
        columns,
        data,
        totalColumns: Math.ceil(dscc.categoryOptionCombos.length / dscc.dataElements.length)
      };
    });
  };

  const generateSections = () => {
    const sections = [];
    dataSet.sections.forEach((section) => {
      const currentDataElements = section.dataElements
        .filter((dse) => {
          const foundDe = dataElements.find((de) => de.id === dse.id);
          return foundDe ? true : false;
        })
        .map((dse) => {
          const foundDe = { ...dataElements.find((de) => de.id === dse.id) };
          if (dse.categoryCombo) {
            foundDe.categoryCombo = dse.categoryCombo;
          }
          return foundDe;
        });

      let dataSetCategoryCombos = [];
      currentDataElements.forEach((cde) => {
        dataSetCategoryCombos.push(cde.categoryCombo.id);
      });
      dataSetCategoryCombos = _.uniq(dataSetCategoryCombos);
      dataSetCategoryCombos = _.sortBy(
        dataSetCategoryCombos.map((dscc) => {
          const foundCategoryCombo = { ...categoryCombos.find((cc) => cc.id === dscc) };
          const categoryComboDataElements = currentDataElements.filter((de) => de.categoryCombo.id === dscc);
          foundCategoryCombo.dataElements = categoryComboDataElements;
          return foundCategoryCombo;
        }),
        [
          (o) => {
            return o.categoryOptionCombos.length;
          }
        ]
      );
      sections.push({ name: section.displayName, tableData: generateChildSections(section, dataSetCategoryCombos) });
    });
    if (dataSet.renderAsTabs) {
      return <SectionTabs sections={sections} />;
    } else {
      return <SectionVertical sections={sections} />;
    }
  };

  return <div className="data-entry-form-container">{loading ? <Loader /> : generateSections()}</div>;
};

export default withModuleSection(SectionForm, "entryForm");
