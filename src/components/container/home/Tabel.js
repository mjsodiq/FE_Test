import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activated_modal_changed, modal_changeState, ruasGet } from "../../../reducers/app_slice";
import { useTable, usePagination, useGlobalFilter, useSortBy } from "react-table";
import GlobalFilter from "./GlobalFilter";
import { useCallback } from "react";

function Tabel() {
    const data_ruas = useSelector((state) => state.app.dataRuas);
    const dispatch = useDispatch();

    const data = useMemo(() => data_ruas, [data_ruas]);

    const columns = useMemo(
        () => [
            {
                Header: "No",
                accessor: "no",
                Cell: (row) => {
                    return `${row.row.index + 1}`;
                },
            },
            {
                Header: "Ruas",
                accessor: "ruas",
            },
            {
                Header: "Unit Kerja",
                accessor: "unit",
            },
            {
                Header: "Gambar",
                accessor: "picture",
                Cell: (props) => {
                    const lihatGambar_onClick = () => {
                        const data = props.cell.row.original;
                        dispatch(activated_modal_changed({ currentActiveModal: "LihatGambar", data: data }));
                        dispatch(modal_changeState());
                    };
                    return (
                        <div onClick={lihatGambar_onClick} className={`border rounded bg-blue-500 text-sm text-white p-2 select-none flex items-center justify-center cursor-pointer`}>
                            Lihat Gambar
                        </div>
                    );
                },
            },
            {
                Header: "Tanggal",
                accessor: "date_create",
                Cell: (props) => {
                    const date = new Date(props.cell.value);
                    const tanggal = `0${date.getDate()}`.slice(-2);
                    const month = `0${date.getMonth()}`.slice(-2);
                    const final_tanggal = `${tanggal}-${month}-${date.getFullYear()}`;
                    return final_tanggal;
                },
            },
        ],
        []
    );
    const GlobalFilterComp = useCallback((filter, setFilter) => {
        return <GlobalFilter />;
    }, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        setPageSize,
        setGlobalFilter,
        state: { pageIndex, pageSize, globalFilter },
    } = useTable({ data, columns, initialState: { pageIndex: 0 } }, useGlobalFilter, useSortBy, usePagination);

    const Table = () => {
        // const active_button = "border rounded px-2 py-1 text-black";
        // const inactive_button = "border rounded px-2 py-1 text-slate-200";
        const active_button = "border border-black w-6 rounded-r";
        const inactive_button = "border border-black w-6 rounded-l";
        return (
            <div className="flex flex-1 flex-col w-full gap-2">
                <div className="flex items-center gap-2 justify-between select-none">
                    <div className="flex gap-2 items-center">
                        <span>Show</span>
                        <input
                            type="number"
                            value={pageSize}
                            onChange={(e) => {
                                if (Number(e.target.value) > 0) {
                                    setPageSize(Number(e.target.value));
                                }
                            }}
                            min="1"
                            max="999"
                            className="py-1 w-28 select-none text-center rounded-md"
                        />
                        <span>entries</span>
                    </div>
                    <GlobalFilterComp filter={globalFilter} setFilter={setGlobalFilter} />
                </div>
                <table {...getTableProps()} className={`border-separate border-spacing-0 w-full border rounded-t`}>
                    <thead className="rounded">
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()} className="rounded">
                                {headerGroup.headers.map((column) => {
                                    return (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())} className="border border-blue-500 p-[4px] pt-3 pb-3 text-center bg-blue-500 text-white first:rounded-tl last:rounded-tr">
                                            <div className="flex justify-between items-center min-w-[100px]">
                                                {column.render("Header")}
                                                <span>{column.Header === "Action" ? "" : column.isSorted ? (column.isSortedDesc ? "⇩" : "⇧") : "⇋"}</span>
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className=" even:bg-slate-100 hover:bg-slate-200">
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()} className="border border-slate-300 p-[4px]">
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="flex-1"></div>
                <div className="pagination flex items-center justify-end gap-10">
                    <div className="flex">
                        {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className={`${canPreviousPage ? active_button : inactive_button}`}>
                            {"<<"}
                        </button>{" "} */}
                        <button onClick={() => previousPage()} disabled={!canPreviousPage} className={`${canPreviousPage ? active_button : inactive_button}`}>
                            {"<"}
                        </button>{" "}
                        <span className="w-10 border border-black text-center z-1">
                            {/* Page{" "} */}
                            {/* <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{" "} */}
                            <strong>{pageIndex + 1}</strong>{" "}
                        </span>
                        <button onClick={() => nextPage()} disabled={!canNextPage} className={`${canNextPage ? active_button : inactive_button}`}>
                            {">"}
                        </button>{" "}
                        {/* <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className={`${canNextPage ? active_button : inactive_button}`}>
                            {">>"}
                        </button> */}
                    </div>
                </div>
            </div>
        );
    };

    useEffect(() => {
        dispatch(ruasGet());
    }, [dispatch]);

    return (
        <div>
            <Table />
        </div>
    );
}

export default Tabel;
