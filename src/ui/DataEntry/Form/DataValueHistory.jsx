import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidFaStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regFaStar } from "@fortawesome/free-regular-svg-icons";
import { Loader } from "@/ui/common";
import _, { set } from "lodash";
import { dataValue } from "@/api";
import { useTranslation } from "react-i18next";
import moment from "moment";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { returnHistoryPeriodArray } from "@/utils/utils";
const {
  getDataValueAudits,
  getSingleDataValue,
  getMinMaxDataElement,
  saveMinMaxDataElement,
} = dataValue;
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);
const DataValueHistory = ({
  setOpenHistory,
  foundDe,
  foundCoc,
  currentOrgUnit,
  dataSet,
  attributeOptionCombo,
  period,
  currentDataValue,
  setDataValueCommentAndFollowUp,
  saveDataValue,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState("1");
  const [chartData, setChartData] = useState(null);
  const [auditData, setAuditData] = useState(null);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [average, setAverage] = useState(0);
  const [comment, setComment] = useState(
    currentDataValue ? currentDataValue.comment : null
  );
  const [saved, setSaved] = useState(false);
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };
  const returnAuditValue = (resultAudit, arrAudit) => {
    resultAudit.forEach((audit) => {
      if (
        audit.organisationUnit.id === currentOrgUnit &&
        foundDe.id === audit.dataElement.id &&
        foundCoc.id === audit.categoryOptionCombo.id &&
        attributeOptionCombo.id === audit.attributeOptionCombo.id &&
        period === audit.period.id
      ) {
        let object = {
          on: moment(audit.created).format("YYYY-MM-DD HH:MM"),
          modifyBy: audit.modifiedBy,
          value: audit.value,
          modification: audit.auditType,
        };
        arrAudit.push(object);
      }
    });
    return arrAudit;
  };

  const returnAverageValue = (results) => {
    results = results.filter((val) => val[0] > 0);
    if (results.length > 0) {
      let total = 0;
      results.forEach((e) => {
        total += e * 1;
      });
      return parseFloat(total / results.length).toFixed(1);
    } else {
      return 0;
    }
  };

  const getChartDataValue = async (monthlyArray, min, max) => {
    const results = await Promise.all(
      monthlyArray.map((pe) => {
        return getSingleDataValue(
          dataSet.id,
          foundDe.id,
          currentOrgUnit,
          foundCoc.id,
          pe.value,
          attributeOptionCombo
        );
      })
    );
    setAverage(returnAverageValue(results));
    const labels = monthlyArray.map((pe) => pe.label);
    const data = {
      labels,
      datasets: [],
    };
    if (min) {
      data.datasets.push({
        type: "line",
        label: "Min",
        data: results.map((val) => {
          return min;
        }),
        borderColor: "#E9967A",
        backgroundColor: "#E9967A",
      });
    }
    if (max) {
      data.datasets.push({
        type: "line",
        label: "Max",
        data: results.map((val) => {
          return max;
        }),
        borderColor: "#2c6693",
        backgroundColor: "#2c6693",
      });
    }
    data.datasets.push({
      type: "bar",
      label: t("value"),
      data: results.map((val) => val[0]),
      backgroundColor: "#88be3b",
    });
    return data;
  };

  const updateChartDataValue = (type) => {
    if ((min * 1 <= max * 1 && min && max) || type === "remove") {
      const findBarValue = chartData.datasets.find((e) => e.type === "bar");
      chartData.datasets = [];
      if (min && type !== "remove") {
        chartData.datasets.push({
          type: "line",
          label: "Min",
          data: findBarValue.data.map((val) => {
            return min;
          }),
          borderColor: "#E9967A",
          backgroundColor: "#E9967A",
        });
      }
      if (max && type !== "remove") {
        chartData.datasets.push({
          type: "line",
          label: "Max",
          data: findBarValue.data.map((val) => {
            return max;
          }),
          borderColor: "#2c6693",
          backgroundColor: "#2c6693",
        });
      }
      chartData.datasets.push(findBarValue);
      setChartData({ ...chartData });
    }
  };

  const getMinMaxValue = async () => {
    const result = await getMinMaxDataElement(
      foundDe.id,
      currentOrgUnit,
      foundCoc.id
    );
    if (result.minMaxDataElements) {
      if (result.minMaxDataElements.length > 0) {
        return {
          min: result.minMaxDataElements[0].min,
          max: result.minMaxDataElements[0].max,
        };
      } else {
        return { min: null, max: null };
      }
    } else {
      return { min: null, max: null };
    }
  };

  const onSaveMinMax = async (type) => {
    if (min && max) {
      let object = {
        min: min,
        generated: false,
        max: max,
        dataElement: {
          id: foundDe.id,
        },
        source: {
          id: currentOrgUnit,
        },
        optionCombo: {
          id: foundCoc.id,
        },
      };
      if (type === "remove") {
        const result = await saveMinMaxDataElement(object, "DELETE");
      } else {
        if (min * 1 <= max * 1) {
          const result = await saveMinMaxDataElement(object);
        }
      }
    }
  };

  useEffect(() => {
    (async () => {
      const resultAudit = await getDataValueAudits(
        dataSet.id,
        foundDe.id,
        currentOrgUnit,
        foundCoc.id
      );
      let arrAudit = [];
      arrAudit = returnAuditValue(resultAudit, arrAudit);
      const periodArray = returnHistoryPeriodArray(period);
      const minMaxValue = await getMinMaxValue();
      const chartDataValue = await getChartDataValue(
        periodArray,
        minMaxValue.min,
        minMaxValue.max
      );
      setMin(minMaxValue.min);
      setMax(minMaxValue.max);
      setAuditData(arrAudit);
      setChartData(chartDataValue);
      setLoading(false);
    })();
  }, []);

  const onChangeFollowUp = async (status) => {
    setDataValueCommentAndFollowUp(
      foundDe.id,
      foundCoc.id,
      currentOrgUnit,
      status,
      currentDataValue.comment
    );
    const result = await saveDataValue(
      dataSet.id,
      currentOrgUnit,
      period,
      foundDe.id,
      foundCoc.id,
      currentDataValue.value ? currentDataValue.value : "",
      attributeOptionCombo,
      status,
      currentDataValue.comment
    );
  };

  return (
    <Dialog
      open={true}
      scroll={"paper"}
      fullWidth={true}
      maxWidth={"lg"}
      onClose={() => {
        setOpenHistory(false);
      }}
    >
      {loading ? (
        <div style={{ height: "120px" }}>
          <Loader />
        </div>
      ) : (
        <>
          <DialogTitle>
            <div style={{ display: "flex" }}>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h7" component="div">
                {foundDe
                  ? `${foundDe.displayFormName} - ${
                      foundCoc ? foundCoc.displayName : ""
                    }`
                  : ""}
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  setOpenHistory(false);
                }}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ width: "100%", height: "500px" }}>
              <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleChangeTab}>
                    <Tab label={t("dataElementHistory")} value="1" />
                    <Tab label={t("auditTrail")} value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div style={{ height: "400px", width: "100%" }}>
                    <Chart type="bar" options={options} data={chartData} />
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  {auditData && auditData.length > 0 ? (
                    <TableContainer
                      component={Paper}
                      style={{ height: "400px" }}
                    >
                      <Table
                        stickyHeader
                        sx={{ minWidth: 650 }}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">{t("on")}</TableCell>
                            <TableCell align="left">
                              {t("modifiedBy")}
                            </TableCell>
                            <TableCell align="left">{t("value")}</TableCell>
                            <TableCell align="left">
                              {t("modification")}
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {auditData.map((val) => {
                            return (
                              <TableRow
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="left">{val.on}</TableCell>
                                <TableCell align="left">
                                  {val.modifyBy}
                                </TableCell>
                                <TableCell align="left">{val.value}</TableCell>
                                <TableCell align="left">
                                  {val.modification}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    t("auditTrailNotFound")
                  )}
                </TabPanel>
              </TabContext>
            </Box>
            <Divider variant="middle" />
            <Box
              sx={{
                display: "flex",
                width: "100%",
                paddingLeft: "20px",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  width: "50%",
                }}
              >
                <div
                  style={{
                    color: "#606060",
                    paddingBottom: "10px",
                  }}
                >
                  <b>{t("comment")}</b>{" "}
                  {currentDataValue && currentDataValue.followUp ? (
                    <FontAwesomeIcon
                      size="lg"
                      icon={solidFaStar}
                      style={{ color: "#FDDA0D" }}
                      onClick={async () => {
                        await onChangeFollowUp(false);
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      size="lg"
                      icon={regFaStar}
                      onClick={async () => {
                        await onChangeFollowUp(true);
                      }}
                    />
                  )}
                </div>
                <div>
                  <TextField
                    multiline
                    rows={5}
                    value={comment}
                    onChange={(e) => {
                      setSaved(false);
                      setComment(e.target.value);
                    }}
                    sx={{
                      div: {
                        backgroundColor: saved ? "#c9ffb3" : "none",
                      },
                    }}
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
                <div
                  style={{
                    paddingTop: "10px",
                    textAlignLast: "right",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={async () => {
                      setDataValueCommentAndFollowUp(
                        foundDe.id,
                        foundCoc.id,
                        currentOrgUnit,
                        currentDataValue.followUp,
                        comment
                      );
                      const result = await saveDataValue(
                        dataSet.id,
                        currentOrgUnit,
                        period,
                        foundDe.id,
                        foundCoc.id,
                        currentDataValue.value ? currentDataValue.value : "",
                        attributeOptionCombo,
                        currentDataValue.followUp,
                        comment
                      );
                      if (result.ok) {
                        setSaved(true);
                      }
                    }}
                  >
                    {t("saveComment")}
                  </Button>
                </div>
              </div>
              <Divider orientation="vertical" flexItem />
              <div
                style={{
                  padding: "10px",
                  width: "50%",
                }}
              >
                <div style={{ color: "#606060", paddingBottom: "10px" }}>
                  <b>{t("minMaxLimits")}</b>
                </div>
                <div style={{ paddingBottom: "20px" }}>
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 2, sm: 8, md: 12 }}
                  >
                    <Grid item xs={2} sm={4} md={4}>
                      <TextField
                        size="small"
                        label={t("min")}
                        value={min ? min : ""}
                        onChange={(e) => {
                          setMin(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                      <TextField
                        size="small"
                        label={t("max")}
                        value={max ? max : ""}
                        error={min * 1 > max * 1 ? true : false}
                        helperText={min * 1 > max * 1 ? t("minMaxError") : ""}
                        onChange={(e) => {
                          setMax(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                      <TextField
                        size="small"
                        label={t("average")}
                        defaultValue={average}
                        disabled={true}
                      />
                    </Grid>
                  </Grid>
                </div>
                <div
                  style={{
                    display: "flex",
                    paddingBottom: "20px",
                    justifyContent: "end",
                  }}
                >
                  <div style={{ paddingRight: "10px" }}>
                    <Button
                      variant="contained"
                      style={{ width: "90px" }}
                      onClick={async () => {
                        updateChartDataValue();
                        await onSaveMinMax();
                      }}
                    >
                      {t("save")}
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      style={{ width: "90px" }}
                      color="error"
                      onClick={async () => {
                        setMin(null);
                        setMax(null);
                        updateChartDataValue("remove");
                        await onSaveMinMax("remove");
                      }}
                    >
                      {t("remove")}
                    </Button>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    paddingBottom: "10px",
                    justifyContent: "end",
                  }}
                >
                  <div style={{ paddingRight: "10px" }}>{t("storedBy")}:</div>
                  <div>
                    {currentDataValue ? (
                      currentDataValue.storedBy ? (
                        <b>{currentDataValue.storedBy}</b>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <div style={{ paddingRight: "10px" }}>
                    {t("lastUpdated")}:
                  </div>
                  <div>
                    {currentDataValue ? (
                      currentDataValue.lastUpdated ? (
                        <b>
                          {moment(currentDataValue.lastUpdated).format(
                            "YYYY-MM-DD"
                          )}
                        </b>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default DataValueHistory;
