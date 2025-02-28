import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import { Typography } from "@mui/material";
import { Input } from "@/ui/common";
import "./ClientHealthIdField.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ClientHealthIdField = ({ disabled, value, change }) => {
  const { t } = useTranslation();
  const [dob, setDob] = useState("");
  const [sex, setSex] = useState("");
  const [num, setNum] = useState("");

  const changeValue = (type, value) => {
    let newValue = value.replace(/[a-zA-Z]/g, "");
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
    }
  }, [value]);

  useEffect(() => {
    if ([dob, sex, num].join("-") === "--") {
      change([dob, sex, num].join(""));
    } else {
      change([dob, sex, num].join("-"));
    }
  }, [dob, sex, num]);

  return (
    <div className="client-health-id-field-container ">
      <AttributeLabel attribute="oPKsfqS64oE" />
      <div className="client-health-id-fields">
        <Input
          disabled={disabled}
          value={dob}
          valueType="TEXT"
          change={(value) => {
            changeValue("dob", value);
          }}
        />
        <div className="client-health-id-seperator">-</div>
        <Input
          disabled={disabled}
          value={sex}
          valueType="TEXT"
          change={(value) => {
            changeValue("sex", value);
          }}
        />
        <div className="client-health-id-seperator">-</div>
        <Input
          disabled={disabled}
          value={num}
          valueType="TEXT"
          change={(value) => {
            changeValue("num", value);
          }}
        />
      </div>
      <div className="client-health-id-field-helper">
        <Typography variant="HELPER">{t("healthIdSearchHelper")}</Typography>
      </div>
    </div>
  );
};

export default ClientHealthIdField;
