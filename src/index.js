import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import configureStore from "./state/store/configureStore";
import axios from "axios";
import "./index.css";

const store = configureStore();

window.store = store;

let apiUrl = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = apiUrl;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
