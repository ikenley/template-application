import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { Column } from "react-table";
import { MarketShareResult } from "../../types";
import { displayPredictionYears } from "../../constants";
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

    const getMarketShareByYearRegion = (year: number, regionId: number) => {
      const regionMap = marketShareRowMap[year];
      if (!regionMap) {
        return 0;
      }

      return regionMap[regionId] ? regionMap[regionId].marketShare : 0;
    };

    // TODO consider refactoring as we firm up which columns to show
    const rows = regions.map((reg) => {
      const row: any = { regionId: reg.id, regionName: reg.name };
      displayPredictionYears.forEach((year) => {
        row[year] = getMarketShareByYearRegion(year, reg.id);
      });
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
        Header: () => (
          <div className="text-center font-weight-bold">
            Estimated Market Share
          </div>
        ),
        id: "estimated_enrollment_demand",
        columns: displayPredictionYears.map((year) => {
          return {
            Header: <div className="text-center">{year}</div>,
            accessor: `${year}`,
            Cell: ({ value }: any) => (
              <GridCell value={value} format="0.000%" />
            ),
          };
        }),
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
