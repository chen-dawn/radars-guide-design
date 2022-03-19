import * as React from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GuideTable from "./GuideTable";
import { Box } from "@mui/material";

export class GuideDesignForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", rows: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    console.log("A name was submitted: " + this.state.value);
    // POST request using axios with error handling
    const guideSequence = { sequence: this.state.value };
    axios
      .post("https://radars-guide-design.herokuapp.com/tools/generate", guideSequence, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("This is response", response.data);

        this.setState({ rows: response.data });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <Box>
        <TextField
          multiline
          fullWidth
          maxRows={4}
          label="Enter Guide Sequence"
          value={this.state.value}
          onChange={this.handleChange}
          color="secondary"
        />
        <div>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </div>
        <div>
          {this.state.rows === "" ? null : (
            <GuideTable rows={this.state.rows} />
          )}
        </div>
      </Box>
    );
  }
}
