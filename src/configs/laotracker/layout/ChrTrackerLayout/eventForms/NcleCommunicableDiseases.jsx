import { useEffect, useState } from "react";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import { useTranslation } from "react-i18next";
import { pickExecutionDateLabel, pickTranslation } from "@/utils/utils";
import useChrTrackerStore from "../state";
import DataValueFieldNoBlurNoState from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlurNoState";
import DataValueLabelNoState from "@/ui/TrackerCapture/EventForm/DataValueLabelNoState";
import EventDateFieldNoState from "@/ui/TrackerCapture/EventForm/EventDateFieldNoState";
import EventDateLabelNoState from "@/ui/TrackerCapture/EventForm/EventDateLabelNoState";
import BloodPressureField from "../BloodPressureField/BloodPressureField";
import Row from "../Row";
import { useShallow } from "zustand/react/shallow";
import useAncRules from "./useAncRules";
import useMetadataStore from "@/state/metadata";
import useNcleCommunicableDiseasesRules from "./useNcleCommunicableDiseasesRules";
import { Input } from "@/ui/common";

const NcleCommunicableDiseases = () => {
  const { t, i18n } = useTranslation();
  const [tempMalariaValues, setTempMalariaValues] = useState({});

  const changeTempMalariaValue = (field, value) => {
    tempMalariaValues[field] = value;
    setTempMalariaValues({ ...tempMalariaValues });
  };

  const { dataElements } = useMetadataStore(
    useShallow((state) => ({
      dataElements: state.dataElements
    }))
  );
  const { event, actions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      actions: state.actions
    }))
  );

  const { currentEvent, currentProgramStage, editing, order } = event;
  const { changeDataValue, changeEventProperty, setEvent } = actions;
  const completed = currentEvent && currentEvent.status === "COMPLETED";
  const { disabledFields, hiddenSections, currDisplayingSymptoms, helpers, props } = useNcleCommunicableDiseasesRules();
  const finalSections = [
    ...currentProgramStage.programStageSections,
    {
      displayName: "Notification",
      id: "notification",
      dataElements: [],
      sections: [
        {
          title: "",
          fields: [
            {
              name: "Elimination area",
              type: "TRUE_ONLY"
            },
            {
              name: "Date of diagnosis",
              type: "DATE"
            },
            {
              name: "Date of notification",
              type: "DATE"
            },
            {
              name: "Date of investigation",
              type: "DATE"
            },
            {
              name: "Report from PPM",
              type: "TRUE_ONLY"
            },
            {
              name: "Report from VMW",
              type: "TRUE_ONLY"
            },
            {
              name: "Does the cases require a FOCI Response?",
              type: "TRUE_ONLY"
            }
          ]
        },
        {
          title: "SYMPTOMS",
          fields: [
            {
              name: "Date of onset of first symptoms",
              type: "DATE"
            }
          ]
        },
        {
          title: "DIAGNOSIS",
          fields: [
            {
              name: "Method of diagnosis",
              type: "TEXT",
              valueSet: [
                {
                  value: "PCD",
                  label: "Passive case detection (PCD)"
                },
                {
                  value: "ACD",
                  label: "Active case detection (ACD)"
                },
                {
                  value: "ProCD",
                  label: "ProActive case detection (ProCD)"
                },
                {
                  value: "RACD",
                  label: "Re-active case detection (RACD)"
                },
                {
                  value: "AFS",
                  label: "Active fever screening (AFS) "
                }
              ]
            },
            {
              name: "Type of diagnosis test used",
              type: "TEXT",
              valueSet: [
                {
                  value: "RDT",
                  label: "RDT"
                },
                {
                  value: "Microscopy",
                  label: "Microscopy"
                },
                {
                  value: "RDT and Microscopy",
                  label: "RDT & Microscopy"
                },
                {
                  value: "PCR",
                  label: "PCR"
                }
              ]
            },
            {
              name: "Test result",
              type: "TEXT",
              valueSet: [
                {
                  value: "PF",
                  label: "P. falciparum"
                },
                {
                  value: "PV",
                  label: "P. vivax"
                },
                {
                  value: "PO",
                  label: "P. ovalae"
                },
                {
                  value: "PM",
                  label: "P. malariae"
                },
                {
                  value: "PK",
                  label: "P. knowlesi"
                },
                {
                  value: "Mixed",
                  label: "Mixed"
                }
              ]
            },
            {
              name: "G6PD TEST CONDUCTED",
              type: "BOOLEAN"
            },
            {
              name: "Result of G6PD test",
              type: "TEXT"
            },
            {
              name: "Severe Malaria",
              type: "TRUE_ONLY"
            }
          ]
        },
        {
          title: "TREATMENT",
          fields: [
            {
              name: "AL",
              type: "TEXT",
              valueSet: [
                {
                  value: "ACT 6x1",
                  label: "ACT 6x1"
                },
                {
                  value: "ACT 6x2",
                  label: "ACT 6x2"
                },
                {
                  value: "ACT 6x3",
                  label: "ACT 6x3"
                },
                {
                  value: "ACT 6x4",
                  label: "ACT 6x4"
                },
                {
                  value: "No",
                  label: "Did provide ACT due to another reason"
                },
                {
                  value: "CI1",
                  label: "Did not provide ACT due have CI as pregnant"
                },
                {
                  value: "CI2",
                  label: "Did not provide ACT due patients with a history of seizures, major psychiatric disorders, or recent depression or anxiety"
                },
                {
                  value: "CI3",
                  label: "Did not provide ACT due children weighing less than 5 kg"
                },
                {
                  value: "CI4",
                  label: "Use other Medicine"
                }
              ]
            },
            {
              name: "PQ",
              type: "TEXT",
              valueSet: [
                {
                  value: "1",
                  label: "Prmaquine single dose"
                },
                {
                  value: "2",
                  label: "Prmaquine radical treatment (14 days)"
                },
                {
                  value: "3",
                  label: "Prmaquine (8 weeks)"
                },
                {
                  value: "4",
                  label: "Prmaquine radical treatment (7 days)"
                },
                {
                  value: "5",
                  label: "Did not provide PQ"
                },
                {
                  value: "PCI1",
                  label: "PQ is not available because the patient is pregnant or breastfeeding<6months"
                },
                {
                  value: "PCI2",
                  label: "PQ is not available because the patient is a child weighing less than 10 kg"
                },
                {
                  value: "PCI3",
                  label: "PQ is not available because the patient has Hb<8 or Hct<25%"
                },
                {
                  value: "PCI4",
                  label: "Use other Medicine"
                }
              ]
            },
            {
              name: "ASPY",
              type: "TEXT"
            },
            {
              name: "ASMQ",
              type: "TEXT"
            },
            {
              name: "Artesunate injection",
              type: "TEXT"
            },
            {
              name: "Quinine ເມັດ",
              type: "TEXT"
            },
            {
              name: "Chloroquine",
              type: "TEXT"
            },
            {
              name: "Paracetamol",
              type: "TEXT"
            },
            {
              name: "ORS",
              type: "TEXT"
            },
            {
              name: "Quinine ນ້ຳ",
              type: "TEXT"
            }
          ]
        },
        {
          title: "TEST RESULT",
          fields: [
            {
              name: "Transfer from VMW or HC",
              type: "TEXT"
            },
            {
              name: "Test Result",
              type: "TEXT"
            },
            {
              name: "Ethnic minority",
              type: "TEXT"
            }
          ]
        },
        {
          title: "DID THE PATIENT GO TO (NOT SLEEPING)",
          type: "checkboxes",
          fields: [
            {
              name: "1) Forest",
              type: "TRUE_ONLY"
            },
            {
              name: "2) Rice field",
              type: "TRUE_ONLY"
            },
            {
              name: "3) Casava field",
              type: "TRUE_ONLY"
            },
            {
              name: "4) Plantation",
              type: "TRUE_ONLY"
            },
            {
              name: "5) Land clearing",
              type: "TRUE_ONLY"
            },
            {
              name: "6) Hunting Animal",
              type: "TRUE_ONLY"
            },
            {
              name: "7) Fishing",
              type: "TRUE_ONLY"
            },
            {
              name: "8) Construction site",
              type: "TRUE_ONLY"
            },
            {
              name: "9) Different village",
              type: "TRUE_ONLY"
            },
            {
              name: "10) Other district",
              type: "TRUE_ONLY"
            },
            {
              name: "11) Socialize in the night time",
              type: "TRUE_ONLY"
            },
            {
              name: "12) Other place",
              type: "TRUE_ONLY"
            }
          ]
        },
        {
          title: "DID THE PATIENT SLEEP OVERNIGHT",
          type: "checkboxes",
          fields: [
            {
              name: "1) Forest.",
              type: "TRUE_ONLY"
            },
            {
              name: "2) Rice field.",
              type: "TRUE_ONLY"
            },
            {
              name: "3) Casava field.",
              type: "TRUE_ONLY"
            },
            {
              name: "4) Plantation.",
              type: "TRUE_ONLY"
            },
            {
              name: "5) Land clearing.",
              type: "TRUE_ONLY"
            },
            {
              name: "6) Hunting Animal.",
              type: "TRUE_ONLY"
            },
            {
              name: "7) Fishing.",
              type: "TRUE_ONLY"
            },
            {
              name: "8) Construction site.",
              type: "TRUE_ONLY"
            },
            {
              name: "9) Different village.",
              type: "TRUE_ONLY"
            },
            {
              name: "10) Other district.",
              type: "TRUE_ONLY"
            },
            {
              name: "11) Other place.",
              type: "TRUE_ONLY"
            }
          ]
        },
        {
          title: "",
          fields: [
            {
              name: "Sleep overnight name of the location",
              type: "TEXT"
            },
            {
              name: "Sleep overnight number",
              type: "TEXT"
            }
          ]
        }
      ]
    }
  ];

  useEffect(() => {
    let order = ["eventDate"];
    finalSections.forEach((pss) => {
      pss.dataElements.forEach((de) => {
        order.push(de.id);
      });
    });
    setEvent("order", order);
  }, []);

  const renderSection = (pss) => {
    if (pss.id === "oZPPUzgazm8") {
      return (
        <div className="ncle-symptoms-section">
          {currDisplayingSymptoms ? (
            pss.dataElements.map((de) => {
              if (currDisplayingSymptoms.includes(de.id)) {
                const index = order.findIndex((o) => o === de.id);
                if (de.id === "PRrmBVwmWRj") {
                  return (
                    <div className="ncle-symptoms-section-item">
                      <div style={{ display: "flex" }}>
                        {index + 1}.&nbsp;
                        <DataValueLabelNoState dataElement={de.id} currentProgramStage={currentProgramStage} />
                      </div>
                      &nbsp;
                      <div>
                        <DataValueFieldNoBlurNoState
                          helpers={helpers[de.id]}
                          disabled={!editing || completed || disabledFields.includes(de.id)}
                          dataElement={de.id}
                          currentProgramStage={currentProgramStage}
                          currentEvent={currentEvent}
                          change={(value) => {
                            changeDataValue(de.id, value);
                          }}
                          accept={(value) => {
                            changeDataValue(de.id, value);
                          }}
                          {...props[de.id]}
                        />
                      </div>
                    </div>
                  );
                } else {
                  const foundDataElement = dataElements.find((dataElement) => dataElement.id === de.id);
                  return (
                    <div className="ncle-symptoms-section-item">
                      <div>
                        <DataValueFieldNoBlurNoState
                          label={`${index + 1}. ${pickTranslation(foundDataElement, i18n.language, "formName")}`}
                          helpers={helpers[de.id]}
                          disabled={!editing || completed || disabledFields.includes(de.id)}
                          dataElement={de.id}
                          currentProgramStage={currentProgramStage}
                          currentEvent={currentEvent}
                          change={(value) => {
                            changeDataValue(de.id, value);
                          }}
                          accept={(value) => {
                            changeDataValue(de.id, value);
                          }}
                          {...props[de.id]}
                        />
                      </div>
                      {/* <div style={{ display: "flex" }}>
                        {index + 1}.&nbsp;
                        <DataValueLabelNoState dataElement={de.id} currentProgramStage={currentProgramStage} />
                      </div> */}
                    </div>
                  );
                }
              }
            })
          ) : (
            <div style={{ color: "#000", margin: "10px 10px" }}>{"Please select Disease name"}</div>
          )}
        </div>
      );
    } else if (pss.id === "notification") {
      return (
        <div className="ncle-tracker-malaria-notification-container">
          {pss.sections.map((section) => {
            const elements = [];
            let tileElement = null;
            if (section.title) {
              tileElement = <div className="ncle-tracker-malaria-sub-section-title">{section.title.toUpperCase()}</div>;
            }
            section.fields.forEach((field) => {
              if (section.type && section.type === "checkboxes") {
                elements.push(
                  <div style={{ padding: 5 }}>
                    <Input
                      label={field.name}
                      valueType={field.type}
                      valueSet={field.valueSet}
                      value={tempMalariaValues[field.name]}
                      change={(value) => {
                        changeTempMalariaValue(field.name, value);
                      }}
                    />
                  </div>
                );
              } else {
                elements.push(
                  <Row
                    label={field.name}
                    field={
                      <Input
                        valueType={field.type}
                        valueSet={field.valueSet}
                        value={tempMalariaValues[field.name]}
                        change={(value) => {
                          changeTempMalariaValue(field.name, value);
                        }}
                      />
                    }
                  />
                );
              }
            });
            let fieldContainerClassName = "";
            if (section.title === "TREATMENT") {
              fieldContainerClassName = "ncle-tracker-malaria-grid-2";
            }
            if (section.title === "DID THE PATIENT GO TO (NOT SLEEPING)" || section.title === "DID THE PATIENT SLEEP OVERNIGHT") {
              fieldContainerClassName = "ncle-tracker-malaria-grid-3";
            }
            return (
              <div className={`ncle-tracker-malaria-sub-section-container `}>
                {tileElement}
                <div className={fieldContainerClassName}>{elements}</div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return pss.dataElements.map((de) => {
        const index = order.findIndex((o) => o === de.id);
        return (
          <Row
            label={
              <div style={{ display: "flex" }}>
                {index + 1}.&nbsp;
                <DataValueLabelNoState dataElement={de.id} currentProgramStage={currentProgramStage} />
              </div>
            }
            field={
              <DataValueFieldNoBlurNoState
                helpers={helpers[de.id]}
                disabled={!editing || completed || disabledFields.includes(de.id)}
                dataElement={de.id}
                currentProgramStage={currentProgramStage}
                currentEvent={currentEvent}
                change={(value) => {
                  changeDataValue(de.id, value);
                }}
                accept={(value) => {
                  changeDataValue(de.id, value);
                }}
                {...props[de.id]}
              />
            }
          />
        );
      });
    }
  };

  const generateSections = () => {
    return finalSections.map((pss, index) => {
      if (hiddenSections.includes(pss.id)) {
        return null;
      }
      return (
        <div className="ancpnc-section-container">
          <div>{pss.displayName}</div>
          {index === 0 && (
            <Row
              label={
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "center"
                  }}
                >
                  1.&nbsp;
                  <EventDateLabelNoState type="eventDate" currentProgramStage={currentProgramStage} />
                </div>
              }
              field={
                <EventDateFieldNoState
                  accept={(value) => {
                    changeEventProperty("eventDate", value);
                    changeEventProperty("dueDate", value);
                  }}
                  disabled={!editing || completed}
                  currentEvent={currentEvent}
                />
              }
            />
          )}
          {renderSection(pss)}
        </div>
      );
    });
  };

  return (
    <div className="ancpnc-anc-container">
      {currentEvent.eventDate && generateSections()}
      {!currentEvent.eventDate && (
        <Row
          label={pickExecutionDateLabel(currentProgramStage, t)}
          field={
            <EventDateFieldNoState
              disabled={!editing || completed}
              currentEvent={currentEvent}
              currentProgramStage={currentProgramStage}
              accept={(value) => {
                changeEventProperty("eventDate", value);
              }}
            />
          }
        />
      )}
    </div>
  );
};

export default NcleCommunicableDiseases;
