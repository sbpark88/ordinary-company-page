import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter } from "react-router-dom";

/*
 * HashRouter 는 깃허브 용
 * 그 외 일반 사이트 및 실제 배포는 BrowserRouter 를 사용한다
 * */
ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);
