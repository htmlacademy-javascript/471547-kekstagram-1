const ErrorMessage = {
  GET: 'Упс... Что-то пошло не так( Попробуйте обновить страницу',
  POST: 'Не удалось отправить данные. Попробуйте еще раз',
};

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';

const Route = {
  GET: '/data',
  POST: '/nmnmn',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, OnFailText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok){
        throw new Error('Не удалось отправить фото. Попробуйте еще раз');
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(OnFailText);
    });

const getData = () => load(Route.GET, ErrorMessage.GET);

const sendData = (body) =>
  load(Route.POST, ErrorMessage.POST, Method.POST, body);

export {getData, sendData};
