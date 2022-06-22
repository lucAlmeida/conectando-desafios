const Empresa = require('./Empresa');
const UsuarioService = require('../usuario/UsuarioService');
const EmpresaNotFoundException = require('./EmpresaNotFoundException');
const UserRegisterException = require('../usuario/UserRegisterException');
const sequelize = require('../config/database');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const salvar = async (body) => {
  const { id, nome, responsavel, categoria, localidade, cnpj, idUsuario } = body;
  const transaction = await sequelize.transaction();
  let response;
  try {
    body.perfilCorporativo = true;
    const idUsuario = await UsuarioService.salvar(body, transaction);
    console.log('idUsuario criado na empresa: ' + idUsuario);
    const empresa = { id, nome, responsavel, categoria, localidade, cnpj, idUsuario };
    console.log('To commit on empresaService..');
    response = await Empresa.create(empresa, { transaction });
    await transaction.commit();
  } catch (error) {
    console.log('To rollback on empresaService');
    await transaction.rollback();

    throw new UserRegisterException();
  }
  return response;
};

const getEmpresasWithFilter = async (page, size, authenticatedUser, search) => {
  var empresasWithCount;
  if (search) {
    empresasWithCount = await Empresa.findAndCountAll({
      attributes: ['nome', 'responsavel', 'categoria', 'localidade', 'cnpj', 'idUsuario'],
      limit: size,
      offset: page * size,
      where: {
        [Op.or]: [
          { nome: { [Op.like]: `%${search}%` } },
          { responsavel: { [Op.like]: `%${search}%` } },
          { categoria: { [Op.like]: `%${search}%` } },
          { localidade: { [Op.like]: `%${search}%` } },
          { cnpj: { [Op.like]: `%${search}%` } },
        ],
      },
    });
  } else {
    empresasWithCount = await Empresa.findAndCountAll({
      attributes: ['nome', 'responsavel', 'categoria', 'localidade', 'cnpj', 'idUsuario'],
      limit: size,
      offset: page * size,
    });
  }
  return {
    content: empresasWithCount.rows,
    page,
    size: Number.parseInt(size),
    totalPages: Math.ceil(empresasWithCount.count / size),
  };
};

const getEmpresas = async (page, size, authenticatedUser) => {
  const empresasWithCount = await Empresa.findAndCountAll({
    attributes: ['nome', 'responsavel', 'categoria', 'localidade', 'cnpj', 'idUsuario'],
    limit: size,
    offset: page * size,
  });
  return {
    content: empresasWithCount.rows,
    page,
    size: Number.parseInt(size),
    totalPages: Math.ceil(empresasWithCount.count / size),
  };
};

const getEmpresaByUserId = async (userId) => {
  const empresa = await Empresa.findOne({
    where: { idUsuario: userId },
    attributes: ['nome', 'responsavel', 'categoria', 'localidade', 'cnpj', 'idUsuario'],
  });
  if (!empresa) {
    throw new EmpresaNotFoundException();
  }
  return empresa;
};

const updateEmpresaByUserId = async (userId, updatedBody) => {
  const empresa = await Empresa.findOne({ where: { idUsuario: userId } });
  empresa.nome = updatedBody.nome;
  empresa.responsavel = updatedBody.responsavel;
  empresa.categoria = updatedBody.categoria;
  empresa.localidade = updatedBody.localidade;
  empresa.cnpj = updatedBody.cnpj;
  await empresa.save();
};

const deleteEmpresaByUserId = async (userId) => {
  await Empresa.destroy({ where: { idUsuario: userId } });
};

module.exports = {
  salvar,
  getEmpresas,
  getEmpresasWithFilter,
  getEmpresaByUserId,
  updateEmpresaByUserId,
  deleteEmpresaByUserId,
};
