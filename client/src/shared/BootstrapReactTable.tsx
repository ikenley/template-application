import React from "react";
import { Table as BTable, Pagination } from "react-bootstrap";
import { useTable, usePagination } from "react-table";

type Props = {
  columns: any[];
  data: any[];
  handleRowClick?: (row: any) => {};
};

const BootstrapReactTable = ({ columns, data }: Props) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<any>(
    {
      columns,
      data,
    },
    usePagination
  );

  return (
    <div className="bootstrap-react-table">
      <BTable striped bordered hover size="sm" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {page.map((row: any, i: number) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </BTable>
      <div className="pagination-toolbar d-lg-flex align-items-center">
        <div className="d-block d-inline-block mr-2">
          <Pagination className="mb-2">
            <Pagination.First
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            />
            <Pagination.Prev
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            />

            <Pagination.Next
              onClick={() => nextPage()}
              disabled={!canNextPage}
            />
            <Pagination.Last
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            />
          </Pagination>
        </div>
        <span className="d-block mb-2 mr-2">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <div className="d-block mb-2">
          <select
            className="form-control"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default BootstrapReactTable;
