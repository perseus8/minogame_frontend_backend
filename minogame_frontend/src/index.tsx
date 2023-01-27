import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

// react-toast
import 'react-toastify/dist/ReactToastify.css';

// Wagmi wallet connect modules
import { WagmiConfig } from 'wagmi';
import { wagmiClient } from 'src/services/wagmi';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createTheme({
  typography: {
    fontFamily: "Nunito"
  },
  components: {
  }
});

root.render(
  <Provider store={store}>
  <ThemeProvider theme={theme}>
    <WagmiConfig client={wagmiClient}>
      <App />
    </WagmiConfig>
    </ThemeProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
