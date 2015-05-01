import Websocket from './data/websocket';
import Renderer from './renderers/basic';


class App {

  constructor(data, renderer) {
    this.data = data;
    this.renderer = renderer;
  }

  start() {
    this.data.setMessageHandler(this.renderer.render.bind(this.renderer));

    let form = document.getElementById('send');
    form.addEventListener('submit', this.submit.bind(this), false);
  }

  submit(e) {
    e.preventDefault();
    let handle = document.getElementById('user'),
        message = document.getElementById('message');

    this.data.send(
      JSON.stringify({
        user: handle.value || 'Anonymous Coward', message: message.value
      })
    );

    handle.value = '';
    message.value = '';
  }

}

const instance = new App(
  new Websocket('ws://peers.jerel.co:8080'),
  new Renderer('chat')
);

instance.start();

