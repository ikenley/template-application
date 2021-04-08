import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { Column } from "react-table";
import { MarketShareResult } from "../../types";
import { FirstPredictionYear } from "../../constants";
import DataGrid from "../../shared/grid/DataGrid";
import GridCell from "../../shared/grid/GridCell";

type Props = {
  result: MarketShareResult | null;
};

const SKELETON_HEIGHT = 45;

const MarketShareGrid = ({ result }: Props) => {
  const data = useMemo(() => {
    if (!result) {
      return [];
    }

    const { regions, marketShareRowMap } = result;

    const regionMap = marketShareRowMap[FirstPredictionYear];

    // TODO consider refactoring as we firm up which columns to show
    const rows = regions.map((reg) => {
      const marketShare = regionMap[reg.id] ? regionMap[reg.id].marketShare : 0;
      const row = { regionId: reg.id, regionName: reg.name, marketShare };
      return row;
    });

    return rows;
  }, [result]);

  const columns: Column<any>[] = useMemo(
    () => [
      {
        Header: <div className="text-center">Region</div>,
        accessor: "regionName",
      },
      {
        Header: <div className="text-center">Estimated 2022 Market Share</div>,
        accessor: "marketShare",
        Cell: ({ value }) => <GridCell value={value} format="0.000%" />,
      },
    ],
    []
  );

  return (
    <div className="market-share-grid">
      {result ? (
        <DataGrid columns={columns} data={data} />
      ) : (
        <Skeleton height={388} />
      )}
    </div>
  );
};

export default MarketShareGrid;
