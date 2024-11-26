import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './index.css'

// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./components/reducers/index";

// Route
import { BrowserRouter } from "react-router-dom";

// CSS Design
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'antd/dist/antd.js';

const store = createStore(rootReducer, composeWithDevTools());

const root = createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>,
);
