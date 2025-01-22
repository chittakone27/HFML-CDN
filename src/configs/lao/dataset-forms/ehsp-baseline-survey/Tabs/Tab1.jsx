import React, { useMemo } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { tableCellStyles } from "../styles/styles";
import MapTable from "../../common/MapTable";

const Tab1 = () => {
  const { t } = useTranslation();

  const headerTable1 = [
    t("No."),
    t("Staff Category"),
    t("Civil Servant"),
    t("Contractual Staff"),
    t("Unpaid Volunteer"),
  ];

  const tableConfigs1 = useMemo(
    () => [
      [
        { display: "text", text: "1", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Pediatric Specialist"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "pw6KUAWwvdK",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "pw6KUAWwvdK",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "pw6KUAWwvdK",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "2", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("OBGYN Specialist"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "Wy0YLdswr6T",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "Wy0YLdswr6T",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "Wy0YLdswr6T",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "3", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Surgery Specialist"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "K5N1Wm9CSDS",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "K5N1Wm9CSDS",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "K5N1Wm9CSDS",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "4", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Internal medicine"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "GMTMZSl2CKl",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "GMTMZSl2CKl",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "GMTMZSl2CKl",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "5", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Anesthetist"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "K1Fs9ejmMc7",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "K1Fs9ejmMc7",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "K1Fs9ejmMc7",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "6", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Tropical Medicine"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "g5Sw1yyMBj8",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "g5Sw1yyMBj8",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "g5Sw1yyMBj8",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "7", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Family Medicine"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "gW6yGZHvemu",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "gW6yGZHvemu",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "gW6yGZHvemu",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "8", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Medical Doctor"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "UCqBOnGopJZ",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "UCqBOnGopJZ",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "UCqBOnGopJZ",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "9", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("MA High level"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "BsYIdgw3dxT",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "BsYIdgw3dxT",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "BsYIdgw3dxT",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "10", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("PHC Mid/Low level"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "jNhqSTaEiRy",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "jNhqSTaEiRy",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "jNhqSTaEiRy",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "11", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("MA Mid level"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "DYeePhxjmXF",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "DYeePhxjmXF",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "DYeePhxjmXF",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "12", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Pharmacist"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "coBgx1GM7xv",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "coBgx1GM7xv",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "coBgx1GM7xv",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "13", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Pharmacist Assistant"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "r7NbiMWEjco",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "r7NbiMWEjco",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "r7NbiMWEjco",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "14", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Dentist"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "AK7QhqZPke8",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "AK7QhqZPke8",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "AK7QhqZPke8",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "15", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Dentist Assistant"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "OSKX1GMs9bs",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "OSKX1GMs9bs",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "OSKX1GMs9bs",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "16", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Registered Nurse"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "vz9rvckKMGC",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "vz9rvckKMGC",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "vz9rvckKMGC",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "17", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Technical Nurse"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "S78Pvu8FoIj",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "S78Pvu8FoIj",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "S78Pvu8FoIj",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "18", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Community Midwife"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "mjHdYYFpmBG",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "mjHdYYFpmBG",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "mjHdYYFpmBG",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "19", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Auxiliary nurse/midwife"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "d7o7GMVxsbn",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "d7o7GMVxsbn",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "d7o7GMVxsbn",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "20", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Public Health Master"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "y0VH2gs72I3",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "y0VH2gs72I3",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "y0VH2gs72I3",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "21", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Public Health High level"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "yHgUG8R9797",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "yHgUG8R9797",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "yHgUG8R9797",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "22", cellProps: tableCellStyles.no },
        { display: "text", text: t("Lab"), cellProps: tableCellStyles.value },

        {
          cc: "XoRHfpE2L4s",
          coc: "BkOmpP0KoWz",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "BkOmpP0KoWz",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "BkOmpP0KoWz",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "23", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Lab Assistant"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "LP2ApkFd94U",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "LP2ApkFd94U",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "LP2ApkFd94U",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "24", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Physiotherapist"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "LoY3eOu1jlI",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "LoY3eOu1jlI",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "LoY3eOu1jlI",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "25", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("X-Ray/Imagine"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "kDOQmdfOWrZ",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "kDOQmdfOWrZ",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "kDOQmdfOWrZ",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "26", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Hygienist"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "XbI66h3zDaU",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "XbI66h3zDaU",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "XbI66h3zDaU",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "27", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Information Technology"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "MM7vt5uM3lw",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "MM7vt5uM3lw",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "MM7vt5uM3lw",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "28", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Account/Finance"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "zJ29gJYcQFd",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "zJ29gJYcQFd",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "zJ29gJYcQFd",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "29", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Village Health worker"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "XzBLQ6PE5LD",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "XzBLQ6PE5LD",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "XzBLQ6PE5LD",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
      [
        { display: "text", text: "30", cellProps: tableCellStyles.no },
        {
          display: "text",
          text: t("Others"),
          cellProps: tableCellStyles.value,
        },

        {
          cc: "XoRHfpE2L4s",
          coc: "OyyhDVUuSZj",
          dsde: "K8a1OPKEQ4B",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "OyyhDVUuSZj",
          dsde: "vp4EYYMclw6",
          cellProps: tableCellStyles.value,
        },
        {
          cc: "XoRHfpE2L4s",
          coc: "OyyhDVUuSZj",
          dsde: "yRNcyuhGX0g",
          cellProps: tableCellStyles.value,
        },
      ],
    ],
    []
  );

  return (
    <Box className="ehsp-baseline-survey-tab">
      <Table id="ehsp-baseline-survey-table-1">
        <TableHead>
          <TableRow>
            {headerTable1.map((header) => (
              <TableCell className="cell-header-table">{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={tableConfigs1} />
        </TableBody>
      </Table>
    </Box>
  );
};

export default Tab1;
