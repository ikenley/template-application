import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { take } from "lodash";
import { Column } from "react-table";
import DataGrid from "../shared/grid/DataGrid";
import { OverviewResult, emptyOverviewResult } from "../types";
import ResultGridCell from "./ResultGridCell";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import OverlayTooltip from "../shared/OverlayTooltip";

type Props = {
  result: OverviewResult | null;
};

const MAX_ROW_COUNT = 11;

const ResultGrid = ({ result }: Props) => {
  const { regionRows } = result || emptyOverviewResult;

  const data = useMemo(() => {
    return take(regionRows, MAX_ROW_COUNT);
  }, [regionRows]);

  const columns: Column<any>[] = useMemo(
    () => [
      {
        Header: <div className="text-center font-weight-bold">Region</div>,
        accessor: "regionName",
        width: 250,
      },
      {
        Header: () => (
          <div className="text-center font-weight-bold">Reported Data</div>
        ),
        id: "reported_data",
        columns: [
          {
            Header: "2012",
            accessor: "yearDataPointMap[2012].enrollment",
            Cell: ({ value }) => <ResultGridCell value={value} />,
          },
          {
            Header: "2018",
            accessor: "yearDataPointMap[2018].enrollment",
            Cell: ({ value }) => <ResultGridCell value={value} />,
          },
          {
            Header: (
              <OverlayTooltip
                id="result-grid-pctenroll"
                placement="top"
                tooltip="Mauris a varius justo. Integer id scelerisque erat. Nam eget
              dolor efficitur, iaculis sapien a, imperdiet elit."
              >
                <span className="abbr">% of Enrollemnt</span>
              </OverlayTooltip>
            ),
            accessor: "yearDataPointMap[2018].percentTotalEnrollment",
            Cell: ({ value }) => (
              <ResultGridCell value={value} format="0.00%" />
            ),
            width: 150,
          },
          {
            Header: (
              <OverlayTooltip
                id="result-grid-pctenroll"
                placement="top"
                tooltip="Ut finibus, augue vel ultricies euismod, ipsum felis viverra sapien, nec varius eros metus sit amet arcu."
              >
                <span className="abbr">2018 Market Share</span>
              </OverlayTooltip>
            ),
            accessor: "yearDataPointMap[2018].marketShare",
            Cell: ({ value }) => (
              <ResultGridCell value={value} format="0.0000%" />
            ),
            width: 150,
          },
        ],
      },
      {
        Header: () => (
          <div className="text-center font-weight-bold">
            Estimated Enrollment Demand
          </div>
        ),
        id: "estimated_enrollment_demand",
        columns: [
          {
            Header: "2022",
            accessor: "yearDataPointMap[2022].enrollment",
            Cell: ({ value }) => <ResultGridCell value={value} />,
          },
          {
            Header: "2025",
            accessor: "yearDataPointMap[2025].enrollment",
            Cell: ({ value }) => <ResultGridCell value={value} />,
          },
          {
            Header: "2030",
            accessor: "yearDataPointMap[2030].enrollment",
            Cell: ({ value }) => <ResultGridCell value={value} />,
          },
          {
            Header: "2035",
            accessor: "yearDataPointMap[2035].enrollment",
            Cell: ({ value }) => <ResultGridCell value={value} />,
          },
        ],
      },
    ],
    []
  );

  return (
    <div className="result-grid mt-3 table-responsive-max-height-500">
      {result ? (
        <DataGrid columns={columns} data={data} />
      ) : (
        <Skeleton height={460} />
      )}
    </div>
  );
};

export default ResultGrid;
