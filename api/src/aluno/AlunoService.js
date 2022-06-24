const Aluno = require('./Aluno');
const UsuarioService = require('../usuario/UsuarioService');
const sequelize = require('../config/database');
const AlunoNotFoundException = require('./AlunoNotFoundException');
const UserRegisterException = require('../usuario/UserRegisterException');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const salvar = async (body) => {
  const { nome, localidade, curso, sobre, semestre } = body;
  const transaction = await sequelize.transaction();
  let response;
  try {
    const idUsuario = await UsuarioService.salvar(body, transaction);
    const aluno = { nome, localidade, curso, sobre, semestre, id: idUsuario };
    response = await Aluno.create(aluno, { transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();

    throw new UserRegisterException();
  }
  return response;
};

const getAlunosWithFilter = async (page, size, authenticatedUser, search) => {
  var alunosWithCount;
  if (search) {
    alunosWithCount = await Aluno.findAndCountAll({
      attributes: ['id', 'nome', 'localidade', 'curso', 'sobre', 'semestre'],
      limit: size,
      offset: page * size,
      where: {
        [Op.or]: [
          { nome: { [Op.like]: `%${search}%` } },
          { localidade: { [Op.like]: `%${search}%` } },
          { curso: { [Op.like]: `%${search}%` } },
          { sobre: { [Op.like]: `%${search}%` } },
          { semestre: { [Op.like]: `%${search}%` } },
        ],
      },
    });
  } else {
    alunosWithCount = await Aluno.findAndCountAll({
      attributes: ['id', 'nome', 'localidade', 'curso', 'sobre', 'semestre'],
      limit: size,
      offset: page * size,
    });
  }

  return {
    content: alunosWithCount.rows,
    page,
    size: Number.parseInt(size),
    totalPages: Math.ceil(alunosWithCount.count / size),
  };
};

const getAlunos = async (page, size, authenticatedUser) => {
  const alunosWithCount = await Aluno.findAndCountAll({
    attributes: ['id', 'nome', 'localidade', 'curso', 'sobre', 'semestre'],
    limit: size,
    offset: page * size,
  });
  return {
    content: alunosWithCount.rows,
    page,
    size: Number.parseInt(size),
    totalPages: Math.ceil(alunosWithCount.count / size),
  };
};

const getAluno = async (id) => {
  const aluno = await Aluno.findOne({
    where: { id: id },
    attributes: ['id', 'nome', 'localidade', 'curso', 'sobre', 'semestre'],
  });
  if (!aluno) {
    throw new AlunoNotFoundException();
  }
  return aluno;
};

const updateAluno = async (id, updatedBody) => {
  const aluno = await Aluno.findOne({ where: { id: id } });
  aluno.nome = updatedBody.nome;
  aluno.localidade = updatedBody.localidade;
  aluno.curso = updatedBody.curso;
  aluno.sobre = updatedBody.sobre;
  aluno.semestre = updatedBody.semestre;
  await aluno.save();
};

const deleteAluno = async (id) => {
  await Aluno.destroy({ where: { id: id } });
};

module.exports = {
  salvar,
  getAlunos,
  getAlunosWithFilter,
  getAluno,
  updateAluno,
  deleteAluno,
};
