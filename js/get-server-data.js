const usersDataLoader = (onResolve, onError) => {
  fetch('https://28.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new onError('Не удалось загрузить данные с сервера. Попробуйте перезагрузить страницу.');
    })
    .then((data) => {
      onResolve(data);
    })
    .catch(() => {
      onError(('Не удалось загрузить данные с сервера. Попробуйте перезагрузить страницу.'));
    });
};

export {usersDataLoader};
