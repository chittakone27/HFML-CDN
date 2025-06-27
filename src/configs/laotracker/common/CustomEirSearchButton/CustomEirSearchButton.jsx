import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material";
import { Input } from "@/ui/common";
import withPadding from "@/hocs/withPadding";
import { useTranslation } from "react-i18next";
import useMetadataStore from "@/state/metadata";
import "./CustomEirSearchButton.css";
import { useEffect, useState } from "react";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeFieldNoState from "@/ui/TrackerCapture/Profile/AttributeFieldNoState";
import VillageSelectorOrgUnitNoState from "../VillageSelector/VillageSelectorOrgUnitNoState";
import { format } from "date-fns";
import { tracker } from "@/api";
import useSelectionStore from "@/state/selection";
import { LoadingButton } from "@mui/lab";
import _, { random, split } from "lodash";
import SearchResultDialog from "./SearchResultDialog";
import ClientHealthIdField from "../ClientHealthIdField/ClientHealthIdField";
import { findAttributeValue } from "../utils";
const searchOptions = [
  ["oPKsfqS64oE"],
  ["tQeFLjYbqzv", "DmuazFb368B"],
  ["tQeFLjYbqzv", "UNiaP6Oz7Mv"],
  ["RqEyvE6zcTE", "UNiaP6Oz7Mv"],
  ["yearOfBirth", "DcMyN6eoyFD"],
  ["last34ClientHealthIdDigits"]
];
const { searchTeis } = tracker;

