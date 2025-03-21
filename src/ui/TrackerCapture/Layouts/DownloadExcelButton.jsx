import { IconButton, Tooltip } from "@mui/material";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { shallow } from "zustand/shallow";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import { utils, writeFile } from "xlsx";

const DownloadExcelButton = () => {
  const { t } = useTranslation();
  const teis = useTrackerCaptureStore((state) => state.teis);
  const trackedEntityAttributes = useMetadataStore((state) => state.trackedEntityAttributes);
  const { program, orgUnit } = useSelectionStore((state) => ({ program: state.program, orgUnit: state.orgUnit }), shallow);
  const download = () => {
    const newWb = utils.book_new();
    newWb.SheetNames.push("Data");
    const columns = program.programTrackedEntityAttributes
      .filter((ptea) => ptea.displayInList)
      .map((ptea) => {
        const foundTea = trackedEntityAttributes.find((tea) => tea.id === ptea.trackedEntityAttribute.id);
        return foundTea;
      });

    // const convertedTeis = program.programTrackedEntityAttributes
    //   .filter((ptea) => ptea.displayInList)
    //   .map((ptea) => {
    //     const newTei = {};
    //     const foundTea = trackedEntityAttributes.find((tea) => tea.id === ptea.trackedEntityAttribute.id);
    //     const tea = ptea.trackedEntityAttribute.id;
    //     if (foundTea) {
    //       newTei[foundTea.displayFormName] = tei[key];
    //     } else {
    //       newTei[t(key)] = tei[key];
    //     }
    //   });

    const convertedTeis = teis.map((tei) => {
      const newTei = {};
      columns.forEach((tea) => {
        newTei[tea.displayFormName] = tei[tea.id];
      });
      // Object.keys(tei).forEach((key) => {
      //   if (["status"].includes(key)) {
      //     return;
      //   }
      //   if (key === "id") {
      //     return;
      //   }
      //   if (key === "enrollmentDate") {
      //     newTei[program.enrollmentDateLabel] = tei[key];
      //     return;
      //   }
      //   const foundTea = trackedEntityAttributes.find((tea) => tea.id === key);
      //   if (foundTea) {
      //     newTei[foundTea.displayFormName] = tei[key];
      //   } else {
      //     newTei[t(key)] = tei[key];
      //   }
      // });
      return newTei;
    });
    newWb.Sheets["Data"] = utils.json_to_sheet(convertedTeis);
    const fileName = `${program.displayName} - ${orgUnit.displayName}.xlsx`;
    writeFile(newWb, fileName);
  };

  return (
    <Tooltip title={t("downloadAsExcel")} placement="bottom">
      <IconButton size="small" onClick={download}>
        <div style={{ width: 22 }}>
          <FontAwesomeIcon icon={faDownload} fontSize={20} />
        </div>
      </IconButton>
    </Tooltip>
  );
};

export default DownloadExcelButton;
