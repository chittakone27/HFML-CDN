import { useEffect } from "react";
import { Loader } from "../common";
import ControlBar from "../ControlBar/ControlBar";
import { useTranslation } from "react-i18next";
import HeaderBar from "../HeaderBar/HeaderBar";
import EventCapture from "../EventCapture/EventCapture";
import DataEntry from "../DataEntry/DataEntry";
import TrackerCapture from "../TrackerCapture/TrackerCapture";
import { shallow } from "zustand/shallow";
import useSelectionStore from "@/state/selection";
import useInitialization from "@/hooks/useInitialization";
import useCustomLocales from "@/hooks/useCustomLocales";
import "react-grid-layout/css/styles.css";
import "./App.css";
import configs from "@/configs";
import useMetadataStore from "@/state/metadata";
const { VITE_CONFIG_NAME } = import.meta.env;
const { hooks } = configs[VITE_CONFIG_NAME];

const App = () => {
  useCustomLocales();
  const ready = useInitialization();
  const { t } = useTranslation();
  const percent = useMetadataStore((state) => state.percent);
  const { program, dataSet, orgUnit, period, attributeOptionCombo } = useSelectionStore(
    (state) => ({
      orgUnit: state.orgUnit,
      program: state.program,
      dataSet: state.dataSet,
      period: state.period,
      attributeOptionCombo: state.attributeOptionCombo
    }),
    shallow
  );

  hooks.forEach((hook) => {
    hook(ready);
  });

  const renderContent = () => {
    if (orgUnit) {
      if (program) {
        if (!program.registration) {
          if (program.periodType) {
            if (period.dhis2Period) {
              return <EventCapture />;
            }
          } else {
            return <EventCapture />;
          }
        } else {
          return <TrackerCapture />;
        }
      }
      if (dataSet && period && period.dhis2Period) {
        if (dataSet.hasAttributeCombo) {
          if (attributeOptionCombo) {
            return <DataEntry />;
          }
        } else {
          return <DataEntry />;
        }
      }
    }
  };
  return (
    <div className="App">
      <HeaderBar />
      {ready ? (
        <>
          <ControlBar />
          <div className="app-content">{renderContent()}</div>
        </>
      ) : (
        <Loader type="fullscreen">
          {t("initializing")} ... {percent}%
        </Loader>
      )}
    </div>
  );
};

export default App;
