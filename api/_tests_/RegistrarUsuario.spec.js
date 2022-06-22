const request = require('supertest');
const app = require('../src/app');
const Usuario = require('../src/usuario/Usuario');
const sequelize = require('../src/config/database');
const SMTPServer = require('smtp-server').SMTPServer;
const en = require('../locales/en/translation.json');
const ptBR = require('../locales/pt-BR/translation.json');

let ultimoEmail, server;
let simulateSmtpFailure = false;

beforeAll(async () => {
  server = new SMTPServer({
    authOptional: true,
    onData(stream, session, callback) {
      let mailBody;
      stream.on('data', (data) => {
        mailBody += data.toString();
      });
      stream.on('end', () => {
        if (simulateSmtpFailure) {
          const err = new Error('Invalid mailbox');
          err.responseCode = 553;
          return callback(err);
        }
        ultimoEmail = mailBody;
        callback();
      });
    },
  });

  await server.listen(8587, 'localhost');
  await sequelize.sync();
  jest.setTimeout(20000);
});

beforeEach(async () => {
  simulateSmtpFailure = false;
  await Usuario.destroy({ truncate: true });
});

afterAll(async () => {
  await server.close();
  jest.setTimeout(5000);
});

const usuarioValido = {
  username: 'usuario1',
  email: 'usuario1@mail.com',
  password: 'P4ssword',
};

const postUsuario = (usuario = usuarioValido, options = {}) => {
  const agent = request(app).post('/api/1.0/usuarios');
  if (options.language) {
    agent.set('Accept-Language', options.language);
  }
  return agent.send(usuario);
};

