import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { Alert } from "react-bootstrap";
import DataGrid from "../shared/grid/DataGrid";
import { ComparisonResult, emptyComparisonResult } from "../types";
import NumberFormatSpan from "../shared/NumberFormatSpan";

type Props = {
  result: ComparisonResult | null;
};

const GRID_HEIGHT = 600;

const CompareGrid = ({ result }: Props) => {
  const { comparisonRows, institutions, yearSummary } =
    result || emptyComparisonResult;
  const { firstObserved } = yearSummary;

  const data = useMemo(() => {
    return comparisonRows.filter((r) => r.hasData);
  }, [comparisonRows]);

  const columns: any = useMemo(
    () => [
      {
        Header: "Year",
        headerClassName: "text-center",
        accessor: "year",
        width: 50,
        Cell: ({ value }: any) => <div className="text-center">{value}</div>,
      },
      {
        Header: `Enrollment (% Change from Index Year)`,
        headerClassName: "text-center",
        id: "enrollment_header",
        columns: institutions.map((inst, ix) => {
          return {
            Header: (
              <span>
                {inst.name} ({inst.id})
              </span>
            ),
            id: `dataPoints_${ix}`,
            headerClassName: "text-center",
            sortType: "basic",
            accessor: `dataPoints[${ix}].enrollment`,
            width: 120,
            disableSortBy: true,
            institutionIx: ix,
            Cell: ({ row, column }: any) => {
              const { original } = row;
              const { institutionIx } = column;
              const dataPoint = original.dataPoints[institutionIx];
              const { enrollment, percentChangeFromIndex } = dataPoint;
              return (
                <div className="text-center">
                  <NumberFormatSpan value={enrollment} format="0,0" /> (
                  <NumberFormatSpan
                    value={percentChangeFromIndex}
                    format="0.0%"
                  />
                  )
                </div>
              );
            },
          };
        }),
      },
    ],
    [institutions]
  );

  return (
    <div className="market-info-grid mt-3">
      <Alert variant="dark">
        Quisque scelerisque aliquam consectetur. Cras eget elit quis eros luctus
        pulvinar. Curabitur dictum vel lacus ut tempor. Maecenas posuere, nunc
        at ullamcorper pellentesque, dolor sem lobortis metus, pretium
        vestibulum libero lorem in dui. In hac habitasse platea dictumst. Duis
        scelerisque sit amet diam vitae viverra.
      </Alert>
      {result ? (
        <DataGrid columns={columns} data={data} maxHeight={GRID_HEIGHT} />
      ) : (
        <Skeleton height={GRID_HEIGHT} />
      )}
    </div>
  );
};

export default CompareGrid;
