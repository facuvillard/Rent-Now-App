import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FCC931"
    },
    secondary: {
      main: "#3F4652"
    }
  },
  typography: {
    fontFamily: ['-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto'].join(",")
  }
})

ReactDOM.render(
  <ThemeProvider theme={theme} >
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
