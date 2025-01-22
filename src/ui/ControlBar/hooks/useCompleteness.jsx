import useDataEntryStore from "@/state/dataEntry";
import useEventCaptureStore from "@/state/eventCapture";
import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";
import { shallow } from "zustand/shallow";
import moment from "moment";
import { completeness } from "@/api";
const { postCompleteness } = completeness;

const useCompleteness = () => {
  const dataEntryCompleteness = useDataEntryStore((state) => state.completeness);
  const dataEntryActions = useDataEntryStore((state) => state.actions);
  const eventCaptureCompleteness = useEventCaptureStore((state) => state.completeness);
  const eventCaptureActions = useEventCaptureStore((state) => state.actions);

  const { program, dataSet, orgUnit, period, attributeOptionCombo } = useSelectionStore(
    (state) => ({
      program: state.program,
      dataSet: state.dataSet,
      orgUnit: state.orgUnit,
      period: state.period,
      attributeOptionCombo: state.attributeOptionCombo
    }),
    shallow
  );
  const me = useMetadataStore((state) => state.me);
  let completeness;
  let completenessDataSet;
  let mode;
  if (program) {
    completeness = eventCaptureCompleteness;
    completenessDataSet = program.dataSet;
    mode = "eventCapture";
  } else if (dataSet) {
    completeness = dataEntryCompleteness;
    completenessDataSet = dataSet;
    mode = "dataEntry";
  } else {
    completeness = null;
    completenessDataSet = null;
  }

  return {
    completeness,
    complete: async () => {
      let cc, cp;
      if (attributeOptionCombo && !attributeOptionCombo.isDefault) {
        cc = attributeOptionCombo.categoryCombo;
        cp = attributeOptionCombo.categoryOptions.map((co) => co.id).join(";");
      }
      if (completeness) {
        const completenessObject = {
          dataSet: completenessDataSet.id,
          period: period.dhis2Period,
          organisationUnit: orgUnit.id,
          completed: false
        };
        if (cc && cp) {
          completenessObject.cc = cc;
          completenessObject.cp = cp;
        }
        mode === "eventCapture" ? eventCaptureActions.setCompleteness(null) : dataEntryActions.setCompleteness(null);
        return await postCompleteness({
          completeDataSetRegistrations: [completenessObject]
        });
      } else {
        const completenessObject = {
          dataSet: completenessDataSet.id,
          period: period.dhis2Period,
          organisationUnit: orgUnit.id,
          completed: true,
          date: moment().format("YYYY-MM-DD"),
          storedBy: me.userCredentials.username
        };
        if (cc && cp) {
          completenessObject.cc = cc;
          completenessObject.cp = cp;
        }
        mode === "eventCapture" ? eventCaptureActions.setCompleteness(completenessObject) : dataEntryActions.setCompleteness(completenessObject);
        return await postCompleteness({
          completeDataSetRegistrations: [completenessObject]
        });
      }
    }
  };
};

export default useCompleteness;
