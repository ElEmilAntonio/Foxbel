/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/api_deezer.js":
/*!******************************!*\
  !*** ./src/js/api_deezer.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initializeAPI\": () => (/* binding */ initializeAPI),\n/* harmony export */   \"showLogin\": () => (/* binding */ showLogin),\n/* harmony export */   \"logout\": () => (/* binding */ logout)\n/* harmony export */ });\nvar appID = '489402';\nvar channelURL = 'http://localhost/foxbel-music/dist/channel.html';\nvar user = {\n  id: localStorage.getItem(\"userId\"),\n  name: localStorage.getItem(\"userName\"),\n  accessToken: localStorage.getItem(\"userToken\"),\n  status: localStorage.getItem(\"userStatus\")\n};\nvar appSecretKey = 'a5775013018f7dc67e119742b3b471ee';\n\nvar initializeAPI = function initializeAPI() {\n  DZ.init({\n    appId: appID,\n    channelUrl: channelURL\n  });\n  getStatus();\n};\n\nvar getStatus = function getStatus() {\n  if (user.status == \"connected\") {\n    var logoutIcon = document.getElementById(\"logoutIcon\");\n    logoutIcon.classList.remove(\"is-hidden\");\n    var userName = document.getElementById(\"userName\");\n    userName.innerHTML = user.name;\n    userName.onclick = null;\n    userName.classList.remove(\"login-hover\");\n    var userUnknownBanner = document.getElementById(\"user-unknown-banner\");\n    userUnknownBanner.classList.add(\"is-hidden\");\n    var firstResultBanner = document.getElementById(\"first-result-banner\");\n    firstResultBanner.classList.remove(\"is-hidden\");\n    getChart();\n  } else {\n    alert(\"Debe identificarse con Deezer para usar Foxbel Music\");\n  }\n};\n\nvar logout = function logout() {\n  if (confirm(\"¿Deseas cerrar sesión?\")) {\n    updateUserData(null, null, null, 'not_authorized');\n    DZ.logout();\n  }\n};\n\nvar showLogin = function showLogin() {\n  DZ.login(function (response) {\n    response.status == 'connected' ? login(response) : getStatus();\n  }, {\n    perms: 'basic_access, email, offline_access'\n  });\n};\n\nvar login = function login(data) {\n  DZ.api('/' + user.id + '/me', function (res) {\n    updateUserData(data.userID, res.name, data.authResponse.accessToken, data.status);\n  });\n  getChart();\n};\n\nvar updateUserData = function updateUserData(id, name, token, status) {\n  var logoutIcon = document.getElementById(\"logoutIcon\");\n  var userName = document.getElementById(\"userName\");\n  var userUnknownBanner = document.getElementById(\"user-unknown-banner\");\n  var firstResultBanner = document.getElementById(\"first-result-banner\");\n\n  if (status == 'connected') {\n    //Set localStorage items\n    localStorage.setItem(\"userId\", id);\n    localStorage.setItem(\"userName\", name);\n    localStorage.setItem(\"userToken\", token);\n    localStorage.setItem(\"userStatus\", status); //Hidding/showing banners\n\n    userUnknownBanner.classList.add(\"is-hidden\");\n    firstResultBanner.classList.remove(\"is-hidden\"); //Showing logout icon\n\n    logoutIcon.classList.remove(\"is-hidden\"); //Setting user name info\n\n    userName.innerHTML = name;\n    userName.onclick = null;\n    userName.classList.remove(\"login-hover\");\n  } else {\n    //Delete localStorage items\n    localStorage.removeItem(\"userId\");\n    localStorage.removeItem(\"userName\");\n    localStorage.removeItem(\"userToken\");\n    localStorage.removeItem(\"userStatus\"); //Hidding/showing banners\n\n    userUnknownBanner.classList.remove(\"is-hidden\");\n    firstResultBanner.classList.add(\"is-hidden\"); //Hidding logout icon, resetting userName text/click event\n\n    logoutIcon.classList.add(\"is-hidden\");\n    userName.innerHTML = \"Inicia sesión\";\n\n    userName.onclick = function () {\n      return showLogin();\n    };\n\n    userName.classList.add(\"login-hover\"); //Cleaning search results        \n\n    var resultsRowOne = document.getElementById(\"first-row\");\n    resultsRowOne.innerHTML = \"\";\n    var resultsRowTwo = document.getElementById(\"second-row\");\n    resultsRowTwo.innerHTML = \"\";\n  }\n\n  user.id = localStorage.getItem(\"userId\");\n  user.name = localStorage.getItem(\"userName\");\n  user.accessToken = localStorage.getItem(\"userToken\");\n  user.status = localStorage.getItem(\"userStatus\");\n};\n\nvar getChart = function getChart() {\n  DZ.api('/chart/2/tracks?index=0&limit=11', 'GET', function (res) {\n    var data = res.data; //Mejor coincidencia\n\n    var album = document.getElementById(\"album-title\");\n    var artist = document.getElementById(\"artist\");\n    var followers = document.getElementById(\"followers\");\n    var cover = document.getElementById(\"first-result-cover\");\n    album.innerHTML = \"\".concat(data[0].title, \" - Alb\\xFAm: \").concat(data[0].album.title);\n    artist.innerHTML = \"\".concat(data[0].artist.name);\n    cover.src = data[0].album.cover;\n    data.shift(); //Resultados\n\n    var resultsRowOne = document.getElementById(\"first-row\");\n    resultsRowOne.innerHTML = \"\";\n    var resultsRowTwo = document.getElementById(\"second-row\");\n    resultsRowTwo.innerHTML = \"\";\n    data.map(function (song, index) {\n      index < 5 ? addToRow(resultsRowOne, song) : addToRow(resultsRowTwo, song);\n    });\n  });\n};\n\nvar addToRow = function addToRow(row, song) {\n  return row.innerHTML += \"<div class=\\\"result-container\\\">\\n                <div class=\\\"result-album-container\\\">\\n                        <img src=\\\"\".concat(song.album.cover, \"\\\"/>\\n                        <i class=\\\"icon material-icons\\\">play_arrow</i>\\n                    </div>\\n                    <p class=\\\"result-album-title\\\">\").concat(song.title, \"</p>\\n                    <p class=\\\"result-album-artist\\\">\").concat(song.artist.name, \"</p>\\n                </div>\");\n}; /////CODIGUIN EMIL//////\n////CODIGUIN EMIL//////\n\n\nwindow.addEventListener('load', function () {\n  var search = document.querySelector('#buscador');\n  var recomendaciones = document.querySelector('#recomendaciones');\n  var divMainResults = document.querySelector('#div-main-results');\n  var divMainAlbums = document.querySelector('#div-main-albums');\n  var divMainArtists = document.querySelector('#div-main-artists');\n  search.addEventListener(\"keyup\", function (_ref) {\n    var key = _ref.key;\n\n    if (key === \"Enter\") {\n      searchSongs('/search?q=' + search.value);\n    }\n  }); ////Menu buttoms\n\n  document.querySelector('#li-artists').addEventListener(\"click\", function () {\n    searchArtistsUser();\n  });\n  document.querySelector('#li-albums').addEventListener(\"click\", function () {\n    searchAlbumsUser();\n  }); ///Functions User\n\n  function searchAlbumsUser() {\n    hiddeResultsdivs();\n    divMainAlbums.classList.remove(\"is-hidden\");\n    DZ.api('/user/' + user.id + '/albums', 'GET', function (response) {\n      var data = response.data;\n      rowSearchManagement(data, divMainAlbums, addAlbumsToRow, \"albums\");\n    });\n  }\n\n  function searchArtistsUser() {\n    hiddeResultsdivs();\n    divMainArtists.classList.remove(\"is-hidden\");\n    DZ.api('/user/' + user.id + '/artists', 'GET', function (response) {\n      var data = response.data;\n      rowSearchManagement(data, divMainArtists, addArtistToRow, \"artists\");\n    });\n  }\n\n  function searchSongs(search) {\n    hiddeResultsdivs();\n    divMainResults.classList.remove(\"is-hidden\");\n    DZ.api(search, 'GET', function (res) {\n      var data = res.data;\n      mainSearch(data);\n      rowSearchManagement(data, divMainResults, addToRow, \"results\");\n    });\n  }\n\n  function rowSearchManagement(data, mainDiv, RowFunction, kind) {\n    CreateRows(data.length, mainDiv, kind);\n    var rowNumber = 1;\n    var rowCounter = 0;\n    var resultsRow = document.getElementById(rowNumber + \"-\" + kind + \"-row\");\n    resultsRow.innerHTML = \"\";\n    data.map(function (object, index) {\n      rowCounter++;\n\n      if (rowCounter != 6) {\n        RowFunction(resultsRow, object);\n      } else {\n        rowCounter = 0;\n        rowNumber++;\n        resultsRow = document.getElementById(rowNumber + \"-\" + kind + \"-row\");\n      }\n    });\n  }\n\n  function mainSearch(data) {\n    var album = document.getElementById(\"album-title\");\n    var artist = document.getElementById(\"artist\");\n    var followers = document.getElementById(\"followers\");\n    var cover = document.getElementById(\"first-result-cover\");\n    album.innerHTML = \"\".concat(data[0].title, \" - Alb\\xFAm: \").concat(data[0].album.title);\n    artist.innerHTML = \"\".concat(data[0].artist.name);\n    cover.src = data[0].album.cover;\n  }\n\n  var CreateRows = function CreateRows(length, resultsDiv, kind) {\n    var rowNumber = 1;\n    addRow(resultsDiv, rowNumber, kind);\n\n    for (var i = 0; i <= length; i++) {\n      if (i % 5 == 0) {\n        rowNumber++;\n        addRow(resultsDiv, rowNumber, kind);\n      }\n    }\n  };\n\n  var addRow = function addRow(div, number, kind) {\n    return div.innerHTML += \"\\n            <div id=\\\"\".concat(number, \"-\").concat(kind, \"-row\\\" class=\\\"row\\\">\\n            </div>\");\n  };\n\n  var addArtistToRow = function addArtistToRow(row, artist) {\n    return row.innerHTML += \"<div class=\\\"result-container\\\">\\n                <div class=\\\"result-album-container\\\">\\n                        <img src=\\\"\".concat(artist.picture, \"\\\"/>\\n                    </div>\\n                     <p class=\\\"result-album-title\\\">\").concat(artist.name, \"</p>\\n                    <p class=\\\"result-album-title\\\">N\\xB0 Fans: \").concat(artist.nb_fan, \"</p>\\n                </div>\");\n  };\n\n  var addAlbumsToRow = function addAlbumsToRow(row, album) {\n    return row.innerHTML += \"<div class=\\\"result-container\\\">\\n                <div class=\\\"result-album-container\\\">\\n                        <img src=\\\"\".concat(album.cover, \"\\\"/>\\n                    </div>\\n                     <p class=\\\"result-album-title\\\">\").concat(album.title, \"</p>\\n                    <p class=\\\"result-album-title\\\">N\\xB0 Fans: \").concat(album.artist.name, \"</p>\\n                </div>\");\n  };\n}); /// css Functions\n\nfunction hiddeResultsdivs() {\n  var resultDivs = document.getElementsByClassName('results-container');\n\n  for (var i = 0; i < resultDivs.length; i++) {\n    resultDivs[i].classList.add(\"is-hidden\");\n  }\n}\n\n\n\n//# sourceURL=webpack://foxbel-music/./src/js/api_deezer.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/index.css */ \"./src/css/index.css\");\n/* harmony import */ var _api_deezer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api_deezer */ \"./src/js/api_deezer.js\");\n\n\n\nwindow.showLogin = function () {\n  return (0,_api_deezer__WEBPACK_IMPORTED_MODULE_1__.showLogin)();\n};\n\nwindow.logout = function () {\n  return (0,_api_deezer__WEBPACK_IMPORTED_MODULE_1__.logout)();\n};\n\nwindow.showMenu = function () {\n  return showMenu();\n};\n\nwindow.closeMenu = function () {\n  return closeMenu();\n};\n\n(0,_api_deezer__WEBPACK_IMPORTED_MODULE_1__.initializeAPI)(); //Emil responsive menu xD\n\nvar showMenu = function showMenu() {\n  return document.getElementById(\"menu\").style.display = 'flex';\n};\n/*\r\n$('#boton-menu').click(function(){\r\n    $('.menu-container').css(\"display\",\"flex\");\t\r\n    });\t\r\n    */\n\n/*\r\n$('#boton-cerrar-menu').click(function(){\r\n    $('.menu-container').css(\"display\",\"none\");\t\r\n});\r\n*/\n\n\nvar closeMenu = function closeMenu() {\n  return document.getElementById(\"menu\").style.display = 'none';\n};\n/*\r\n$(document).ready(function(){\r\n  $(window).resize(function(){\r\n   if($(window).width()>=768)  $('.menu-container').css(\"display\",\"flex\");\t\r\n  });\r\n});\r\n*/\n\n//# sourceURL=webpack://foxbel-music/./src/js/index.js?");

/***/ }),

/***/ "./src/css/index.css":
/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://foxbel-music/./src/css/index.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;