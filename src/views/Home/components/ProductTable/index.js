import { useEffect, useMemo } from "react";
import "./index.css";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from "react-table";
import ColumnFilter from "./components/ColumnFilter";
import { Checkbox } from "./components/Checkbox";
import { Table, Spinner } from 'react-bootstrap';


export default function ProductTable({
  columnas,
  datos,
  isLoading,
  rows = 10,
  flag = true,
  setSelectedProducts = () => {}
}) {
  // eslint-disable-next-line
  const columns = useMemo(() => columnas, []);
  // eslint-disable-next-line
  const data = useMemo(() => datos, [datos]);

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
    // eslint-disable-next-line
  }, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      if (flag) {
        hooks.visibleColumns.push((columns) => {
          return [
            {
              id: "selection",
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <Checkbox {...getToggleAllRowsSelectedProps()} />
              ),
              Cell: ({ row }) => (
                <Checkbox {...row.getToggleRowSelectedProps()} />
              ),
            },
            ...columns,
          ];
        });
      }
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
    selectedFlatRows,
  } = tableInstance;
  // eslint-disable-next-line
  const { globalFilter, pageIndex, pageSize } = state;

  useEffect(() => {
    setPageSize(rows);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setSelectedProducts(selectedFlatRows);
    // eslint-disable-next-line
  }, [selectedFlatRows]);

  // eslint-disable-next-line

  return (
    <>
        <Table 
        responsive={isLoading ? false : true} 
        striped 
        bordered 
        hover 
        size='sm' 
        {...getTableProps()} 
        className="tabla-propia"
        >
          <thead className="tabla-header-propio">
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="th-propio"
                  >
                    <div
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {" "}
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " ↓"
                            : " ↑"
                          : " "}
                      </span>
                    </div>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>          
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  className="table"
                  {...row.getRowProps()}
                  key={i}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
        { isLoading && 
          <div class="spinner">
            <Spinner class="spinner-border" animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner> 
          </div>
        }
        <nav
          aria-label="Page navigation example"
          className="d-flex justify-content-end mr-3"
        >
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </button>
            </li>
            <li className="page-item">
              <span className="page-link">
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
            </li>

            <li className="page-item">
              <button
                className="page-link"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      {/* <pre>
                <code>
                {JSON.stringify(
                  {
                            selectedFlatRows: selectedFlatRows.map((row) => row.original),
                        },
                        null,
                        2
                    )}
                </code>
            </pre> */}
    </>
  );
}
