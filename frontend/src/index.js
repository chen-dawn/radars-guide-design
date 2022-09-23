import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import Copyright from './Copyright.js';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Header from './Header.js';
import MarkdownRenderer from './MarkdownRenderer';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <App />
      </>
    ),
  },
  {
    path: "about",
    element: (
      <>
        <Header />
        <MarkdownRenderer filename='about.md' />
      </>
    ),
  },
  {
    path: "guide-design-tips",
    element: (
      <>
        <Header />
        <MarkdownRenderer filename='guide-design-tips.md' />
      </>
    ),
  },
]);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeProvider>,
  document.querySelector('#root'),
);
