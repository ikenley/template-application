import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { Alert } from "react-bootstrap";
import { Column } from "react-table";
import DataGrid from "../shared/grid/DataGrid";
import { MarketInfoResult, emptyMarketInfoResult } from "../types";
import GridCell from "../shared/grid/GridCell";
import OverlayTooltip from "../shared/OverlayTooltip";

type Props = {
  result: MarketInfoResult | null;
};

const GRID_HEIGHT = 600;

const MarketInfoGrid = ({ result }: Props) => {
  const { marketInfoRows, yearSummary } = result || emptyMarketInfoResult;
  const { lastObserved, firstPredicted, lastPredicted } = yearSummary;

  const columns: Column<any>[] = useMemo(
    () => [
      {
        Header: <span className="font-weight-bold">Region</span>,
        headerClassName: "text-center",
        accessor: "regionName",
        Cell: ({ value }) => <div className="text-center">{value}</div>,
      },
      {
        Header: (
          <OverlayTooltip
            id="market-info-grid-enrollment"
            placement="top"
            tooltip="Aliquam sed aliquam est. Nam in tellus in turpis maximus venenatis."
          >
            <span className="abbr">{lastObserved} Enrollment</span>
          </OverlayTooltip>
        ),
        headerClassName: "text-center",
        sortType: "basic",
        accessor: "enrollment",
        Cell: ({ value }) => (
          <GridCell value={value} format="0,0" className="text-center" />
        ),
      },
      {
        Header: (
          <OverlayTooltip
            id="market-info-grid-enrollment-share"
            placement="top"
            tooltip="Pellentesque sodales nisi in venenatis auctor. Curabitur a neque quis nulla vehicula cursus eget in sem."
          >
            <span className="abbr">{lastObserved} Market Share</span>
          </OverlayTooltip>
        ),
        headerClassName: "text-center",
        sortType: "basic",
        accessor: "enrollmentShare",
        Cell: ({ value }) => (
          <GridCell value={value} format="0,0.000%" className="text-center" />
        ),
      },

      {
        Header: (
          <OverlayTooltip
            id="market-info-grid-growth"
            placement="top"
            tooltip="Ut bibendum vel justo quis tempus. Suspendisse euismod blandit risus ut egestas. Curabitur sodales."
          >
            <span className="abbr">
              Growth {firstPredicted} - {lastPredicted}
            </span>
          </OverlayTooltip>
        ),
        headerClassName: "text-center",
        sortType: "basic",
        accessor: "predictedMarketGrowth",
        Cell: ({ value }) => (
          <GridCell value={value} format="0.0%" className="text-center" />
        ),
      },
    ],
    [lastObserved, firstPredicted, lastPredicted]
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
        <DataGrid
          columns={columns}
          data={marketInfoRows}
          maxHeight={GRID_HEIGHT}
        />
      ) : (
        <Skeleton height={GRID_HEIGHT} />
      )}
    </div>
  );
};

export default MarketInfoGrid;
