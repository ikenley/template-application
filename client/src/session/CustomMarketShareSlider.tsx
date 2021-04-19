import React, { useCallback } from "react";
import { Form } from "react-bootstrap";
import { CustomMarketShareRow } from "../types";

type Props = {
  row: CustomMarketShareRow;
  handleOptionChange: (row: CustomMarketShareRow, optionId: number) => void;
};

const CustomMarketShareSlider = ({ row, handleOptionChange }: Props) => {
  const { minOptionId, maxOptionId, selOption } = row;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const optionId = parseInt(e.currentTarget.value);
      handleOptionChange(row, optionId);
    },
    [handleOptionChange, row]
  );

  return (
    <div className="custom-market-share-slider mx-1">
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
