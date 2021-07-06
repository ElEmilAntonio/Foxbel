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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initializeAPI\": () => (/* binding */ initializeAPI),\n/* harmony export */   \"showLogin\": () => (/* binding */ showLogin),\n/* harmony export */   \"logout\": () => (/* binding */ logout),\n/* harmony export */   \"playTrack\": () => (/* binding */ playTrack),\n/* harmony export */   \"resume\": () => (/* binding */ resume),\n/* harmony export */   \"pause\": () => (/* binding */ pause)\n/* harmony export */ });\n/* harmony import */ var _track_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./track.js */ \"./src/js/track.js\");\n\nvar appID = '489402';\nvar channelURL = 'http://localhost/foxbel-music/dist/channel.html';\nvar user = {\n  id: localStorage.getItem(\"userId\"),\n  name: localStorage.getItem(\"userName\"),\n  accessToken: localStorage.getItem(\"userToken\"),\n  status: localStorage.getItem(\"userStatus\")\n};\nvar trackPlayingId = localStorage.getItem(\"trackPlayingId\");\nvar trackList = JSON.parse(localStorage.getItem(\"trackList\"));\nvar playerVolume = localStorage.getItem(\"playerVolume\");\nvar currentTimePlaying = localStorage.getItem(\"currentTimePlaying\");\nvar player = {\n  trackPlaying: trackList && trackPlayingId ? new Audio(trackList[trackPlayingId].preview) : null,\n  tracks: trackList ? trackList : [],\n  volume: playerVolume ? playerVolume.volume : 50\n};\nvar currentTrack = player.trackPlaying;\n\nif (currentTrack) {\n  currentTrack.currentTime = currentTimePlaying ? currentTimePlaying : 0;\n}\n\nvar playerHTML = document.getElementById(\"icon-player-play\");\nvar appSecretKey = 'a5775013018f7dc67e119742b3b471ee';\n\nvar initializeAPI = function initializeAPI() {\n  DZ.init({\n    appId: appID,\n    channelUrl: channelURL\n  });\n  setVolume(player.volume);\n  getStatus();\n};\n\nvar setVolume = function setVolume(volume) {\n  document.getElementById(\"volume\").value = volume;\n};\n\nvar getStatus = function getStatus() {\n  if (user.status == \"connected\") {\n    var logoutIcon = document.getElementById(\"logoutIcon\");\n    logoutIcon.classList.remove(\"is-hidden\");\n    var userName = document.getElementById(\"userName\");\n    userName.innerHTML = user.name;\n    userName.onclick = null;\n    userName.classList.remove(\"login-hover\");\n    var userUnknownBanner = document.getElementById(\"user-unknown-banner\");\n    userUnknownBanner.classList.add(\"is-hidden\");\n    var firstResultBanner = document.getElementById(\"first-result-banner\");\n    firstResultBanner.classList.remove(\"is-hidden\");\n\n    if (trackPlayingId) {\n      var trackTitle = player.tracks[trackPlayingId].title;\n      var artistName = player.tracks[trackPlayingId].artist;\n      var album = player.tracks[trackPlayingId].album;\n      setPlayerInfo(trackTitle, artistName, album);\n    }\n\n    getChart();\n  } else {\n    alert(\"Debe identificarse con Deezer para usar Foxbel Music\");\n  }\n};\n\nvar logout = function logout() {\n  if (confirm(\"¿Deseas cerrar sesión?\")) {\n    updateUserData(null, null, null, 'not_authorized');\n    DZ.logout();\n  }\n};\n\nvar showLogin = function showLogin() {\n  DZ.login(function (response) {\n    response.status == 'connected' ? login(response) : getStatus();\n  }, {\n    perms: 'basic_access, email, offline_access'\n  });\n};\n\nvar login = function login(data) {\n  DZ.api('/user/me', function (res) {\n    updateUserData(data.userID, res.name, data.authResponse.accessToken, data.status);\n  });\n  getChart();\n};\n\nvar updateUserData = function updateUserData(id, name, token, status) {\n  var logoutIcon = document.getElementById(\"logoutIcon\");\n  var userName = document.getElementById(\"userName\");\n  var userUnknownBanner = document.getElementById(\"user-unknown-banner\");\n  var firstResultBanner = document.getElementById(\"first-result-banner\");\n\n  if (status == 'connected') {\n    //Set localStorage items\n    localStorage.setItem(\"userId\", id);\n    localStorage.setItem(\"userName\", name);\n    localStorage.setItem(\"userToken\", token);\n    localStorage.setItem(\"userStatus\", status); //Hidding/showing banners\n\n    userUnknownBanner.classList.add(\"is-hidden\");\n    firstResultBanner.classList.remove(\"is-hidden\"); //Showing logout icon\n\n    logoutIcon.classList.remove(\"is-hidden\"); //Setting user name info\n\n    userName.innerHTML = name;\n    userName.onclick = null;\n    userName.classList.remove(\"login-hover\");\n  } else {\n    //Delete localStorage items\n    localStorage.clear();\n    userUnknownBanner.classList.remove(\"is-hidden\");\n    firstResultBanner.classList.add(\"is-hidden\"); //Hidding logout icon, resetting userName text/click event\n\n    logoutIcon.classList.add(\"is-hidden\");\n    userName.innerHTML = \"Inicia sesión\";\n\n    userName.onclick = function () {\n      return showLogin();\n    };\n\n    userName.classList.add(\"login-hover\"); //Cleaning search results        \n\n    var resultsRowOne = document.getElementById(\"first-row\");\n    resultsRowOne.innerHTML = \"\";\n    var resultsRowTwo = document.getElementById(\"second-row\");\n    resultsRowTwo.innerHTML = \"\";\n  }\n\n  user.id = localStorage.getItem(\"userId\");\n  user.name = localStorage.getItem(\"userName\");\n  user.accessToken = localStorage.getItem(\"userToken\");\n  user.status = localStorage.getItem(\"userStatus\");\n};\n\nvar getChart = function getChart() {\n  DZ.api('/chart/0/tracks?index=0&limit=11', 'GET', function (res) {\n    var data = res.data; //Mejor coincidencia\n\n    var album = document.getElementById(\"album-title\");\n    var artist = document.getElementById(\"artist\");\n    var followers = document.getElementById(\"followers\");\n    var cover = document.getElementById(\"first-result-cover\");\n    album.innerHTML = \"\".concat(data[0].title, \" - Alb\\xFAm: \").concat(data[0].album.title);\n    artist.innerHTML = \"\".concat(data[0].artist.name);\n    cover.src = data[0].album.cover;\n    var playIcon = document.getElementById(\"firstResultPlayIcon\");\n    playIcon.setAttribute('data', JSON.stringify(data[0]));\n\n    playIcon.onclick = function () {\n      return playTrack(playIcon);\n    };\n\n    data.shift(); //Resultados\n\n    var resultsRowOne = document.getElementById(\"first-row\");\n    resultsRowOne.innerHTML = \"\";\n    var resultsRowTwo = document.getElementById(\"second-row\");\n    resultsRowTwo.innerHTML = \"\";\n    data.map(function (record, index) {\n      index < 5 ? addToRow(resultsRowOne, record) : addToRow(resultsRowTwo, record);\n    });\n  });\n};\n\nvar addToRow = function addToRow(row, record) {\n  var container = document.createElement(\"div\");\n  container.classList.add(\"result-container\");\n  var albumContainer = document.createElement(\"div\");\n  albumContainer.classList.add(\"album-container\");\n  var img = document.createElement(\"img\");\n  img.src = record.album.cover;\n  var newRecord = document.createElement(\"i\");\n  newRecord.innerHTML = 'play_arrow';\n  newRecord.classList.add(\"track-play\");\n  newRecord.classList.add(\"icon\");\n  newRecord.classList.add(\"material-icons\");\n  newRecord.setAttribute(\"data\", JSON.stringify(record));\n\n  newRecord.onclick = function () {\n    return playTrack(newRecord);\n  };\n\n  albumContainer.appendChild(img);\n  albumContainer.appendChild(newRecord);\n  var title = document.createElement(\"p\");\n  title.innerHTML = record.title;\n  var artist = document.createElement(\"p\");\n  artist.innerHTML = record.artist.name;\n  container.appendChild(albumContainer);\n  container.appendChild(title);\n  container.appendChild(artist);\n  row.appendChild(container);\n};\n\nvar setPlayerInfo = function setPlayerInfo(trackTitle, artistName, album) {\n  document.getElementById(\"playerAlbum\").src = album;\n  document.getElementById(\"playerInfo\").innerHTML = \"<strong>\".concat(trackTitle, \"</strong><br>\").concat(artistName);\n};\n\nvar playTrack = function playTrack(element) {\n  if (player.trackPlaying) {\n    player.trackPlaying.pause();\n  }\n\n  var tracks = document.querySelectorAll('.track-play');\n  tracks.forEach(function (track) {\n    track.innerHTML = 'play_arrow';\n\n    track.onclick = function () {\n      return playTrack(track);\n    };\n  });\n  player.tracks = [];\n  var data = JSON.parse(element.getAttribute('data'));\n\n  if (data.preview != player.trackPlaying.src) {\n    if (data.tracks) {\n      alert(\"it's an album\");\n    } else {\n      var newTrack = new _track_js__WEBPACK_IMPORTED_MODULE_0__.Track(data.artist.name, data.title, data.preview, data.album.cover, data.album.title);\n      player.tracks.push(newTrack);\n      player.trackPlaying = new Audio(newTrack.preview);\n      setPlayerInfo(newTrack.title, newTrack.artist, newTrack.album);\n    }\n\n    localStorage.setItem(\"trackPlayingId\", 0);\n    localStorage.setItem(\"trackList\", JSON.stringify(player.tracks));\n    localStorage.setItem(\"volumePlayer\", player.volume);\n  }\n\n  resume();\n};\n\nvar pause = function pause() {\n  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;\n  player.trackPlaying.pause();\n  playerHTML.classList.add(\"fa-play\");\n  playerHTML.classList.remove(\"fa-pause\");\n\n  playerHTML.onclick = function () {\n    return resume();\n  };\n\n  element ? updateElementIcon(element) : updatePlayIcons();\n};\n\nvar resume = function resume() {\n  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;\n\n  if (player.trackPlaying) {\n    player.trackPlaying.play();\n    playerHTML.classList.remove(\"fa-play\");\n    playerHTML.classList.add(\"fa-pause\");\n\n    playerHTML.onclick = function () {\n      return pause();\n    };\n\n    element ? updateElementIcon(element) : updatePlayIcons(true);\n  }\n};\n\nvar updateElementIcon = function updateElementIcon(element) {\n  var setPause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;\n  element.innerHTML = setPause ? 'pause' : 'play_arrow';\n\n  element.onclick = function () {\n    return setPause ? pause(element) : resume(element);\n  };\n};\n\nvar updatePlayIcons = function updatePlayIcons() {\n  var setPause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;\n  var tracks = document.querySelectorAll('.track-play');\n  tracks.forEach(function (track) {\n    var data = JSON.parse(track.getAttribute('data'));\n\n    if (data.preview == player.trackPlaying.src) {\n      track.innerHTML = setPause ? 'pause' : 'play_arrow';\n\n      track.onclick = function () {\n        return setPause ? pause(track) : resume(track);\n      };\n    }\n  });\n};\n\n\n\n//# sourceURL=webpack://foxbel-music/./src/js/api_deezer.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/index.css */ \"./src/css/index.css\");\n/* harmony import */ var _api_deezer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api_deezer */ \"./src/js/api_deezer.js\");\n\n\n\nwindow.showLogin = function () {\n  return (0,_api_deezer__WEBPACK_IMPORTED_MODULE_1__.showLogin)();\n};\n\nwindow.logout = function () {\n  return (0,_api_deezer__WEBPACK_IMPORTED_MODULE_1__.logout)();\n};\n\nwindow.showMenu = function () {\n  return showMenu();\n};\n\nwindow.closeMenu = function () {\n  return closeMenu();\n};\n\nwindow.playTrack = function (data, element) {\n  return (0,_api_deezer__WEBPACK_IMPORTED_MODULE_1__.playTrack)(data, element);\n};\n\nwindow.resume = function () {\n  return (0,_api_deezer__WEBPACK_IMPORTED_MODULE_1__.resume)();\n};\n\nwindow.pause = function () {\n  return (0,_api_deezer__WEBPACK_IMPORTED_MODULE_1__.pause)();\n};\n\n(0,_api_deezer__WEBPACK_IMPORTED_MODULE_1__.initializeAPI)(); //Emil responsive menu xD\n\nvar showMenu = function showMenu() {\n  return document.getElementById(\"menu\").classList.remove('hide-menu');\n};\n\nvar closeMenu = function closeMenu() {\n  return document.getElementById(\"menu\").classList.add('hide-menu');\n};\n\n//# sourceURL=webpack://foxbel-music/./src/js/index.js?");

/***/ }),

/***/ "./src/js/track.js":
/*!*************************!*\
  !*** ./src/js/track.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Track\": () => (/* binding */ Track)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Track = function Track(artist, title, preview, album, albumTitle) {\n  _classCallCheck(this, Track);\n\n  this.artist = artist, this.title = title, this.preview = preview, this.album = album, this.albumTitle = albumTitle;\n};\n\n//# sourceURL=webpack://foxbel-music/./src/js/track.js?");

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