import { Box, Dialog, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Fragment, useState } from "react";
import birthCertificateTemplate from "@/configs/laotracker/assets/example-bc.pdf";
const BirthCertificateDialog = ({
  isDialogOpen,
  handleDialogChange,
  children,
  childCertPdfUrls
}) => {
  //   console.log(childCertPdfUrls);
  const [tabValue, setTabValue] = useState("1");
  return (
    <Dialog
      open={isDialogOpen}
      fullWidth
      maxWidth="xl"
      onClose={() => {
        handleDialogChange(false);
      }}
    >
      <Box>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={(event, newValue) => setTabValue(newValue)}>
              {children &&
                children.map((childTei, index) => (
                  <Tab
                    key={`label${index}}`}
                    label={`Infant ${index + 1}`}
                    value={`${index + 1}`}
                  />
                ))}
            </TabList>
          </Box>
          <Box>
            {children &&
              children.map((childTei, index) => {
                const teiUrlObj = childCertPdfUrls.find(
                  (urlObj) =>
                    urlObj["tei"] === childTei["trackedEntityInstance"]
                );
                return (
                  <Fragment key={`tab${index}}`}>
                    <TabPanel value={`${index + 1}`}>
                      <iframe
                        src={
                          teiUrlObj
                            ? teiUrlObj["url"]
                            : birthCertificateTemplate
                        }
                        width="100%"
                        height="500px"
                      />
                    </TabPanel>
                  </Fragment>
                );
              })}
          </Box>
        </TabContext>
      </Box>
    </Dialog>
  );
};

export default BirthCertificateDialog;
