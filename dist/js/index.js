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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getApiData\": () => (/* binding */ getMainData)\n/* harmony export */ });\nvar getMainData = function getMainData() {\n  var options = {\n    method: 'GET',\n    headers: {\n      'Access-Control-Allow-Origin': '*',\n      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',\n      'Access-Control-Allow-Methods': 'GET'\n    }\n  };\n  fetch(\"https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/tracks?index=0&limit=11\", options).then(function (res) {\n    return res.json();\n  }).then(function (res) {\n    var data = res.data; //Mejor coincidencia\n\n    var album = document.getElementById(\"album-title\");\n    var artist = document.getElementById(\"artist\");\n    var followers = document.getElementById(\"followers\");\n    var cover = document.getElementById(\"first-result-cover\");\n    album.innerHTML = \"\".concat(data[0].title, \" - Alb\\xFAm: \").concat(data[0].album.title);\n    artist.innerHTML = \"\".concat(data[0].artist.name);\n    cover.src = data[0].album.cover;\n    data.shift();\n    var resultsRowOne = document.getElementById(\"first-row\");\n    var resultsRowTwo = document.getElementById(\"second-row\");\n    data.map(function (song, index) {\n      index < 5 ? addToRow(resultsRowOne, song) : addToRow(resultsRowTwo, song);\n    });\n  });\n};\n\nvar addToRow = function addToRow(row, song) {\n  return row.innerHTML += \"<div class=\\\"result-container\\\">\\n                <div class=\\\"result-album-container\\\">\\n                        <img src=\\\"\".concat(song.album.cover, \"\\\"/>\\n                        <i class=\\\"icon material-icons\\\">play_arrow</i>\\n                    </div>\\n                    <p class=\\\"result-album-title\\\">\").concat(song.title, \"</p>\\n                    <p class=\\\"result-album-artist\\\">\").concat(song.artist.name, \"</p>\\n                </div>\");\n};\n\n\n\n//# sourceURL=webpack://foxbel-music/./src/js/api_deezer.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/index.css */ \"./src/css/index.css\");\n/* harmony import */ var _api_deezer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api_deezer */ \"./src/js/api_deezer.js\");\n\n\n(0,_api_deezer__WEBPACK_IMPORTED_MODULE_1__.getApiData)();\n\n//# sourceURL=webpack://foxbel-music/./src/js/index.js?");

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