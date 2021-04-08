import React, { useCallback, useMemo } from "react";
import { useTable, useFlexLayout, useFilters } from "react-table";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import scrollbarWidth from "../scrollbarWidth";
import { noop } from "lodash";
import DefaultColumnFilter from "./DefaultColumnFilter";
import SelectColumnFilter from "./SelectColumnFilter";
import { relative } from "node:path";

type DataGridProps = {
  columns: any[];
  data: any[];
  maxHeight?: number;
  handleRowClick?: (row: any) => void;
};

type TableProps = DataGridProps & {
  parentWidth: number;
};

const ITEM_SIZE = 35;

function Table({
  columns,
  data,
  handleRowClick,
  maxHeight = 400,
  parentWidth,
}: TableProps) {
  // Use the state and functions returned from useTable to build your UI

  const defaultColumn = useMemo(
    () => ({
      width: 100,
      disableFilters: true,
    }),
    []
  );

  const filterTypes = useMemo(
    () => ({
      // Override the default text filter to use "startWith"
      text: (rows: any, id: any, filterValue: any) => {
        return rows.filter((row: any) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
  } = useTable<any>(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
    },
    useFlexLayout,
    useFilters
  );

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      const styleProps: any = {
        ...style,
        cursor: handleRowClick ? "pointer" : "inherit",
      };
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

  const width = Math.max(totalColumnsWidth, parentWidth);
  console.log("totalColumnsWidth", totalColumnsWidth);

  const headerWidth = useMemo(() => {
    // If items exceed height of window, subtract scrollbar width
    if (rows.length * ITEM_SIZE > maxHeight) {
      const scrollBarSize = scrollbarWidth();
      return width - scrollBarSize;
    }
    return width;
  }, [width, maxHeight, rows.length]);

  const height = useMemo(() => {
    return Math.min(maxHeight, rows.length * ITEM_SIZE);
  }, [maxHeight, rows]);

  // Render the UI for your table
  return (
    <div
      {...getTableProps()}
      className="data-grid-table sticky-table table table-sm table-striped table-bordered table-hover mb-0"
      style={{ width: `${headerWidth}px` }}
    >
      <div className="thead" style={{ position: "relative" }}>
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
                {/* Render the columns filter UI */}
                <div>{column.canFilter ? column.render("Filter") : null}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()} className="tbody fixed-size-list-outer">
        <FixedSizeList
          itemCount={rows.length}
          itemSize={35}
          width={width}
          height={height}
        >
          {RenderRow}
        </FixedSizeList>
      </div>
    </div>
  );
}

const DataGrid = ({
  columns,
  data,
  maxHeight,
  handleRowClick,
}: DataGridProps) => {
  return (
    <div className="data-grid table-responsive">
      <AutoSizer disableHeight>
        {({ width }) => (
          <div
            style={{
              width: `${width}px`,
            }}
          >
            <Table
              columns={columns}
              data={data}
              handleRowClick={handleRowClick}
              maxHeight={maxHeight}
              parentWidth={width - 1}
            />
          </div>
        )}
      </AutoSizer>
    </div>
  );
};

export default DataGrid;
export { DefaultColumnFilter, SelectColumnFilter };
