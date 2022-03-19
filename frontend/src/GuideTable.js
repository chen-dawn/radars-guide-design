import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function GuideTable(props) {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "pos", headerName: "Position", width: 90 },
    {
      field: "guideName",
      headerName: "Guide Name",
      width: 150,
      editable: false,
    },
    {
      field: "generatedGuide",
      headerName: "Generated Guide",
      width: 300,
      editable: false,
    },
    {
      field: "guideTarget",
      headerName: "Target Sequence",
      width: 300,
      editable: false,
    },
  ];

  return (
    <div style={{ height: 800, width: "100%" }}>
      <DataGrid
        rows={props.rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}

export default GuideTable;
