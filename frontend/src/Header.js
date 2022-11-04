import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import axios from "axios";
import { GuideDesignForm } from "./GuideDesignForm";
import logo from "./logo.png";
import "./App.css";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Box sx={{ flexGrow: 1 }} display="flex">
            <MenuItem component={Link} to='/'>Home</MenuItem>
            <MenuItem component={Link} to='/about'>About</MenuItem>
            <MenuItem component={Link} to='/guide-design-tips'>Guide Design Tips</MenuItem>
          </Box>
          <Button
            color="inherit"
            href="https://www.nature.com/articles/s41587-022-01534-5"
            target="_blank"
            rel="noopener"
          >
            Publication
          </Button>
          <Button
            color="inherit"
            href="https://groups.google.com/g/radars"
            target="_blank"
            rel="noopener"
          >
            Google Group
          </Button>
          <Button
            color="inherit"
            href="https://github.com/abugoot-lab/RADARS"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}