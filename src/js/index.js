import '../css/index.css';
import { initializeAPI, showLogin as login, logout } from "./api_deezer";

window.showLogin = () => login()

window.logout = () => logout()

window.showMenu = () => showMenu()

window.closeMenu = () => closeMenu()

initializeAPI();

//Emil responsive menu xD
const showMenu = () => document.getElementById("menu").style.display = 'flex'

/*
$('#boton-menu').click(function(){
    $('.menu-container').css("display","flex");	
    });	
    */
    /*
    $('#boton-cerrar-menu').click(function(){
        $('.menu-container').css("display","none");	
    });
    */
const closeMenu = () => document.getElementById("menu").style.display = 'none'
    /*
    $(document).ready(function(){
      $(window).resize(function(){
       if($(window).width()>=768)  $('.menu-container').css("display","flex");	
      });
    });
    */