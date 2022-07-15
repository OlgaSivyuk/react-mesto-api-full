// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  // 'https://praktikum.tk',
  // 'http://praktikum.tk',
  // 'localhost:3000'
  'https://mesto.project.olgasivyuk.nomoredomains.xyz',
  'http://mesto.project.olgasivyuk.nomoredomains.xyz',
  'http://api.mesto.olgasivyuk.nomoredomains.xyz',
  'https://api.mesto.olgasivyuk.nomoredomains.xyz',
];

// eslint-disable-next-line consistent-return
module.exports = ((req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  // сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('X-Server', 'test');
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  next();
});
