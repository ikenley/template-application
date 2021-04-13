import React, { useCallback } from "react";
import { Form } from "react-bootstrap";
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

type Props = {
  row: CustomMarketShareRow;
  handleOptionChange: (row: CustomMarketShareRow, optionId: number) => void;
};

const CustomMarketShareSlider = ({ row, handleOptionChange }: Props) => {
  console.log("row", row);
  const { minOptionId, maxOptionId, selOption } = row;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const optionId = parseInt(e.currentTarget.value);
      handleOptionChange(row, optionId);
    },
    [handleOptionChange, row]
  );

  return (
    <div className="custom-market-share-slider">
      <Form.Control
        type="range"
        min={minOptionId}
        max={maxOptionId}
        step="1"
        value={selOption.optionId}
        onChange={handleChange}
      />
    </div>
  );
};

export default CustomMarketShareSlider;
