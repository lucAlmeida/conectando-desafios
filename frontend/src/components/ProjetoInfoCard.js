import defaultProfileImage from '../assets/profile.png';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Input from './Input';
import TextArea from './TextArea';
import ButtonWithProgress from './ButtonWithProgress';
import Modal from './Modal';
import { updateProjeto, deleteProjeto } from '../api/apiCalls';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { updateSuccess } from '../state/authActions';

const ProjetoInfoCard = (props) => {
  const { t } = useTranslation();
  const [inEditMode, setEditMode] = useState(false);
  const [deleteApiProgress, setDeleteApiProgress] = useState(false);
  const [updateApiProgress, setUpdateApiProgress] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const { projeto, empresa } = props;
  const [idProjeto] = useState(projeto.id);
  const [newTitulo, setNewTitulo] = useState(projeto.titulo);
  const [newCategoria, setNewCategoria] = useState(projeto.categoria);
  const [newDescricao, setNewDescricao] = useState(projeto.descricao);
  const [newContato, setNewContato] = useState(projeto.contato);
  // const [dthrPublicacao] = useState(projeto.createdAt);
  const [nomeEmpresa] = useState(empresa.nome);

  const { id } = useSelector((store) => ({
    id: store.id,
  }));

  const onClickSave = async () => {
    setUpdateApiProgress(true);
    try {
      await updateProjeto(idProjeto, {
        titulo: newTitulo,
        categoria: newCategoria,
        descricao: newDescricao,
        contato: newContato,
        idUsuario: id,
      });
      setEditMode(false);
      dispatch(
        updateSuccess({
          titulo: newTitulo,
          categoria: newCategoria,
          descricao: newDescricao,
          contato: newContato,
        })
      );
    } catch (error) {
      if (error.response.status === 400) {
        setValidationErrors(error.response.data.validationErrors);
      }
    }
    setUpdateApiProgress(false);
  };

  const onClickCancel = () => {
    setEditMode(false);

    setNewTitulo(projeto.titulo);
    setNewCategoria(projeto.categoria);
    setNewDescricao(projeto.descricao);
    setNewContato(projeto.contato);

    clearErrors('titulo');
    clearErrors('categoria');
    clearErrors('descricao');
    clearErrors('contato');
  };

  const onClickDelete = async () => {
    setDeleteApiProgress(true);
    try {
      await deleteProjeto(projeto.id);
      history.push('/listar-projetos');
    } catch (error) {}

    setDeleteApiProgress(false);
  };

  const clearErrors = (id) => {
    const errorsCopy = validationErrors;
    delete errorsCopy[id];
    setValidationErrors(errorsCopy);
  };

  let content;

  if (inEditMode) {
    content = (
      <>
        <Input
          label={t('projectTitleChange')}
          id="titulo"
          initialValue={newTitulo}
          onChange={(event) => {
            setNewTitulo(event.target.value);
            clearErrors(event.target.id);
          }}
          help={validationErrors.titulo}
        />
        <Input
          label={t('projectCategoryChange')}
          id="categoria"
          initialValue={newCategoria}
          onChange={(event) => {
            setNewCategoria(event.target.value);
            clearErrors(event.target.id);
          }}
          help={validationErrors.categoria}
        />
        <TextArea
          label={t('projectDescriptionChange')}
          id="descricao"
          initialValue={newDescricao}
          onChange={(event) => {
            setNewDescricao(event.target.value);
            clearErrors(event.target.id);
          }}
          help={validationErrors.descricao}
          numberOfRows={4}
        />
        <Input
          label={t('projectContactChange')}
          id="contato"
          initialValue={newContato}
          onChange={(event) => {
            setNewContato(event.target.value);
            clearErrors(event.target.id);
          }}
          help={validationErrors.contato}
        />
        <ButtonWithProgress
          onClick={onClickSave}
          apiProgress={updateApiProgress}
        >
          {t('save')}
        </ButtonWithProgress>{' '}
        <button className="btn btn-outline-secondary" onClick={onClickCancel}>
          {t('cancel')}
        </button>
      </>
    );
  } else {
    content = (
      <>
        <div className="d-flex justify-content-center">
          <div className="card border-dark mb-3" style={{ width: '70%' }}>
            <div className="card-header">
              <b>{t('projectInfo')}</b>
            </div>
            <div className="card-body text-dark">
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('projectTitle')}:</b> {newTitulo}
                </span>
              </p>
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('projectCategory')}: </b> {newCategoria}
                </span>
              </p>
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('projectDescription')}: </b>
                </span>
              </p>
              <p
                className="card-text d-flex justify-content-left"
                style={{
                  whiteSpace: 'pre-line',
                  textAlign: 'left',
                }}
              >
                {newDescricao}
              </p>
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('projectContact')}: </b> {newContato}
                </span>
              </p>
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('companyName')}:</b> {nomeEmpresa}
                </span>
              </p>
              {/* <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('projectPublishedOn')}:</b> {dthrPublicacao}
                </span>
              </p> */}
            </div>
          </div>
        </div>
        {projeto.idUsuario === id && (
          <>
            <div>
              <button
                className="btn btn-outline-success"
                onClick={() => setEditMode(true)}
              >
                {t('edit')}
              </button>
            </div>
            <div className="pt-2">
              <button
                className="btn btn-danger"
                onClick={() => setModalVisible(true)}
              >
                {t('deleteProject')}
              </button>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <div className="card text-center">
        <div className="card-header">
          <img
            src={defaultProfileImage}
            alt="profile"
            width="200"
            height="200"
            className="rounded-circle shadow"
          />
        </div>
        <div className="card-body">{content}</div>
      </div>
      {modalVisible && (
        <Modal
          content={t('deleteProjectConfirmation')}
          onClickCancel={() => setModalVisible(false)}
          onClickConfirm={onClickDelete}
          apiProgress={deleteApiProgress}
        />
      )}
    </>
  );
};
export default ProjetoInfoCard;
