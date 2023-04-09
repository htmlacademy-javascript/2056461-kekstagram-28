const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '15px 10px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.fontFamily = 'Open Sans';
  alertContainer.style.fontWeight = 700;
  alertContainer.style.color = '#ffe753';
  alertContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';

  alertContainer.textContent = message;

  document.body.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const blockSubmitButton = (button) => {
  button.disabled = true;
  button.textContent = 'Публикую...';
};

const unblockSubmitButton = (button) => {
  button.disabled = false;
  button.textContent = 'Опубликовать';
};

export {getRandomInteger, getRandomArrayElement, isEscapeKey, showAlert, blockSubmitButton, unblockSubmitButton};
