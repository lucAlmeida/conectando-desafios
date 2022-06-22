const express = require('express');
const UsuarioRouter = require('./usuario/UsuarioRouter');
const AlunoRouter = require('./aluno/AlunoRouter');
const EmpresaRouter = require('./empresa/EmpresaRouter');
const ProjetoRouter = require('./projeto/ProjetoRouter');
const AuthenticationRouter = require('./auth/AuthenticationRouter');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const errorHandler = require('./error/ErrorHandler');
const tokenAuthentication = require('./middleware/tokenAuthentication');
const cors = require('cors');

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'pt-BR',
    lng: 'pt-BR',
    ns: ['translation'],
    defaultNs: 'translation',
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      lookupHeader: 'accept-language',
    },
  });

const app = express();

app.use(cors({ origin: true }));
app.use(middleware.handle(i18next));

app.use(express.json());

app.use(tokenAuthentication);

app.use(UsuarioRouter);
app.use(AlunoRouter);
app.use(EmpresaRouter);
app.use(ProjetoRouter);
app.use(AuthenticationRouter);

app.use(errorHandler);

module.exports = app;