const CustomEirSearchButton = () => {
  const [searchDialog, setSearchDialog] = useState(false);
  const [searchResultDialog, setSearchResultDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState({});
  const [selectedSo, setSelectedSo] = useState("oPKsfqS64oE");
  const program = useSelectionStore((state) => state.program);
  const trackedEntityAttributes = useMetadataStore((state) => state.trackedEntityAttributes);
  const { t } = useTranslation();
  const valueSet = searchOptions.map((so) => {
    let labels = [];
    let values = [];
    if (so[0] === "tQeFLjYbqzv" && so[1] === "UNiaP6Oz7Mv") {
      const foundDobTea = trackedEntityAttributes.find((tea) => tea.id === "tQeFLjYbqzv");
      const foundDistrictTea = trackedEntityAttributes.find((tea) => tea.id === "oVwa5LfjnvA");
      const foundVillageTea = trackedEntityAttributes.find((tea) => tea.id === "UNiaP6Oz7Mv");
      labels.push(foundDobTea.displayFormName);
      labels.push(`${foundDistrictTea.displayFormName} / ${foundVillageTea.displayFormName}`);
      values.push("tQeFLjYbqzv");
      values.push("UNiaP6Oz7Mv");
    } else {
      so.forEach((o) => {
        const foundTea = trackedEntityAttributes.find((tea) => tea.id === o);
        if (foundTea) {
          labels.push(foundTea.displayFormName);
        } else {
          labels.push(t(o));
        }
        values.push(o);
      });
    }

    return {
      label: labels.join(" + "),
      value: values.join(" + ")
    };
  });

  const generateYearValueSet = () => {
    const valueSet = [];
    const startYear = 2000;
    const currentYear = format(new Date(), "yyyy");
    for (let i = parseInt(currentYear); i >= startYear; i--) {
      valueSet.push({
        value: i + "",
        label: i + ""
      });
    }
    return valueSet;
  };

  const changeSearch = (attribute, value) => {
    search[attribute] = value;
    setSearch({ ...search });
  };

  const generateSearchFields = () => {
    if (selectedSo) {
      const teas = selectedSo.split(" + ");
      if (teas[0] === "last34ClientHealthIdDigits") {
        return (
          <div className="search-row">
            <div className="search-item">
              <div>{t("last34ClientHealthIdDigits")}</div>
              <Input
                value={search["last34ClientHealthIdDigits"] ? search["last34ClientHealthIdDigits"] : ""}
                valueType="TEXT"
                change={(value) => {
                  changeSearch("last34ClientHealthIdDigits", value);
                }}
              />
            </div>
          </div>
        );
      }
      return (
        <div className="search-row">
          {teas.map((tea) => {
            const foundTea = trackedEntityAttributes.find((currentTea) => currentTea.id === tea);
            if (!foundTea && tea === "yearOfBirth") {
              return (
                <div className="search-item">
                  <Input
                    disabled={loading}
                    value={search["tQeFLjYbqzv"]}
                    label={t(tea)}
                    valueType="TEXT"
                    valueSet={generateYearValueSet()}
                    change={(value) => {
                      changeSearch("tQeFLjYbqzv", value);
                    }}
                    mandatory={true}
                  />
                </div>
              );
            } else if (foundTea.id === "UNiaP6Oz7Mv") {
              return (
                <div className="search-item">
                  <VillageSelectorOrgUnitNoState
                    mandatoryFields={[]}
                    disabled={loading}
                    VillageSelectorIds={["r8bZppSsIvR", "oVwa5LfjnvA", "UNiaP6Oz7Mv"]}
                    initValues={search[foundTea.id] ? search[foundTea.id].split(";") : ["", "", ""]}
                    change={(values) => {
                      if (values[0] && values[1]) {
                        changeSearch(foundTea.id, values.map((v) => (v ? v.value : "")).join(";"));
                      } else {
                        changeSearch(foundTea.id, "");
                      }
                    }}
                  />
                </div>
              );
            } else if (foundTea.valueType === "AGE") {
              return (
                <div className="search-item">
                  <Input
                    disabled={loading}
                    label={foundTea.displayFormName}
                    valueType="DATE"
                    value={search[foundTea.id]}
                    accept={(value) => {
                      changeSearch(foundTea.id, value);
                    }}
                    change={(value) => {
                      changeSearch(foundTea.id, value);
                    }}
                    mandatory={true}
                  />
                </div>
              );
            } else if (foundTea.id === "oPKsfqS64oE") {
              return (
                <div className="search-item">
                  <ClientHealthIdField
                    change={(value) => {
                      changeSearch(foundTea.id, value);
                    }}
                  />
                </div>
              );
            } else {
              return (
                <div className="search-item">
                  <AttributeFieldNoState
                    disabled={loading}
                    label={foundTea.displayFormName}
                    attribute={tea}
                    value={search[foundTea.id]}
                    change={(value) => {
                      changeSearch(foundTea.id, value);
                    }}
                    accept={(value) => {
                      changeSearch(foundTea.id, value);
                    }}
                    mandatory={true}
                  />
                </div>
              );
            }
          })}
        </div>
      );
    } else {
      return null;
    }
  };

  let valid = true;
  if (!selectedSo) {
    valid = false;
  }

  if (selectedSo) {
    if (selectedSo === "last34ClientHealthIdDigits") {
      if (
        search["last34ClientHealthIdDigits"] &&
        (search["last34ClientHealthIdDigits"].length < 3 || search["last34ClientHealthIdDigits"].length > 4)
      ) {
        valid = false;
      }
    }

    const teas = selectedSo.split(" + ");
    teas.forEach((tea) => {
      if (tea === "yearOfBirth") {
        if (!search["tQeFLjYbqzv"]) {
          valid = false;
        }
      } else if (tea === "UNiaP6Oz7Mv") {
        if (!search["UNiaP6Oz7Mv"]) {
          valid = false;
        } else {
          const splitted = search["UNiaP6Oz7Mv"].split(";");
          if (!splitted[0] || !splitted[1]) {
            valid = false;
          }
        }
      } else {
        if (!search[tea]) {
          valid = false;
        }
      }
    });
    if (teas.includes("oPKsfqS64oE") && search["oPKsfqS64oE"]) {
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
        if (splitted[2].length < 3 || splitted[2].length > 4 || isNaN(splitted[2])) {
          valid = false;
        }
      }
    }
  }
  const doSearch = async () => {
    if (!valid) {
      return;
    }
    setLoading(true);
    const newSearch = _.cloneDeep(search);
    console.log(newSearch);
    if (newSearch["last34ClientHealthIdDigits"]) {
      newSearch["oPKsfqS64oE"] = "-" + newSearch["last34ClientHealthIdDigits"];
      delete newSearch["last34ClientHealthIdDigits"];
    }
    if (newSearch["UNiaP6Oz7Mv"]) {
      const provinceDistrictVillage = newSearch["UNiaP6Oz7Mv"].split(";");
      if (provinceDistrictVillage[2]) {
        newSearch["UNiaP6Oz7Mv"] = provinceDistrictVillage[2];
      } else {
        newSearch["oVwa5LfjnvA"] = provinceDistrictVillage[1];
        delete newSearch["UNiaP6Oz7Mv"];
      }
    }

    const result = await searchTeis(newSearch, program.id, "IWp9dQGM0bS");
    let transformed = result.trackedEntityInstances;
    if (selectedSo === "last34ClientHealthIdDigits") {
      transformed = transformed.filter((tei) => {
        const foundClientHealthId = findAttributeValue(tei, "oPKsfqS64oE");
        const randomNumber = foundClientHealthId.split("-")[2];
        return randomNumber === newSearch["oPKsfqS64oE"].replace("-", "");
      });
    }
    setSearchResult(transformed);
    setSearchResultDialog(true);
    setLoading(false);
  };
  return (
    <div>
      <Dialog
        open={searchDialog}
        fullWidth
        maxWidth="xl"
        onClose={() => {
          setSearchDialog(false);
          setSearch({});
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") doSearch();
        }}
      >
        <DialogTitle>{t("search")}</DialogTitle>
        <DialogContent>
          <div className="search-item">
            <Input
              disabled={loading}
              value={selectedSo}
              label={t("searchOptions")}
              type="TEXT"
              valueSet={valueSet}
              change={(value) => {
                setSearch({});
                setSelectedSo(value);
              }}
            />
          </div>
          {generateSearchFields()}
        </DialogContent>
        <DialogActions>
          <LoadingButton disabled={!valid} loading={loading} variant="contained" onClick={doSearch}>
            {t("search")}
          </LoadingButton>
          <LoadingButton
            loading={loading}
            variant="contained"
            color="error"
            onClick={() => {
              setSearchDialog(false);
            }}
          >
            {t("cancel")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <SearchResultDialog
        open={searchResultDialog}
        setSearchResultDialog={setSearchResultDialog}
        setSearchDialog={setSearchDialog}
        result={searchResult}
      />
      <Button
        variant="contained"
        color="warning"
        onClick={() => {
          setSearchDialog(true);
        }}
      >
        {t("search")}
      </Button>
    </div>
  );
};

export default withPadding(CustomEirSearchButton);
