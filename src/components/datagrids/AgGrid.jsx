import React, { useEffect, useState, forwardRef } from "react";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/all-modules";
import { AgGridReact } from "@ag-grid-community/react";

import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-balham-dark.css";
import "@/styles/ag-custom.scss";

ModuleRegistry.register(ClientSideRowModelModule);

const AgGrid = (props) => {
  const {
    rowData,
    columnDefs,
    pagination = true,
    showPagination = true,
    rowPerPage = 1000,
    autoWidth = true,
    onCellClicked,
    totalElements,
    totalPages,
    currentPage,
    goPrevPage,
    goNextPage,
    setDetail,
    isBottom,
  } = props;

  const [gridApi, setGridApi] = useState(null);
  const [setGridColumnApi] = useState(null);

  useEffect(() => {
    if (gridApi) {
      gridApi.sizeColumnsToFit();
    }
  }, [rowData]);
  const onGridReady = (params) => {
    setGridApi(params.api);
    // setGridColumnApi(params.columnApi);
  };
  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };
  const onGridSizeChanged = (params) => {
    const gridWidth = document.getElementById("my-grid").offsetWidth;
    const columnsToShow = [];
    const columnsToHide = [];
    let totalColsWidth = 0;
    const allColumns = params.columnApi.getAllColumns();
    for (let i = 0; i < allColumns.length; i++) {
      const column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);
    params.api.sizeColumnsToFit();
  };
  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  };

  const onSelectionChanged = ({ api }) => {
    const tempArr = api.getSelectedRows();
    setDetail(tempArr[0].id);
  };
  return (
    <div
      id="my-grid"
      className="grid-wrapper ag-theme-alpine"
      // style={{ height: 410 }}
    >
      <AgGridReact
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        onFirstDataRendered={onFirstDataRendered}
        onGridSizeChanged={onGridSizeChanged}
        rowData={rowData}
        columnDefs={columnDefs}
        autoWidth={autoWidth}
        pagination={pagination}
        paginationPageSize={rowPerPage}
        cacheBlockSize={rowPerPage}
        suppressPaginationPanel={true}
        onCellClicked={onCellClicked}
        onSelectionChanged={onSelectionChanged}
      />
      <div
        id="pagination"
        style={
          showPagination && pagination
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <div className="paging-wrap">
          <div>
            {/* <select className="btn_comm">
                            <option value="10">10건</option>
                            <option value="20">20건</option>
                            <option value="50">50건</option>
                        </select> */}
            <span>총 {totalElements !== 0 ? totalElements : 0}건</span>
            {/* <span> | {rowPerPage * currentPage - rowPerPage}~{rowPerPage * currentPage}건</span> */}
          </div>
          {isBottom ? (
            ""
          ) : (
            <div className="btn-wrap">
              <button type="button" className="btn_comm" onClick={goPrevPage}>
                <span className="btnLabel_icon hover prev">Prev</span>
              </button>
              <span className="page-num">
                {currentPage} of {totalPages}
              </span>
              <button type="button" className="btn_comm">
                <span className="btnLabel_icon hover next" onClick={goNextPage}>
                  Next
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { AgGrid };
