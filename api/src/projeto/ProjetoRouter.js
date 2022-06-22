const express = require('express');
const ProjetoService = require('./ProjetoService');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const ValidationException = require('../error/ValidationException');
const pagination = require('../middleware/pagination');
const ForbiddenException = require('../error/ForbiddenException');

router.post(
  '/api/1.0/projetos',

  check('titulo')
    .trim()
    .notEmpty()
    .withMessage('titulo_projeto_null')
    .bail()
    .isLength({ min: 4, max: 60 })
    .withMessage('titulo_projeto_size'),

  check('categoria')
    .trim()
    .notEmpty()
    .withMessage('categoria_projeto_null')
    .bail()
    .isLength({ max: 50 })
    .withMessage('categoria_size_null'),

  check('descricao')
    .trim()
    .notEmpty()
    .withMessage('descricao_projeto_null')
    .bail()
    .isLength({ max: 1000 })
    .withMessage('descricao_projeto_size'),

  check('contato')
    .trim()
    .notEmpty()
    .withMessage('contato_projeto_null')
    .bail()
    .isLength({ min: 4, max: 30 })
    .withMessage('contato_projeto_size'),

  async (req, res, next) => {
    const authenticatedUser = req.authenticatedUser;
    if (!authenticatedUser) {
      return next(new ForbiddenException('unauthorized_access'));
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }
    try {
      await ProjetoService.salvar(req.body);
      return res.send({ message: req.t('projeto_create_success') });
    } catch (err) {
      next(err);
    }
  }
);

router.get('/api/1.0/projetos', pagination, async (req, res, next) => {
  const authenticatedUser = req.authenticatedUser;
  const { page, size } = req.pagination;
  const { search } = req.query;
  if (!authenticatedUser) {
    return next(new ForbiddenException('unauthorized_access'));
  }
  const projetos = await ProjetoService.getProjetosWithFilter(page, size, authenticatedUser, search);
  res.send(projetos);
});

router.get('/api/1.0/projetos/:id', async (req, res, next) => {
  const authenticatedUser = req.authenticatedUser;

  if (!authenticatedUser) {
    return next(new ForbiddenException('unauthorized_access'));
  }

  try {
    const projeto = await ProjetoService.getProjeto(req.params.id);
    res.send(projeto);
  } catch (err) {
    next(err);
  }
});

router.put(
  '/api/1.0/projetos/:id',
  check('titulo')
    .trim()
    .notEmpty()
    .withMessage('titulo_projeto_null')
    .bail()
    .isLength({ min: 4, max: 60 })
    .withMessage('titulo_projeto_size'),

  check('categoria')
    .trim()
    .notEmpty()
    .withMessage('categoria_projeto_null')
    .bail()
    .isLength({ max: 50 })
    .withMessage('categoria_size_null'),

  check('descricao')
    .trim()
    .notEmpty()
    .withMessage('descricao_projeto_null')
    .bail()
    .isLength({ max: 500 })
    .withMessage('descricao_size_null'),

  check('contato')
    .trim()
    .notEmpty()
    .withMessage('contato_projeto_null')
    .bail()
    .isLength({ min: 4, max: 30 })
    .withMessage('contato_projeto_size'),

  async (req, res, next) => {
    const authenticatedUser = req.authenticatedUser;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }

    // eslint-disable-next-line eqeqeq
    if (!authenticatedUser || authenticatedUser.id != req.params.id) {
      return next(new ForbiddenException('unauthorized_projeto_update'));
    }

    await ProjetoService.updateProjeto(req.params.id, req.body);
    return res.send();
  }
);

router.delete('/api/1.0/projetos/:id', async (req, res, next) => {
  const authenticatedUser = req.authenticatedUser;
  // eslint-disable-next-line eqeqeq
  const projeto = await ProjetoService.getProjeto(req.params.id);
  if (!authenticatedUser || authenticatedUser.id != projeto.idUsuario) {
    return next(new ForbiddenException('unauthorized_projeto_delete'));
  }
  await ProjetoService.deleteProjeto(req.params.id);
  res.send();
});

module.exports = router;
