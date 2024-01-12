// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"timer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTime = addTime;
exports.updateScore = updateScore;
var timer;
var maxTime = 0;
var timeInSeconds = 0;
var score = 0;
function toLeaderboard() {
  sessionStorage.setItem('SCORE', score);
  window.location.href = "leaderBoard.html";
}
function setMaxTime() {
  var selectedDifficulty = sessionStorage.getItem('DIFFICULTY');
  switch (selectedDifficulty) {
    case 'easy':
      maxTime = 30;
      break;
    case 'medium':
      maxTime = 20;
      break;
    case 'hard':
      maxTime = 15;
      break;
    default:
      throw new Error('Unknown difficulty');
  }
  timeInSeconds = maxTime;
}
function updateScore(points) {
  score += points;
  document.getElementById("displayScore").innerHTML = " ".concat(score);
}
function updateTimer() {
  var minutes = Math.floor(timeInSeconds / 60);
  var seconds = timeInSeconds % 60;
  var displayTime = "".concat(String(minutes).padStart(2, "0"), ":").concat(String(seconds).padStart(2, "0"));
  document.getElementById("timer").innerText = displayTime;
  var progressBar = document.getElementById("progress-bar");
  var percentage = timeInSeconds / maxTime * 100;
  progressBar.style.width = "".concat(percentage, "%");
}
function addTime(time) {
  timeInSeconds = Math.min(timeInSeconds + time, maxTime);
  updateTimer();
}
function startTimer() {
  setMaxTime();
  timer = setInterval(function () {
    if (timeInSeconds > 0) {
      timeInSeconds--;
      updateTimer();
    } else {
      clearInterval(timer);
      toLeaderboard();
    }
  }, 1000);
}
window.addEventListener("load", function () {
  var user = sessionStorage.getItem("USER");
  document.getElementById("displayName").innerHTML = " ".concat(user);
  document.getElementById("displayScore").innerHTML = " ".concat(score);
  var endGameBtn = document.getElementById("btn-endGame");
  endGameBtn.addEventListener("click", toLeaderboard);
  startTimer();
});
},{}],"game.js":[function(require,module,exports) {
"use strict";

var _timer = require("./timer.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var totalNumbers = 4;
var currentNumber = 1;
var items = document.querySelectorAll(".item");
var selectedIndex = 0;
var startPoint = 0;
var selectedDifficulty = sessionStorage.getItem("DIFFICULTY");
var gameProperties = {
  extraTime: 0,
  subTime: 0,
  gainedPoints: 0,
  lostPoints: 0,
  pointsForFinishing: 0
};
var backgroundMusic = document.getElementById('backgroundMusic');
var correctSound = document.getElementById('correctSound');
var wrongSound = document.getElementById('wrongSound');
var audioContext = new AudioContext();
function setDifficulty() {
  switch (selectedDifficulty) {
    case "easy":
      gameProperties.extraTime = 10;
      gameProperties.subTime = -1;
      gameProperties.gainedPoints = 100;
      gameProperties.lostPoints = -50;
      gameProperties.pointsForFinishing = 500;
      break;
    case "medium":
      gameProperties.extraTime = 8;
      gameProperties.subTime = -2;
      gameProperties.gainedPoints = 150;
      gameProperties.lostPoints = -75;
      gameProperties.pointsForFinishing = 600;
      break;
    case "hard":
      gameProperties.extraTime = 6;
      gameProperties.subTime = -3;
      gameProperties.gainedPoints = 200;
      gameProperties.lostPoints = -100;
      gameProperties.pointsForFinishing = 700;
      break;
    default:
      throw new Error("Unknown difficulty");
  }
}
function shuffleArray(array) {
  var shuffled = _toConsumableArray(array);
  for (var i = shuffled.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [shuffled[j], shuffled[i]];
    shuffled[i] = _ref[0];
    shuffled[j] = _ref[1];
  }
  return shuffled;
}
function handleItemClick(event) {
  handleInteraction(event);
  audioContext.resume();
}
function handleInteraction(input) {
  var targetItem = input instanceof Event ? input.target : input;
  var clickedNumber = parseInt(targetItem.textContent, 10);
  if (clickedNumber === currentNumber) {
    correctSound.play();
    targetItem.classList.add("completed");
    currentNumber++;
    (0, _timer.updateScore)(gameProperties.gainedPoints);
    if (currentNumber > totalNumbers) {
      (0, _timer.updateScore)(gameProperties.pointsForFinishing);
      (0, _timer.addTime)(gameProperties.extraTime);
      repaintGameContainer();
    }
  } else {
    wrongSound.play();
    targetItem.classList.add("wrong");
    (0, _timer.updateScore)(gameProperties.lostPoints);
    (0, _timer.addTime)(gameProperties.subTime);
    setTimeout(function () {
      targetItem.classList.remove("wrong");
    }, 300);
  }
}
function generateitems(numberOfItems) {
  var container = document.getElementById("itemContainer");
  if (selectedDifficulty === "medium") {
    startPoint = Math.floor(Math.random() * 85) + 1;
  }
  var itemsArray = Array.from(Array(numberOfItems).keys()).map(function (i) {
    return i + 1 + startPoint;
  });
  var definitiveArray = shuffleArray(itemsArray);
  for (var i = 1; i <= numberOfItems; i++) {
    var item = document.createElement("div");
    item.textContent = definitiveArray[i - 1];
    item.className = "item";
    item.id = "item-".concat(definitiveArray[i - 1]);
    item.addEventListener("click", handleItemClick);
    container.appendChild(item);
  }
  document.body.appendChild(container);
}
function repaintGameContainer() {
  totalNumbers++;
  currentNumber = 1;
  document.getElementById("itemContainer").innerHTML = "";
  generateitems(totalNumbers);
  items = document.querySelectorAll(".item");
  selectedIndex = -1;
}
function highlightSelected() {
  items.forEach(function (item, index) {
    if (index === selectedIndex) {
      item.classList.add("selected");
    } else {
      item.classList.remove("selected");
    }
  });
}
function handleKeyPress(event) {
  if (event.key === "ArrowLeft") {
    selectedIndex = Math.max(0, selectedIndex - 1);
  } else if (event.key === "ArrowRight") {
    selectedIndex = Math.min(items.length - 1, selectedIndex + 1);
  } else if (event.key === "Enter") {
    var selectedItem = items[selectedIndex];
    handleInteraction(selectedItem);
  }
  highlightSelected();
}
window.addEventListener("load", function () {
  setDifficulty();
  repaintGameContainer();
  document.addEventListener("keydown", handleKeyPress);
  highlightSelected();
  backgroundMusic.play();
});
},{"./timer.js":"timer.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54762" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","game.js"], null)
//# sourceMappingURL=/game.7bbe06d5.js.map