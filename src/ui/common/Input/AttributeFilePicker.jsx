import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { pull } from "@/utils/fetch";

import { uploadFile } from "./FilePickerService";
let baseUrl = import.meta.env.VITE_BASE_URL;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1
});

const AttributeFilePicker = ({ onChange, disabled, type, value }) => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [fileResource, setFileResource] = useState(null);

  const handleUploadFile = async (file) => {
    try {
      const result = await uploadFile(file);
      if (result.status === "OK") {
        setFile(file);
        onChange(result.response.fileResource.id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDrop = (e) => {
    if (disabled) return;
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;
    handleUploadFile(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!value) return;
    async function getFileFromValue() {
      try {
        const response = await pull(`/api/fileResources/${value.split("-")[2]}`);
        setFileResource(response);
      } catch (error) {
        console.log(error);
      }
    }
    getFileFromValue();
  }, [value]);

  return (
    <div
      className="file-picker"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        minHeight: "200px",
        border: "2px dashed #aaa",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "5px",
        padding: "20px"
      }}
    >
      <Button disabled={disabled} component="label" variant="contained" startIcon={<FontAwesomeIcon icon={faUpload} />}>
        {t("uploadFile")}
        <VisuallyHiddenInput
          type="file"
          name="file"
          accept={type === "IMAGE" ? ".jpg, .jpeg, .png, .svg" : ".pdf, .doc, .docx, .xlsx, .csv, .xls, .txt"}
          onChange={(e) => handleUploadFile(e.target.files[0])}
        />
      </Button>

      <Typography> {t("dragAndDrop")}</Typography>
      <Box>
        {(file || value) &&
          (type === "IMAGE" ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Box
                sx={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "8px",
                  overflow: "hidden"
                }}
              >
                <img
                  src={file ? URL.createObjectURL(file) : `${baseUrl}/api/trackedEntityInstances/${value.split("-")[0]}/${value.split("-")[1]}/image`}
                  alt="uploaded"
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                />
              </Box>
              <Typography
                component={"a"}
                target="_blank"
                href={file ? URL.createObjectURL(file) : `${baseUrl}/api/trackedEntityInstances/${value.split("-")[0]}/${value.split("-")[1]}/image`}
              >
                {file ? file.name : fileResource?.displayName}
              </Typography>
            </Box>
          ) : (
            <Typography
              component={"a"}
              target="_blank"
              href={file ? URL.createObjectURL(file) : `${baseUrl}/api/trackedEntityInstances/${value.split("-")[0]}/${value.split("-")[1]}/image`}
            >
              {file ? file.name : fileResource?.displayName}
            </Typography>
          ))}
      </Box>
    </div>
  );
};

export default AttributeFilePicker;
