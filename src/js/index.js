import '../css/index.css';
import { initializeAPI, showLogin as login, logout } from "./api_deezer";

window.showLogin = () => login()

window.logout = () => logout()

window.showMenu = () => showMenu()

window.closeMenu = () => closeMenu()

initializeAPI();

//Emil responsive menu xD
const showMenu = () => document.getElementById("menu").classList.remove('hide-menu')

const closeMenu = () => document.getElementById("menu").classList.add('hide-menu')