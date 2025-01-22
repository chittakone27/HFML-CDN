import { checkboxLeft, noBorder } from "../const";

const sectionsMapping = [
  {
    sectionId: "mXX4ej1kkzC",
    type: "vertical",
    headerTitle: "covid19Virus"
  },
  {
    sectionId: "CBCW7e9GBbe",
    type: "vertical",
    headerTitle: "covid19Trans"
  },
  {
    sectionId: "L57BbRvjmbV",
    type: "vertical",
    headerTitle: "covid19VaccQuest"
  },
  {
    sectionId: "V7p7FjENV16",
    type: "vertical",
    headerTitle: "testFact"
  },
  {
    sectionId: "FF3FeKWLdzd",
    type: "vertical",
    headerTitle: "enterLaos"
  },
  {
    sectionId: "Te6xVuJ3iML",
    type: "vertical",
    headerTitle: "exitLaos"
  },
  {
    sectionId: "sNIcdSqXV4i",
    type: "vertical",
    headerTitle: "locations"
  },
  {
    sectionId: "MpYtm9518ad",
    type: "vertical",
    headerTitle: "onsetOfSymps"
  },
  {
    sectionId: "LYarLtqpPBl",
    type: "vertical",
    headerTitle: "onsetEvtAff"
  },
  {
    sectionId: "xzuBi6Sx11a",
    type: "vertical",
    headerTitle: "clusPeopleEff"
  },
  {
    sectionId: "dNvGTqf40gh",
    type: "grid",
    headerTitle: "sympsHaving"
  },
  {
    sectionId: "z7nVcXcojWQ",
    type: "grid",
    headerTitle: "probDiseas"
  },
  {
    sectionId: "iD283VZs2ha",
    type: "vertical",
    headerTitle: "furtRefer"
  },
  {
    sectionId: "WzaSzvLLcPE",
    type: "grid",
    headerTitle: "animalAff"
  },
  {
    sectionId: "lvBIMvuYBiu",
    type: "grid",
    headerTitle: "animalHappen"
  },
  {
    sectionId: "FcbWgvJrwXY",
    type: "vertical",
    headerTitle: "animalEff"
  },
  {
    sectionId: "MCLsXz7w7pv",
    type: "grid",
    headerTitle: "animalSympSign"
  },
  {
    sectionId: "HUhI6f4dIDK",
    type: "vertical",
    headerTitle: "polioQa"
  },
  {
    sectionId: "ToBGJ0Wfig6",
    type: "vertical",
    headerTitle: "measlesQa"
  },
  {
    sectionId: "bV8ivB1yTKb",
    type: "vertical",
    headerTitle: "tetaChildQa"
  },
  {
    sectionId: "MhqCJjN06rL",
    type: "vertical",
    headerTitle: "diphtQa"
  },
  {
    sectionId: "GQU4JpPOeY2",
    type: "vertical",
    headerTitle: "pertussisQa"
  },
  {
    sectionId: "MJUH9zaFfRY",
    type: "vertical",
    headerTitle: "typhoidQa"
  },
  {
    sectionId: "V2yGrJBclRX",
    type: "vertical",
    headerTitle: "meningQa"
  },
  {
    sectionId: "k2QK5Ng5xmK",
    type: "vertical",
    headerTitle: "japanQa"
  },
  {
    sectionId: "xJlDkgqEFk6",
    type: "vertical",
    headerTitle: "rabiesQa"
  },
  {
    sectionId: "LTbAs2OtgVS",
    type: "vertical",
    headerTitle: "lossAppetQa"
  },
  {
    sectionId: "xPlcXEiKHKC",
    type: "vertical",
    headerTitle: "dengueQa"
  },
  {
    sectionId: "IVE0wiIKsPE",
    type: "vertical",
    headerTitle: "wateryDiarQa"
  },
  {
    sectionId: "mcb3xzCoML8",
    type: "vertical",
    headerTitle: "otherQa"
  }
];
/**
 * ========================================================================================
 * ----------------------------------------------------------------------------------------
 * ========================================================================================
 */
const callPurposeTypesSections = {
  Clusters: ["LYarLtqpPBl", "dNvGTqf40gh"],
  "General Q&A": [],
  "Individual Signs and Symptoms": [
    "MpYtm9518ad",
    "dNvGTqf40gh",
    "z7nVcXcojWQ",
    "iD283VZs2ha"
  ],
  "Zoonotic Diseases": [
    "LYarLtqpPBl",
    "WzaSzvLLcPE",
    "lvBIMvuYBiu",
    "MCLsXz7w7pv"
  ]
};
/**
 * ========================================================================================
 * ----------------------------------------------------------------------------------------
 * ========================================================================================
 */
