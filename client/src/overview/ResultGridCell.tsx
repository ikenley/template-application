import React from "react";
import NumberFormatSpan from "../shared/NumberFormatSpan";

type Props = {
  value: number;
  format?: string;
};

const ResultGridCell = ({ value, format = "0,0" }: Props) => (
  <div className="result-grid-cel text-right">
    {value === null ? null : <NumberFormatSpan value={value} format={format} />}
  </div>
);

export default ResultGridCell;
