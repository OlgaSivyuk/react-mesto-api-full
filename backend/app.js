require('dotenv').config(); // ПР15

console.log(process.env.NODE_ENV); // production

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { allRoutes } = require('./routes/all-routes');
// const { celebrate, Joi } = require('celebrate'); // перенесла в routes
// const auth = require('./middlewares/auth'); // перенесла в routes
// const { regexUrl } = require('./constants/regex'); // перенесла в routes
// const { createUser, login } = require('./controllers/users'); // перенесла в routes

// ПР15 импортируем логи в основной файл
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/not-found-error'); // 404

const { PORT = 3001 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cookieParser());
// просматриваем запросы со строками и другими типами данных
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); // ПР15 подключаем логгер запросов
app.use(require('./middlewares/cors')); // ПР15 подключаем cors

app.get('/crash-test', () => { // ПР15 краш-тест сервера
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

app.use(allRoutes);

// обработка несуществующего роута
app.use((req, res, next) => {
  next(new NotFoundError('Страница не существует.'));
});

app.use(errorLogger); // ПР15 подключаем логгер ошибок

app.use(errors());

app.use((err, req, res, next) => {
  console.log(err);

  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  console.error(err.stack);
  res.status(500).send({ message: 'Ошибка на сервере' });
  next(); // вызываем next чтобы линтер не ругался на неиспользуемый параметр
});

app.listen(PORT, () => {
  console.log('App started and listen port', PORT);
});
