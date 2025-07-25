import React from "react";
import "./app.module.scss";
import { HashRouter as Router } from "react-router-dom";
import { RootRoutes } from "./routes/RootRoutes";
import { Provider as StoreProvider } from 'react-redux'
import { store } from "./redux/store";

export const App = () => {
  return (
    <StoreProvider store={store}>
    <Router>
      <RootRoutes />
    </Router>
    </StoreProvider>
  );
};
