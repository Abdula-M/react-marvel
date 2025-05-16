import { createRoot } from "react-dom/client";
import App from "./components/app/App";
import { BrowserRouter as Router } from "react-router-dom";
import "./style/style.scss";


const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Router>
        <App />
    </Router>
);
