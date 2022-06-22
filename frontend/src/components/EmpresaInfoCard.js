import defaultProfileImage from '../assets/profile.png';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Input from './Input';
import ButtonWithProgress from './ButtonWithProgress';
import { updateEmpresa } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import { updateSuccess } from '../state/authActions';

const EmpresaInfoCard = (props) => {
  const { t } = useTranslation();
  const [inEditMode, setEditMode] = useState(false);
  const [updateApiProgress, setUpdateApiProgress] = useState(false);
  const [validationErrors, setValidationErrors] = useState(false);
  const dispatch = useDispatch();

  const { empresa } = props;
  const [newNome, setNewNome] = useState(empresa.nome);
  const [newResponsavel, setNewResponsavel] = useState(empresa.responsavel);
  const [newCategoria, setNewCategoria] = useState(empresa.categoria);
  const [newLocalidade, setNewLocalidade] = useState(empresa.localidade);
  const [newCnpj, setNewCnpj] = useState(empresa.cnpj);

  const { id } = useSelector((store) => ({
    id: store.id,
  }));

  const onClickSave = async () => {
    setUpdateApiProgress(true);
    try {
      await updateEmpresa(id, {
        nome: newNome,
        responsavel: newResponsavel,
        categoria: newCategoria,
        localidade: newLocalidade,
        cnpj: newCnpj,
      });
      setEditMode(false);
      dispatch(
        updateSuccess({
          nome: newNome,
          responsavel: newResponsavel,
          categoria: newCategoria,
          localidade: newLocalidade,
          cnpj: newCnpj,
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

    setNewNome(empresa.nome);
    setNewResponsavel(empresa.responsavel);
    setNewCategoria(empresa.categoria);
    setNewLocalidade(empresa.localidade);
    setNewCnpj(empresa.cnpj);

    clearErrors('nome');
    clearErrors('responsavel');
    clearErrors('categoria');
    clearErrors('localidade');
    clearErrors('cnpj');
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
          label={t('companyNameChange')}
          id="nome"
          initialValue={newNome}
          onChange={(event) => {
            setNewNome(event.target.value);
            clearErrors(event.target.id);
          }}
          help={validationErrors.nome}
        />
        <Input
          label={t('companyRepresentativeChange')}
          id="responsavel"
          initialValue={newResponsavel}
          onChange={(event) => {
            setNewResponsavel(event.target.value);
            clearErrors(event.target.id);
          }}
          help={validationErrors.responsavel}
        />
        <Input
          label={t('companyCategoryChange')}
          id="categoria"
          initialValue={newCategoria}
          onChange={(event) => {
            setNewCategoria(event.target.value);
            clearErrors(event.target.id);
          }}
          help={validationErrors.categoria}
        />
        <Input
          label={t('companyLocationChange')}
          id="localidade"
          initialValue={newLocalidade}
          onChange={(event) => {
            setNewLocalidade(event.target.value);
            clearErrors(event.target.id);
          }}
          help={validationErrors.localidade}
        />
        <Input
          label={t('companyCNPJChange')}
          id="cnpj"
          initialValue={newCnpj}
          onChange={(event) => {
            setNewCnpj(event.target.value);
            clearErrors(event.target.id);
          }}
          help={validationErrors.cnpj}
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
              <b>{t('companyInfo')}</b>
            </div>
            <div className="card-body text-dark">
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('companyName')}:</b> {newNome}
                </span>
              </p>
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('companyRepresentative')}: </b> {newResponsavel}
                </span>
              </p>
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('companyCategory')}: </b> {newCategoria}
                </span>
              </p>
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('companyLocation')}: </b> {newLocalidade}
                </span>
              </p>
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('companyCNPJ')}: </b> {newCnpj}
                </span>
              </p>
            </div>
          </div>
        </div>
        {empresa.idUsuario === id && (
          <>
            <div>
              <button
                className="btn btn-outline-success"
                onClick={() => setEditMode(true)}
              >
                {t('edit')}
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
    </>
  );
};
export default EmpresaInfoCard;
