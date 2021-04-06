import React, { useCallback, useMemo } from "react";
import { useTable, useFlexLayout } from "react-table";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import scrollbarWidth from "./scrollbarWidth";
import { noop } from "lodash";

type DataGridProps = {
  columns: any[];
  data: any[];
  handleRowClick?: (row: any) => void;
};

type TableProps = DataGridProps & {
  width: number;
};

function Table({ columns, data, width, handleRowClick }: TableProps) {
  // Use the state and functions returned from useTable to build your UI

  const defaultColumn = useMemo(
    () => ({
      width: 150,
    }),
    []
  );

  const scrollBarSize = useMemo(() => scrollbarWidth(), [scrollbarWidth]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    //totalColumnsWidth,
    prepareRow,
  } = useTable<any>(
    {
      columns,
      data,
      defaultColumn,
    },
    useFlexLayout
  );

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      const styleProps: any = { ...style, cursor: "pointer" };
      return (
        <div
          {...row.getRowProps({
            style: styleProps,
          })}
          className="tr"
          onClick={() => {
            handleRowClick ? handleRowClick(row.original) : noop();
          }}
        >
          {row.cells.map((cell) => {
            return (
              <div {...cell.getCellProps()} className="td">
                {cell.render("Cell")}
              </div>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows, handleRowClick]
  );

  const headerWidth = width - scrollBarSize;

  // Render the UI for your table
  return (
    <div
      {...getTableProps()}
      className="data-grid-table sticky-table table table-sm table-striped table-bordered table-hover"
    >
      <div className="thead">
        {headerGroups.map((headerGroup) => (
          <div
            {...headerGroup.getHeaderGroupProps({
              style: { width: `${headerWidth}px`, display: "flex" },
            })}
            className="tr"
          >
            {headerGroup.headers.map((column) => (
              <div {...column.getHeaderProps()} className="th">
                {column.render("Header")}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()} className="tbody">
        <FixedSizeList
          height={400}
          itemCount={rows.length}
          itemSize={35}
          width={width}
        >
          {RenderRow}
        </FixedSizeList>
      </div>
    </div>
  );
}

const DataGrid = ({ columns, data, handleRowClick }: DataGridProps) => {
  return (
    <div className="data-grid w-100">
      <AutoSizer disableHeight>
        {({ width }) => (
          <div style={{ width: `${width}px` }}>
            <Table
              columns={columns}
              data={data}
              handleRowClick={handleRowClick}
              width={width}
            />
          </div>
        )}
      </AutoSizer>
    </div>
  );
};

export default DataGrid;
