
export default class Websocket {

  constructor(url) {
    this.socket = new window.WebSocket(url);
  }

  setMessageHandler(fn) {
    this.socket.onmessage = fn;
  }

  setErrorHandler(fn) {
    this.socket.onerror = fn;
  }

  send(message) {
    this.socket.send(message);
  }

}
