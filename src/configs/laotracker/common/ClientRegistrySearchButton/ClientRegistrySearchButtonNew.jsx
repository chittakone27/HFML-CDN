import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Popover,
  Alert,
  TableFooter
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Input } from "@/ui/common";
import LoadingButton from "@mui/lab/LoadingButton";
import AttributeLabelNoState from "@/ui/TrackerCapture/Profile/AttributeLabelNoState";
import AttributeFieldNoState from "@/ui/TrackerCapture/Profile/AttributeFieldNoState";
import VillageSelectorOrgUnitNoState from "../VillageSelector/VillageSelectorOrgUnitNoState";
import TrackerGoBackButton from "@/ui/ControlBar/TrackerGoBackButton";
import "./ClientRegistrySearchButton.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { tracker } from "@/api";
import useMetadataStore from "@/state/metadata";
import { convertDisplayValue, generateUid } from "@/utils/utils";
import { useShallow } from "zustand/react/shallow";
import useSelectionStore from "@/state/selection";
import { format } from "date-fns";
import useTrackerCaptureStore from "@/state/trackerCapture";
import ClientHealthIdField from "../ClientHealthIdField/ClientHealthIdField";
import SelectorClientHealthIdField from "../SelectorClientHealthIdField/SelectorClientHealthIdField";
import { pull } from "@/utils/fetch";
const { searchTeis, saveEnrollment, getTeiById } = tracker;
import { pickTranslation } from "@/utils/utils";
import CvidField from "../CvidField/CvidField";

const ATTRIBUTES = {
  HEALTH_ID: "oPKsfqS64oE",
  FIRST_NAME: "IEE2BMhfoSc",
  LAST_NAME: "IBLkiaYRRL3",
  DOB: "tQeFLjYbqzv",
  CVID: "corXnplgfQ7",
  PROVINCE: "r8bZppSsIvR",
  DISTRICT: "oVwa5LfjnvA",
  VILLAGE: "UNiaP6Oz7Mv",
  PASSPORT_NUMBER: "pjpnF7u5PQj",
  MOBILE: "RwoKpuIgMmA",
  PASSPORT_FIRST_NAME_ENGLISH: "uEjTwR7UtaN",
  PASSPORT_LAST_NAME_ENGLISH: "ivMyUVXyofq",
  SEX: "DmuazFb368B",
  FAMILY_BOOK_NUMBER: "gSImG6wxCkY"
};

const FIRST_ROW = ["HEALTH_ID", "CVID"];
const SECOND_ROW = ["SEX"];
const THIRD_ROW = ["PROVINCE", "DISTRICT", "VILLAGE"];
const FOURTH_ROW = ["MOBILE", "FAMILY_BOOK_NUMBER", "PASSPORT_NUMBER", "DOB"];
const ALL_ROWS = [...FIRST_ROW, ...SECOND_ROW, ...THIRD_ROW, ...FOURTH_ROW];

