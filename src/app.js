import "regenerator-runtime";
import "./styles/style.css";
import "./script/component/game-list.js"
import "./script/component/app-bar.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import main from "./script/view/main.js";

document.addEventListener("DOMContentLoaded", main);