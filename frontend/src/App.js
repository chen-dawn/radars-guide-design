import * as React from "react";
import Container from "@mui/material/Container";
import { Link, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import axios from "axios";
import { GuideDesignForm } from "./GuideDesignForm";
import logo from "./logo.png";
import "./App.css";

const TitleBar = (props) => {
  return (
    <Box sx={{ my: 4, borderRadius: 1 }} id="Branding">
      <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
        <img alt="logo" src={logo} width="48" height="48" />
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ pt: 0.5, pl: 2 }}
        >
          RADARS Guide Design Tool
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography component="h1" color="text.secondary" gutterBottom>
          {"Design RADARS Guides for your favourite transcript. "}
          <Link
            color="inherit"
            href="https://www.biorxiv.org/content/10.1101/2022.01.26.477951v1"
            target="_blank"
            rel="noopener"
          >
            {"Link to our BioRxiv manuscript."}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

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
    <Container maxWidth="md" id="app">
      <TitleBar />
      <div className="guide-design-form">
        <GuideDesignForm />
      </div>
    </Container>
  );
}
