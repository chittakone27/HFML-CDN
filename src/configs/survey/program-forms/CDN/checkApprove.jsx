import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from "@mui/material";

export default function ParentStatusCheckerText({
  orgUnitId,
  year,
  onStatusLoaded,
  quarter,
  dataSetId = "qgtWaPBPH9M",
  dataElementId = "qTAkkfEUI6W"
}) {
  const [loading, setLoading] = useState(true);
  const [parent, setParent] = useState(null);
  const [error, setError] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [Quarter, setQuarter] = useState("");

  const getAuthHeader = () => 'Basic ' + btoa(`test:@Abcd1234`);

  const fetchOrgUnitTree = async () => {
    try {
      const url =
        "https://hfml.gov.la/hfml/api/organisationUnits.json?fields=id,displayName,level,parent[id,name,level]&paging=false";
      const res = await fetch(url, {
        headers: { Authorization: getAuthHeader() }
      });
      if (!res.ok) throw new Error("Failed to fetch orgUnits");
      const data = await res.json();
      return data.organisationUnits || [];
    } catch (err) {
      console.error(err);
      setError(err.message);
      return [];
    }
  };

  const fetchStatus = async (orgId) => {
    try {
      const url = `https://hfml.gov.la/hfml/api/dataValueSets.json?dataSet=${dataSetId}&period=${year}${quarter}&orgUnit=${orgId}`;
      const res = await fetch(url, {
        headers: { Authorization: getAuthHeader() }
      });
      if (!res.ok) throw new Error("Failed to fetch status");
      const data = await res.json();
      const dv = data.dataValues?.find(
        (d) => d.dataElement === dataElementId
      );
      return dv?.value && dv.value !== "None" ? dv.value : "None";
    } catch (err) {
      console.error(err);
      return "Error";
    }
  };

  const checkParent = async () => {
    setLoading(true);
    const orgUnits = await fetchOrgUnitTree();

    const current = orgUnits.find((u) => u.id === orgUnitId);
    if (!current || !current.parent) {
      setLoading(false);
      return;
    }

    const parentOrg = orgUnits.find((u) => u.id === current.parent.id);
    if (!parentOrg) {
      setLoading(false);
      return;
    }

    const status = await fetchStatus(parentOrg.id);

    const parentData = {
      id: parentOrg.id,
      displayName: parentOrg.displayName,
      level: parentOrg.level,
      status
    };

    setParent(parentData);

    // Send value to Appro component
    if (onStatusLoaded) {
      onStatusLoaded(status);
    }

    // Show popup if parent already approved
    if (status !== "None") {
      setOpenPopup(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (orgUnitId && quarter) {
      if (quarter === "Q1") {
    setQuarter("ໄຕມາດທີ 1");
} else if (quarter === "Q2") {
    setQuarter("ໄຕມາດທີ 2");
} else if (quarter === "Q3") {
    setQuarter("ໄຕມາດທີ 3");
} else if (quarter === "Q4") {
    setQuarter("ໄຕມາດທີ 4");
}
      checkParent();
    }
  }, [orgUnitId, year, quarter]);

  if (loading) return <div>ກຳລັງກວດສອບປຸ່ມອະນຸມັດ...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <>
      {/* {parent && (
        <div>
          Level {parent.level} - {parent.name}:{" "}
          {parent.status === "None"
            ? "ຍັງບໍ່ອານຸມັດ"
            : parent.status}
        </div>
      )} */}

      {/* Material UI Popup */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogTitle>ຄຳເຕືອນ</DialogTitle>
        <DialogContent>
          <Typography>
ທ່ານຈະບໍ່ສາມາດເພີ່ມເຫດການການເສຍຊີວິດໄດ້, ເນື່ອງຈາກ <strong> {parent?.displayName} </strong>
            ແມ່ນໄດ້ຖືກອະນຸມັດຂໍ້ມູນໃນ {Quarter} ປີ {year} ແລ້ວ.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPopup(false)} variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}