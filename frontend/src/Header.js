import * as React from "react";
import Box from "@mui/material/Box";
import "./App.css";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" elevation={0} className="site-nav">
        <Toolbar className="site-toolbar">
          <Box className="site-nav-links">
            <MenuItem component={Link} to="/">Home</MenuItem>
            <MenuItem component={Link} to="/about">About</MenuItem>
            <MenuItem component={Link} to="/guide-design-tips">Guide Design Tips</MenuItem>
          </Box>
          <Box className="site-nav-actions">
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
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
