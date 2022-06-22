const express = require('express');
const AlunoService = require('./AlunoService');
const UsuarioService = require('../usuario/UsuarioService');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const ValidationException = require('../error/ValidationException');
const pagination = require('../middleware/pagination');
const ForbiddenException = require('../error/ForbiddenException');

router.post(
  '/api/1.0/alunos',

  check('nome')
    .trim()
    .notEmpty()
    .withMessage('nome_null')
    .bail()
    .isLength({ min: 4, max: 80 })
    .withMessage('nome_size'),

  check('localidade')
    .trim()
    .notEmpty()
    .withMessage('localidade_null')
    .bail()
    .isLength({ max: 50 })
    .withMessage('localidade_size'),

  check('curso').trim().notEmpty().withMessage('curso_null').bail().isLength({ max: 60 }).withMessage('curso_size'),

  check('sobre').trim().notEmpty().withMessage('sobre_null').bail().isLength({ max: 300 }).withMessage('sobre_size'),

  check('semestre')
    .trim()
    .notEmpty()
    .withMessage('semestre_null')
    .bail()
    .isLength({ max: 4 })
    .withMessage('semestre_size'),

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
      await AlunoService.salvar(req.body);
      return res.send({ message: req.t('aluno_create_success') });
    } catch (err) {
      next(err);
    }
  }
);

router.get('/api/1.0/alunos', pagination, async (req, res, next) => {
  const authenticatedUser = req.authenticatedUser;
  const { page, size } = req.pagination;
  const { search } = req.query;

  if (!authenticatedUser) {
    return next(new ForbiddenException('unauthorized_access'));
  }
  const alunos = await AlunoService.getAlunosWithFilter(page, size, authenticatedUser, search);
  res.send(alunos);
});

router.get('/api/1.0/alunos/:id', async (req, res, next) => {
  try {
    const authenticatedUser = req.authenticatedUser;
    if (!authenticatedUser) {
      return next(new ForbiddenException('unauthorized_access'));
    }
    const aluno = await AlunoService.getAlunoByUserId(req.params.id);
    res.send(aluno);
  } catch (err) {
    next(err);
  }
});

router.put(
  '/api/1.0/alunos/:id',
  check('nome')
    .trim()
    .notEmpty()
    .withMessage('nome_null')
    .bail()
    .isLength({ min: 4, max: 80 })
    .withMessage('nome_size'),

  check('localidade')
    .trim()
    .notEmpty()
    .withMessage('localidade_null')
    .bail()
    .isLength({ max: 50 })
    .withMessage('localidade_size'),

  check('curso').trim().notEmpty().withMessage('curso_null').bail().isLength({ max: 60 }).withMessage('curso_size'),

  check('sobre').trim().notEmpty().withMessage('sobre_null').bail().isLength({ max: 300 }).withMessage('nome_size'),

  check('semestre')
    .trim()
    .notEmpty()
    .withMessage('semestre_null')
    .bail()
    .isLength({ max: 4 })
    .withMessage('semestre_size'),
  async (req, res, next) => {
    const authenticatedUser = req.authenticatedUser;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }

    // eslint-disable-next-line eqeqeq
    if (!authenticatedUser || authenticatedUser.id != req.params.id) {
      return next(new ForbiddenException('unauthorized_aluno_update'));
    }

    await AlunoService.updateAlunoByUserId(req.params.id, req.body);
    return res.send();
  }
);

router.delete('/api/1.0/alunos/:id', async (req, res, next) => {
  const authenticatedUser = req.authenticatedUser;
  // eslint-disable-next-line eqeqeq
  if (!authenticatedUser || authenticatedUser.id != req.params.id) {
    return next(new ForbiddenException('unauthorized_aluno_delete'));
  }
  await AlunoService.deleteAlunoByUserId(req.params.id);
  res.send();
});

module.exports = router;
