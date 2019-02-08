import store from "../redux/store/index.js";
import React from "react";
import { render } from "react-dom";
//import { Provider } from "react-redux";
import Root from "./Root.js";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

render(<Root />, document.getElementById("app"));

/*render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("app")
);*/