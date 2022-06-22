const express = require('express');
const UsuarioService = require('./UsuarioService');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const ValidationException = require('../error/ValidationException');
const pagination = require('../middleware/pagination');
const ForbiddenException = require('../error/ForbiddenException');

router.post(
  '/api/1.0/usuarios',

  check('username')
    .notEmpty()
    .withMessage('username_null')
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage('username_size'),

  check('email')
    .notEmpty()
    .withMessage('email_null')
    .bail()
    .isEmail()
    .withMessage('email_invalid')
    .bail()
    .custom(async (email) => {
      const usuario = await UsuarioService.findByEmail(email);
      if (usuario) {
        throw new Error('email_inuse');
      }
    }),

  check('password')
    .notEmpty()
    .withMessage('password_null')
    .bail()
    .isLength({ min: 6 })
    .withMessage('password_size')
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    .withMessage('password_pattern'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }
    try {
      const idUsuario = await UsuarioService.salvar(req.body);
      return res.send({ id: idUsuario, message: req.t('user_create_success') });
    } catch (err) {
      next(err);
    }
  }
);

router.post('/api/1.0/usuarios/token/:token', async (req, res, next) => {
  const token = req.params.token;
  try {
    await UsuarioService.activate(token);
    return res.send({ message: req.t('account_activation_success') });
  } catch (err) {
    next(err);
  }
});

router.get('/api/1.0/usuarios', pagination, async (req, res, next) => {
  const authenticatedUser = req.authenticatedUser;
  if (!authenticatedUser) {
    return next(new ForbiddenException('unauthorized_access'));
  }
  const { page, size } = req.pagination;
  const users = await UsuarioService.getUsers(page, size, authenticatedUser);
  res.send(users);
});

router.get('/api/1.0/usuarios/:id', async (req, res, next) => {
  const authenticatedUser = req.authenticatedUser;

  if (!authenticatedUser) {
    return next(new ForbiddenException('unauthorized_access'));
  }
  try {
    const user = await UsuarioService.getUser(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.put('/api/1.0/usuarios/:id', async (req, res, next) => {
  const authenticatedUser = req.authenticatedUser;

  // eslint-disable-next-line eqeqeq
  if (!authenticatedUser || authenticatedUser.id != req.params.id) {
    return next(new ForbiddenException('unauthorized_user_update'));
  }

  await UsuarioService.updateUser(req.params.id, req.body);
  return res.send();
});

router.delete('/api/1.0/usuarios/:id', async (req, res, next) => {
  const authenticatedUser = req.authenticatedUser;
  // eslint-disable-next-line eqeqeq
  if (!authenticatedUser || authenticatedUser.id != req.params.id) {
    return next(new ForbiddenException('unauthorized_user_delete'));
  }
  await UsuarioService.deleteUser(req.params.id);
  res.send();
});

module.exports = router;
