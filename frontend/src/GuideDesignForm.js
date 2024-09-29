import * as React from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GuideTable from "./GuideTable";
import { Box, Typography } from "@mui/material";
import "./App.css";

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
    const guideSequence = { sequence: this.state.value };
  
    // Use the API URL from environment variables
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/tools/generate'; // Fallback to localhost if not defined
  
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
          errorMsg = `Server error: ${error.response.status} - ${error.response.data}`;
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
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            multiline
            fullWidth
            maxRows={6}
            label="Enter Transcript Sequence"
            value={this.state.value}
            onChange={this.handleChange}
            color="secondary"
            sx={{ mb: 1 }}
          />
          <Box sx={{ p: 5 }}>
            <Button
              variant="outlined"
              onClick={this.handleSubmit}
              size="large"
              sx={{ m: 1 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          {this.state.errorMessage && (
            <Typography color="error">
              Error: {this.state.errorMessage}
            </Typography>
          )}

          {this.state.rows.length === 0 ? null : (
            <GuideTable rows={this.state.rows} />
          )}
        </Box>
      </>
    );
  }
}
