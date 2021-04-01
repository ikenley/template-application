import React from "react";
import { Table } from "react-bootstrap";
import { OverviewResult } from "./types";
import ResultGridRow from "./ResultGridRow";

type Props = {
  result: OverviewResult | null;
};

const ResultGrid = ({ result }: Props) => {
  if (!result) {
    return null;
  }

  const { years, regionRows } = result;

  return (
    <div className="result-grid mt-3 table-responsive-max-height-500">
      <Table
        responsive
        striped
        bordered
        hover
        size="sm"
        className="sticky-table"
      >
        <thead>
          <tr>
            <th>Region</th>
            {years.map((y) => (
              <th key={y}>{y}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {regionRows.map((row) => (
            <ResultGridRow key={row.regionId} years={years} row={row} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ResultGrid;
