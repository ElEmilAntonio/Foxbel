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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initializeAPI\": () => (/* binding */ initializeAPI),\n/* harmony export */   \"showLogin\": () => (/* binding */ showLogin)\n/* harmony export */ });\nvar appID = '489402';\nvar appSecretKey = 'a5775013018f7dc67e119742b3b471ee';\nvar accessToken = 'frCpv4T49lhSmMVBQWL76pbq38M99gWEy7w99euk80rgU4MVw7';\nvar channelURL = 'http://localhost/foxbel-music/dist/channel.html';\n\nvar initializeAPI = function initializeAPI() {\n  DZ.init({\n    appId: appID,\n    channelUrl: channelURL\n  });\n  DZ.getLoginStatus(function (res) {\n    res.status == 'connected' ? setUserInfo() : alert(res.status);\n  });\n};\n\nvar showLogin = function showLogin() {\n  DZ.login(function (response) {\n    response.authResponse != null ? setUserInfo() : alert('Es necesario identificarse para usar Foxbel Music');\n  }, {\n    perms: 'basic_access,email'\n  });\n};\n\nvar setUserInfo = function setUserInfo() {\n  DZ.api('/user/me', function (res) {\n    var userName = document.getElementById(\"userName\");\n    userName.innerHTML = res.name;\n  });\n  getChart();\n};\n\nvar getChart = function getChart() {\n  DZ.api('/chart/0/tracks?index=0&limit=11', 'GET', function (res) {\n    var data = res.data; //Mejor coincidencia\n\n    var album = document.getElementById(\"album-title\");\n    var artist = document.getElementById(\"artist\");\n    var followers = document.getElementById(\"followers\");\n    var cover = document.getElementById(\"first-result-cover\");\n    album.innerHTML = \"\".concat(data[0].title, \" - Alb\\xFAm: \").concat(data[0].album.title);\n    artist.innerHTML = \"\".concat(data[0].artist.name);\n    cover.src = data[0].album.cover;\n    data.shift(); //Resultados\n\n    var resultsRowOne = document.getElementById(\"first-row\");\n    var resultsRowTwo = document.getElementById(\"second-row\");\n    data.map(function (song, index) {\n      index < 5 ? addToRow(resultsRowOne, song) : addToRow(resultsRowTwo, song);\n    });\n  });\n};\n/*\r\nconst getMainData = () => {\r\n    const options = {\r\n        method: 'GET',\r\n        headers: {\r\n            'Access-Control-Allow-Origin' : '*',\r\n            'Access-Control-Allow-Methods':'GET',\r\n        },\r\n        mode: 'cors',\r\n    }\r\n    fetch(`https://api.deezer.com/chart/0/tracks?index=0&limit=11`, options)\r\n    .then(res => res.json())\r\n    .then(res => {\r\n        const data = res.data;\r\n        //Mejor coincidencia\r\n        const album = document.getElementById(\"album-title\");\r\n        const artist = document.getElementById(\"artist\");\r\n        const followers = document.getElementById(\"followers\");\r\n        const cover = document.getElementById(\"first-result-cover\");\r\n        album.innerHTML = `${data[0].title} - Albúm: ${data[0].album.title}`;\r\n        artist.innerHTML = `${data[0].artist.name}`;\r\n        cover.src = data[0].album.cover;\r\n        data.shift();\r\n        //Resultados\r\n        const resultsRowOne = document.getElementById(\"first-row\");\r\n        const resultsRowTwo = document.getElementById(\"second-row\");\r\n        data.map((song, index) => {\r\n            index < 5 ? addToRow(resultsRowOne, song) : addToRow(resultsRowTwo, song)\r\n        })\r\n    })\r\n    .catch(error => {\r\n        const access_token = window.location.hash;\r\n    })\r\n}\r\n*/\n\n\nvar addToRow = function addToRow(row, song) {\n  return row.innerHTML += \"<div class=\\\"result-container\\\">\\n                <div class=\\\"result-album-container\\\">\\n                        <img src=\\\"\".concat(song.album.cover, \"\\\"/>\\n                        <i class=\\\"icon material-icons\\\">play_arrow</i>\\n                    </div>\\n                    <p class=\\\"result-album-title\\\">\").concat(song.title, \"</p>\\n                    <p class=\\\"result-album-artist\\\">\").concat(song.artist.name, \"</p>\\n                </div>\");\n};\n\n\n\n//# sourceURL=webpack://foxbel-music/./src/js/api_deezer.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/index.css */ \"./src/css/index.css\");\n/* harmony import */ var _api_deezer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api_deezer */ \"./src/js/api_deezer.js\");\n\n\n\nwindow.showLogin = function () {\n  (0,_api_deezer__WEBPACK_IMPORTED_MODULE_1__.showLogin)();\n};\n\n(0,_api_deezer__WEBPACK_IMPORTED_MODULE_1__.initializeAPI)();\n\n//# sourceURL=webpack://foxbel-music/./src/js/index.js?");

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