const ClientRegistrySearchButton = ({
  renderOrgUnitSelector,
  renderPeriodSelector,
  renderAttributeComboSelector,
  renderNewEventButton,
  renderTrackerGoBackButton,
  renderNewTeiButton,
  renderCompleteButton,
  renderRunValidationsButton,
  disabled
}) => {
  const { trackedEntityAttributes, optionSets, orgUnits } = useMetadataStore(
    useShallow((state) => ({
      trackedEntityAttributes: state.trackedEntityAttributes,
      optionSets: state.optionSets,
      orgUnits: state.orgUnits
    }))
  );
  const provinces = orgUnits.filter((orgUnit) => {
    const foundProvinceGroup = orgUnit.organisationUnitGroups.find((oug) => oug.id === "jblbYwuvO33");
    if (foundProvinceGroup) {
      return true;
    } else {
      return false;
    }
  });
  const { program, orgUnit } = useSelectionStore(useShallow((state) => ({ program: state.program, orgUnit: state.orgUnit })));
  const { setLayout, initData, register } = useTrackerCaptureStore((state) => state.actions);
  const [teis, setTeis] = useState([]);
  const [selectedTei, setSelectedTei] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const hiddenAttributes = ["bxSvU1LK2Sn", "JYpq5unNinA", "rreM2sBjjoT"];
  const [dialog, setDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [searchOption, setSearchOption] = useState("");
  const { t, i18n } = useTranslation();

  const changeSearch = (attribute, value) => {
    search[attribute] = value;
    setSearch({ ...search });
  };

  const doSearch = async () => {
    setLoading(true);
    const newSearch = {};
    Object.keys(search).forEach((key) => {
      if (key === "last4ClientHealthIdDigits") {
        newSearch["oPKsfqS64oE"] = "-" + search[key];
      } else {
        newSearch[key] = search[key];
      }
    });
    let filterString = [];
    Object.keys(newSearch).forEach((key) => {
      if (newSearch[key]) {
        filterString.push(key + ":" + newSearch[key]);
      }
    });
    // const url = `:8000?work=search&filter=${filterString.join(";")}`;
    const url = `/api/routes/chr/run?work=search&filter=${filterString.join(";")}`;
    const result = await pull(url);
    // const result = await searchTeis(newSearch, "m9tWdDKc2Y4", "IWp9dQGM0bS");
    if (result.httpStatusCode && result.httpStatusCode === 500) {
      setLoading(false);
      setErrorDialog(true);
      return;
    }
    if (result.trackedEntityInstances.length === 0) {
      setConfirmDialog(true);
    } else {
      setTeis(result.trackedEntityInstances);
    }
    setLoading(false);
  };

  const isValidSearch = () => {
    let valid = true;
    const { HEALTH_ID, CVID, DOB, FIRST_NAME, LAST_NAME, MOBILE, PASSPORT_NUMBER } = ATTRIBUTES;

    if (!searchOption) {
      valid = false;
    }
    if (searchOption) {
      const fields = searchOption.split(";");
      fields.forEach((field) => {
        if (!search[field]) {
          valid = false;
        }
      });
    }
    if (searchOption === "last4ClientHealthIdDigits") {
      if (search["last4ClientHealthIdDigits"] && search["last4ClientHealthIdDigits"].length !== 4) {
        valid = false;
      }
    }
    if (search[HEALTH_ID] || search[CVID]) {
      valid = true;
    }
    if (search["oPKsfqS64oE"]) {
      const splitted = search["oPKsfqS64oE"].split("-");
      if (splitted.length !== 3) {
        valid = false;
      } else {
        if (splitted[0].length !== 8) {
          valid = false;
        }
        if (splitted[1].length !== 1 || isNaN(splitted[1])) {
          valid = false;
        }
        if ((splitted[2].length !== 3 && splitted[2].length !== 4) || isNaN(splitted[2])) {
          valid = false;
        }
      }
    }
    if (search["corXnplgfQ7"]) {
      const splitted = search["corXnplgfQ7"].split("-");
      if (splitted.length !== 3) {
        valid = false;
      } else {
        if (splitted[0].length !== 5) {
          valid = false;
        }
        if (splitted[1].length !== 1) {
          valid = false;
        }
        if (splitted[2].length !== 5) {
          valid = false;
        }
      }
    }
    return valid;
  };

  useEffect(() => {
    setSearch({});
  }, [program?.id]);

  useEffect(() => {
    const onlyFemalePrograms = ["u1Na9wCGY6d", "fflLsS1lm3g", "AyPkCOMmgdd", "vqNgkw4gfw7"];
    if (onlyFemalePrograms.includes(program?.id)) {
      setSearch((prev) => ({ ...prev, DmuazFb368B: "F" }));
    }
  }, [program?.id, search.DmuazFb368B]);

  const convertValue = (tea, value) => {
    const foundOptionSet = tea.optionSet ? optionSets.find((os) => os.id === tea.optionSet.id) : null;
    if (foundOptionSet) {
      const foundOption = foundOptionSet.options.find((o) => o.code === value);
      if (foundOption) {
        return pickTranslation(foundOption, i18n.language, "name");
      } else {
        return value;
      }
    } else if (tea.valueType === "ORGANISATION_UNIT") {
      const foundOu = orgUnits.find((ou) => ou.id === value);
      return foundOu ? pickTranslation(foundOu, i18n.language, "name") : value;
    } else {
      return convertDisplayValue(tea, value, t);
    }
  };

  const load = async (tei) => {
    const result = await getTeiById(program.id, tei.trackedEntityInstance);
    initData(result, program.id, orgUnit.id);
    setLayout("layout", "layout3");
    setLoading(false);
    setDialog(false);
    setTeis([]);
    setSearch({});
    setSelectedTei(null);
    setAnchorEl(null);
  };

  const doEnroll = async () => {
    setLoading(true);
    const availableTei = await getTeiById(program.id, selectedTei.trackedEntityInstance);
    if (availableTei.httpStatusCode && availableTei.httpStatusCode === 404) {
      const createTeiUrl = `/api/routes/chr/run?work=registerDhis2&tei=${selectedTei.trackedEntityInstance}&orgUnit=${orgUnit.id}`;
      const result = await pull(createTeiUrl);
    }
    const currentDate = format(new Date(), "yyyy-MM-dd");
    const newEnrollment = {
      orgUnit: orgUnit.id,
      program: program.id,
      trackedEntityInstance: selectedTei.trackedEntityInstance,
      enrollmentDate: format(new Date(), "yyyy-MM-dd"),
      incidentDate: format(new Date(), "yyyy-MM-dd"),
      status: "ACTIVE",
      attributes: []
    };

    const events = [];
    program.programStages.forEach((programStage) => {
      if (programStage.autoGenerateEvent) {
        events.push({
          event: generateUid(),
          eventDate: currentDate,
          dueDate: currentDate,
          program: program.id,
          orgUnit: orgUnit.id,
          programStage: programStage.id,
          dataValues: []
        });
      }
    });
    if (events.length) newEnrollment.events = events;
    await saveEnrollment(newEnrollment);
    const url = `/api/routes/chr/run?work=enroll&tei=${selectedTei.trackedEntityInstance}&program=${program.id}`;
    await pull(url);
    await load(selectedTei);
  };

  const generateAttributeField = (attribute) => {
    const foundAttribute = trackedEntityAttributes.find((tea) => tea.id === attribute);
    if (foundAttribute && foundAttribute.id === ATTRIBUTES.HEALTH_ID) {
      console.log(search[attribute]);
      return (
        <div>
          <ClientHealthIdField
            value={search[attribute]}
            change={(value) => {
              changeSearch(attribute, value);
            }}
          />
          <SelectorClientHealthIdField
            // disabled={searchOption ? true : false}
            value={search[attribute]}
            change={(value) => {
              changeSearch(attribute, value);
            }}
          />
        </div>
      );

      // <div>
      //   <AttributeLabelNoState attribute={attribute} />
      //   <Input
      //     value={search[attribute] ? search[attribute] : ""}
      //     valueType="TEXT"
      //     change={(value) => {
      //       changeSearch(attribute, value);
      //     }}
      //     helpers={[{ type: "HELPER", value: t("healthIdSearchHelper") }]}
      //   />
      // </div>
    }
    if (foundAttribute && foundAttribute.id === ATTRIBUTES.CVID) {
      return (
        <CvidField
          // disabled={searchOption ? true : false}
          value={search[attribute]}
          change={(value) => {
            changeSearch(attribute, value);
          }}
        />
      );
    }
    if (foundAttribute && foundAttribute.id === "r8bZppSsIvR") {
      return (
        <div>
          <AttributeLabelNoState attribute={attribute} />
          <Input
            value={search[attribute] ? search[attribute] : ""}
            valueType="TEXT"
            valueSet={provinces.map((province) => {
              return {
                value: province.id,
                label: pickTranslation(province, i18n.language, "name")
              };
            })}
            change={(value) => {
              changeSearch(attribute, value);
            }}
          />
        </div>
      );
    } else if (!foundAttribute && attribute === "last4ClientHealthIdDigits") {
      return (
        <div>
          <div>{t(attribute)}</div>
          <Input
            value={search[attribute] ? search[attribute] : ""}
            valueType="TEXT"
            change={(value) => {
              changeSearch(attribute, value);
            }}
          />
        </div>
      );
    } else {
      return (
        <div>
          <AttributeLabelNoState attribute={attribute} />
          <AttributeFieldNoState
            disabled={loading}
            value={search[attribute] ? search[attribute] : ""}
            attribute={attribute}
            change={(value) => {
              changeSearch(attribute, value);
            }}
            valueType={attribute === "tQeFLjYbqzv" ? "DATE" : foundAttribute.valueType}
          />
        </div>
      );
    }
  };

  const searchOptions = [
    "oPKsfqS64oE",
    "corXnplgfQ7",
    "tQeFLjYbqzv;IBLkiaYRRL3",
    "tQeFLjYbqzv;IEE2BMhfoSc",
    "tQeFLjYbqzv;RwoKpuIgMmA",
    "tQeFLjYbqzv;pjpnF7u5PQj",
    "tQeFLjYbqzv;DmuazFb368B",
    "tQeFLjYbqzv;r8bZppSsIvR",
    "last4ClientHealthIdDigits"
  ];
  return (
    <div key={program.id} className="crsb-container">
      {renderNewTeiButton && (
        <div style={{ alignSelf: "flex-end", marginBottom: 5, marginLeft: 5 }}>
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              setDialog(true);
            }}
          >
            {t("searchFromClientRegistry")}
          </Button>
        </div>
      )}
      {renderTrackerGoBackButton && <TrackerGoBackButton />}
      <Dialog
        open={errorDialog}
        onClose={() => {
          setErrorDialog(false);
        }}
      >
        <DialogTitle>{t("error")}</DialogTitle>
        <DialogContent>
          <Alert variant="filled" severity="error">
            {t("searchError")}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setErrorDialog(false);
            }}
            autoFocus
          >
            {t("ok")}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={dialog}
        maxWidth="lg"
        fullWidth
        onClose={() => {
          if (!loading) {
            setDialog(false);
            setSearch({});
            setTeis([]);
          }
        }}
      >
        <DialogTitle>{t("search")}</DialogTitle>
        <div className="crsb-dialog-content-container">
          {/* <div>{FIRST_ROW.map((row) => generateAttributeField(ATTRIBUTES[row]))}</div> */}
          <div>
            <div>
              {t("searchOptions")}
              <Input
                change={(searchOption) => {
                  const { CVID, HEALTH_ID } = ATTRIBUTES;
                  const newSearch = {
                    [CVID]: "",
                    [HEALTH_ID]: ""
                  };
                  setSearch({ ...newSearch });
                  setSearchOption(searchOption);
                }}
                value={searchOption}
                valueSet={searchOptions.map((option) => {
                  const fields = option.split(";");
                  if (fields.length === 1 && fields[0] === "last4ClientHealthIdDigits") {
                    return {
                      value: "last4ClientHealthIdDigits",
                      label: t(fields[0])
                    };
                  } else {
                    let label = [];
                    fields.forEach((field) => {
                      const foundAttribute = trackedEntityAttributes.find((tea) => tea.id === field);
                      label.push(foundAttribute.displayFormName);
                    });

                    return {
                      value: option,
                      label: label.join(" + ")
                    };
                  }
                })}
              />
            </div>
          </div>
          <div>
            {searchOption &&
              searchOption.split(";").map((field) => {
                return generateAttributeField(field);
              })}
          </div>
        </div>
        <DialogActions>
          <div style={{ paddingRight: 16 }}>
            <LoadingButton loading={loading} variant="contained" onClick={doSearch} disabled={!isValidSearch()}>
              {t("search")}
            </LoadingButton>
            &nbsp;
            <LoadingButton
              loading={loading}
              variant="contained"
              color="error"
              onClick={() => {
                setDialog(false);
              }}
            >
              {t("cancel")}
            </LoadingButton>
          </div>
        </DialogActions>
      </Dialog>
      <Dialog
        open={teis.length > 0}
        maxWidth="xl"
        fullWidth
        onClose={() => {
          if (!loading) {
            setTeis([]);
          }
        }}
      >
        <DialogTitle>{t("searchResult")}</DialogTitle>
        <div className="search-result-dialog-content-container">
          <DataGrid
            density="compact"
            autosizeOnMount={true}
            getRowId={(row) => {
              return row.id;
            }}
            rows={teis.map((tei) => {
              const row = {
                id: tei.trackedEntityInstance,
                tei
              };
              ALL_ROWS.forEach((field) => {
                const attribute = ATTRIBUTES[field];
                const foundAttribute = trackedEntityAttributes.find((tea) => tea.id === attribute);
                const foundTeaValue = tei.attributes.find((attr) => attr.attribute === attribute);
                row[attribute] = foundTeaValue ? convertValue(foundAttribute, foundTeaValue.value) : "";
              });
              return row;
            })}
            columns={ALL_ROWS.map((row) => {
              const attribute = ATTRIBUTES[row];
              const foundAttribute = trackedEntityAttributes.find((tea) => tea.id === attribute);
              return {
                field: attribute,
                headerName: foundAttribute.displayFormName,
                editable: false,
                width: 190
              };
            })}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 15
                }
              }
            }}
            pageSizeOptions={[15]}
            disableRowSelectionOnClick
            onRowClick={async (params, event, details) => {
              const tei = params.row.tei;
              // let foundEnrollment = null;
              // let hasEnrollment = false;
              // if (tei.enrollments) {
              //   foundEnrollment = tei.enrollments.find((enr) => {
              //     return (
              //       enr.program === program.id
              //       // && enr.status === "ACTIVE"
              //     );
              //   });
              // }
              // if (tei.enrolledTo) {
              //   hasEnrollment = tei.enrolledTo.split(";").includes(program.id);
              // }

              setSelectedTei({ ...tei });
              setAnchorEl(event.currentTarget);
            }}
          />
          {/* <Table size="small">
            <TableHead>
              <TableRow>
                {ALL_ROWS.map((row) => {
                  const attribute = ATTRIBUTES[row];
                  const foundAttribute = trackedEntityAttributes.find((tea) => tea.id === attribute);
                  return <TableCell>{foundAttribute.displayFormName}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {teis.map((tei) => {
                return (
                  <TableRow
                    hover
                    onClick={async (event) => {
                      const foundEnrollment = tei.enrollments.find((enr) => {
                        return enr.program === program.id && enr.status === "ACTIVE";
                      });
                      if (foundEnrollment) {
                        await load(tei);
                      } else {
                        setSelectedTei({ ...tei });
                        setAnchorEl(event.currentTarget);
                      }
                    }}
                  >
                    {ALL_ROWS.map((row) => {
                      const attribute = ATTRIBUTES[row];
                      const foundAttribute = trackedEntityAttributes.find((tea) => tea.id === attribute);
                      const foundTeaValue = tei.attributes.find((attr) => attr.attribute === attribute);
                      return <TableCell>{foundTeaValue ? convertValue(foundAttribute, foundTeaValue.value) : ""}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table> */}
        </div>
        <DialogActions>
          <Button
            variant="contained"
            disabled={program.readOnly}
            onClick={() => {
              let additionalTeas = null;
              if (search.tQeFLjYbqzv) {
                additionalTeas = { tQeFLjYbqzv: search.tQeFLjYbqzv };
              }
              if (search.oPKsfqS64oE) {
                const dob = search.oPKsfqS64oE.split("-")[0];
                const day = dob.substr(0, 2);
                const month = dob.substr(2, 2);
                const year = dob.substr(4, 4);
                additionalTeas = { tQeFLjYbqzv: year + "-" + month + "-" + day };
              }
              const currentDate = format(new Date(), "yyyy-MM-dd");
              register(currentDate, currentDate, additionalTeas);
              setLayout("layout", "layout2");
              setDialog(false);
              setSearch({});
              setTeis([]);
              setConfirmDialog(false);
            }}
          >
            {t("clientRegistryRegister")}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setTeis([]);
              setSearch({});
            }}
          >
            {t("cancel")}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmDialog}
        onClose={() => {
          setConfirmDialog(false);
        }}
      >
        <DialogTitle>{t("error")}</DialogTitle>
        <div style={{ padding: 16 }}>
          <Alert severity="warning">{t("clientNotFound")}</Alert>
        </div>
        <DialogActions>
          <Button
            onClick={() => {
              setConfirmDialog(false);
              setSearch({});
            }}
          >
            {t("searchAgain")}
          </Button>
          <Button
            variant="contained"
            disabled={program.readOnly}
            onClick={() => {
              let additionalTeas = null;
              if (search.tQeFLjYbqzv) {
                additionalTeas = { tQeFLjYbqzv: search.tQeFLjYbqzv };
              }
              if (search.oPKsfqS64oE) {
                const dob = search.oPKsfqS64oE.split("-")[0];
                const day = dob.substr(0, 2);
                const month = dob.substr(2, 2);
                const year = dob.substr(4, 4);
                additionalTeas = { tQeFLjYbqzv: year + "-" + month + "-" + day };
              }
              const currentDate = format(new Date(), "yyyy-MM-dd");
              register(currentDate, currentDate, additionalTeas);
              setLayout("layout", "layout2");
              setDialog(false);
              setSearch({});
              setTeis([]);
              setConfirmDialog(false);
            }}
          >
            {t("clientRegistryRegister")}
          </Button>
        </DialogActions>
      </Dialog>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          if (!loading) {
            setAnchorEl(null);
          }
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <div className="crsb-popover-content-container">
          <div>
            {selectedTei && (
              <div className="client-information-container">
                {selectedTei.attributes.map((attribute) => {
                  const attributeId = attribute.attribute;
                  const value = attribute.value;
                  const foundAttribute = trackedEntityAttributes.find((tea) => tea.id === attributeId);
                  const convertedValue = value ? convertValue(foundAttribute, value) : "";
                  return (
                    <div className="client-information-row">
                      <AttributeLabelNoState attribute={attribute.attribute} />
                      :&nbsp;
                      <div>
                        <strong>{convertedValue}</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {(() => {
              if (selectedTei && selectedTei.enrolledTo && selectedTei.enrolledTo.includes(program.id)) {
                return <Alert severity="info">{t("enrolled", { program: program?.displayName || "" })}</Alert>;
              } else {
                return <Alert severity="info">{t("doEnroll", { program: program?.displayName || "", facility: orgUnit?.displayName || "" })}</Alert>;
              }
            })()}
          </div>
          <br />
          <div>
            <LoadingButton
              loading={loading}
              variant="contained"
              color="primary"
              onClick={async () => {
                if (selectedTei && selectedTei.enrolledTo && selectedTei.enrolledTo.includes(program.id)) {
                  await load(selectedTei);
                } else {
                  doEnroll(selectedTei);
                }
                setSearch({});
              }}
            >
              {t("ok")}
            </LoadingButton>
            &nbsp;
            <LoadingButton
              loading={loading}
              variant="contained"
              color="error"
              onClick={() => {
                setAnchorEl(null);
              }}
            >
              {t("cancel")}
            </LoadingButton>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default ClientRegistrySearchButton;
