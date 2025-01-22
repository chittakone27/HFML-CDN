const listTables = [
  {
    tableName: "addmission-type",
    tableFields: [
      [
        {
          display: "text",
          text: "I. Addmission type:",
          cellProps: { colSpan: 2, className: "adr-table-title" }
        }
      ],
      [
        {
          id: "ZLh2iQMt1ZZ",
          labelCellProps: { className: "adr-table-cell" },
          fieldCellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          id: "M0iviZAg2wN",
          labelCellProps: { className: "adr-table-cell" },
          fieldCellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          id: "AzpfZROTF98",
          labelCellProps: { className: "adr-table-cell" },
          fieldCellProps: { className: "adr-table-cell" }
        }
      ]
    ]
  },
  {
    tableName: "adr-details",
    tableFields: [
      [
        {
          display: "text",
          text: "II. Detail od adverse Drug Reaction (ADR)",
          cellProps: { colSpan: 6, className: "adr-table-title" }
        }
      ],
      [
        {
          id: "v4cG3aK3JTE",
          labelCellProps: { className: "adr-table-cell" },
          fieldCellProps: { colSpan: "5", className: "adr-table-cell" }
        }
      ],
      [
        {
          display: "text",
          text: "Outcome",
          cellProps: { rowSpan: "2", className: "adr-table-cell" }
        },
        {
          display: "label",
          id: "BAlosLouiwb",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "Vb3oIXlaKsW",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "BAlosLouiwb",
          cellProps: { className: "adr-table-cell" }
        },
        {
          id: "sc4qhb13Bag",
          labelCellProps: { className: "adr-table-cell" },
          fieldCellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          display: "label",
          id: "yaqZLtzGXXG",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "zgbblClHD7S",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "yaqZLtzGXXG",
          cellProps: { className: "adr-table-cell" }
        },
        {
          id: "Qody9KMoaEr",
          labelCellProps: { className: "adr-table-cell" },
          fieldCellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          id: "bCa0xvLA6jN",
          labelCellProps: { className: "adr-table-cell" },
          fieldCellProps: { className: "adr-table-cell", colSpan: "5" }
        }
      ],
      [
        {
          id: "GbcEf5v66ZS",
          labelCellProps: { className: "adr-table-cell" },
          fieldCellProps: { className: "adr-table-cell", colSpan: "5" }
        }
      ]
    ]
  },
  {
    tableName: "drugs",
    tableFields: [
      [
        {
          display: "text",
          text: "",
          cellProps: {
            className: "adr-table-cell",
            sx: { border: "1px solid #ccc" }
          },
          customCell: (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  marginBottom: "5px"
                }}
              >
                Suspected drug&#40;s&#41;
              </div>
              <div style={{ fontSize: "0.8rem" }}>
                Please specify brand name if known. For vaccines, please
                indicate batch no.
              </div>
            </div>
          )
        },
        {
          display: "text",
          text: "Batch/lot No",
          cellProps: {
            className: "adr-table-cell adr-col-title",
            sx: { width: "10%" }
          }
        },
        {
          display: "text",
          text: "Dosage",
          cellProps: { className: "adr-table-cell adr-col-title" }
        },
        {
          display: "text",
          text: "Frequency",
          cellProps: {
            className: "adr-table-cell adr-col-title"
          }
        },
        {
          display: "text",
          text: "Route",
          cellProps: { className: "adr-table-cell adr-col-title" }
        },
        {
          display: "text",
          text: "",
          cellProps: {
            className: "adr-table-cell",
            sx: { border: "1px solid #ccc", width: "12%" }
          },
          customCell: (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  marginBottom: "5px"
                }}
              >
                Date
              </div>
              <div style={{ fontSize: "0.8rem" }}>started</div>
            </div>
          )
        },
        {
          display: "text",
          text: "",
          cellProps: {
            className: "adr-table-cell",
            sx: { border: "1px solid #ccc", width: "12%" }
          },
          customCell: (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  marginBottom: "5px"
                }}
              >
                Date
              </div>
              <div style={{ fontSize: "0.8rem" }}>stopped</div>
            </div>
          )
        },
        {
          display: "text",
          text: "",
          cellProps: {
            className: "adr-table-cell",
            sx: { border: "1px solid #ccc", width: "10%" }
          },
          customCell: (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  marginBottom: "5px"
                }}
              >
                Indication&#40;s&#41;
              </div>
              <div style={{ fontSize: "0.8rem" }}>for using drug</div>
            </div>
          )
        }
      ],
      [
        {
          display: "field",
          id: "OW0HVwTqi1R",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "usnhGJYhaQB",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "LTZFYf9cx2H",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "h1hoQyalNv6",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "hzr0kMCKnr1",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "xMTBmkTHFhP",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "jw9JbSq046s",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "FOAltuQMv4B",
          cellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          display: "field",
          id: "WI3zGA7cwZh",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "mJR9SuU7J1N",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "IEVQSS5bmMH",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "SByDXVMIcQl",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "miOMdUGPZzr",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "BPWn8owrGHx",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "uk2fL8n3CIK",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "XEGVzhGSsWz",
          cellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          display: "field",
          id: "fLS0MswXUZF",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "vBXNjwzH0B7",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "bgyim0kBRLk",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "X6tQkNsmWa0",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "maL7mXzVSvs",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "nevupAoMDWx",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "muclWeDNo70",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "IUoqE62DFNh",
          cellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          display: "text",
          text: "",
          cellProps: {
            className: "adr-table-cell",
            colSpan: "8"
          },
          customCell: (
            <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
              Other drugs{" "}
              <span style={{ fontStyle: "italic" }}>
                &#40;including complementary medicines, consumed at the same
                time and/or 3 months before&#41;
              </span>
            </div>
          )
        }
      ],
      [
        {
          display: "field",
          id: "v7k7Plj2sat",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "h1ab2PArpHu",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "L1M6NO9msYc",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "Z8ATvLwrzAC",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "Hhx9MtzbnWf",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "JRKGvCXNxHZ",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "ftWd6F8KQba",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "dejJm0B3sUt",
          cellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          display: "field",
          id: "haYRDHyvoFQ",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "sj8g8PGb6vZ",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "VHbcYnkdkz3",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "McJkoE2kJPb",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "ChEbfcb8l7y",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "Zw6avtCev1I",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "upiEM6kbmn3",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "EKexlI6OAUk",
          cellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          display: "field",
          id: "j0aI76geHMA",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "H6m6c1WPrwd",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "PuwNvSGa8qi",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "pU83gEVhjsu",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "cugFLJUed2K",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "VAlOfVfFWLl",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "XQ7sYwkgXzu",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "GYUvl9pCDqf",
          cellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          display: "field",
          id: "s8TilBcAJ2I",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "NLvyobeBoT8",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "dpvzKbhOkMc",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "LF6fuYzUrUz",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "axGp2F32fAp",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "tQWLGvs4ZO3",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "RlHJzwk9r3W",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "FyQZWQ2Znuk",
          cellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          display: "field",
          id: "h2zYFSpXbLL",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "HiMVMdPF41K",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "NUvgij3gSQW",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "C3Bx5eAdIAB",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "vRBcqsT1exQ",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "Lhm9TDCeKNU",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "Efxt9EZ5Zmp",
          cellProps: { className: "adr-table-cell" }
        },
        {
          display: "field",
          id: "jaB5L3Hpkqr",
          cellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          display: "text",
          text: "Other relevant information: e.g. medical history, allergies, pregnancy, smoking, alcohol use, rechallenge (if performed). Please enclose any relevant laboratory results.",
          cellProps: {
            className: "adr-table-cell",
            colSpan: "4",
            sx: { fontWeight: "500" }
          }
        },
        {
          display: "field",
          id: "pNZyg6n7tsc",
          cellProps: { className: "adr-table-cell", colSpan: "4" }
        }
      ]
    ]
  },
  {
    tableName: "adverse-reaction",
    tableFields: [
      [
        {
          display: "text",
          text: "III. Management of Adverse Reaction",
          cellProps: { colSpan: 2, className: "adr-table-title" }
        }
      ],
      [
        {
          id: "NefJSP1CTws",
          labelCellProps: { className: "adr-table-cell" },
          fieldCellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          id: "VTwi3Iq2ehZ",
          labelCellProps: { className: "adr-table-cell" },
          fieldCellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          id: "uPwkH3e1F1M",
          labelCellProps: { className: "adr-table-cell" },
          fieldCellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          display: "text",
          text: "If yes, please indicate why the reaction is considered to be serious (please tick all that apply)",
          cellProps: {
            colSpan: 2,
            className: "adr-table-cell",
            sx: { fontStyle: "italic", fontWeight: "bold", fontSize: "0.88rem" }
          }
        }
      ],
      [
        {
          id: "BrHNbTH0UAI",
          labelCellProps: { className: "adr-table-cell" },
          fieldCellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          id: "w6moypTHTyh",
          labelCellProps: { className: "adr-table-cell" },
          fieldCellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          id: "MFGa2Vl9loi",
          labelCellProps: { className: "adr-table-cell" },
          fieldCellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          id: "p7KlLiIMCuN",
          labelCellProps: { className: "adr-table-cell" },
          fieldCellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          id: "egVFKdMAFBS",
          labelCellProps: { className: "adr-table-cell" },
          fieldCellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          id: "uGQ7oOMRAYF",
          cellProps: { className: "adr-table-cell", colSpan: "2" },
          display: "labelInTop"
        }
      ]
    ]
  },
  {
    tableName: "reporter-particulars",
    tableFields: [
      [
        {
          display: "text",
          text: "IV. Particulars of reportor",
          cellProps: { colSpan: 2, className: "adr-table-title" }
        }
      ],
      [
        {
          id: "nVTQJ9owiVV",
          labelCellProps: { className: "adr-table-cell" },
          fieldCellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          id: "LN622u9POha",
          labelCellProps: { className: "adr-table-cell" },
          fieldCellProps: { className: "adr-table-cell" }
        }
      ],
      [
        {
          id: "X6zFGSios8K",
          labelCellProps: { className: "adr-table-cell" },
          fieldCellProps: { className: "adr-table-cell" }
        }
      ]
    ]
  }
];

export { listTables };
