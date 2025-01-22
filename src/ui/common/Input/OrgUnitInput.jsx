import { useEffect, useState } from "react";
import { Input, OrgUnitSearchField } from "@/ui/common";
import { Popover, Button, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faSquareCheck,
  faChevronDown,
  faPlusSquare,
  faMinusSquare,
  faFolderOpen,
  faFolder,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import { getTreeExpanded } from "../OrgUnitSearchField/utils";
import CheckboxTree from "react-checkbox-tree";
import useMetadataStore from "@/state/metadata";
import { pickTranslation } from "@/utils/utils";
const OrgUnitInput = ({ filter, disabled, accept, value }) => {
  const { t, i18n } = useTranslation();
  const [transformed, setTransformed] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const [ready, setReady] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tree, setTree] = useState([]);
  const openPopover = Boolean(anchorEl);
  const { me, orgUnits } = useMetadataStore(
    (state) => ({
      me: state.me,
      orgUnits: state.orgUnits
    }),
    shallow
  );
  const orgUnit = value ? orgUnits.find((ou) => ou.id === value) : null;

  const [searchOrgUnits, setSearchOrgUnits] = useState([]);

  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const generateTreeObject = () => {
    //https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript/40732240#40732240
    const createDataTree = (dataset) => {
      const hashTable = Object.create(null);
      dataset.forEach((aData) => (hashTable[aData.id] = { ...aData }));
      const dataTree = [];
      dataset.forEach((aData) => {
        if (aData.parent) {
          if (hashTable[aData.parent].children) {
            hashTable[aData.parent].children.push(hashTable[aData.id]);
          } else {
            hashTable[aData.parent].children = [];
            hashTable[aData.parent].children.push(hashTable[aData.id]);
          }
        } else dataTree.push(hashTable[aData.id]);
      });
      return dataTree;
    };
    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // const tree = (items, id = null, link = "parent") =>
    //   items.filter((item) => item[link] === id).map((item) => ({ ...item, children: tree(items, item.id) }));
    const result = createDataTree(transformed);
    return result;
  };

  useEffect(() => {
    let filteredOrgUnits;

    if (filter) {
      filteredOrgUnits = orgUnits.filter((ou) => {
        return filter.includes(ou.id);
      });
      let splitted = filter.split(";");
      splitted = splitted.map((path) => {
        const pathSplitted = path.split("/");
        const lastOu = pathSplitted[pathSplitted.length - 1];
        return lastOu;
      });
      const stringifiedLastOus = splitted.join(";");
      filteredOrgUnits.forEach((fo) => {
        if (stringifiedLastOus.includes(fo.id)) {
          fo.showCheckbox = true;
        } else {
          fo.showCheckbox = false;
        }
      });
    } else {
      filteredOrgUnits = orgUnits;
    }

    const transformed = filteredOrgUnits.map((ou) => {
      const newOu = { ...ou };
      newOu.value = newOu.id;
      newOu.label = pickTranslation(newOu, i18n.language, "name");
      if (ou.parent) {
        newOu.parent = ou.parent.id;
      } else {
        newOu.parent = null;
      }
      return newOu;
    });

    setSearchOrgUnits(transformed);

    setLastUpdated(new Date().toString());
    setTransformed([...transformed]);
    setReady(true);
  }, [filter]);

  useEffect(() => {
    const generated = generateTreeObject();
    setTree([...generated]);
  }, [lastUpdated]);

  return (
    <div className="org-unit-selector-container">
      <div style={{ display: "flex" }}>
        <div
          onClick={(event) => {
            if (!disabled) setAnchorEl(event.currentTarget);
          }}
        >
          <Input
            disabled={disabled}
            valueType="TEXT"
            value={orgUnit ? pickTranslation(orgUnit, i18n.language, "name") : ""}
            endAdornment={
              <IconButton
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  accept("");
                  setChecked([]);
                }}
              >
                <FontAwesomeIcon style={{ fontSize: 18 }} icon={faTimes} />
              </IconButton>
            }
          />
        </div>
      </div>
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <OrgUnitSearchField
          orgUnits={filter ? searchOrgUnits.filter((ou) => ou.showCheckbox) : searchOrgUnits}
          checked={checked}
          onCheck={(targetNode) => {
            const currentExpanded = getTreeExpanded(searchOrgUnits, [targetNode.value], targetNode.value);
            setExpanded(currentExpanded);
            setChecked([targetNode.value]);
          }}
        />
        <div className="org-unit-tree-container">
          <CheckboxTree
            icons={{
              check: <FontAwesomeIcon icon={faSquareCheck} />,
              uncheck: <FontAwesomeIcon icon={faSquare} />,
              halfCheck: <FontAwesomeIcon icon={faSquareCheck} />,
              expandClose: <FontAwesomeIcon icon={faChevronRight} />,
              expandOpen: <FontAwesomeIcon icon={faChevronDown} />,
              expandAll: <FontAwesomeIcon icon={faPlusSquare} />,
              collapseAll: <FontAwesomeIcon icon={faMinusSquare} />,
              parentClose: <FontAwesomeIcon icon={faFolder} />,
              parentOpen: <FontAwesomeIcon icon={faFolderOpen} />,
              leaf: null
            }}
            noCascade={true}
            nodes={tree}
            checked={checked}
            expanded={expanded}
            onCheck={(checked, targetNode) => {
              setChecked([targetNode.value]);
            }}
            onExpand={(expanded) => setExpanded(expanded)}
          />
        </div>
        <div className="org-unit-selector-apply-button-container">
          <Button
            variant="contained"
            onClick={() => {
              accept(checked[0]);
              setAnchorEl(null);
            }}
          >
            {t("apply")}
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default OrgUnitInput;
