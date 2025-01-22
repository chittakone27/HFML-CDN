import React, { useState, useEffect } from "react";
import { Input } from "..";

const Cascader = ({ data, change, disabled, ...rest }) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const { initValues } = data;
    initValues.forEach((value, index) => {
      const currentValueSet = index === 0 ? data.data : selected[index - 1] ? selected[index - 1].children : [];
      const found = currentValueSet.find((set) => set.value === value);
      if (found) {
        selected[index] = found;
      } else {
        selected[index] = "";
      }
    });
    setSelected([...selected]);
  }, [JSON.stringify(data.initValues)]);
  return data.labels.map((label, index) => {
    const currentValueSet = index === 0 ? data.data : selected[index - 1] ? selected[index - 1].children : [];
    return (
      <div style={{ marginBottom: 5, width: "100%" }} className="cascader-item">
        {label}
        <Input
          mandatory={data.mandatoryFields ? data.mandatoryFields.includes(label) : false}
          value={selected[index] ? selected[index].value : ""}
          // label={label}
          disabled={disabled}
          valueSet={currentValueSet}
          change={(value) => {
            const found = currentValueSet.find((set) => set.value === value);
            selected[index] = found;
            for (let i = data.labels.length - 1; i > index; i--) {
              selected[i] = null;
            }
            setSelected([...selected]);
            change([...selected]);
          }}
          {...rest}
        />
      </div>
    );
  });
};
export default Cascader;
