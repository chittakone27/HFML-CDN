import React, { useEffect, useMemo, useState } from "react";
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
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import "../ehsp-baseline-survey.css";

const Tab2 = () => {
  const { t } = useTranslation();

  const { orgUnit } = useSelectionStore((state) => state, shallow);
  const [orgUnitGroup, setOrgUnitGroup] = useState(0);
  const [headerTable2, setHeaderTable2] = useState([]);

  const lstSections = [
    [
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Polyvidone iodine, solution"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "xOgoQME5py2",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t(
            "Gentian violet (Methylrosanilinium chloride) Aqueous solution 0.5%"
          ),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "C02D0psiozD",
        },
      },
    ],
    [
      {
        assignOrg: [true, false, true, false],
        data: {
          text: t("Tranexamic acid injection, ampule"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "mt5PoIo0sbz",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Levonorgestrel (Progestin-Only Pill), tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XZDKtFcA71g",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Ethinylestradiol + levonorgestrel (Combined pill ), tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "VFVl7pA9klm",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t(
            "Depot Medroxyprogesterone Acetate (DMPA)(Progestin-Only Injectable ), injection, vial"
          ),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "dPTt10ncade",
        },
      },
    ],
    [
      {
        assignOrg: [true, false, true, false],
        data: {
          text: t("Isoflurane, inhalation"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "GRan5NsZVRx",
        },
      },
      {
        assignOrg: [true, false, true, false],
        data: {
          text: t("Sevoflurane, inhalation"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "uSIGSk4wtQZ",
        },
      },
      {
        assignOrg: [true, false, true, false],
        data: {
          text: t("Suxamethonium, injection/powder for injection(vial)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "g5Ag1zTVa2h",
        },
      },
      {
        assignOrg: [true, false, true, false],
        data: {
          text: t("Vectonium bromide, injection"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ljzJCDQ9ef2",
        },
      },
      {
        assignOrg: [true, false, true, false],
        data: {
          text: t("Pancuronium bromide, injection"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "sSDyeHd4jIa",
        },
      },
      {
        assignOrg: [true, false, true, false],
        data: {
          text: t("Neostigmine, injection, ampoule"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ssaVRa6nuC1",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Lidocaine, injection vial(1%)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "cuibelohxPX",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Lidocaine, injection vial(2%)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XwaX8dSJaHS",
        },
      },
      {
        assignOrg: [true, false, true, false],
        data: {
          text: t("Bupivacaine, injection for spinal anaesthesia"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "IH629QpizMH",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Diazepam, depot infection, vial"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "EsicLTeuf4H",
        },
      },
      {
        assignOrg: [true, false, true, false],
        data: {
          text: t("Ketamine, injection"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "l6QGJMsBBFb",
        },
      },
      {
        assignOrg: [true, false, true, false],
        data: {
          text: t("Propofol, injection"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "vmrZNRZojVX",
        },
      },
      {
        assignOrg: [true, false, true, false],
        data: {
          text: t("Thiopental, powder for injection (ampoule)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "NdAyXoIlRlm",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Paracetamol, tablet(100-500mg)/syrup(120-250mg/5ml)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "NIqOLpKTzSB",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Ibuprofen, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "u7LfHJswmMa",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Tramadol, tablet/injection"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "n7D8EcPZHrB",
        },
      },
      {
        assignOrg: [true, false, true, false],
        data: {
          text: t("Pethidine, injection(ampoule)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ryfvuXClcdi",
        },
      },
      {
        assignOrg: [true, false, true, false],
        data: {
          text: t("Morphine, injection"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "n4jZG1gF6b7",
        },
      },
      {
        assignOrg: [true, false, true, false],
        data: {
          text: t("Morphine, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "v1iHjILWbmx",
        },
      },
      {
        assignOrg: [true, false, true, false],
        data: {
          text: t("Fentanyl, injection, ampoule"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "MYRnM1nekmJ",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Low dose Acetylsalicylic acid, tablet (81 mg)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "KZ9BVTcAuqy",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Low dose Acetylsalicylic acid, tablet (100mg)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "R8LwAaXpsCq",
        },
      },
      {
        assignOrg: [true, false, true, false],
        data: {
          text: t("Naloxone, injection, ampoule"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Rjg7N3D6ZCc",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Amoxycillin, Capsule"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "aRreXTc9XFB",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Amoxycillin, powder for oral suspension"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "WSBQxn4T1o7",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Benzathine benzylpenicillin, powder for injection, vial"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "YTfECWGclui",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Procaine benzylpenicillin, powder for injection"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "G6cc4btarPn",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Benzylpenicillin, powder for infection, vial"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "zx5SgWP5KRP",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Ampicillin, powder for injection(500mg, 1g)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "BMgyp9TlX3x",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Cloxacillin, Capsul・powder for oral suspension"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "xl0Rhyj5t9x",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Cloxacillin, powder for injection"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "w7RkuKQ6UXa",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t(
            "Amoxicillin + Clavulanic Acid (Augmentin), tablet/oral liquid"
          ),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "v14Pur96cYL",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t(
            "Erythromycin, capsule or tablet/oral suspension/powder for oral"
          ),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "d6UDh3JMFzC",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Azythromycin, tablet or capsule/oral suspension"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XoFLrYOB1e5",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Gentamicin, injection, vial"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "hHdltjBAKiU",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Chloramphenicol, oral suspension"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "iYjf7eUO29h",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Chloramphenicol, powder for injection(vial)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "YBoDBe8n0Cf",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t(
            "Sulfamethoxazole + Trimethoprim (Cotrimoxazole), tablet/oral suspension"
          ),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "hFtqWRSWtGB",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Ciprofloxacin, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "prWGdsSnwCv",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Ofloxacin, tablet/injection"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "mXqi7dygrW3",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Cefotaxime, powder for injection, vial(250mg)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "a0eI8BTBCXu",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Ceftriaxone, powder for injection, vial"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "GKP2Iih22qo",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Cefalexin, capsule/powder for oral suspension"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "E9Qyo1bvvf9",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Cefixime, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ZmFwtSv2jRw",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Doxycycline, capsule or tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "WxdjrLqEaX9",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("metronidazole, injection(vial)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "vWwzqxatdzM",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Chloramphenicol, eye drop or ointment, 0.5%"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "BaGJigh36KE",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Tetracyclin eye ointment, 1%"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "q378vhNGxDw",
        },
      },
      {
        assignOrg: [false, false, true, false],
        data: {
          text: t("Ofloxacin, ear drop, 2%"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "aBdE6Z3wn7z",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Mebendazole, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "LwqKqg2VXmm",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Albendazole, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "FV5OQGwlKMa",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Praziquantel, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "vKUQxZ4Fm5N",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Nystatin, tablet/oral drop"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "b59kB56Rb8t",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Fluconazole, capsule"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "rHdjsd9ie0C",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Amphotericin B, powder for imjection, vial"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "C8fStt9Va7Q",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Artemether + Lumefantrine(Coaterm), tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "TAuMDrhb0yf",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Primaquine, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "dqfBjuXRzwk",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Artesunate, injection"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "q9UaJuRyjE6",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Quinene, injection(ampoule)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "dKNTDsxoVdv",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Quinene, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "QhPDsWZsWcs",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Mefloquine, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ZulYh1tyxwS",
        },
      },
    ],
    [
      {
        assignOrg: [false, false, true, false],
        data: {
          text: t("Abacavir (ABC), dispersible tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "VTLlrBdoLkZ",
        },
      },
      {
        assignOrg: [false, false, true, false],
        data: {
          text: t("Zidovudine (AZT), tablet or capsule"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "tenoGTfxYUn",
        },
      },
      {
        assignOrg: [false, false, true, false],
        data: {
          text: t("Zidovudine (AZT), oral suspension or syrup"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "F6o1IE6e0ys",
        },
      },
      {
        assignOrg: [false, false, true, false],
        data: {
          text: t("Lamivudine (3TC), tablet/oral suspension"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "UacHndlgqRx",
        },
      },
      {
        assignOrg: [false, false, true, false],
        data: {
          text: t("Tenofovir disoproxil fumarate (TDF), tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "hi6CDxKgB20",
        },
      },
      {
        assignOrg: [false, false, true, false],
        data: {
          text: t("Nevirapine (NVP), tablet/dispersible tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "i3tkWLiN9Df",
        },
      },
      {
        assignOrg: [false, false, true, false],
        data: {
          text: t("Nevirapine (NVP), oral suspension"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XS81ZCb0izw",
        },
      },
      {
        assignOrg: [false, false, true, false],
        data: {
          text: t("Efavirenz (EFV), dual-scored tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "NTElYW4uGeL",
        },
      },
      {
        assignOrg: [false, false, true, false],
        data: {
          text: t("Atazanavir (ATV)/ Ritonavir (r), tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "xfGx0fEtoiq",
        },
      },
      {
        assignOrg: [false, false, true, false],
        data: {
          text: t("Lopinavir (LPV)/Ritonavir(r), tablet/ suspension"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "VRSSSMFecFj",
        },
      },
      {
        assignOrg: [false, false, true, false],
        data: {
          text: t(
            "Tenofovir disoproxil fumarate(TDF)/ Lamivudine(3TC), tablet"
          ),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "aTji4s1mTtZ",
        },
      },
      {
        assignOrg: [false, false, true, false],
        data: {
          text: t("Lamivudine(3TC)/zidovudine(AZT), tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "az2JXJDPhYH",
        },
      },
      {
        assignOrg: [false, false, true, false],
        data: {
          text: t("Abacavir/Lamivudine (ABC/3TC), tablet/dispersible tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "JUYBwBxszBP",
        },
      },
      {
        assignOrg: [false, false, true, false],
        data: {
          text: t(
            "Tenofovir disoproxil fumarate(TDF)/ Lamivudine(3TC)/Efavirenz(EFV), tablet"
          ),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XeZAPELgTjl",
        },
      },
      {
        assignOrg: [false, false, true, false],
        data: {
          text: t("TDF/3TC/Dolutegravir (DTG)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "vVhpXDjUi16",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Rifampicin (R) , capsule or tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "lpoKlIb6ehI",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Isoniazid/INH (H), tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "kzWNlNdRX6c",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Pyrazinamide (Z), tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "kfHffWGFnp4",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Ethambutol (E), tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "r7v3aajnbIn",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Ethambutol+Isoniazid, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "AjvKl1RjYrr",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Rifampicin+Isoniazid, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "iiw5zIYjrLT",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Rifampicin+Isoniazid+Pryzinamide+Ethambutol, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "xAh1su1l4Y0",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Rifampicin+Isoniazid+Prazinamid, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "WKMERodZ7T2",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Tetanus vaccine, infectable solution"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ZDRjVuUfluH",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Hepatitis B vaccine, injectable solution"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "evcQLtrdyHh",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("BCG vaccine, injectable solution"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ReyOOpPFcNU",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("DPT-HepB-Hib vaccine, injectable solution"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Hv8GqcBADxu",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Polio(IPV/OPV) vaccine"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "mn6koohNFIm",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Measles-Rubella vaccine"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "HdZ5lywX9A9",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("PCV vaccine"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ZhhwFUOtIKA",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Japanese encephalitis vaccine"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "jtRnlkSYPHB",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Iron folic acid tablet (iron 60mg + folic acid 400ug)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "wI8epg2wcMZ",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Ca supplement, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "tKs4houFjW1",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Vitamin K1(Phytomenadione ), injection, ampoule"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ClToU4UgY2Z",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t(
            "Vitamine A(Retinol), Sugar-coated tablet(10,000IU)/soft capsule(200,000IU)/Oral solution (100,000IU/ml)"
          ),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "BMVqnEaQ1uo",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Vitamin B1, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "HznssQ7R9cq",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Vitamin B1, injectable solution(ampoule"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "vYIaIu7l7JH",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Zinc sulfate, tablet or syrup(10mg, 20mg)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "EguYWNzOXbf",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Ferrous salt(iron), tablet (60mg iron)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "eDCGvC9kuly",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Ferrous salt(iron), oral solution(25mg iron/ml)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "TonU2VOivAe",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Oral rehydration salt(ORS)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Dg8PspHmqex",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("ReSoMaL and oral potassium solution (chlorvescent)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "kp4ZVVaKspy",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Potassium chloride, powder for solution/tablet(600mg)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "OHzupv38C2j",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Magnesium hydroxide, oral suspension"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "VrD3XKGKegQ",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Folic acid, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XCT6HZSlSme",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Antivenom serum, injection"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "H6v5F3zC4sS",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Diphtheria antitoxin, injection"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "tqb0Yuhfg6x",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Misoprostol, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "GDZnj7Fn1B9",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Oxytocin, injection"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "pnauw4tfaR6",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Ergometrine maleate(Methergine), injection"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "viRWHPJzJ04",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Hydralazine, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "p5k5lMbkJYA",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Nifedipine, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "WmE9IiPqyH4",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Methyldopa(Aldomet), tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "NcnSfd3LBMf",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Magnesium Sulfate, injetable solution(ampoule)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "vH6e3GtTE81",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Amlodipine, tablet, 5mg, 10mg (commonly used)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "GQiBZiuhYXc",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Enalapril(ACE inhibitor), tablet(5mg, 20mg)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "O07nEQ1767t",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Atenolol, tablet(50mg, 100mg)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "snO2xXMszBL",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Epinephrine, injection(ampoule)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "xjVyeRHUxl9",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Digoxin, injection(ampoule)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "yPxttoykVOz",
        },
      },
      {
        assignOrg: [true, false, true, false],
        data: {
          text: t("Atropine, injection ampoule"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "kJ5u7sByyhn",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Furosemide, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "U3ZJsENxXR0",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Furosemide, injectable solution(ampoule)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "A0OfUPsHpBv",
        },
      },
    ],
    [
      {
        assignOrg: [true, false, true, false],
        data: {
          text: t("Dexamethasone, injection"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "SAAF8D9BUE7",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Prednisolene, tablet/oral liquid"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "v6Pr1TIXKU1",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Phenobarbital, tablet/syrup"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "R3ktG0qc60p",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Phenobarbital, injection"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "g1TIlm3NJOM",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Chlorpromazine, injection(ampoule)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "gnx0KJPNorN",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Chlorpromazine, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "vvZjUOcfiZS",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Phenytoin, injection(vial)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "gXp3y9umm8m",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Aminophylline, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "pieV7KJmUTr",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Aminophylline, injection(ampoule)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "TfFwGqX3olZ",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t(
            "Salbutamol for nebuliser, solution for inhalation/respiratory solution/inhaler(aerosol)"
          ),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "fkh53auR3Qe",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Sulbutamol sulfate, tablet/syrup"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "veI1tLJ31Q6",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Long-acting bronchodilators"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "RfusEkQl2gn",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Budesonide, inhalation(aerosol)(100mdg/dose)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "BrhBanF2MLJ",
        },
      },
    ],
    [
      {
        assignOrg: [false, false, true, false],
        data: {
          text: t("75g OGTT"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "DG3kEgMzGXD",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Metformin, tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ECQpplK9bAJ",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Glibenclamide(Sulfonylurea), tablet"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Hj6LuYeYDxr",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Humuline R, injection"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "wxRspDOmxpP",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Intermediate-acting insulin, suspension for injection"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "WmT9t88SyGI",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Bestatin"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "hh5FTdJGiOb",
        },
      },
      {
        assignOrg: [true, true, true, false],
        data: {
          text: t("Atorvastatin, tablet(10mg, 20mg, 40mg)"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "dGrAFsnCEw1",
        },
      },
    ],
    [
      {
        assignOrg: [false, false, true, false],
        data: {
          text: t("atropine, eye drop, 0.5-1%"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "qzp89aTnnXm",
        },
      },
      {
        assignOrg: [false, false, true, false],
        data: {
          text: t("Homatropine, eye drop, 1%, 2%"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "wg46qC91cTa",
        },
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Normal saline"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "QGbb3TnQnfk",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Ringer lactate"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "u4SUU9TqrOr",
        },
      },
      {
        assignOrg: [true, true, true, true],
        data: {
          text: t("Glucose solution"),
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "VG3xtDWaja8",
        },
      },
    ],
  ];
  useEffect(() => {
    if (
      orgUnit.organisationUnitGroups.find((group) => group.id === "Ky8EJEqdpGP")
    ) {
      setOrgUnitGroup(0);
    } else if (
      orgUnit.organisationUnitGroups.find((group) => group.id === "ZcbWJfYaX5n")
    ) {
      setOrgUnitGroup(1);
    } else if (
      orgUnit.organisationUnitGroups.find((group) => group.id === "GiRpQWVJ24q")
    ) {
      setOrgUnitGroup(2);
    } else if (
      orgUnit.organisationUnitGroups.find((group) => group.id === "U53tdte60Ku")
    ) {
      setOrgUnitGroup(3);
    }
  }, [orgUnit]);

  const tableConfigs2 = useMemo(() => {
    let stt = 1;
    let payload = [];
    let newSections = [];
    let headerTable = [
      "Antiseptic",
      "Anti-infective medicine",
      "Coaglant",
      "Contraception",
      "Anesthesia",
      "Analgesics",
      "Antibiotics",
      "Antihelminthic",
      "Antifungal medicines",
      "Antimalaria drug",
      "Antiretoroviral drug",
      "Antituberculosis drug",
      "Vaccine",
      "Mineral/vitamin supplement",
      "Seram and immunogloblin",
      "Uterotonics",
      "Antihypertension drug",
      "Cardiovascular drug",
      "Diuretic",
      "Steroid",
      "Anticonvulsants",
      "Medicine for asthma/ COPD	",
      "DM drug",
      "Statin",
      "Mydriatics",
      "Fluid",
    ];
    lstSections.forEach((lstDe, i) => {
      let lstDeInSection = [];
      lstDe.forEach((de) => {
        if (de.assignOrg[orgUnitGroup]) {
          lstDeInSection.push([
            { display: "text", text: stt, cellProps: tableCellStyles.no },
            { display: "text", text: t(de.data.text) },
            {
              cc: "XoRHfpE2L4s",
              coc: "pw6KUAWwvdK",
              dsde: de.data.dsde,
              cellProps: tableCellStyles.value,
            },
          ]);
          stt++;
        }
      });
      if (lstDeInSection.length > 0) {
        newSections.push(headerTable[i]);
        payload.push(lstDeInSection);
      }
    });
    setHeaderTable2(newSections);
    return payload;
  }, [orgUnitGroup]);

  return (
    <Box className="ehsp-baseline-survey-tab">
      {tableConfigs2.length > 0 && (
        <Table id="ehsp-baseline-survey-table-2">
          {headerTable2.map((header, i) => {
            return (
              <>
                <TableHead key={i}>
                  <TableRow>
                    <TableCell className="cell-header-table">
                      {t("No.")}
                    </TableCell>
                    <TableCell className="cell-header-table">
                      {t(header)}
                    </TableCell>
                    <TableCell className="cell-header-table">
                      {t("Availability")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <MapTable dataElementConfigs={tableConfigs2[i]} />
                </TableBody>
              </>
            );
          })}
        </Table>
      )}
    </Box>
  );
};

export default Tab2;
