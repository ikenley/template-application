import React from "react";
import NumberFormatSpan from "../NumberFormatSpan";

// Grid cell which renders a formatted number

type Props = {
  value: number;
  format?: string;
};

const GridCell = ({ value, format = "0,0" }: Props) => (
  <div className="result-grid-cel text-right">
    {value === null ? null : <NumberFormatSpan value={value} format={format} />}
  </div>
);

export default GridCell;
