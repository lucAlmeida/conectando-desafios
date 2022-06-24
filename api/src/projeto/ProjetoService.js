const Projeto = require('./Projeto');
const ProjetoNotFoundException = require('./ProjetoNotFoundException');
const Empresa = require('../empresa/Empresa');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const salvar = async (body) => {
  const { titulo, categoria, descricao, contato, idUsuario } = body;

  const projeto = { titulo, categoria, descricao, contato, idUsuario };
  const response = await Projeto.create(projeto);
  return response;
};

const getProjetosWithFilter = async (page, size, authenticatedUser, search) => {
  var projetosWithCount;
  if (search) {
    projetosWithCount = await Projeto.findAndCountAll({
      attributes: ['id', 'titulo', 'categoria', 'descricao', 'contato', 'idUsuario', 'createdAt'],
      limit: size,
      offset: page * size,
      where: {
        [Op.or]: [
          { titulo: { [Op.iLike]: `%${search}%` } },
          { categoria: { [Op.iLike]: `%${search}%` } },
          { descricao: { [Op.iLike]: `%${search}%` } },
          // { contato: { [Op.iLike]: `%${search}%` } },
          // { '$Empresa.nome$': { [Op.iLike]: `%${search}%` } },
        ],
      },
      include: [
        {
          model: Empresa,
          attributes: [['nome', 'nomeEmpresa']],
          // where: {
          //   idUsuario: { $col: 'Projeto.idUsuario' },
          // },
        },
      ],
    });
  } else {
    projetosWithCount = await Projeto.findAndCountAll({
      attributes: ['id', 'titulo', 'categoria', 'descricao', 'contato', 'idUsuario', 'createdAt'],
      limit: size,
      offset: page * size,
    });
  }
  return {
    content: projetosWithCount.rows,
    page,
    size: Number.parseInt(size),
    totalPages: Math.ceil(projetosWithCount.count / size),
  };
};

const getProjetos = async (page, size, authenticatedUser) => {
  const projetosWithCount = await Projeto.findAndCountAll({
    attributes: ['id', 'titulo', 'categoria', 'descricao', 'contato', 'idUsuario', 'createdAt'],
    limit: size,
    offset: page * size,
  });
  return {
    content: projetosWithCount.rows,
    page,
    size: Number.parseInt(size),
    totalPages: Math.ceil(projetosWithCount.count / size),
  };
};

const getProjeto = async (id) => {
  const projeto = await Projeto.findOne({
    where: { id: id },
    attributes: ['id', 'titulo', 'categoria', 'descricao', 'contato', 'idUsuario', 'createdAt'],
  });
  if (!projeto) {
    throw new ProjetoNotFoundException();
  }
  return projeto;
};

const updateProjeto = async (id, updatedBody) => {
  const projeto = await Projeto.findOne({ where: { id: id } });
  projeto.titulo = updatedBody.titulo;
  projeto.categoria = updatedBody.categoria;
  projeto.descricao = updatedBody.descricao;
  projeto.contato = updatedBody.contato;
  await projeto.save();
};

const deleteProjeto = async (id) => {
  await Projeto.destroy({ where: { id: id } });
};

module.exports = {
  salvar,
  getProjetos,
  getProjetosWithFilter,
  getProjeto,
  updateProjeto,
  deleteProjeto,
};
