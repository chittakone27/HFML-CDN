//cvid field.jsx
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import { Typography } from "@mui/material";
import { Input } from "@/ui/common";
import "./CvidField.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const CvidField = ({ disabled, value, change }) => {
  const { t } = useTranslation();
  const [hfId, setHfId] = useState("");
  const [char, setChar] = useState("");
  const [num, setNum] = useState("");

  const changeValue = (type, newValue) => {
    const splitted = newValue.split("-");
    if (splitted.length === 3) {
      if (splitted[0].length === 5 && splitted[1].length === 1 && splitted[2].length === 5) {
        setHfId(splitted[0]);
        setChar(splitted[1]);
        setNum(splitted[2]);
      }
    }

    switch (type) {
      case "hfId":
        if (newValue.length > 5) newValue = newValue.slice(0, 5);
        setHfId(newValue);
        break;
      case "char":
        if (newValue.length > 1) newValue = newValue.slice(0, 1);
        setChar(newValue);
        break;
      case "num":
        if (newValue.length > 5) newValue = newValue.slice(0, 5);
        setNum(newValue);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (!value) {
      setHfId("");
      setChar("");
      setNum("");
    }
  }, [value]);

  useEffect(() => {
    if ([hfId, char, num].join("-") === "--") {
      change([hfId, char, num].join(""));
    } else {
      change([hfId, char, num].join("-"));
    }
  }, [hfId, char, num]);

  return (
    <div className="cvid-field-container">
      <AttributeLabel attribute="corXnplgfQ7" />
      <div className="cvid-fields">
        <Input
          disabled={disabled}
          value={hfId}
          valueType="TEXT"
          change={(value) => {
            changeValue("hfId", value);
          }}
        />
        <div className="client-health-id-seperator">-</div>
        <Input
          disabled={disabled}
          value={char}
          valueType="TEXT"
          change={(value) => {
            changeValue("char", value);
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
        <Typography variant="HELPER">{t("cvidSearchHelper")}</Typography>
      </div>
    </div>
  );
};

export default CvidField;
