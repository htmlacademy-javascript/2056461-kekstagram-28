const KEKSTAGRAM_GET = 'https://28.javascript.pages.academy/kekstagram/data';

const getServerData = (onSuccess, onError, serverAddress) => {
  fetch(serverAddress)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new onError('Не удалось загрузить данные с сервера. Попробуйте перезагрузить страницу.');
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError(('Не удалось загрузить данные с сервера. Попробуйте перезагрузить страницу.'));
    });
};

export {getServerData, KEKSTAGRAM_GET};
