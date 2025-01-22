import { Box, Table, TableBody } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  withRules,
  RowMapper,
  withEventDate,
  SectionCollapse,
} from "@/configs/lao/program-forms/common/tracker";
import useImmunizationRule from "./useImmunizationRule";
import "../eir.css";

const Immunization = () => {
  const { t } = useTranslation();
  useImmunizationRule();

  return (
    <Box className="eir-form">
      <SectionCollapse title={t("immunization")} disabledCollapse>
        <Table>
          <TableBody>
            <RowMapper
              rows={dataElementConfigs}
              tableName="immunization"
              context="event"
            />
          </TableBody>
        </Table>
      </SectionCollapse>
    </Box>
  );
};

const dataElementConfigs = [
  [{ id: "jzT9g1EzJLd" }],
  [{ id: "u9lncRQaojO" }],
  [{ id: "DxOqZZgVQhF" }],
  [{ id: "MV1yoC7BfnG" }],
  [{ id: "G9kw7qj1duL" }],
  [{ id: "O8drIFUt4j8" }],
  [{ id: "qyJMInEjWtJ" }],
  // [{ id: "kI35yRT54NZ" }],
  [{ id: "TFIM3NzVlzn" }],
  [{ id: "UFRm7xWmxSA" }],
  [{ id: "uQ6miuyuEle" }],
  // [{ id: "u6ioEgMJf8j" }],
  [{ id: "eb5xGUCIGw3" }],
  [{ id: "aiFYpVd6Vle" }],
  [{ id: "x1aaFGkMUtF" }],
  [{ id: "wQNvIFAlWdA" }],
  [{ id: "TvfJjKrHq7m" }],
  [{ id: "TXdcfWEjnCG" }],
  [{ id: "Ln2xC7zuEpr" }],
  [{ id: "E4YaV9wahBu" }],
  [{ id: "EdCjK8sy4WH" }],
  [{ id: "n6rveUjp5h1" }],
  [{ id: "qrZ2UmofOdm" }],
];

export default withEventDate(withRules(Immunization));
