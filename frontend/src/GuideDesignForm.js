import * as React from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GuideTable from "./GuideTable";
import { Box, Typography } from "@mui/material";
import "./App.css";

const PREVIEW_ROWS = [
  {
    id: 1,
    guideName: "guide1_CCA145",
    pos: 145,
    generatedGuide:
      "GCTACCGTATGAGACATGAGGATCACCCATGTAAGGGTGGAGGAACACCCCACCCTGGAACCTTGACCTGACAGAAGCACCATCAGGGCTTCTGATCCTGACCGTGCGTGGAGCATCAGCCCACGCA",
    guideTarget:
      "CTGACCTTGACCTTGACCTTGACCCAACCTTGACCTTGACCTTGACCTTGACCTTGACCTTGACC",
  },
  {
    id: 2,
    guideName: "guide2_CCA311",
    pos: 311,
    generatedGuide:
      "TTGACCTAGGAGACATGAGGATCACCCATGTGATCTTGGAACACCCCACCCTCTAGGCTTGACCTACAGAAGCACCATCAGGGCTTCTGTGGACCTTGACTTGCGTGGAGCATCAGCCCACGCA",
    guideTarget:
      "GATCTTGGAACCTTGGAACCTTGCCAACCTTGGAACCTTGGAACCTTGGAACCTTGGAACCTTGGA",
  },
];

export class GuideDesignForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", rows: [], errorMessage: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault(); // Prevent page reload
  
    console.log("A name was submitted: " + this.state.value);
    const guideSequence = { sequence: this.state.value.trim() };
  
    const apiUrl = process.env.REACT_APP_API_URL || "/tools/generate";
  
    // POST request using axios
    axios
      .post(apiUrl, guideSequence, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("This is response", response.data);
        this.setState({ rows: response.data, errorMessage: "" });
      })
      .catch((error) => {
        let errorMsg = "There was an error!";
        if (error.response) {
          const detail =
            typeof error.response.data === "string"
              ? error.response.data
              : JSON.stringify(error.response.data);
          errorMsg = `Server error: ${error.response.status} - ${detail}`;
        } else if (error.request) {
          errorMsg = "No response from server. Please check the network.";
        } else {
          errorMsg = `Error: ${error.message}`;
        }
        this.setState({ errorMessage: errorMsg });
        console.error("There was an error!", errorMsg);
      });
  }

  render() {
    return (
      <>
        <Box
          className="guide-form-layout"
        >
          <TextField
            multiline
            fullWidth
            minRows={8}
            maxRows={12}
            label="Enter Transcript Sequence"
            placeholder="Example: ATGAACTCCTTCTCCACAAGCGCCTTCGGTCCAGTTG..."
            value={this.state.value}
            onChange={this.handleChange}
            color="secondary"
            className="sequence-input"
          />
          <Box className="form-actions">
            <Button
              variant="contained"
              onClick={this.handleSubmit}
              size="large"
              className="submit-button"
            >
              Generate Guides
            </Button>
            <Button
              variant="text"
              size="large"
              className="preview-button"
              onClick={() => this.setState({ rows: PREVIEW_ROWS, errorMessage: "" })}
            >
              Preview Table
            </Button>
          </Box>
        </Box>
        <Box className="results-shell">
          {this.state.errorMessage && (
            <Typography color="error" className="error-banner">
              Error: {this.state.errorMessage}
            </Typography>
          )}

          {this.state.rows.length === 0 ? (
            <Box className="empty-results">
              <Typography variant="h6">No guides yet</Typography>
              <Typography variant="body2">
                Generate guides from a transcript sequence, or use Preview Table
                to inspect the redesigned results layout locally.
              </Typography>
            </Box>
          ) : null}

          {this.state.rows.length === 0 ? null : (
            <GuideTable rows={this.state.rows} />
          )}
        </Box>
      </>
    );
  }
}
