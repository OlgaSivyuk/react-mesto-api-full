const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { regexUrl } = require('../constants/regex');

// пути для логина и регистрации
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexUrl),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);

// router.get('/signout', (req, res) => {
//   res.clearCookie('jwt').send({ message: 'Выход' });
// });

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

module.exports = router;
