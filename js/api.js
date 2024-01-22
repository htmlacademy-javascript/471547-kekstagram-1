const ErrorMessage = {
  GET: 'Упс... Что-то пошло не так( Попробуйте обновить страницу',
  POST: 'Не удалось отправить данные. Попробуйте еще раз',
};

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';

const Route = {
  GET: '/data',
  POST: 'dffSDf/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, errorMessage, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok){
        throw new Error(errorMessage);
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorMessage);
    });

const getData = () => load(Route.GET, ErrorMessage.GET);

const sendData = (body) =>
  load(Route.POST, ErrorMessage.POST, Method.POST, body);

export {getData, sendData};
