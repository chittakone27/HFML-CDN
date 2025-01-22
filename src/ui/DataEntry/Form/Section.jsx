import { useState } from "react";
import { useTable } from "react-table";
import { Input } from "@/ui/common";
import { Tabs, Tab } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./Section.css";

const SectionTable = ({ columns, data, totalColumns, title, filter }) => {
  const filteredData = data.filter((row) => {
    if (filter) {
      if (row.de.toLowerCase().includes(filter.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  });

  const transformColumns = () => {
    columns.push({ Header: "Total", accessor: "total" });
    return columns;
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: columns,
    data: filteredData
  });

  return (
    <div className="data-entry-form-section-table-container">
      <div className="section-table-content">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Section = ({ title, tables }) => {
  const [filter, setFilter] = useState("");
  const { t } = useTranslation();
  return (
    <div className="data-entry-form-section">
      <div className="data-entry-form-section-title">{title}</div>
      <div className="data-entry-form-section-content">
        <div style={{ width: 350 }}>
          <Input
            label={t("filterInSection")}
            valueType="TEXT"
            change={(value) => {
              setFilter(value);
            }}
          />
        </div>
        <br />
        {tables.map((table) => (
          <SectionTable title={table.title} columns={table.columns} data={table.data} totalColumns={table.totalColumns} filter={filter} />
        ))}
      </div>
    </div>
  );
};

const SectionTabs = ({ sections }) => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const [filter, setFilter] = useState("");
  const tables = sections[tab].tableData;
  return (
    <div className="section-tabs-container">
      <div>
        <Tabs
          value={tab}
          onChange={(event, newTab) => {
            setTab(newTab);
          }}
        >
          {sections.map((section) => {
            return <Tab label={section.name} />;
          })}
        </Tabs>
      </div>
      <div>
        <div style={{ width: 350 }}>
          <Input
            label={t("filterInSection")}
            valueType="TEXT"
            change={(value) => {
              setFilter(value);
            }}
          />
        </div>
        <br />
        {tables.map((table) => (
          <SectionTable title={table.title} columns={table.columns} data={table.data} totalColumns={table.totalColumns} filter={filter} />
        ))}
      </div>
    </div>
  );
};

const SectionVertical = ({ sections }) => {
  return (
    <div>
      {sections.map((section) => {
        return <Section title={section.name} tables={section.tableData} />;
      })}
    </div>
  );
};

export { Section, SectionTabs, SectionTable, SectionVertical };
