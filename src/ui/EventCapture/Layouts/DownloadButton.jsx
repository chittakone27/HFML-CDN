import { IconButton, Tooltip } from "@mui/material";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import useEventCaptureStore from "@/state/eventCapture";
import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";
import { shallow } from "zustand/shallow";
import { utils, writeFile } from "xlsx";

const DownloadButton = () => {
  const { t } = useTranslation();
  const { program, orgUnit, period } = useSelectionStore(
    (state) => ({ program: state.program, orgUnit: state.orgUnit, period: state.period }),
    shallow
  );
  const dataElements = useMetadataStore((state) => state.dataElements);
  const { convertedEvents, paging } = useEventCaptureStore((state) => ({ convertedEvents: state.convertedEvents, paging: state.paging }), shallow);

  const download = () => {
    const newWb = utils.book_new();
    newWb.SheetNames.push("Data");
    const newConvertedEvents = convertedEvents.map((event) => {
      const newEvent = {};

      Object.keys(event).forEach((key) => {
        if (["status"].includes(key)) {
          return;
        }
        if (key === "eventDate") {
          newEvent[program.programStages[0].executionDateLabel] = event[key];
          return;
        }
        const foundDe = dataElements.find((de) => de.id === key);
        if (foundDe) {
          newEvent[foundDe.displayFormName] = event[key];
        } else {
          newEvent[t(key)] = event[key];
        }
      });
      return newEvent;
    });
    newWb.Sheets["Data"] = utils.json_to_sheet(newConvertedEvents);
    const fileName = `${program.displayName} - ${orgUnit.displayName} - ${period.dhis2Period} - page ${paging.page}.xlsx`;
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

export default DownloadButton;
