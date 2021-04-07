import "regenerator-runtime";
import "./styles/style.css";
import "./script/component/movie-list.js"
import "./script/component/app-bar.js";
import "./script/component/nav-page.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import main from "./script/view/main.js";

document.addEventListener("DOMContentLoaded", main);