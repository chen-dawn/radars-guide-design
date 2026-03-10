import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function GuideTable(props) {
  const columns = [
    {
      field: "guideName",
      headerName: "Guide Name",
      width: 150,
      editable: false,
    },
    { field: "pos", headerName: "Position", width: 90 },
    {
      field: "generatedGuide",
      headerName: "Generated Guide",
      width: 290,
      editable: true,
    },
    {
      field: "guideTarget",
      headerName: "Target Sequence",
      width: 280,
      editable: true,
    },
  ];

  return (
    <div className="results-table-shell">
      <DataGrid
        rows={props.rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        sx={{
          border: "none",
          color: "#13242a",
          "& .MuiDataGrid-toolbarContainer": {
            padding: "0.5rem 0.75rem 0.75rem",
            gap: "0.5rem",
            borderBottom: "1px solid rgba(16, 58, 68, 0.08)",
          },
          "& .MuiButton-text": {
            color: "#103a44",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(16, 58, 68, 0.06)",
            borderBottom: "1px solid rgba(16, 58, 68, 0.08)",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 700,
            letterSpacing: "0.02em",
          },
          "& .MuiDataGrid-row": {
            backgroundColor: "rgba(255, 255, 255, 0.82)",
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "rgba(245, 239, 229, 0.82)",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgba(217, 123, 45, 0.10)",
          },
          "& .MuiDataGrid-cell": {
            alignItems: "flex-start",
            whiteSpace: "normal",
            lineHeight: 1.45,
            py: 1.25,
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid rgba(16, 58, 68, 0.08)",
            backgroundColor: "rgba(16, 58, 68, 0.03)",
          },
        }}
      />
    </div>
  );
}

export default GuideTable;
