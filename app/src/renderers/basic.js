
export default class Renderer {

  constructor(elementSelector) {
    this.element = document.getElementById(elementSelector);
  }

  render(json) {
    let data,
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
      handle.textContent = `${data.user} says:`;
    }

    if (data.message) {
      message.textContent = `"${data.message}"`;
    }

    container.appendChild(handle);
    container.appendChild(message);
    container.appendChild(divider);

    this.element.insertBefore(container, this.element.firstChild);
  }
}