describe('Cadastro de Usuário', () => {
  it('retorna 200 OK quando requisição para criar conta é valida', async () => {
    const response = await postUsuario();
    expect(response.status).toBe(200);
  });
  it('retorna mensagem de sucesso quando requisição para criar conta  é válida', async () => {
    const response = await postUsuario();
    expect(response.body.message).toBe(ptBR.user_create_success);
  });
  it('salva o usuário no banco de dados', async () => {
    await postUsuario();
    const usuarioLista = await Usuario.findAll();
    expect(usuarioLista.length).toBe(1);
  });
  it('salva nome de usuário e email no banco de dados', async () => {
    await postUsuario();
    const usuarioLista = await Usuario.findAll();
    const usuarioSalvo = usuarioLista[0];
    expect(usuarioSalvo.username).toBe('usuario1');
    expect(usuarioSalvo.email).toBe('usuario1@mail.com');
  });
  it('executa função hash na senha no banco de dados', async () => {
    await postUsuario();
    const usuarioLista = await Usuario.findAll();
    const usuarioSalvo = usuarioLista[0];
    expect(usuarioSalvo.password).not.toBe('P4ssword');
  });
  it('retorna 400 quando nome de usuário é nulo', async () => {
    const response = await postUsuario({
      username: null,
      email: 'usuario1@mail.com',
      password: 'P4ssword',
    });
    expect(response.status).toBe(400);
  });
  it('retorna validationErrors no response body quando ocorrer erro de validação', async () => {
    const response = await postUsuario({
      username: null,
      email: 'usuario1@mail.com',
      password: 'P4ssword',
    });

    const body = response.body;
    expect(body.validationErrors).not.toBeUndefined();
  });
  it('retorna erro para ambos os campos quando nome de usuário e email forem nulos', async () => {
    const response = await postUsuario({
      email: null,
      username: null,
      password: 'P4ssword',
    });
    const body = response.body;
    expect(Object.keys(body.validationErrors)).toEqual(['username', 'email']);
  });
  it.each([
    ['username', 'Nome de usuário não pode ser nulo'],
    ['email', 'E-mail não pode ser nulo'],
    ['password', 'Senha não pode ser nula'],
  ])('quando %s é nulo %s is received', async (campo, mensagemEsperada) => {
    const usuario = {
      username: 'usuario1',
      email: 'usuario1@mail.com',
      password: 'P4ssword',
    };
    usuario[campo] = null;
    const response = await postUsuario(usuario);
    const body = response.body;
    expect(body.validationErrors[campo]).toBe(mensagemEsperada);
  });
  it.each`
    campo         | valor                 | mensagemEsperada
    ${'username'} | ${null}               | ${ptBR.username_null}
    ${'username'} | ${'usr'}              | ${ptBR.username_size}
    ${'username'} | ${'a'.repeat(33)}     | ${ptBR.username_size}
    ${'email'}    | ${null}               | ${ptBR.email_null}
    ${'email'}    | ${'mail.com'}         | ${ptBR.email_invalid}
    ${'email'}    | ${'usuario.mail.com'} | ${ptBR.email_invalid}
    ${'email'}    | ${'usuario@mail'}     | ${ptBR.email_invalid}
    ${'password'} | ${null}               | ${ptBR.password_null}
    ${'password'} | ${'P4ssw'}            | ${ptBR.password_size}
    ${'password'} | ${'alllowercase'}     | ${ptBR.password_pattern}
    ${'password'} | ${'ALLUPPERCASE'}     | ${ptBR.password_pattern}
    ${'password'} | ${'1234567890'}       | ${ptBR.password_pattern}
    ${'password'} | ${'lowerandUPPER'}    | ${ptBR.password_pattern}
    ${'password'} | ${'lower4nd5667'}     | ${ptBR.password_pattern}
    ${'password'} | ${'UPPER44444'}       | ${ptBR.password_pattern}
  `('retorna $mensagemEsperada quando $campo é $valor', async ({ campo, mensagemEsperada, valor }) => {
    const usuario = {
      username: 'usuario1',
      email: 'usuario1@mail.com',
      password: 'P4ssword',
    };
    usuario[campo] = valor;
    const response = await postUsuario(usuario);
    const body = response.body;
    expect(body.validationErrors[campo]).toBe(mensagemEsperada);
  });

  it(`retorna ${ptBR.email_inuse} quando email já está em uso`, async () => {
    await Usuario.create({ ...usuarioValido });
    const response = await postUsuario();
    expect(response.body.validationErrors.email).toBe(ptBR.email_inuse);
  });

  it('retorna erros quando ambos nome de usuário é nulo e e-mail está em uso', async () => {
    await Usuario.create({ ...usuarioValido });
    const response = await postUsuario({
      username: null,
      email: usuarioValido.email,
      password: 'P4ssword',
    });
    const body = response.body;
    expect(Object.keys(body.validationErrors)).toEqual(['username', 'email']);
  });

  /*
  it('cria usuário em modo inativo', async () => {
    await postUsuario();
    const usuarios = await Usuario.findAll();
    const usuarioSalvo = usuarios[0];
    expect(usuarioSalvo.inactive).toBe(true);
  });

  it('cria usuário em modo inativo quando request body contém inativo como falso', async () => {
    const novoUsuario = { ...usuarioValido, inactive: false };
    await postUsuario(novoUsuario);
    const usuarios = await Usuario.findAll();
    const usuarioSalvo = usuarios[0];
    expect(usuarioSalvo.inactive).toBe(true);
  });

  it('cria activationToken para usuário', async () => {
    await postUsuario();
    const usuarios = await Usuario.findAll();
    const usuarioSalvo = usuarios[0];
    expect(usuarioSalvo.activationToken).toBeTruthy();
  });

  it('envia email de ativação de conta com activationToken', async () => {
    await postUsuario();

    const usuarios = await Usuario.findAll();
    const usuarioSalvo = usuarios[0];
    expect(ultimoEmail).toContain('usuario1@mail.com');
    expect(ultimoEmail).toContain(usuarioSalvo.activationToken);
  });

  it('retorna 502 Bad Gateway quando envio de email falhar', async () => {
    simulateSmtpFailure = true;
    const response = await postUsuario();
    expect(response.status).toBe(502);
  });

  it('retorna mensagem de falha de Email quando envio de email falhar', async () => {
    simulateSmtpFailure = true;
    const response = await postUsuario();
    expect(response.body.message).toBe(ptBR.email_failure);
  });

  it('não salva usuário no banco de dados se envio de email de ativação falhar', async () => {
    simulateSmtpFailure = true;
    await postUsuario();
    const usuarios = await Usuario.findAll();
    expect(usuarios.length).toBe(0);
  });
  */

  it('retorna erro de validação em erro no response body quando validação falhar', async () => {
    const response = await postUsuario({
      username: null,
      email: usuarioValido.email,
      password: 'P4ssword',
    });

    expect(response.body.message).toBe(ptBR.validation_failure);
  });
});
