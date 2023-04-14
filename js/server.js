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

const postUserData = (onSuccess, onError, formInfo, serverAddress) => {
  fetch(
    serverAddress,
    {
      method: 'POST',
      body: formInfo,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export {getServerData, postUserData};
