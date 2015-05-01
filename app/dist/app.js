(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _Websocket = require('./data/websocket');

var _Websocket2 = _interopRequireDefault(_Websocket);

var _Renderer = require('./renderers/basic');

var _Renderer2 = _interopRequireDefault(_Renderer);

var App = (function () {
  function App(data, renderer) {
    _classCallCheck(this, App);

    this.data = data;
    this.renderer = renderer;
  }

  _createClass(App, [{
    key: 'start',
    value: function start() {
      this.data.setMessageHandler(this.renderer.render.bind(this.renderer));

      var form = document.getElementById('send');
      form.addEventListener('submit', this.submit.bind(this), false);
    }
  }, {
    key: 'submit',
    value: function submit(e) {
      e.preventDefault();
      var handle = document.getElementById('user'),
          message = document.getElementById('message');

      this.data.send(JSON.stringify({
        user: handle.value || 'Anonymous Coward', message: message.value
      }));

      handle.value = '';
      message.value = '';
    }
  }]);

  return App;
})();

var instance = new App(new _Websocket2['default']('ws://127.0.0.1:8080'), new _Renderer2['default']('chat'));

instance.start();

},{"./data/websocket":2,"./renderers/basic":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var Websocket = (function () {
  function Websocket(url) {
    _classCallCheck(this, Websocket);

    this.socket = new window.WebSocket(url);
  }

  _createClass(Websocket, [{
    key: "setMessageHandler",
    value: function setMessageHandler(fn) {
      this.socket.onmessage = fn;
    }
  }, {
    key: "setErrorHandler",
    value: function setErrorHandler(fn) {
      this.socket.onerror = fn;
    }
  }, {
    key: "send",
    value: function send(message) {
      this.socket.send(message);
    }
  }]);

  return Websocket;
})();

exports["default"] = Websocket;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var Renderer = (function () {
  function Renderer(elementSelector) {
    _classCallCheck(this, Renderer);

    this.element = document.getElementById(elementSelector);
  }

  _createClass(Renderer, [{
    key: 'render',
    value: function render(json) {
      var data = undefined,
          container = document.createElement('div'),
          handle = document.createElement('div'),
          message = document.createElement('div'),
          divider = document.createElement('hr');

      try {
        data = JSON.parse(json.data);
      } catch (e) {
        return;
      }

      if (data.user) {
        handle.innerText = '' + data.user + ' says:';
      }

      if (data.message) {
        message.innerText = '"' + data.message + '"';
      }

      container.appendChild(handle);
      container.appendChild(message);
      container.appendChild(divider);

      this.element.insertBefore(container, this.element.firstChild);
    }
  }]);

  return Renderer;
})();

exports['default'] = Renderer;
module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9qZXJlbC9kZXYvcGVlcnMvYXBwL3NyYy9hcHAuanMiLCIvaG9tZS9qZXJlbC9kZXYvcGVlcnMvYXBwL3NyYy9kYXRhL3dlYnNvY2tldC5qcyIsIi9ob21lL2plcmVsL2Rldi9wZWVycy9hcHAvc3JjL3JlbmRlcmVycy9iYXNpYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O3lCQ0FzQixrQkFBa0I7Ozs7d0JBQ25CLG1CQUFtQjs7OztJQUdsQyxHQUFHO0FBRUksV0FGUCxHQUFHLENBRUssSUFBSSxFQUFFLFFBQVEsRUFBRTswQkFGeEIsR0FBRzs7QUFHTCxRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixRQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztHQUMxQjs7ZUFMRyxHQUFHOztXQU9GLGlCQUFHO0FBQ04sVUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7O0FBRXRFLFVBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0MsVUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNoRTs7O1dBRUssZ0JBQUMsQ0FBQyxFQUFFO0FBQ1IsT0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25CLFVBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1VBQ3hDLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUVqRCxVQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDWixJQUFJLENBQUMsU0FBUyxDQUFDO0FBQ2IsWUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLElBQUksa0JBQWtCLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLO09BQ2pFLENBQUMsQ0FDSCxDQUFDOztBQUVGLFlBQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLGFBQU8sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0tBQ3BCOzs7U0EzQkcsR0FBRzs7O0FBK0JULElBQU0sUUFBUSxHQUFHLElBQUksR0FBRyxDQUN0QiwyQkFBYyxxQkFBcUIsQ0FBQyxFQUNwQywwQkFBYSxNQUFNLENBQUMsQ0FDckIsQ0FBQzs7QUFFRixRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7SUN2Q0ksU0FBUztBQUVqQixXQUZRLFNBQVMsQ0FFaEIsR0FBRyxFQUFFOzBCQUZFLFNBQVM7O0FBRzFCLFFBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ3pDOztlQUprQixTQUFTOztXQU1YLDJCQUFDLEVBQUUsRUFBRTtBQUNwQixVQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7S0FDNUI7OztXQUVjLHlCQUFDLEVBQUUsRUFBRTtBQUNsQixVQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7S0FDMUI7OztXQUVHLGNBQUMsT0FBTyxFQUFFO0FBQ1osVUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0I7OztTQWhCa0IsU0FBUzs7O3FCQUFULFNBQVM7Ozs7Ozs7Ozs7Ozs7O0lDQVQsUUFBUTtBQUVoQixXQUZRLFFBQVEsQ0FFZixlQUFlLEVBQUU7MEJBRlYsUUFBUTs7QUFHekIsUUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0dBQ3pEOztlQUprQixRQUFROztXQU1yQixnQkFBQyxJQUFJLEVBQUU7QUFDWCxVQUFJLElBQUksWUFBQTtVQUNKLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztVQUN6QyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7VUFDdEMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1VBQ3ZDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUUzQyxVQUFJO0FBQ0YsWUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO09BQzlCLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDVixlQUFPO09BQ1I7O0FBRUQsVUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ2IsY0FBTSxDQUFDLFNBQVMsUUFBTSxJQUFJLENBQUMsSUFBSSxXQUFRLENBQUM7T0FDekM7O0FBRUQsVUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2hCLGVBQU8sQ0FBQyxTQUFTLFNBQU8sSUFBSSxDQUFDLE9BQU8sTUFBRyxDQUFDO09BQ3pDOztBQUVELGVBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUIsZUFBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQixlQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUUvQixVQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUMvRDs7O1NBaENrQixRQUFROzs7cUJBQVIsUUFBUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgV2Vic29ja2V0IGZyb20gJy4vZGF0YS93ZWJzb2NrZXQnO1xuaW1wb3J0IFJlbmRlcmVyIGZyb20gJy4vcmVuZGVyZXJzL2Jhc2ljJztcblxuXG5jbGFzcyBBcHAge1xuXG4gIGNvbnN0cnVjdG9yKGRhdGEsIHJlbmRlcmVyKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXI7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLmRhdGEuc2V0TWVzc2FnZUhhbmRsZXIodGhpcy5yZW5kZXJlci5yZW5kZXIuYmluZCh0aGlzLnJlbmRlcmVyKSk7XG5cbiAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZW5kJyk7XG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gIH1cblxuICBzdWJtaXQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgaGFuZGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXInKSxcbiAgICAgICAgbWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlJyk7XG5cbiAgICB0aGlzLmRhdGEuc2VuZChcbiAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdXNlcjogaGFuZGxlLnZhbHVlIHx8ICdBbm9ueW1vdXMgQ293YXJkJywgbWVzc2FnZTogbWVzc2FnZS52YWx1ZVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgaGFuZGxlLnZhbHVlID0gJyc7XG4gICAgbWVzc2FnZS52YWx1ZSA9ICcnO1xuICB9XG5cbn1cblxuY29uc3QgaW5zdGFuY2UgPSBuZXcgQXBwKFxuICBuZXcgV2Vic29ja2V0KCd3czovLzEyNy4wLjAuMTo4MDgwJyksXG4gIG5ldyBSZW5kZXJlcignY2hhdCcpXG4pO1xuXG5pbnN0YW5jZS5zdGFydCgpO1xuXG4iLCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYnNvY2tldCB7XG5cbiAgY29uc3RydWN0b3IodXJsKSB7XG4gICAgdGhpcy5zb2NrZXQgPSBuZXcgd2luZG93LldlYlNvY2tldCh1cmwpO1xuICB9XG5cbiAgc2V0TWVzc2FnZUhhbmRsZXIoZm4pIHtcbiAgICB0aGlzLnNvY2tldC5vbm1lc3NhZ2UgPSBmbjtcbiAgfVxuXG4gIHNldEVycm9ySGFuZGxlcihmbikge1xuICAgIHRoaXMuc29ja2V0Lm9uZXJyb3IgPSBmbjtcbiAgfVxuXG4gIHNlbmQobWVzc2FnZSkge1xuICAgIHRoaXMuc29ja2V0LnNlbmQobWVzc2FnZSk7XG4gIH1cblxufVxuIiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlciB7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFNlbGVjdG9yKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFNlbGVjdG9yKTtcbiAgfVxuXG4gIHJlbmRlcihqc29uKSB7XG4gICAgbGV0IGRhdGEsXG4gICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICBoYW5kbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICBkaXZpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcblxuICAgIHRyeSB7XG4gICAgICBkYXRhID0gSlNPTi5wYXJzZShqc29uLmRhdGEpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS51c2VyKSB7XG4gICAgICBoYW5kbGUuaW5uZXJUZXh0ID0gYCR7ZGF0YS51c2VyfSBzYXlzOmA7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEubWVzc2FnZSkge1xuICAgICAgbWVzc2FnZS5pbm5lclRleHQgPSBgXCIke2RhdGEubWVzc2FnZX1cImA7XG4gICAgfVxuXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhhbmRsZSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXZpZGVyKTtcblxuICAgIHRoaXMuZWxlbWVudC5pbnNlcnRCZWZvcmUoY29udGFpbmVyLCB0aGlzLmVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gIH1cbn1cbiJdfQ==
