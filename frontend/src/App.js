import * as React from "react";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { GuideDesignForm } from "./GuideDesignForm";
import "./App.css";
import Copyright from "./Copyright";

function TitleBar() {
  return (
    <Paper className="title-shell" elevation={0}>
      <Typography variant="h3" component="h1" className="simple-title">
        RADARS Guide Design Tool
      </Typography>
      <Typography variant="body1" className="simple-subtitle">
        Paste a transcript sequence and generate RADARS guide candidates.
      </Typography>
    </Paper>
  );
}

export default function App() {
  return (
    <Box className="page-shell">
      <Container maxWidth="md" id="app" className="app-shell">
        <TitleBar />
        <Paper className="form-shell" elevation={0}>
          <Box className="form-shell-header">
            <Typography variant="h5">Guide Generator</Typography>
            <Typography variant="body2">
              Submit a transcript sequence to generate RADARS guide candidates.
            </Typography>
          </Box>
          <GuideDesignForm />
        </Paper>
        <Copyright />
      </Container>
    </Box>
  );
}
