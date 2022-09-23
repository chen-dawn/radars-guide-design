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

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Created by Dawn Chen, last updated Sept 2022'}
    </Typography>
  );
}

const TitleBar = (props) => {
  return (
    <Box sx={{ my: 4, borderRadius: 1, marginBottom:3 }} id="Branding">
      <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
        <img alt="logo" src={logo} width="48" height="48" />
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ pt: 0.5 }}
        >
          RADARS Guide Design Tool
        </Typography>
      </Box>
      <Box sx={{display: "flex", justifyContent: "center" }}>
        <Typography component="h3" color="primary.secondary" gutterBottom sx={{ marginBottom: 2, marginTop:-1 }} >
          {"Design RADARS uides for your favourite transcript. "}
        </Typography>
      </Box>
    </Box>
  );
};

export default function App() {
  const [getMessage, setGetMessage] = useState({});

  useEffect(() => {
    axios
      .get("http://www.radars.bio/tools/generate")
      .then((response) => {
        console.log("SUCCESS", response);
        setGetMessage(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Container maxWidth="md" id="app">
        <TitleBar />
        <div className="guide-design-form">
          <GuideDesignForm />
        </div>
        <Copyright/>
      </Container>
    </>
  );
}