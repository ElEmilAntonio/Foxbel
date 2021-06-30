import '../css/index.css';
import { initializeAPI, showLogin as login } from "./api_deezer";

window.showLogin = () =>{
    login();
}

initializeAPI();