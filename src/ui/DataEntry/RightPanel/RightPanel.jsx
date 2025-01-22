import { Alert, AlertTitle } from "@mui/material";
import withModuleSection from "@/hocs/withModuleSection";
import { useTranslation } from "react-i18next";
import useDataEntryStore from "@/state/dataEntry";
import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";
import parse from "html-react-parser";
import { shallow } from "zustand/shallow";
import "./RightPanel.css";

const RightPanel = () => {
  const { t } = useTranslation();
  const { orgUnits, categoryCombos, dataElements } = useMetadataStore(
    (state) => ({
      orgUnits: state.orgUnits,
      categoryCombos: state.categoryCombos,
      dataElements: state.dataElements
    }),
    shallow
  );
  const dataSet = useSelectionStore((state) => state.dataSet);
  const { completeness, status, dataValues } = useDataEntryStore(
    (state) => ({ completeness: state.completeness, status: state.status, dataValues: state.dataValues }),
    shallow
  );
  const { isLocked } = status;
  let errors = [];
  let selected;
  dataValues &&
    Object.keys(dataValues).forEach((key) => {
      let overridden = false;
      const foundDe = dataElements.find((de) => de.id === key.split("-")[0]);
      const foundDataSetElement = dataSet.dataSetElements.find((dse) => dse.dataElement.id === foundDe.id);
      if (!foundDataSetElement) return;
      const foundOrgUnit = orgUnits.find((ou) => ou.id === key.split("-")[2]);
      let foundCc;
      if (foundDataSetElement.categoryCombo) {
        foundCc = categoryCombos.find((currentCc) => currentCc.id === foundDataSetElement.categoryCombo.id);
        overridden = true;
      } else {
        foundCc = categoryCombos.find((currentCc) => currentCc.id === foundDe.categoryCombo.id);
        overridden = false;
      }
      const foundCoc = foundCc.categoryOptionCombos.find((coc) => coc.id === key.split("-")[1]);

      if (dataValues[key].error) {
        errors.push({
          value: dataValues[key].error,
          dataElement: foundDe.displayFormName,
          coc: foundCoc.displayName,
          orgUnit: foundOrgUnit.displayName
        });
      }
      if (dataValues[key].isSelected) {
        const foundCoc = foundCc.categoryOptionCombos.find((coc) => coc.id === key.split("-")[1]);
        selected = {
          dataElement: foundDe.displayFormName,
          coc: foundCoc.displayName,
          orgUnit: foundOrgUnit.displayName,
          overridden
        };
      }
    });
  return (
    <div className="right-panel-container">
      {isLocked && (
        <>
          <Alert severity="warning">
            <AlertTitle>{t("dataSetIsLocked")}</AlertTitle>
            <div>All fields are disabled</div>
          </Alert>
          <div className="right-panel-divider" />
        </>
      )}
      {completeness && (
        <>
          <Alert severity="success">
            <AlertTitle>
              {t("completedBy")}: {completeness.storedBy}
            </AlertTitle>
            <div>
              {t("date")}: {completeness.date}
            </div>
          </Alert>
          <div className="right-panel-divider" />
        </>
      )}
      {selected && (
        <>
          <Alert severity="info">
            <AlertTitle>{selected.dataElement}</AlertTitle>
            <div>
              {t("orgUnit")}: <strong>{selected.orgUnit}</strong>
            </div>
            {selected.coc !== "default" && (
              <div>
                {t("categoryOptionCombo")} {selected.overridden && "(" + t("overridden") + ")"}: <strong>{selected.coc}</strong>
              </div>
            )}
          </Alert>
          <div className="right-panel-divider" />
        </>
      )}
      {/* {error &&
        Object.keys(error).map((currentError) => {
          return [
            <div className="right-panel-divider" />,
            <Alert severity="error">
              <AlertTitle>{t("error")}</AlertTitle>
              <div style={{ wordBreak: "break-all" }}>{parse(error[currentError])}</div>
            </Alert>
          ];
        })} */}
      {errors.map((error) => {
        return [
          <Alert severity="error">
            <AlertTitle>{t("error")}</AlertTitle>
            <div>
              {t("dataElement")}: <strong>{error.dataElement}</strong>
            </div>
            {error.coc !== "default" && (
              <div>
                {t("categoryOptionCombo")}: <strong>{error.coc}</strong>
              </div>
            )}
            <div>
              {t("orgUnit")}: <strong>{error.orgUnit}</strong>
            </div>
            <div style={{ wordBreak: "break-all" }}>{parse(error.value)}</div>
          </Alert>,
          <div className="right-panel-divider" />
        ];
      })}
    </div>
  );
};

export default withModuleSection(RightPanel, "description");
