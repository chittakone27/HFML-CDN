import { useEffect, useState } from "react";
import { TreeView, TreeItem } from "@mui/lab";
import { Input } from "@/ui/common";
import { Popover, Button, Checkbox, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { ArrowDropDown, ArrowDropUp, CheckBox, CheckBoxOutlineBlank, ConstructionOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import "./OrgUnitSelector.css";
import { shallow } from "zustand/shallow";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import withPadding from "@/hocs/withPadding";
const OrgUnitSelector = ({ disabled }) => {
  const { t } = useTranslation();
  const [transformed, setTransformed] = useState([]);
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
  const { orgUnit, program, dataSet } = useSelectionStore(
    (state) => ({ orgUnit: state.orgUnit, program: state.program, dataSet: state.dataSet }),
    shallow
  );
  const [selected, setSelected] = useState(orgUnit);
  const [expanded, setExpanded] = useState(selected && selected.id ? [...selected.ancestors.map((a) => a.id), selected.id] : []);

  const { selectOrgUnit } = useSelectionStore((state) => state.actions);
  const assignedOrgUnits = program ? program.organisationUnits : dataSet.organisationUnits;
  const stringifiedAssignedOrgUnits = assignedOrgUnits.map((aou) => aou.path).join(";");

  useEffect(() => {
    const transformed = orgUnits
      .filter((ou) => {
        let valid = false;
        me.organisationUnits.forEach((o) => {
          const foundAncestor = ou.ancestors.find((a) => a.id === o.id) || ou.id === o.id;
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
    if (selected) {
      const foundAssignedOrgUnit = assignedOrgUnits.find((ou) => ou.id === selected.id);
      if (!foundAssignedOrgUnit) {
        setSelected(null);
        selectOrgUnit(null);
      }
    }
  }, [program ? program.id : null, dataSet ? dataSet.id : null, ready]);

  const generateTreeObject = () => {
    const filtered = transformed.filter((ou) => {
      return stringifiedAssignedOrgUnits.includes(ou.id);
    });

    //https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript/40732240#40732240
    const createDataTree = (dataset) => {
      const hashTable = Object.create(null);
      dataset.forEach((aData) => (hashTable[aData.id] = { ...aData, children: [] }));
      const dataTree = [];
      dataset.forEach((aData) => {
        if (aData.parent) hashTable[aData.parent].children.push(hashTable[aData.id]);
        else dataTree.push(hashTable[aData.id]);
      });
      return dataTree;
    };
    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // const tree = (items, id = null, link = "parent") =>
    //   items.filter((item) => item[link] === id).map((item) => ({ ...item, children: tree(items, item.id) }));
    const result = createDataTree(filtered);
    return result;
  };

  const renderTree = (nodes) =>
    nodes.map((node) => {
      let checked;
      if (node !== null && selected !== null) {
        checked = selected.id === node.id;
      } else {
        checked = false;
      }
      return (
        <TreeItem
          sx={{ bgcolor: "unset" }}
          key={node.id}
          nodeId={node.id}
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                sx={{ height: 28 }}
                disableRipple
                name="tree-check-box"
                checked={checked}
                onChange={(event) => {
                  if (event.target.checked) {
                    const foundOu = orgUnits.find((ou) => ou.id === node.id);
                    setSelected({ ...foundOu });
                  } else {
                    setSelected(null);
                  }
                }}
              />
              &nbsp;&nbsp;
              <Typography>{node.displayName}</Typography>
            </div>
          }
        >
          {Array.isArray(node.children) ? node.children.map((child) => renderTree([child])) : null}
        </TreeItem>
      );
    });
  return (
    <div className="org-unit-selector-container">
      <div
        onClick={(event) => {
          if (!disabled) setAnchorEl(event.currentTarget);
        }}
      >
        <Input disabled={disabled} label={t("selectOrgUnit")} valueType="TEXT" value={orgUnit ? orgUnit.displayName : ""} />
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
        <div className="org-unit-tree-container">
          <TreeView
            selected={selected && selected.id ? [selected.id] : []}
            expanded={expanded}
            defaultCollapseIcon={<ArrowDropUp fontSize="large" />}
            defaultExpandIcon={<ArrowDropDown fontSize="large" />}
            onNodeToggle={(event, nodeIds) => {
              setExpanded(nodeIds);
            }}
          >
            {renderTree(tree)}
          </TreeView>
        </div>
        <div className="org-unit-selector-apply-button-container">
          <Button
            variant="contained"
            onClick={() => {
              if (selected) {
                const foundAssignedOrgUnit = assignedOrgUnits.find((ao) => ao.id === selected.id);
                if (foundAssignedOrgUnit) {
                  selectOrgUnit(selected);
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
            }}
          >
            {t("apply")}
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default withPadding(OrgUnitSelector);
