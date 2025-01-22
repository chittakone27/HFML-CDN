import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import { TableRow, TableCell, Box, Table, TableBody } from "@mui/material";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";
import { pull } from "@/utils/fetch";
import moment from "moment";
import { withRules } from "@/configs/lao/program-forms/common/tracker";
import { useTranslation } from "react-i18next";

const attributes = [
  "JcnE7Q4z7nD",
  "IEE2BMhfoSc",
  "IBLkiaYRRL3",
  "tQeFLjYbqzv",
  "DmuazFb368B"
];

const Profile = () => {
  const { t } = useTranslation();
  const { data, actions } = useTrackerCaptureStore(
    (state) => ({ data: state.data, actions: state.actions }),
    shallow
  );
  const { changeAttributeValue } = actions;
  const { currentTei } = data;

  const props = {
    JcnE7Q4z7nD: {
      disabled: true,
      helpers: [
        {
          type: "HELPER",
          value: t("childUniqueIdWarning")
        }
      ]
    }
  };

  const checkDuplicateChildUniqueId = async (childId) => {
    let flag = true;
    while (flag) {
      const result = await pull(
        `/api/trackedEntityInstances.json?filter=JcnE7Q4z7nD:EQ:${childId}&program=AQBx2QVBvRH&ou=IWp9dQGM0bS&ouMode=DESCENDANTS&skipPaging=true&fields=trackedEntityInstance`
      );
      if (result.trackedEntityInstances.length > 0) {
        if (
          result.trackedEntityInstances[0].trackedEntityInstance !==
          currentTei.trackedEntityInstance
        ) {
          const randomNumber = generateRandomNumber();
          childId = `${childId.split("-")[0]}-${
            childId.split("-")[1]
          }-${randomNumber.join("")}`;
        } else {
          flag = false;
        }
      } else {
        flag = false;
      }
    }
    return childId;
  };

  const generateRandomNumber = () => {
    return [
      Math.floor(Math.random() * (9 - 0 + 1)) + 0,
      Math.floor(Math.random() * (9 - 0 + 1)) + 0,
      Math.floor(Math.random() * (9 - 0 + 1)) + 0
      // Math.floor(Math.random() * (9 - 0 + 1)) + 0,
      // Math.floor(Math.random() * (9 - 0 + 1)) + 0
    ];
  };

  const getAttributeObj = (attrId) => {
    return currentTei.attributes.find((e) => e.attribute === attrId)?.value;
  };

  const assignDayMonthYearValues = () => {
    const doB = getAttributeObj("tQeFLjYbqzv");
    const currDate = new Date();
    const teiBirthDate = new Date(doB);
    const diff = new Date(currDate.getTime() - teiBirthDate.getTime());
    const yearsDiff = diff.getUTCFullYear() - 1970;
    const monthsDiff = diff.getUTCMonth();
    const daysDiff = diff.getUTCDate() - 1;
    changeAttributeValue("T8xe9C3YG6Y", yearsDiff);
    changeAttributeValue("z5Bijn7JZVz", monthsDiff);
    changeAttributeValue("gj2fFDnXr5j", daysDiff);
  };

  useEffect(() => {
    assignDayMonthYearValues();
  }, [JSON.stringify(currentTei.attributes)]);

  useEffect(() => {
    (async () => {
      const currentUniqueId = currentTei.attributes.find(
        (e) => e.attribute === "JcnE7Q4z7nD"
      )?.value;
      const dob = currentTei.attributes.find(
        (e) => e.attribute === "tQeFLjYbqzv"
      )?.value;
      const sex = currentTei.attributes.find(
        (e) => e.attribute === "DmuazFb368B"
      )?.value;
      if (dob && sex) {
        if (currentUniqueId) {
          const generatedNumber = currentUniqueId.split("-")[2];
          const childUniqueId = await checkDuplicateChildUniqueId(
            `${moment(dob).format("DDMMYYYY")}-${
              sex === "M" ? "1" : "2"
            }-${generatedNumber}`
          );
          if (childUniqueId !== currentUniqueId) {
            changeAttributeValue("JcnE7Q4z7nD", childUniqueId);
          }
        } else {
          const randomNumber = generateRandomNumber();
          const childUniqueId = await checkDuplicateChildUniqueId(
            `${moment(dob).format("DDMMYYYY")}-${
              sex === "M" ? "1" : "2"
            }-${randomNumber.join("")}`
          );
          if (childUniqueId !== currentUniqueId) {
            changeAttributeValue("JcnE7Q4z7nD", childUniqueId);
          }
        }
      }
    })();
  }, [JSON.stringify(currentTei.attributes)]);

  return (
    <div>
      <Box>
        <Table>
          <TableBody>
            {attributes.map((attr, index) => {
              return (
                <TableRow
                  key={`profile-fdd-${index}`}
                  style={{ height: "80px" }}
                >
                  <TableCell
                    style={{
                      width: "25%",
                      borderRight: "1px solid #ccc",
                      padding: "5px"
                    }}
                  >
                    <div>
                      <AttributeLabel attribute={attr} />
                    </div>
                  </TableCell>
                  <TableCell style={{ padding: "5px" }}>
                    <div className="field-container">
                      <AttributeField attribute={attr} {...props[attr]} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </div>
  );
};

export default withRules(Profile);
