/* Components */
import { LoadingButton } from "@mui/lab";
import BirthCertificateDialog from "./BirthCertificateDialog";
/* Hooks */
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import useMetadataStore from "@/state/metadata";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
/* Constants */
import { VALUE_COORDS_CONFIGS } from "@/configs/laotracker/utils/deli-registry-pdf-configs";
/* Utils */
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import birthCertificateTemplate from "@/configs/laotracker/assets/example-bc.pdf";
import phetsarathFont from "@/configs/laotracker/assets/Phetsarath-OT.ttf";
import { getAttributeValue } from "./helpers";

const { MOTHER_FIELDS, CHILD_FIELDS } = VALUE_COORDS_CONFIGS;
/**
 * A button to print the birth certificate for a child TEI.
 *
 * Will fetch the birth certificate PDF template and the Phetsarath font,
 * generate a PDF for each child TEI, and display the PDFs in a dialog.
 *
 * @param {boolean} props.loading Whether the button should be in a loading state
 * @param {Object[]} props.children The child TEIs to generate birth certificates for
 * @returns {ReactElement[]}
 */
const BirthCertificateButton = ({ loading, children }) => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const childCertPdfUrls = useRef([]);
  const { optionSets, me, orgUnits } = useMetadataStore(
    useShallow((state) => ({
      optionSets: state.optionSets,
      me: state.me,
      orgUnits: state.orgUnits
    }))
  );
  const { data } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data
    }))
  );
  const { currentTei } = data;
  const { attributes } = currentTei;

  useEffect(() => {
    (async () => {
      if (children.length) {
        const childCertPdfPromises = children.map(async (child) => {
          const pdfUrl = await generatePdfUrl(child);
          return { tei: child["trackedEntityInstance"], url: pdfUrl };
        });
        const childCertPdfResps = await Promise.all(childCertPdfPromises);
        childCertPdfUrls.current = [...childCertPdfResps];
      }
    })();
  }, [JSON.stringify(children)]);

  const handleDialogChange = (value) => {
    setIsDialogOpen(value);
  };

  /**
   * Renders a date string onto a PDF page at specified coordinates.
   * The date string is expected to be in the format "YYYY-MM-DD".
   *
   * @param {PDFPage} pdfPage - The PDF page to render the date on.
   * @param {string} dateString - The date string to be rendered.
   * @param {Object} dateCoordsConfig - An object containing coordinates for each date component (year, month, day).
   * @param {Object} drawConfigs - Contains the dimensions and text configurations for rendering.
   */
  const renderDateString = (
    pdfPage,
    dateString,
    dateCoordsConfig,
    drawConfigs
  ) => {
    const { width, height, textConfigs } = drawConfigs;
    const dateElements = dateString.split("-");
    const dateCoordKeys = Object.keys(dateCoordsConfig);
    dateElements.forEach((dateElement, index) => {
      const { xMinusCoord, yMinusCoord } =
        dateCoordsConfig[dateCoordKeys[index]];
      pdfPage.drawText(dateElement, {
        x: width - xMinusCoord,
        y: height - yMinusCoord,
        size: 10.5,
        ...textConfigs
      });
    });
  };

  /**
   * Render the name of an option from an option set
   * @param {PDFPage} pdfPage - The page to render on
   * @param {object} valueField - The field configuration
   * @param {string} valueCode - The code of the selected option
   * @param {string} locale - The locale to display the option name in
   * @param {object} drawConfigs - The configuration for drawing text
   */
  const renderOptionValue = (
    pdfPage,
    valueField,
    valueCode,
    locale,
    drawConfigs
  ) => {
    const { width, height, textConfigs } = drawConfigs;
    const optSet = optionSets.find((os) => os.id === valueField.optSetId);
    const option = optSet.options.find((o) => o.code === valueCode);
    const displayName =
      locale !== "en"
        ? option?.translations.find(
            (t) => t.locale === locale && t.property === "NAME"
          )?.value ?? ""
        : option?.displayName || "";
    pdfPage.drawText(displayName, {
      x: width - valueField.xMinusCoord,
      y: height - valueField.yMinusCoord,
      size: 12,
      ...textConfigs
    });
  };

  /**
   * Renders the name of an org unit on a PDF page.
   * @param {PDFPage} pdfPage The PDF page to render the text on.
   * @param {{xMinusCoord: number, yMinusCoord: number, titleCoords?: {xMinusCoord: number, yMinusCoord: number}}} coords The coordinates at which to render the text.
   * @param {string} orgUnitId The ID of the org unit to render the name for.
   * @param {string} locale The locale in which to render the org unit name.
   * @param {{width: number, height: number, textConfigs: import("pdf-lib").PDFFontConfig}} drawConfigs The width and height of the PDF page and the font configuration to use.
   */
  const renderOrgUnitName = (
    pdfPage,
    { xMinusCoord, yMinusCoord, titleCoords },
    orgUnitId,
    locale,
    { width, height, textConfigs }
  ) => {
    const orgUnit = orgUnits.find((ou) => ou.id === orgUnitId);
    if (orgUnit) {
      const displayName =
        locale !== "en"
          ? orgUnit.translations.find(
              (t) => t.locale === locale && t.property === "NAME"
            )?.value
          : orgUnit.displayName;
      /* Remove org unit code */
      const formattedName = displayName
        .split(" ")
        .filter((x) => !/\d+/g.test(x))
        .join(" ");
      pdfPage.drawText(formattedName, {
        x: width - xMinusCoord,
        y: height - yMinusCoord,
        size: 9.5,
        ...textConfigs
      });
      if (titleCoords) {
        pdfPage.drawText(formattedName, {
          x: width - titleCoords.xMinusCoord,
          y: height - titleCoords.yMinusCoord,
          size: 9.5,
          ...textConfigs
        });
      }
    }
  };

  /**
   * Renders a regular text value on the birth certificate PDF.
   * @param {PDFPage} pdfPage - The page to render on.
   * @param {object} valueField - The field configuration.
   * @param {string} valueStr - The value to render.
   * @param {object} drawConfigs - The configuration for drawing text.
   */
  const renderRegularText = (pdfPage, valueField, valueStr, drawConfigs) => {
    const { width, height, textConfigs } = drawConfigs;
    pdfPage.drawText(valueStr, {
      x: width - valueField["xMinusCoord"],
      y: height - valueField["yMinusCoord"],
      size: 11.5,
      ...textConfigs
    });
  };

  /**
   * Renders the mother's fields on the birth certificate PDF.
   * @param {PDFPage} page - The page to render on.
   * @param {object} drawConfigs - The configuration for drawing text.
   */
  const renderMotherFields = (page, drawConfigs) => {
    MOTHER_FIELDS.forEach((field) => {
      const value = getAttributeValue(attributes, field.ID);
      switch (field.valueType) {
        case "DATE":
          renderDateString(page, value, field.dateCoords, drawConfigs);
          break;
        case "OPTIONS":
          renderOptionValue(
            page,
            field,
            value,
            me.settings.keyUiLocale,
            drawConfigs
          );
          break;
        case "ORG_UNIT":
          renderOrgUnitName(
            page,
            field,
            value,
            me.settings.keyUiLocale,
            drawConfigs
          );
          break;
        default:
          renderRegularText(page, field, value, drawConfigs);
          break;
      }
    });
  };

  /**
   * Retrieves the value of a specific data element for a child from their
   * enrollment and event data.
   *
   * @param {Object} childVlField - The field object containing the ID of the data element to retrieve.
   * @param {Object} childTei - The child TEI object containing enrollment and event data.
   * @returns {string} The value of the data element if found, otherwise an empty string.
   */
  const getChildDataValue = (childVlField, childTei) => {
    const eirEnroll = childTei.enrollments.find(
      (enroll) => enroll.program === "Yj9cJ34AXw6"
    );
    const birthDetailsStage = eirEnroll.events.find(
      (evt) => evt.programStage === "bwGkn5ebqkD"
    );
    const dataVl = birthDetailsStage.dataValues.find(
      (dataVl) => dataVl.dataElement === childVlField.ID
    );
    return dataVl ? dataVl.value : "";
  };

  /**
   * Return the value of the attribute or data element as specified in `childVlField`.
   * The value is looked up in the given `childTei` using the `valueSrc` field.
   * If `valueSrc` is "ATTR", the attribute is looked up in the child TEI.
   * If `valueSrc` is "PARENT_ATTR", the attribute is looked up in the parent TEI.
   * Otherwise, the data element is looked up in the birth details stage of the child TEI.
   * @param {Object} childVlField the field definition
   * @param {Object} childTei the child TEI
   * @returns {String} the value
   */
  const getChildValue = (childVlField, childTei) => {
    if (childVlField.valueSrc === "ATTR") {
      return getAttributeValue(childTei.attributes, childVlField.ID);
    } else if (childVlField.valueSrc === "PARENT_ATTR") {
      return getAttributeValue(attributes, childVlField.ID);
    } else {
      return getChildDataValue(childVlField, childTei);
    }
  };

  /**
   * Render the fields of a child's birth certificate
   * @param {object} childTei - The child's enrollment
   * @param {object} page - The pdf page to render on
   * @param {object} drawConfigs - The config object for drawing
   */
  const renderChildFields = (childTei, page, drawConfigs) => {
    const { width, height } = drawConfigs;
    CHILD_FIELDS.forEach((field) => {
      const value = getChildValue(field, childTei);
      switch (field.valueType) {
        case "DATE":
          renderDateString(page, value, field.dateCoords, drawConfigs);
          break;
        case "SEX":
          const sexCoord = value === "M" ? field.maleCoord : field.femaleCoord;
          page.drawCircle({
            x: width - sexCoord.xMinusCoord,
            y: height - sexCoord.yMinusCoord,
            size: 1.4,
            borderWidth: 5,
            color: rgb(0, 0, 0),
            borderOpacity: 0.75
          });
          break;
        case "OPTIONS":
          renderOptionValue(
            page,
            field,
            value,
            me.settings.keyUiLocale,
            drawConfigs
          );
          break;
        case "ORG_UNIT":
          renderOrgUnitName(
            page,
            field,
            value,
            me.settings.keyUiLocale,
            drawConfigs
          );
          break;
        default:
          renderRegularText(page, field, value, drawConfigs);
          break;
      }
    });
  };

  /**
   * Generate a PDF URL based on the provided child enrollment.
   * @param {Object} childTei - The child enrollment object.
   * @returns {Promise<string>} - A promise that resolves to a URL for the generated PDF file.
   */
  const generatePdfUrl = async (childTei) => {
    // Load the PDF template
    const existingPdfBytes = await fetch(birthCertificateTemplate).then((res) =>
      res.arrayBuffer()
    );
    const fontFile = await fetch(phetsarathFont);
    const reponseFontBuffer = await fontFile.arrayBuffer();
    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    // Embed a font for adding text
    const font = await pdfDoc.embedFont(reponseFontBuffer, { subset: true });
    // Get the first page of the PDF
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    const textConfigs = {
      font: font,
      lineHeight: 24,
      color: rgb(0, 0, 0)
    };
    const drawConfigs = {
      width: width,
      height: height,
      textConfigs: { ...textConfigs }
    };
    // Define the text and its location
    renderMotherFields(firstPage, drawConfigs);
    renderChildFields(childTei, firstPage, drawConfigs);
    // Serialize the PDFDocument to bytes
    const pdfBytes = await pdfDoc.save();
    // Create a Blob and download the PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  };

  return [
    <LoadingButton
      color="success"
      loading={loading}
      variant="contained"
      onClick={() => {
        handleDialogChange(true);
      }}
    >
      {t("printBirthCertificate")}
    </LoadingButton>,
    <BirthCertificateDialog
      isDialogOpen={isDialogOpen}
      handleDialogChange={handleDialogChange}
      children={children}
      childCertPdfUrls={childCertPdfUrls.current}
    />
  ];
};

export default BirthCertificateButton;
