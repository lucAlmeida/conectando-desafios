const express = require('express');
const EmpresaService = require('./EmpresaService');
const UsuarioService = require('../usuario/UsuarioService');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const ValidationException = require('../error/ValidationException');
const pagination = require('../middleware/pagination');
const ForbiddenException = require('../error/ForbiddenException');

router.post(
  '/api/1.0/empresas',

  check('nome')
    .trim()
    .notEmpty()
    .withMessage('nome_empresa_null')
    .bail()
    .isLength({ min: 4, max: 80 })
    .withMessage('nome_empresa_size'),
  check('responsavel')
    .trim()
    .notEmpty()
    .withMessage('responsavel_null')
    .bail()
    .isLength({ min: 4, max: 60 })
    .withMessage('responsavel_size'),
  check('categoria')
    .trim()
    .notEmpty()
    .withMessage('categoria_null')
    .bail()
    .isLength({ max: 30 })
    .withMessage('categoria_size'),
  check('localidade')
    .trim()
    .notEmpty()
    .withMessage('localidade_empresa_null')
    .bail()
    .isLength({ max: 50 })
    .withMessage('localidade_empresa_size'),
  check('cnpj').trim().notEmpty().withMessage('cnpj_null').bail().isLength({ min: 18 }).withMessage('cnpj_size'),

  check('username')
    .trim()
    .notEmpty()
    .withMessage('username_null')
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage('username_size'),

  check('email')
    .trim()
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
    .trim()
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
      await EmpresaService.salvar(req.body);
      return res.send({ message: req.t('empresa_create_success') });
    } catch (err) {
      next(err);
    }
  }
);

router.get('/api/1.0/empresas', pagination, async (req, res, next) => {
  const authenticatedUser = req.authenticatedUser;
  const { page, size } = req.pagination;
  const { search } = req.query;
  if (!authenticatedUser) {
    return next(new ForbiddenException('unauthorized_access'));
  }
  const empresas = await EmpresaService.getEmpresasWithFilter(page, size, authenticatedUser, search);
  res.send(empresas);
});

router.get('/api/1.0/empresas/:id', async (req, res, next) => {
  try {
    const authenticatedUser = req.authenticatedUser;
    if (!authenticatedUser) {
      return next(new ForbiddenException('unauthorized_access'));
    }

    const empresa = await EmpresaService.getEmpresaByUserId(req.params.id);
    res.send(empresa);
  } catch (err) {
    next(err);
  }
});

router.put(
  '/api/1.0/empresas/:id',
  check('nome')
    .trim()
    .notEmpty()
    .withMessage('nome_empresa_null')
    .bail()
    .isLength({ min: 4, max: 80 })
    .withMessage('nome_empresa_size'),
  check('responsavel')
    .trim()
    .notEmpty()
    .withMessage('responsavel_null')
    .bail()
    .isLength({ min: 4, max: 60 })
    .withMessage('responsavel_size'),
  check('categoria')
    .trim()
    .notEmpty()
    .withMessage('categoria_null')
    .bail()
    .isLength({ max: 30 })
    .withMessage('categoria_size'),
  check('localidade')
    .trim()
    .notEmpty()
    .withMessage('localidade_empresa_null')
    .bail()
    .isLength({ max: 50 })
    .withMessage('localidade_empresa_size'),
  check('cnpj').trim().notEmpty().withMessage('cnpj_null').bail().isLength({ max: 30 }).withMessage('cnpj_size'),
  async (req, res, next) => {
    const authenticatedUser = req.authenticatedUser;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }

    // eslint-disable-next-line eqeqeq
    if (!authenticatedUser || authenticatedUser.id != req.params.id) {
      return next(new ForbiddenException('unauthorized_empresa_update'));
    }

    await EmpresaService.updateEmpresaByUserId(req.params.id, req.body);
    return res.send();
  }
);

router.delete('/api/1.0/empresas/:id', async (req, res, next) => {
  const authenticatedUser = req.authenticatedUser;
  // eslint-disable-next-line eqeqeq
  if (!authenticatedUser || authenticatedUser.id != req.params.id) {
    return next(new ForbiddenException('unauthorized_empresa_delete'));
  }
  await EmpresaService.deleteEmpresaByUserId(req.params.id);
  res.send();
});

module.exports = router;
