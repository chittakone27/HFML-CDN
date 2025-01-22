import { Alert, AlertTitle, IconButton, Popover, Tooltip } from "@mui/material";
import { faCircleCheck, faCircleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import useDataEntryStore from "@/state/dataEntry";
import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";
import { shallow } from "zustand/shallow";
import "./EntryFormInfo.css";

const EntryFormInfo = () => {
  const { t } = useTranslation();
  const { orgUnits, categoryCombos, dataElements } = useMetadataStore(
    (state) => ({
      orgUnits: state.orgUnits,
      categoryCombos: state.categoryCombos,
      dataElements: state.dataElements
    }),
    shallow
  );
  const { dataSet, orgUnit, attributeOptionCombo } = useSelectionStore(
    (state) => ({ dataSet: state.dataSet, orgUnit: state.orgUnit, attributeOptionCombo: state.attributeOptionCombo }),
    shallow
  );
  const { completeness, status, dataValues, selected } = useDataEntryStore(
    (state) => ({ completeness: state.completeness, status: state.status, dataValues: state.dataValues, selected: state.selected }),
    shallow
  );
  const { isLocked } = status;
  let error = null;
  let currentSelected = null;
  if (selected) {
    const foundDe = dataElements.find((de) => de.id === selected.split("-")[0]);
    const foundDataSetElement = dataSet.dataSetElements.find((dse) => dse.dataElement.id === foundDe.id);
    if (!foundDataSetElement) return null;
    const foundOrgUnit = orgUnits.find((ou) => ou.id === selected.split("-")[2]);
    let overridden = false;
    let foundCc;
    if (foundDataSetElement.categoryCombo) {
      foundCc = categoryCombos.find((currentCc) => currentCc.id === foundDataSetElement.categoryCombo.id);
      overridden = true;
    } else {
      foundCc = categoryCombos.find((currentCc) => currentCc.id === foundDe.categoryCombo.id);
      overridden = false;
    }
    const foundCoc = foundCc.categoryOptionCombos.find((coc) => coc.id === selected.split("-")[1]);
    currentSelected = {
      dataElement: foundDe.displayFormName,
      coc: foundCoc.displayName,
      orgUnit: foundOrgUnit.displayName,
      overridden
    };
    const prop = `${foundDe.id}-${foundCoc.id}-${orgUnit.id}-${attributeOptionCombo.id}`;
    error = dataValues[prop] ? dataValues[prop].error : "";
  }

  return (
    <div className="entry-form-info-container">
      {error && <div className="entry-form-info-error">{error}</div>}
      {currentSelected && (
        <div className="entry-form-info-info">
          {currentSelected.orgUnit} - {currentSelected.dataElement} {currentSelected.overridden && "(" + t("overridden") + ")"} -{" "}
          {currentSelected.coc}
        </div>
      )}
      {completeness && (
        <Tooltip
          title={
            <div style={{ fontSize: 14, padding: 10 }}>
              <div>
                {t("completedBy")}: {completeness.storedBy}
              </div>
              <div>
                {t("date")}: {completeness.date}
              </div>
            </div>
          }
        >
          <IconButton>
            <FontAwesomeIcon icon={faCircleCheck} color="#2e7d32" />
          </IconButton>
        </Tooltip>
      )}
      {isLocked && (
        <Tooltip
          title={
            <div style={{ fontSize: 14, padding: 10 }}>
              <div>{t("dataSetIsLocked")}</div>
              <div>All fields are disabled</div>
            </div>
          }
        >
          <IconButton>
            <FontAwesomeIcon icon={faCircleExclamation} color="#ed6c02" />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default EntryFormInfo;
