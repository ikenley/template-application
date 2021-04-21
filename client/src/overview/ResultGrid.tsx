import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { take } from "lodash";
import { Column } from "react-table";
import DataGrid from "../shared/grid/DataGrid";
import { OverviewResult, emptyOverviewResult } from "../types";
import { PrimaryColor, SecondaryColor, TertiaryColor } from "../constants";
import GridCell from "../shared/grid/GridCell";
import OverlayTooltip from "../shared/OverlayTooltip";

type Props = {
  result: OverviewResult | null;
};

const MAX_ROW_COUNT = 11;
const DEFAULT_COL_WIDTH = 75;

const ResultGrid = ({ result }: Props) => {
  const { regionRows } = result || emptyOverviewResult;

  const data = useMemo(() => {
    return take(regionRows, MAX_ROW_COUNT);
  }, [regionRows]);

  const columns: Column<any>[] = useMemo(
    () => [
      {
        Header: <span className="font-weight-bold">Region</span>,
        headerClassName: "text-center",
        accessor: "regionName",
        width: 140,
      },
      {
        Header: () => (
          <div style={{ backgroundColor: PrimaryColor, color: "#fff" }}>
            <OverlayTooltip
              id="result-grid-reported"
              placement="top"
              tooltip="Vivamus non pellentesque mi. Ut ultrices nisl massa, a luctus enim vulputate porta."
            >
              <span className="abbr">Reported Data</span>
            </OverlayTooltip>
          </div>
        ),
        id: "reported",
        columns: [
          {
            Header: "2012",
            accessor: "yearObservedMap[2012].enrollment",
            sortType: "basic",
            width: DEFAULT_COL_WIDTH,
            Cell: ({ value }) => <GridCell value={value} />,
          },
          {
            Header: "2018",
            accessor: "yearObservedMap[2018].enrollment",
            sortType: "basic",
            width: DEFAULT_COL_WIDTH,
            Cell: ({ value }) => <GridCell value={value} />,
          },
          {
            Header: (
              <OverlayTooltip
                id="result-grid-pctenroll"
                placement="top"
                tooltip="Mauris a varius justo. Integer id scelerisque erat. Nam eget
              dolor efficitur, iaculis sapien a, imperdiet elit."
              >
                <span className="abbr">
                  % of <span className="d-none d-md-inline">Enrollment</span>
                  <span className="d-inline d-md-none">Enroll-ment</span>
                </span>
              </OverlayTooltip>
            ),
            accessor: "yearObservedMap[2018].percentTotalEnrollment",
            sortType: "basic",
            width: DEFAULT_COL_WIDTH,
            Cell: ({ value }) => <GridCell value={value} format="0.00%" />,
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
            accessor: "yearObservedMap[2018].marketShare",
            sortType: "basic",
            width: DEFAULT_COL_WIDTH,
            Cell: ({ value }) => <GridCell value={value} format="0.0000%" />,
          },
        ],
      },
      {
        Header: () => (
          <div style={{ backgroundColor: SecondaryColor, color: "#fff" }}>
            <OverlayTooltip
              id="result-grid-baseline"
              placement="top"
              tooltip="Proin nunc eros, aliquet sit amet viverra a, elementum vel diam. Nulla non metus in leo posuere suscipit."
            >
              <span className="abbr">Baseline Enrollment Forecast</span>
            </OverlayTooltip>
          </div>
        ),
        id: "baseline",
        columns: [
          {
            Header: "2022",
            accessor: "yearBaselineMap[2022].enrollment",
            sortType: "basic",
            width: DEFAULT_COL_WIDTH,
            Cell: ({ value }) => <GridCell value={value} />,
          },
          {
            Header: "2025",
            accessor: "yearBaselineMap[2025].enrollment",
            sortType: "basic",
            width: DEFAULT_COL_WIDTH,
            Cell: ({ value }) => <GridCell value={value} />,
          },
          {
            Header: "2030",
            accessor: "yearBaselineMap[2030].enrollment",
            sortType: "basic",
            width: DEFAULT_COL_WIDTH,
            Cell: ({ value }) => <GridCell value={value} />,
          },
          {
            Header: "2035",
            accessor: "yearBaselineMap[2035].enrollment",
            sortType: "basic",
            width: DEFAULT_COL_WIDTH,
            Cell: ({ value }) => <GridCell value={value} />,
          },
        ],
      },
      {
        Header: () => (
          <div style={{ backgroundColor: TertiaryColor, color: "#fff" }}>
            <OverlayTooltip
              id="result-grid-alternative"
              placement="top"
              tooltip="Suspendisse id lorem sed urna commodo tempus eu ac nulla. Sed vel faucibus elit, vitae vestibulum ante."
            >
              <span className="abbr">Alternative Forecast Scenario</span>
            </OverlayTooltip>
          </div>
        ),
        id: "alternative",
        columns: [
          {
            Header: "2022",
            accessor: "yearPredictedMap[2022].enrollment",
            sortType: "basic",
            width: DEFAULT_COL_WIDTH,
            Cell: ({ value }) => <GridCell value={value} />,
          },
          {
            Header: "2025",
            accessor: "yearPredictedMap[2025].enrollment",
            sortType: "basic",
            width: DEFAULT_COL_WIDTH,
            Cell: ({ value }) => <GridCell value={value} />,
          },
          {
            Header: "2030",
            accessor: "yearPredictedMap[2030].enrollment",
            sortType: "basic",
            width: DEFAULT_COL_WIDTH,
            Cell: ({ value }) => <GridCell value={value} />,
          },
          {
            Header: "2035",
            accessor: "yearPredictedMap[2035].enrollment",
            sortType: "basic",
            width: DEFAULT_COL_WIDTH,
            Cell: ({ value }) => <GridCell value={value} />,
          },
        ],
      },
    ],
    []
  );

  const options = useMemo(() => {
    return {
      initialState: {
        sortBy: [{ id: "yearObservedMap[2018].enrollment", desc: true }],
      },
    };
  }, []);

  return (
    <div className="result-grid mt-3">
      {result ? (
        <DataGrid columns={columns} data={data} options={options} />
      ) : (
        <Skeleton height={460} />
      )}
    </div>
  );
};

export default ResultGrid;
