import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import axios from "axios";
import { GuideDesignForm } from "./GuideDesignForm";

export default function App() {
  const [getMessage, setGetMessage] = useState({});

  useEffect(() => {
    axios
      .get("https://radars-guide-design.herokuapp.com/tools/generate")
      .then((response) => {
        console.log("SUCCESS", response);
        setGetMessage(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          RADARS Guide Design Tool
        </Typography>
      </Box>
      <div className="input_container">
        <GuideDesignForm />
      </div>
    </Container>
  );
}