const signSymtomsGroup = [
  {
    sectionLabel: "fever",
    tableName: "fever",
    dataElementConfigs: [
      [
        { id: "bYNsIhiqOln", ...checkboxLeft },
        { id: "KUXcqvyWbTS", ...checkboxLeft },
        { id: "WFLbVc6BTqa", ...checkboxLeft }
      ],
      [{ id: "QfRyWJ0Ihjq", ...checkboxLeft }]
    ],
    ...noBorder
  },
  {
    sectionLabel: "fatigue",
    tableName: "fatigue",
    dataElementConfigs: [
      [
        { id: "sq1YT3PMcc9", ...checkboxLeft },
        { id: "HLG3aQyPDMq", ...checkboxLeft },
        { display: "empty" }
      ]
    ],
    ...noBorder
  },
  {
    sectionLabel: "respirSystem",
    tableName: "respiratory-system",
    dataElementConfigs: [
      [
        { id: "zZFX8Mraehj", ...checkboxLeft },
        { id: "RqWPVm8xqQg", ...checkboxLeft },
        { id: "BL5BI1wm4fE", ...checkboxLeft }
      ],
      [
        { id: "MFyUzr2WhH9", ...checkboxLeft },
        { id: "ppxeNiQ26qS", ...checkboxLeft },
        { id: "BdDBUtvevA5", ...checkboxLeft }
      ],
      [
        { id: "BJCKnuhde2F", ...checkboxLeft },
        { id: "y4QwR5mifqL", ...checkboxLeft },
        { id: "IjNslbfBCAF", ...checkboxLeft }
      ]
    ],
    ...noBorder
  },
  {
    sectionLabel: "gastroinSystem",
    tableName: "gastrointestinal-system",
    dataElementConfigs: [
      [
        { id: "BuA9GCwUBTW", ...checkboxLeft },
        { id: "CkuUWqV3BYw", ...checkboxLeft },
        { id: "gewFFg49OgT", ...checkboxLeft }
      ],
      [
        { id: "do6S9XumEfW", ...checkboxLeft },
        { id: "pf4W3JGu8VG", ...checkboxLeft },
        { id: "JsXBZSpqLsb", ...checkboxLeft }
      ],
      [
        { id: "oSPcKMKASul", ...checkboxLeft },
        { id: "eX0Y6eWD8dO", ...checkboxLeft },
        { id: "eFV8NnM9u3m", ...checkboxLeft }
      ],
      [
        { id: "Q5TEy5ZLlpe", ...checkboxLeft },
        { id: "ELZedxPrUEI", ...checkboxLeft },
        { id: "o8ep74CvMmK", ...checkboxLeft }
      ],
      [
        { id: "EMyWgd60YHp", ...checkboxLeft },
        { id: "PsAB5KNpeQP", ...checkboxLeft },
        { id: "a1rF7gzm6ec", ...checkboxLeft }
      ]
    ],
    ...noBorder
  },
  {
    sectionLabel: "cardiacSystem",
    tableName: "cardiac-system",
    dataElementConfigs: [
      [
        { id: "vCARfriFAvE", ...checkboxLeft },
        { id: "Na1OhSgbLhJ", ...checkboxLeft }
      ]
    ],
    ...noBorder
  },
  {
    sectionLabel: "nervousSystem",
    tableName: "nervous-system",
    dataElementConfigs: [
      [
        { id: "UP4icntl9h7", ...checkboxLeft },
        { id: "jHT8LU4ZA7T", ...checkboxLeft },
        { id: "G7pCr7KdsKK", ...checkboxLeft }
      ],
      [
        { id: "hXwhyuEsIVJ", ...checkboxLeft },
        { id: "DbqKE0Vh7is", ...checkboxLeft },
        { id: "GreIanU7IOx", ...checkboxLeft }
      ],
      [
        { id: "ZDtGoaKSI2l", ...checkboxLeft },
        { id: "nFcEJTDCzRU", ...checkboxLeft },
        { id: "hnPMLUpVrgB", ...checkboxLeft }
      ],
      [
        { id: "VYyL7SJSaae", ...checkboxLeft },
        { id: "ZMb0Lpr3YLI", ...checkboxLeft },
        { id: "BjnNZlILfOY", ...checkboxLeft }
      ],
      [{ id: "Q1MCLYpbDqU", ...checkboxLeft }]
    ],
    ...noBorder
  },
  {
    sectionLabel: "muscSkeletonSystem",
    tableName: "muscular-skeleton-system",
    dataElementConfigs: [
      [
        { id: "AVxxfwn5MGi", ...checkboxLeft },
        { id: "EZyJceBF3GW", ...checkboxLeft },
        { id: "nVq2fjd0IBk", ...checkboxLeft }
      ],
      [
        { id: "fM7zm2iijMD", ...checkboxLeft },
        { id: "KHWbeHsZ2uD", ...checkboxLeft },
        { id: "ybiZ7IJ0a6N", ...checkboxLeft }
      ],
      [
        { id: "YL5zQVoJQff", ...checkboxLeft },
        { id: "Q42PdCMGrDc", ...checkboxLeft },
        { id: "dattpgDa6dx", ...checkboxLeft }
      ],
      [
        { id: "i508nnTsn6h", ...checkboxLeft },
        { id: "NPNykM4hEST", ...checkboxLeft },
        { id: "eKiIzUGgior", ...checkboxLeft }
      ],
      [{ id: "Ck34SIHchH2", ...checkboxLeft }]
    ],
    ...noBorder
  },
  {
    sectionLabel: "dermaDisorder",
    tableName: "dermatology-disorder",
    dataElementConfigs: [
      [
        { id: "ASQ4ReO6q5Q", ...checkboxLeft },
        { id: "MYwUszeScpE", ...checkboxLeft },
        { id: "tfiWkaMatjH", ...checkboxLeft }
      ]
    ],
    ...noBorder
  },
  {
    sectionLabel: "bleeding",
    tableName: "bleeding",
    dataElementConfigs: [[{ id: "JUL3Jojvqhw", ...checkboxLeft }]],
    ...noBorder
  },
  {
    sectionLabel: "other",
    tableName: "other",
    dataElementConfigs: [[{ id: "uT8N1zAKrAD", ...checkboxLeft }]],
    ...noBorder
  }
];

export { sectionsMapping, signSymtomsGroup, callPurposeTypesSections };
