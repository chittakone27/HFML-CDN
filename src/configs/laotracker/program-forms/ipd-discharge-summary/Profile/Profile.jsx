import { useState, useEffect } from "react";
import DefaultProfile from "@/configs/laotracker/common/DefaultProfile/DefaultProfile";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useSelectionStore from "@/state/selection";
import { useTranslation } from "react-i18next";
import useIpdProfileRules from "./useIpdProfileRules";
import { useShallow } from "zustand/react/shallow";
import { toast } from "react-toastify";
import { tracker } from "@/api";
import { DATA_ELEMENTS } from "../const";
const { saveTei, deleteTei, saveEnrollment, getTeiById, saveEvent } = tracker;
const { IS_PREGNANT_ID } = DATA_ELEMENTS;
const Profile = () => {
  const [apiError, setApiError] = useState(null);
  const { layout, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      layout: state.layout,
      actions: state.actions
    }))
  );
  const { setHandlers, setLayout, changeTeiProperty, changeDataValue } = actions;
  const { program } = useSelectionStore((state) => ({
    program: state.program
  }));
  const { t } = useTranslation();
  const props = useIpdProfileRules();
  const { warningSex } = props;
  const saveCurrentTei = async (currentTei, currentEnrollment, currentEvents) => {
    const teiResult = await saveTei(currentTei);
    const enrResult = await saveEnrollment(currentEnrollment);

    const eventsToBeSaved = currentEvents
      .map((event) => {
        const updatedDataValues = event.dataValues.map((dataValue) => {
          if (dataValue.dataElement === IS_PREGNANT_ID && dataValue.value === "true") {
            return { ...dataValue, value: "" };
          }
          return dataValue;
        });

        return { ...event, dataValues: updatedDataValues };
      })
      .filter((event) => {
        return event.dataValues.some((dataValue) => dataValue.dataElement === IS_PREGNANT_ID && dataValue.value === "");
      });

    for (const event of eventsToBeSaved) {
      const eventResult = await saveEvent(event);
      if (eventResult.ok) {
        toast.success(t("eventSaved"), {
          position: "bottom-center",
          autoClose: 3000,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined
        });
        changeDataValue(event.event, IS_PREGNANT_ID, "");
      } else {
        setApiError({ eventResult });
      }
    }

    if (teiResult.ok && enrResult.ok) {
      toast.success(t("saved"), {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      });
      if (layout.layout === "layout2") {
        const result = await getTeiById(program.id, currentTei.trackedEntityInstance);
        initData(result, program.id, orgUnit.id);
        setLayout("layout", "layout3");
      }
      changeTeiProperty("lastSaved", new Date().toString());
    } else {
      setApiError({ teiResult, enrResult });
    }
    setLayout("profileFormEditing", false);
  };

  useEffect(() => {
    if (warningSex) {
      setHandlers("profileSave", saveCurrentTei);
    }
  }, [warningSex]);

  return [
    <DefaultProfile attributeProps={props} />,
    apiError && (
      <ErrorDialog
        error={JSON.stringify(apiError)}
        handleClose={() => {
          setApiError(null);
        }}
      />
    )
  ];
};

export default Profile;
