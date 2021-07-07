const initializeDOMElements = () => {
    let btnCloseMenu = document.getElementById("btnCloseMenu");
    btnCloseMenu.addEventListener('click', () => closeMenu());
    let btnShowMenu = document.getElementById("btnShowMenu");
    btnShowMenu.addEventListener('click', () => showMenu());
}

const showMenu = () => document.getElementById("menu").classList.remove('hide-menu')

const closeMenu = () => document.getElementById("menu").classList.add('hide-menu')

export {initializeDOMElements};