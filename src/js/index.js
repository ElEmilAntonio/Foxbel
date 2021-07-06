import '../css/index.css';
import { initializeAPI, showLogin as login, logout, playTrack, resume, pause } from "./api_deezer";

window.showLogin = () => login()

window.logout = () => logout()

window.showMenu = () => showMenu()

window.closeMenu = () => closeMenu()

window.playTrack = (data, element) => playTrack(data, element)

window.resume = () => resume()

window.pause = () => pause()

initializeAPI();

//Emil responsive menu xD
const showMenu = () => document.getElementById("menu").classList.remove('hide-menu')

const closeMenu = () => document.getElementById("menu").classList.add('hide-menu')