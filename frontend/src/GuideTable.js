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
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={props.rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}

export default GuideTable;
