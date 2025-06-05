//client health id field
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import { Typography } from "@mui/material";
import { Input } from "@/ui/common";
import "./SelectorClientHealthIdField.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import { isValid } from "date-fns";

const SelectorClientHealthIdField = ({ disabled, value, change }) => {
  const { t } = useTranslation();
  const [dob, setDob] = useState("");
  const [sex, setSex] = useState("");
  const [num, setNum] = useState("");
  const program = useSelectionStore((state) => state.program);
  const womenPrograms = ["vqNgkw4gfw7", "fflLsS1lm3g", "AyPkCOMmgdd", "u1Na9wCGY6d"];

  useEffect(() => {
    if (womenPrograms.includes(program.id)) {
      if (!sex || sex === "1") {
        console.log("ahjsdgajdgahs");
        setTimeout(() => {
          setSex("2");
        }, 50);
      }
    }
  }, [sex]);

  const changeValue = (type, value) => {
    let newValue = value.replace(/[a-zA-Z]/g, "");
    const splitted = newValue.split("-");
    if (splitted.length === 3) {
      if (splitted[0].length === 8 && splitted[1].length === 1 && (splitted[2].length === 4 || splitted[2].length === 3)) {
        setDob(splitted[0]);
        setSex(splitted[1]);
        setNum(splitted[2]);
      }
    }
    switch (type) {
      case "dob":
        if (newValue.length > 8) newValue = newValue.slice(0, 8);
        setDob(newValue);
        break;
      case "sex":
        if (newValue.length > 1) newValue = newValue.slice(0, 1);
        setSex(newValue);
        break;
      case "num":
        if (newValue.length > 4) newValue = newValue.slice(0, 4);
        setNum(newValue);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (!value) {
      setDob("");
      setSex("");
      setNum("");
    } else {
      const splitted = value.split("-");
      setDob(splitted[0]);
      setSex(splitted[1]);
      setNum(splitted[2]);
    }
  }, [value]);

  useEffect(() => {
    if ([dob, sex, num].join("-") === "--") {
      change([dob, sex, num].join(""));
    } else {
      change([dob, sex, num].join("-"));
    }
  }, [dob, sex, num]);
  let formattedDob = "";
  if (dob) {
    const day = dob.substring(0, 2);
    const month = dob.substring(2, 4);
    const year = dob.substring(4, 8);
    formattedDob = year + "-" + month + "-" + day;
    if (!isValid(new Date(formattedDob))) {
      formattedDob = "";
    }
  } else {
    formattedDob = "";
  }

  return (
    <div className="client-health-id-field-container ">
      {/* <AttributeLabel attribute="oPKsfqS64oE" clas /> */}
      <div className="client-health-id-selector-fields">
        <div className="client-health-id-row">
          <div style={{ width: 210 }}>{t("dob")}</div>
          <div style={{ width: 210 }}>
            <Input
              customDateFormat="ddMMyyyy"
              disabled={disabled}
              value={formattedDob}
              valueType="DATE"
              accept={(value) => {
                if (value) {
                  let splitted = value.split("-");
                  let formatted = splitted[2] + splitted[1] + splitted[0];
                  changeValue("dob", formatted);
                } else {
                  changeValue("dob", "");
                }
              }}
            />
          </div>
        </div>
        <div className="client-health-id-row">
          <div style={{ width: 210 }}>{t("sex")}</div>
          <div style={{ width: 210 }}>
            <Input
              disabled={disabled}
              value={sex}
              valueType="TEXT"
              valueSet={[
                {
                  value: "1",
                  label: t("male")
                },
                {
                  value: "2",
                  label: t("female")
                }
              ]}
              change={(value) => {
                changeValue("sex", value);
              }}
            />
          </div>
        </div>
        <div className="client-health-id-row">
          <div style={{ width: 210 }}>{t("last4Digits")}</div>
          <div style={{ width: 210 }}>
            <Input
              disabled={disabled}
              value={num}
              valueType="TEXT"
              change={(value) => {
                changeValue("num", value);
              }}
            />
          </div>
        </div>
      </div>
      {/* <div className="client-health-id-field-helper">
        <Typography variant="HELPER">{t("healthIdSearchHelper")}</Typography>
      </div> */}
    </div>
  );
};

export default SelectorClientHealthIdField;
