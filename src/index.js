import { h } from "preact";
import "./style";
import App from "./components/app";
import { BrowserRouter } from "react-router-dom";

const WithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default WithRouter;
