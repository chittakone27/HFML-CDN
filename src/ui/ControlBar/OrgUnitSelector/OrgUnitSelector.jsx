import { useEffect, useState } from "react";
import { Input, OrgUnitSearchField } from "@/ui/common";
import { Popover, Button } from "@mui/material";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faSquareCheck,
  faChevronDown,
  faPlusSquare,
  faMinusSquare,
  faFolderOpen,
  faFolder
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import { getTreeExpanded } from "@/ui/common/OrgUnitSearchField/utils";
import CheckboxTree from "react-checkbox-tree";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import withPadding from "@/hocs/withPadding";
import configs from "@/configs";
import { pickTranslation } from "@/utils/utils";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import "./OrgUnitSelector.css";
const { VITE_CONFIG_NAME } = import.meta.env;
const { multiOrgUnitsDataSets } = configs[VITE_CONFIG_NAME];

const OrgUnitSelector = ({ disabled }) => {
  const { t, i18n } = useTranslation();
  const [transformed, setTransformed] = useState([]);
  const [ready, setReady] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tree, setTree] = useState([]);
  const openPopover = Boolean(anchorEl);

  const [searchOrgUnits, setSearchOrgUnits] = useState([]);

  const { me, orgUnits } = useMetadataStore(
    (state) => ({
      me: state.me,
      orgUnits: state.orgUnits
    }),
    shallow
  );
  const { orgUnit, program, dataSet, filteredOrgUnits } = useSelectionStore(
    (state) => ({
      orgUnit: state.orgUnit,
      program: state.program,
      dataSet: state.dataSet,
      filteredOrgUnits: state.filteredOrgUnits
    }),
    shallow
  );
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const { selectOrgUnit } = useSelectionStore((state) => state.actions);
  const assignedOrgUnits = program
    ? program.organisationUnits
    : dataSet.organisationUnits;
  const stringifiedAssignedOrgUnits = assignedOrgUnits
    .map((aou) => aou.path)
    .join(";");

  const generateTreeObject = () => {
    let filtered;
    filtered = transformed.filter((ou) => {
      return stringifiedAssignedOrgUnits.includes(ou.id);
    });
    if (filteredOrgUnits && filteredOrgUnits.length > 0) {
      const stringifiedFilteredOrgUnits = filteredOrgUnits.join(";");
      filtered = filtered.filter((ou) => {
        return stringifiedFilteredOrgUnits.includes(ou.id);
      });
    }

    if (program || dataSet) {
      // const orgUnits = program ? program.organisationUnits : dataSet.organisationUnits;
      const orgUnits = program
        ? program.organisationUnits.map((ou) => ou.id).join(";")
        : dataSet.organisationUnits.map((ou) => ou.id).join(";");

      filtered.forEach((node) => {
        const foundAssignedOu = orgUnits.includes(node.id);
        if (!foundAssignedOu) {
          node.showCheckbox = false;
        } else {
          node.showCheckbox = true;
        }
      });
    }

    setSearchOrgUnits(filtered);

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
    const result = createDataTree(filtered);
    return result;
  };

  useEffect(() => {
    const transformed = orgUnits
      .filter((ou) => {
        let valid = false;
        me.organisationUnits.forEach((o) => {
          const foundAncestor =
            ou.ancestors.find((a) => a.id === o.id) || ou.id === o.id;
          if (foundAncestor) {
            valid = true;
            return;
          }
        });
        return valid;
      })
      .map((ou) => {
        const isRoot = me.organisationUnits.find((o) => o.id === ou.id);
        const newOu = { ...ou };
        if (isRoot) newOu.parent = null;
        return newOu;
      })
      .map((ou) => {
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
    setTransformed([...transformed]);
    setReady(true);
  }, []);

  useEffect(() => {
    const generated = generateTreeObject();
    setTree([...generated]);
    if (checked.length > 0) {
      if (dataSet && multiOrgUnitsDataSets.includes(dataSet.id)) {
        return;
      } else {
        const foundAssignedOrgUnit = assignedOrgUnits.find(
          (ou) => ou.id === checked[0]
        );
        if (!foundAssignedOrgUnit) {
          setChecked([]);
          selectOrgUnit(null);
        }
      }
    }
  }, [program ? program.id : null, dataSet ? dataSet.id : null, ready]);

  useEffect(() => {
    if (orgUnit) {
      setChecked([orgUnit.id]);
    }
  }, [orgUnit ? orgUnit.id : ""]);

  // console.log(orgUnit);

  const apply = () => {
    if (checked.length > 0) {
      const foundAssignedOrgUnit = assignedOrgUnits.find(
        (ao) => ao.id === checked[0]
      );
      if (foundAssignedOrgUnit) {
        const foundOrgUnit = orgUnits.find((ou) => ou.id === checked[0]);
        selectOrgUnit(foundOrgUnit);
        setAnchorEl(null);
      } else {
        toast.error(t("invalidOrgUnit"), {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false
        });
      }
    }
  };

  return (
    <div className="org-unit-selector-container">
      <div
        onClick={(event) => {
          if (!disabled) setAnchorEl(event.currentTarget);
        }}
      >
        <Input
          disabled={disabled}
          label={t("selectOrgUnit")}
          valueType="TEXT"
          value={orgUnit ? pickTranslation(orgUnit, i18n.language, "name") : ""}
        />
      </div>
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        onClose={() => {
          apply();
          setAnchorEl(null);
        }}
      >
        <OrgUnitSearchField
          orgUnits={searchOrgUnits.filter((ou) => ou.showCheckbox)}
          checked={checked}
          onCheck={(targetNode) => {
            const currentExpanded = getTreeExpanded(
              searchOrgUnits,
              [targetNode.value],
              targetNode.value
            );
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
          <Button variant="contained" onClick={apply}>
            {t("apply")}
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default withPadding(OrgUnitSelector);
