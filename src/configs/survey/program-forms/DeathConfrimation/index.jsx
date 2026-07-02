import {
  Box,
  Table,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { shallow } from "zustand/shallow";
import useEventCaptureStore from "@/state/eventCapture";
import MapTable from "../common/MapTable";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import Alert from "@mui/material/Alert";
import Appro from "../CDN/checkApprove"

const DeathConfrimation = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");
const [approve, setapprove] = useState(false); // matches boolean usage
const[lock ,setlock]= useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogShown, setDialogShown] = useState(false);
  const [parentStatus, setParentStatus] = useState("None");

  const { currentEvent, actions, events } = useEventCaptureStore(
    (state) => ({
      currentEvent: state.currentEvent,
      actions: state.actions,
      events: state.events,
    }),
    shallow
  );
  actions.setLayout("disableEventSaveButton", true);


  const { orgUnit, period } = useSelectionStore(
  (state) => ({
    orgUnit: state.orgUnit,
    period: state.period,
  }),
  shallow
);
useEffect(() => {
  const statusapprove = parentStatus;
  const isApproved = statusapprove === "None";

  setapprove(isApproved);

  actions.setLayout("hideEventFormCompleteButton", !isApproved);
  actions.setLayout("disableEventSaveButton", !isApproved);
  actions.setLayout("hideEventDeleteButton", !isApproved);

}, [parentStatus]);
  const values = currentEvent?.dataValues || {};
  const eventsrows = (events?.rows || []).length;
        actions.setLayout("hideEventFormButtons", true);

  // ✅ hide top
  useEffect(() => {
    actions.setLayout("hideFormTop", true);


    
  }, [actions]);

  // ✅ one event rule
  useEffect(() => {
    // console.log(period)
    
        actions.setCurrentEventProperty("eventDate", period.endDate);
    // if(currentEvent?.isNew){
    // actions.setCurrentEventDataValue("Wse7ljFOmth", "None");

    // }

    if (currentEvent?.isNew && eventsrows === 1) {
 actions.setLayout("disableEventSaveButton", false);
    actions.setLayout("hideEventFormCompleteButton", true);
    setlock(true)
      setOpenDialog(true);
      setDialogShown(true);
    


    }

        if (currentEvent?.status ==="COMPLETED" ||currentEvent?.createdAt &&  eventsrows === 1 && currentEvent?.isDirty==="true") {
 actions.setLayout("disableEventSaveButton", true);
    actions.setLayout("hideEventFormCompleteButton", false);
            actions.setLayout("disableEventCompleteButton", false);

      setOpenDialog(false);
      setDialogShown(false);


    }
            if (currentEvent?.status ==="ACTIVE" ||currentEvent?.createdAt &&  eventsrows === 1 && currentEvent?.isDirty==="true") {
 actions.setLayout("disableEventSaveButton", true);
    actions.setLayout("hideEventFormCompleteButton", false);
            actions.setLayout("disableEventCompleteButton", false);

      setDialogShown(false);


    }
   
 
  }, [eventsrows, currentEvent?.isNew, dialogShown, actions]);

useEffect(() => {
  if (!values) return;

const requiredFields = isBeforeQ2_2026
  ? ["BW5YCOa96T5"] // 👈 exclude it
  : ["Yosu3mtX9Tz", "BW5YCOa96T5"];
  // Initialize missing keys so validation works
  requiredFields.forEach((id) => {
    if (!values.hasOwnProperty(id)) {
      actions.setCurrentEventDataValue(id, "");
    }
  });

 const isIncomplete =
  requiredFields.some(
    (id) => !values[id] || values[id] === ""
  );
if (!isIncomplete && parentStatus === "None"){
actions.setLayout("hideEventFormCompleteButton", false);
actions.setLayout("disableEventSaveButton", true);
}else if (parentStatus != "None" && !isIncomplete){
  actions.setLayout("hideEventFormCompleteButton", true);
actions.setLayout("disableEventSaveButton", true);
}
else if(isIncomplete){
  actions.setLayout("hideEventFormCompleteButton", true);
actions.setLayout("disableEventSaveButton", true);
}

}, [values, actions]);
const isBeforeQ2_2026 =
  period?.year < 2026 ||
  (period?.year === 2026 && period?.quarter < 2);

  // ✅ DATA CONFIG (like CDN)
  const dataElementConfigs = useMemo(() => {
    return [
      [
        {
          id: "Yosu3mtX9Tz",
          fieldProps: { required: !isBeforeQ2_2026,disabled : !approve || lock},
          labelCellProps: { sx: { width: "300px" } },
        },
      ],
      [
        {
          id: "BW5YCOa96T5",
          fieldProps: { required: true , disabled : !approve || lock},
        },
      ],
          // [{ id: "Wse7ljFOmth",disabled: true}]

    ];
}, [approve, isBeforeQ2_2026]);
  const [openSection, setOpenSection] = useState(true);

  const renderSection = (title, isOpen, toggleOpen, dataConfigs) => (
    <>
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: "18px",
          marginBottom: "8px",
          padding: "8px 0",
          borderBottom: "2px solid #1976d2",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={toggleOpen}
      >
        <Box sx={{ flexGrow: 1 }}>{title}</Box>
        <IconButton size="small">
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      {isOpen && (
        
        <Table>
          <TableBody>
            <MapTable
              dataElementConfigs={dataConfigs}
              tableName="ipd-event"
              editable={true}
            />
          </TableBody>
          <Appro orgUnitId={orgUnit.id} year={period.year} quarter={`Q${period.quarter}`} onStatusLoaded={setParentStatus}/>

        </Table>
      )}
    </>
  );

  return (
    <>
      <Box className="ipd-event-form-container custom-form">
        {renderSection(
          t("ipd.patientSection", {
            defaultValue: isLao
              ? "ໃບຍັ້ງຢືນການເສຍຊີວິດໃນບ້ານ"
              : "Document: Death Confirmation in the Village",
          }),
          openSection,
          () => setOpenSection(!openSection),
          dataElementConfigs
        )}
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {isLao ? "ແຈ້ງເຕືອນ" : "Information"}
        </DialogTitle>

        <DialogContent>
          <Typography>
            <Alert severity="error">
              {isLao
                ? `ບໍ່ສາມາດເພີມຂໍ້ມູນ ເນື່ອງຈາກໄຕມາດ ${period?.quarter} (${period?.quarterName} ${period?.year}) ແມ່ນອັບໂຫຼດແລ້ວ`
                : "You can only create one event."}
            </Alert>
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="contained"
          >
            {isLao ? "ຕົກລົງ" : "OK"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeathConfrimation;