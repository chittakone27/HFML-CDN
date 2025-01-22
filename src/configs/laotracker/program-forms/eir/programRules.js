const rules = [
  //Assign Age in month by enrollment date and date of Birth
  //DONE
  {
    name: "Assign Age in month at the enrollment time",
    id: "wo05G4z4nEu",
    condition: "d2:hasValue(A{Date of Birth}) && d2:daysBetween( A{Date of Birth} , V{enrollment_date}) >=0",
    programRuleActions: [
      {
        programRuleActionType: "ASSIGN",
        data: "d2:monthsBetween( A{Date of Birth}, V{enrollment_date} )",
        trackedEntityAttribute: {
          id: "vJdG29KW1Et"
        }
      }
    ]
  },
  //grow monitor stage
  {
    name: "Assign Age in month at the grow monitor visit time",
    id: "LFxabkNwyiU",
    condition: "true",
    programRuleActions: [
      {
        programRuleActionType: "ASSIGN",
        data: "d2:monthsBetween( A{Date of Birth}, V{event_date} )",
        dataElement: {
          id: "MV1yoC7BfnG"
        }
      }
    ]
  },
  //immunization
  //Assign Age in month by date of Birth and event date
  //DONE
  {
    name: "Assign Age in month at the immunisation visit time",
    id: "fWjfuSQpakM",
    condition: "true",
    programRuleActions: [
      {
        programRuleActionType: "ASSIGN",
        data: "d2:monthsBetween( A{Date of Birth}, V{event_date} )",
        dataElement: {
          id: "MV1yoC7BfnG"
        }
      }
    ]
  },
  //immunization
  //Assign Age in week by date of Birth and event date
  //DONE
  {
    name: "Assign Age in week at the immunization visit time",
    id: "DJEVqlmctEP",
    condition: "d2:hasValue(A{Date of Birth})",
    programRuleActions: [
      {
        programRuleActionType: "ASSIGN",
        data: "d2:weeksBetween( A{Date of Birth}, V{event_date} )",
        dataElement: {
          id: "DxOqZZgVQhF"
        }
      }
    ]
  },
  //not yet
  // {
  //   name: "Full Immunize",
  //   id: "yZhs1iKzCzj",
  //   condition:
  //     "(#{bcg}==true || #{bcgprev}==true) && (#{DTP-HepB-Hib3}==true || #{dpt3prev}==true) && (#{hboprev}==true || #{hbo}==true || #{hbo24hrs}==true || #{hbo24hrsprev}==true) && (#{opv3}==true || #{opv3prev}==true) && (#{ipv1}==true || #{ipv1prev}==true) && (#{pcv3}==true || #{pcv3prev}==true) && (#{mcv1}==true || #{mcv1prev}==true) && (#{jev}==true || #{jevprev}==true) && (#{opv1}==true || #{opv1prev}==true) && (#{dpt1}==true || #{dpt1prev}==true) && (#{dpt2}==true || #{dpt2prev}==true) && (#{pcv1}==true || #{pcv1prev}==true) && (#{pcv2}==true || #{pcv2prev}==true) && (#{opv2}==true || #{opv2prev}==true) && (#{mcv2}==true || #{mcv2prev}==true)",
  //   programRuleActions: [
  //     {
  //       programRuleActionType: "ASSIGN",
  //       data: "true",
  //       dataElement: {
  //         id: "qrZ2UmofOdm",
  //       },
  //     },
  //   ],
  // },
  //Birth details
  {
    name: "Gestational Age at birth 0-28 weeks or 42-49 weeks (soft)",
    id: "k6D2fw2c294",
    condition: "((#{gestationalAge} <= 28) || (#{gestationalAge} < 50 && #{gestationalAge} > 42)) && d2:hasValue('gestationalAge')",
    programRuleActions: [
      {
        programRuleActionType: "SHOWWARNING",
        displayContent: "The gestational age is out of normal range. Please check.",
        dataElement: {
          id: "YesvM1AYsNy"
        }
      }
    ]
  },
  //Birth details
  {
    name: "Gestational Age at birth >= 50 w (hard)",
    id: "wDozhNw0IRJ",
    condition: "#{gestationalAge} >= 50 && d2:hasValue('gestationalAge')",
    programRuleActions: [
      {
        programRuleActionType: "SHOWERROR",
        displayContent: "The gestational age is too high! Please check if this is correct value.",
        dataElement: {
          id: "YesvM1AYsNy"
        }
      }
    ]
  },
  //previous event
  //immunization
  //DONE
  {
    name: "Hide BCG if ever given",
    id: "nuEfBzh44r7",
    condition: "(#{bcgprev}==true)",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "G9kw7qj1duL"
        }
      }
    ]
  },
  //previous event
  //immunization
  //DONE
  {
    name: "Hide DPT1 if ever given",
    id: "lBiHyGbTUiQ",
    condition: "(d2:hasValue('dpt1prev'))",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "UFRm7xWmxSA"
        }
      }
    ]
  },
  //previous event
  //immunization
  //DONE
  {
    name: "Hide DPT2 if ever given",
    id: "H3fIidCi7mu",
    condition: "(#{dpt2prev}==true)",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "aiFYpVd6Vle"
        }
      }
    ]
  },
  //previous event
  //immunization
  //DONE
  {
    name: "Hide DPT3 if ever given",
    id: "su1kpYxYCah",
    condition: "(#{dpt3prev}==true)",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "Ln2xC7zuEpr"
        }
      }
    ]
  },
  //not yet
  // {
  //   name: "Hide Full Immunize",
  //   id: "YjLUcI5epC3",
  //   condition:
  //     "!((#{bcg}==true || #{bcgprev}==true) && (#{DTP-HepB-Hib3}==true || #{dpt3prev}==true) && (#{hboprev}==true || #{hbo}==true || #{hbo24hrs}==true || #{hbo24hrsprev}==true) && (#{opv3}==true || #{opv3prev}==true) && (#{ipv1}==true || #{ipv1prev}==true) && (#{pcv3}==true || #{pcv3prev}==true) && (#{mcv1}==true || #{mcv1prev}==true) && (#{jev}==true || #{jevprev}==true) && (#{opv1}==true || #{opv1prev}==true) && (#{dpt1}==true || #{dpt1prev}==true) && (#{dpt2}==true || #{dpt2prev}==true) && (#{pcv1}==true || #{pcv1prev}==true) && (#{pcv2}==true || #{pcv2prev}==true) && (#{opv2}==true || #{opv2prev}==true) && (#{mcv2}==true || #{mcv2prev}==true) ) ",
  //   programRuleActions: [
  //     {
  //       programRuleActionType: "HIDEFIELD",
  //       dataElement: {
  //         id: "qrZ2UmofOdm"
  //       }
  //     }
  //   ]
  // },
  //previous event
  //immunization
  //DONE
  {
    name: "Hide HB024 if ever given or HepB0 7 days is checked",
    id: "q4cPUCRJ3wQ",
    condition: "(#{hboprev}==true||#{hbo24hrsprev}==true||#{hbo})",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "O8drIFUt4j8"
        }
      }
    ]
  },
  //need more info
  //de not found
  {
    name: "Hide Health facility selector if not provided else where",
    id: "lE2IyzEBPD6",
    condition: "#{placeOfVC} != 'Provided in other facility'",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "u9lncRQaojO"
        }
      }
    ]
  },
  //previous event
  //immunization
  //DONE
  {
    name: "Hide HepB0 < 7days if ever given or HepB0 <24hrs is checked",
    id: "WVA3XWRVvqX",
    condition: "(#{hboprev}==true||#{hbo24hrsprev}==true||#{hbo24hrs})",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "qyJMInEjWtJ"
        }
      }
    ]
  },
  //previous event
  //immunization
  //DONE
  {
    name: "Hide IPV1 if ever given",
    id: "bDfiU6SewXN",
    condition: "(d2:hasValue('ipv1prev'))",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "wQNvIFAlWdA"
        }
      }
    ]
  },
  //previous event
  //immunization
  //IPV2 not found
  {
    name: "Hide IPV2 if ever given or IPV1 not given",
    id: "BWQlNYBL500",
    condition: "(!d2:hasValue('ipv2prev'))",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "yEMXv73bX9g"
        }
      }
    ]
  },
  //previous event
  //immunization
  //DONE
  {
    name: "Hide JE if ever given or age less than 9 months",
    id: "oGiocyy8gk1",
    condition: "(#{jevprev}==true)",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "E4YaV9wahBu"
        }
      }
    ]
  },
  //previous event
  //immunization
  //DONE
  {
    name: "Hide MR 2 if ever given or age less than 12 month",
    id: "OzFyxebxZ4H",
    condition: "(#{mcv2prev}==true)",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "n6rveUjp5h1"
        }
      }
    ]
  },
  //previous event
  //immunization
  //DONE
  {
    name: "Hide OPV1 if ever given",
    id: "aNUBsTIAb5s",
    condition: "(#{opv1prev}==true)",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "TFIM3NzVlzn"
        }
      }
    ]
  },
  //previous event
  //immunization
  //DONE
  {
    name: "Hide OPV2 if ever given",
    id: "Rb39a1L9jmN",
    condition: "(#{opv2prev}==true)",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "eb5xGUCIGw3"
        }
      }
    ]
  },
  //previous event
  //immunization
  //DONE
  {
    name: "Hide OPV3 if ever given",
    id: "MfjMtrNcpPP",
    condition: "(#{opv3prev}==true)",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "TvfJjKrHq7m"
        }
      }
    ]
  },
  //previous event
  //immunization
  //DONE
  {
    name: "Hide PCV1 if ever given",
    id: "tjgTN0Nydlw",
    condition: "(#{pcv1prev}==true)",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "uQ6miuyuEle"
        }
      }
    ]
  },
  //previous event
  //immunization
  //DONE
  {
    name: "Hide PCV2 if ever given",
    id: "o937XnkI2mU",
    condition: "(#{pcv2prev}==true)",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "x1aaFGkMUtF"
        }
      }
    ]
  },
  //previous event
  //immunization
  //DONE
  {
    name: "Hide PCV3 if ever given",
    id: "dxBnkMqppa8",
    condition: "(#{pcv3prev}==true)",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "TXdcfWEjnCG"
        }
      }
    ]
  },
  //previous event
  //immunization
  //DONE
  {
    name: "Hide Rota1 if ever given",
    id: "lclL97hMS0V",
    condition: "(#{rota1prv}==true)",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "kI35yRT54NZ"
        }
      }
    ]
  },
  //previous event
  //immunization
  //DONE
  {
    name: "Hide Rota2 if ever given",
    id: "Fxk68DcdK3U",
    condition: "(#{rota2prv}==true)",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "u6ioEgMJf8j"
        }
      }
    ]
  },
  //
  {
    name: "Hide growth monitoring",
    id: "w7rxa1OVI36",
    condition: "V{current_date} == V{current_date}",
    programRuleActions: [
      {
        programRuleActionType: "HIDEPROGRAMSTAGE"
      },
      {
        programRuleActionType: "HIDEPROGRAMSTAGE"
      }
    ]
  },
  //previous event
  //immunization
  //DONE
  {
    name: "Hide measles1 if ever given",
    id: "GArE3e65Ms8",
    condition: "(#{measles1prev} == true)",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "EdCjK8sy4WH"
        }
      }
    ]
  },
  //previous event
  //immunization
  //DONE
  {
    name: "Hide measles2 if ever given",
    id: "TGAGPa5xmXf",
    condition: "(#{measles2prev}==true)",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "fwerjuyn3QC"
        }
      }
    ]
  },
  //birth details
  {
    name: "High birth weight > 10000g",
    id: "JiEXULeSRNa",
    condition: "#{birthWeight} > 10000 && d2:hasValue('birthWeight')",
    programRuleActions: [
      {
        programRuleActionType: "SHOWERROR",
        displayContent: "Weight is very high. Are you sure this weight in grams is correct?",
        dataElement: {
          id: "P1fhF8iYjm7"
        }
      }
    ]
  },
  //birth details
  {
    name: "Low birth weight < 2500g",
    id: "cADi4Hmytwx",
    condition: "#{birthWeight} < 2500 && d2:hasValue('birthWeight')",
    programRuleActions: [
      {
        programRuleActionType: "SHOWERROR",
        displayContent: "Weight is very low. Are you sure this weight in grams is correct?",
        dataElement: {
          id: "P1fhF8iYjm7"
        }
      }
    ]
  },
  //birth details
  //DONE
  {
    name: "PlaceOfBirth is health facility",
    id: "p2wcJmrUsWU",
    condition: "#{placeOfBirth} == 'Health Facility'",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "ceZPRvdgryp"
        }
      },
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "qjcqRVWCIqa"
        }
      }
    ]
  },
  //birth details
  //DONE
  {
    name: "PlaceOfBirth is home",
    id: "BzKfT7iO7oA",
    condition: "#{placeOfBirth} == 'Home'",
    programRuleActions: [
      {
        programRuleActionType: "HIDEFIELD",
        dataElement: {
          id: "O2aFWsqAvWr"
        }
      }
    ]
  },
  //immunization
  //DONE
  {
    name: "Warning BCG if not given at birthday +1",
    id: "Hy6qfxth6ki",
    condition: "(d2:daysBetween(A{Date of Birth},  V{event_date} )>1) && !d2:hasValue(#{bcgprev}) && !d2:hasValue(#{BCG})",
    programRuleActions: [
      {
        programRuleActionType: "SHOWWARNING",
        data: "'BCG vaccine should be given at birthday. Are you sure the event date is correct?'",
        displayContent: "BCG vaccine hasn't been given!",
        dataElement: {
          id: "G9kw7qj1duL"
        }
      }
    ]
  }
];
