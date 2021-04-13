import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { Column } from "react-table";
import DataGrid from "../../shared/grid/DataGrid";
import GridCell from "../../shared/grid/GridCell";
import {
  CustomMarketShareResult,
  CustomMarketShareRow,
  CustomMarketShareOption,
} from "../../types";
import CustomMarketShareSlider from "./CustomMarketShareSlider";

type Props = {
  isLoading: boolean;
  institutionId: number;
  sessionOptionMap: { [key: number]: number };
  handleCustomOptionChange: (optionMap: any) => void;
};

const SKELETON_HEIGHT = 350;

const defaultOption: CustomMarketShareOption = {
  optionId: 0,
  marketShare: 0,
};

const CustomMarketSharePanel = ({
  isLoading,
  institutionId,
  sessionOptionMap,
  handleCustomOptionChange,
}: Props) => {
  const [result, setResult] = useState<CustomMarketShareResult | null>(null);
  const [regionRows, setRegionRows] = useState<CustomMarketShareRow[] | null>(
    null
  );

  // On institutionId change, update CustomMarketShareResult
  useEffect(() => {
    setResult(null);

    if (isLoading) {
      return;
    }

    axios
      .get(`/api/marketshare/custom-options/${institutionId}`)
      .then((res) => {
        setResult(res.data);
        console.log("/api/marketshare/custom-options", res.data);
      });
  }, [isLoading, institutionId]);

  // on CustomMarketShareResult change, update rows
  useEffect(() => {
    if (!result) {
      setRegionRows(null);
      return;
    }

    const rows: CustomMarketShareRow[] = result.regions.map((reg) => {
      const options = result.optionMap[reg.id] || [];
      const selOptionId = sessionOptionMap[reg.id] || 0;
      const selOption =
        result.optionMap[reg.id].find((opt) => opt.optionId === selOptionId) ||
        defaultOption;

      const minOptionId = options[0].optionId;
      const maxOptionId = options[options.length - 1].optionId;

      return {
        regionId: reg.id,
        regionName: reg.name,
        selOption,
        options,
        minOptionId,
        maxOptionId,
      };
    });

    setRegionRows(rows);
  }, [result, sessionOptionMap, setRegionRows]);

  const handleOptionChange = useCallback(
    (row: CustomMarketShareRow, optionId: number) => {
      const optionMap = { ...sessionOptionMap };

      optionMap[row.regionId] = optionId;

      handleCustomOptionChange(optionMap);
    },
    [sessionOptionMap, handleCustomOptionChange]
  );

  const columns: Column<any>[] = useMemo(
    () => [
      {
        Header: <div className="text-center">Region</div>,
        accessor: "regionName",
        width: 100,
      },
      {
        Header: "Market Share",
        accessor: "selOption.marketShare",
        width: 50,
        Cell: ({ value }: any) => <GridCell value={value} format="0.000%" />,
      },
      {
        Header: (
          <div className="row mx-1 no-gutters text-center">
            <span className="col">Sharp Decline</span>
            <span className="col">Decline</span>
            <span className="col">Stable</span>
            <span className="col">Increase</span>
            <span className="col">Sharp Increase</span>
          </div>
        ),
        accessor: "regionId",
        width: 250,
        Cell: ({ row }: any) => (
          <CustomMarketShareSlider
            row={row.original}
            handleOptionChange={handleOptionChange}
          />
        ),
      },
    ],
    [handleOptionChange]
  );

  if (isLoading) {
    return (
      <div className="market-share-selector">
        <Skeleton height={SKELETON_HEIGHT} />
      </div>
    );
  }

  return (
    <div className="custom-market-share-panel">
      <Alert variant="dark">
        Cras eleifend ultricies quam, at imperdiet odio tempor in. Cras dictum
        ornare lorem, quis porta augue ullamcorper iaculis. Etiam aliquam
        consequat gravida. In vitae tortor eu lacus fringilla varius a quis
        nisi.
      </Alert>
      {regionRows ? (
        <DataGrid columns={columns} data={regionRows} />
      ) : (
        <Skeleton height={SKELETON_HEIGHT} />
      )}
    </div>
  );
};

export default CustomMarketSharePanel;
