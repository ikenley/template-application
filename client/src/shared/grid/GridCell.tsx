import React from "react";
import classNames from "classnames";
import NumberFormatSpan from "../NumberFormatSpan";

// Grid cell which renders a formatted number

type Props = {
  value: number;
  format?: string;
  className?: string;
};

const GridCell = ({
  value,
  format = "0,0",
  className = "text-right",
}: Props) => (
  <div className={classNames("result-grid-cel", className)}>
    {value === null ? null : <NumberFormatSpan value={value} format={format} />}
  </div>
);

export default GridCell;
