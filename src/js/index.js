import '../css/index.css';
import { initializeAPI, showLogin as login, logout } from "./api_deezer";

window.showLogin = () =>{
    login();
}

window.logout = () => {
    logout();
}

initializeAPI();