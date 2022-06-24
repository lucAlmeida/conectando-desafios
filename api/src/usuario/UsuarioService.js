const Usuario = require('./Usuario');
const bcrypt = require('bcrypt');
const EmailService = require('../email/EmailService');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const EmailException = require('../email/EmailException');
const InvalidTokenException = require('./InvalidTokenException');
const UserNotFoundException = require('./UserNotFoundException');
const { randomString } = require('../shared/generator');
const UserRegisterException = require('./UserRegisterException');

const salvar = async (body, transaction) => {
  const { username, email, password } = body;
  let { perfilCorporativo } = body;

  const hash = await bcrypt.hash(password, 10);
  if (perfilCorporativo !== true) {
    perfilCorporativo = false;
  }

  const usuario = { username, email, password: hash, activationToken: randomString(16), perfilCorporativo };

  if (transaction === undefined) {
    transaction = await sequelize.transaction();
  }
  try {
    // await EmailService.sendAccountActivation(email, usuario.activationToken);
    // await transaction.commit();
    const usuarioCriado = await Usuario.create(usuario, { transaction });
    return usuarioCriado.id;
  } catch (err) {
    await transaction.rollback();
    // throw new EmailException();
    throw new UserRegisterException();
  }
};

const findByEmail = async (email) => {
  return await Usuario.findOne({ where: { email: email } });
};

const activate = async (token) => {
  const user = await Usuario.findOne({ where: { activationToken: token } });
  if (!user) {
    throw new InvalidTokenException();
  }
  user.inactive = false;
  user.activationToken = null;
  await user.save();
};

const getUsers = async (page, size, authenticatedUser) => {
  const usersWithCount = await Usuario.findAndCountAll({
    where: {
      inactive: false,
      id: {
        [Sequelize.Op.not]: authenticatedUser ? authenticatedUser.id : 0,
      },
    },
    attributes: ['username', 'email', 'perfilCorporativo'],
    limit: size,
    offset: page * size,
  });
  return {
    content: usersWithCount.rows,
    page,
    size: Number.parseInt(size),
    totalPages: Math.ceil(usersWithCount.count / size),
  };
};

const getUser = async (id) => {
  const user = await Usuario.findOne({
    where: { id: id, inactive: false },
    attributes: ['id', 'username', 'email', 'perfilCorporativo'],
  });
  if (!user) {
    throw new UserNotFoundException();
  }
  return user;
};

const updateUser = async (id, updatedBody) => {
  const usuario = await Usuario.findOne({ where: { id: id } });
  usuario.username = updatedBody.username;
  await usuario.save();
};

const deleteUser = async (id) => {
  await Usuario.destroy({ where: { id: id } });
};

module.exports = { salvar, findByEmail, activate, getUsers, getUser, updateUser, deleteUser };
