import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert
} from "@mui/material";
import { Loader } from "@/ui/common";
import { LoadingButton } from "@mui/lab";
import { Input } from "@/ui/common";
import { useTranslation } from "react-i18next";
import withPadding from "@/hocs/withPadding";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import useMetadataStore from "@/state/metadata";
import { useState } from "react";
import { tracker } from "@/api";
import { convertDisplayValue } from "@/utils/utils";
import configs from "@/configs";
import { format } from "date-fns";
const { VITE_CONFIG_NAME } = import.meta.env;
const { searchTeis, getTeiById } = tracker;

const TrackerSearchButton = () => {
  const { teiSearchSections, customTeiSearchFields } = configs[VITE_CONFIG_NAME];
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [criterias, setCriterias] = useState({});
  const [foundTeis, setFoundTeis] = useState([]);
  const { program, orgUnit } = useSelectionStore((state) => ({ program: state.program, orgUnit: state.orgUnit }), shallow);
  const { trackedEntityAttributes, optionSets } = useMetadataStore(
    (state) => ({ trackedEntityAttributes: state.trackedEntityAttributes, optionSets: state.optionSets }),
    shallow
  );
  const { actions } = useTrackerCaptureStore((state) => ({ actions: state.actions }), shallow);
  const { setLayout, initData, register } = actions;
  const sections = teiSearchSections ? teiSearchSections[program.id] : null;
  const currentCustomTeiSearchFields = customTeiSearchFields ? customTeiSearchFields[program.id] : null;
  const changeCriteria = (tea, value) => {
    criterias[tea] = value;
    setCriterias({ ...criterias });
  };

  const convertValue = (tea, value) => {
    const foundTea = trackedEntityAttributes.find((currentTea) => currentTea.id === tea.name);
    const foundOptionSet = tea.optionSet ? optionSets.find((os) => os.id === tea.optionSet.id) : null;
    if (foundOptionSet) {
      const foundOption = foundOptionSet.options.find((o) => o.code === value);
      if (foundOption) {
        return foundOption.displayName;
      } else {
        return value;
      }
    } else {
      return convertDisplayValue(foundTea, value, t);
    }
  };
  const searchableTeas = program.programTrackedEntityAttributes
    .map((ptea) => {
      const foundTea = trackedEntityAttributes.find((tea) => tea.id === ptea.trackedEntityAttribute.id);
      foundTea.searchable = ptea.searchable;
      return foundTea;
    })
    .filter((tea) => {
      return tea.searchable || tea.unique;
    });

  // const searchableTeas = trackedEntityAttributes.filter((tea) => {
  //   let found = false;
  //   const foundPtea = program.programTrackedEntityAttributes.find((ptea) => ptea.trackedEntityAttribute.id === tea.id);
  //   if (foundPtea && foundPtea.searchable) {
  //     found = true;
  //   }
  //   if (foundPtea && tea.unique) {
  //     found = true;
  //   }
  //   return found;
  // });

  const currentTeas = program.programTrackedEntityAttributes
    .filter((ptea) => ptea.displayInList)
    .map((ptea) => {
      const foundTea = trackedEntityAttributes.find((tea) => tea.id === ptea.trackedEntityAttribute.id);
      return foundTea;
    });

  const columns = currentTeas.map((tea) => {
    return { name: tea.id, header: tea.displayFormName, defaultFlex: 1, optionSet: tea.optionSet };
  });

  const generateInput = (tea) => {
    let valueSet;
    if (currentCustomTeiSearchFields && currentCustomTeiSearchFields[tea.id]) {
      return currentCustomTeiSearchFields[tea.id](searchableTeas, criterias, changeCriteria);
    }
    if (tea.optionSet) {
      const foundOptionSet = optionSets.find((os) => os.id === tea.optionSet.id);
      if (foundOptionSet) {
        valueSet = foundOptionSet.options.map((o) => ({ value: o.code, label: o.displayName }));
      }
    }
    return (
      <div className="search-tea-row">
        <div>{tea.displayFormName}</div>
        <div>
          <Input
            valueSet={valueSet}
            value={criterias[tea.id]}
            valueType={tea.valueType}
            change={(value) => {
              changeCriteria(tea.id, value);
            }}
            initialDate={tea.valueType === "AGE" ? format(new Date(), "yyyy-MM-dd") : undefined}
            accept={
              tea.valueType === "DATE" || tea.valueType === "AGE"
                ? (value) => {
                    changeCriteria(tea.id, value);
                  }
                : undefined
            }
          />
        </div>
      </div>
    );
  };

  return [
    <Button
      variant="contained"
      color="orange"
      onClick={() => {
        setOpen(true);
      }}
    >
      {t("search")}
    </Button>,
    <Dialog
      open={open}
      fullWidth
      maxWidth="xl"
      onClose={() => {
        setOpen(false);
      }}
    >
      <DialogTitle>{t("search")}</DialogTitle>
      <DialogContent dividers>
        {sections ? (
          <div className="tracker-search-dialog-sections-container">
            {sections.map((section) => {
              return (
                <div className="tracker-search-dialog-section">
                  <div>{t(section.label)}</div>
                  <div>
                    {section.trackedEntityAttributes.map((tea) => {
                      const foundTea = searchableTeas.find((ct) => ct.id === tea);
                      return generateInput(foundTea);
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          searchableTeas.map((tea) => {
            return generateInput(tea);
          })
        )}
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={loading}
          variant="contained"
          color="primary"
          onClick={async () => {
            setLoading(true);
            const result = await searchTeis(criterias, program.id, orgUnit.id);
            const list = result.trackedEntityInstances.map((tei) => {
              const transformed = { ...tei };
              tei.attributes.forEach((attr) => {
                transformed[attr.attribute] = attr.value;
              });
              return transformed;
            });
            setFoundTeis([...list]);
            if (result.trackedEntityInstances.length > 0) {
              setResultOpen(true);
            } else {
              setConfirmDialog(true);
            }
            setLoading(false);
          }}
        >
          {t("search")}
        </LoadingButton>
        <LoadingButton
          loading={loading}
          variant="contained"
          color="error"
          onClick={() => {
            setOpen(false);
          }}
        >
          {t("cancel")}
        </LoadingButton>
      </DialogActions>
    </Dialog>,
    <Dialog
      open={resultOpen}
      fullWidth
      maxWidth="xl"
      onClose={() => {
        setResultOpen(false);
      }}
    >
      <DialogTitle>{t("searchResult")}</DialogTitle>
      <DialogContent dividers>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return <TableCell>{column.header}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {foundTeis.map((tei) => {
              return (
                <TableRow
                  hover
                  onClick={async () => {
                    setLoading(true);
                    const result = await getTeiById(program.id, tei.trackedEntityInstance);
                    initData(result, program.id, orgUnit.id);
                    setLayout("layout", "layout3");
                    setLoading(false);
                  }}
                >
                  {columns.map((column) => {
                    return <TableCell>{convertValue(column, tei[column.name])}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={loading}
          variant="contained"
          color="error"
          onClick={() => {
            setResultOpen(false);
          }}
        >
          {t("cancel")}
        </LoadingButton>
      </DialogActions>
    </Dialog>,
    <Dialog
      open={confirmDialog}
      onClose={() => {
        setConfirmDialog(false);
      }}
    >
      <DialogTitle>{t("error")}</DialogTitle>
      <div style={{ padding: 16 }}>
        <Alert severity="warning">{t("clientNotFound")} </Alert>
      </div>
      <DialogActions>
        <Button
          onClick={() => {
            setConfirmDialog(false);
          }}
        >
          {t("searchAgain")}
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            const currentDate = format(new Date(), "yyyy-MM-dd");
            register(currentDate, currentDate);
            setLayout("layout", "layout2");
            setOpen(false);
            setTeis([]);
            setConfirmDialog(false);
          }}
        >
          {t("register")}
        </Button>
      </DialogActions>
    </Dialog>
  ];
};

export default withPadding(TrackerSearchButton);
