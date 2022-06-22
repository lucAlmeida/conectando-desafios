import defaultProfileImage from '../assets/profile.png';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Input from './Input';
import TextArea from './TextArea';
import ButtonWithProgress from './ButtonWithProgress';
import { updateAluno } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import { updateSuccess } from '../state/authActions';

const AlunoInfoCard = (props) => {
  const { t } = useTranslation();
  const [inEditMode, setEditMode] = useState(false);
  const [updateApiProgress, setUpdateApiProgress] = useState(false);
  const dispatch = useDispatch();

  const { aluno } = props;
  const [newNome, setNewNome] = useState(aluno.nome);
  const [newLocalidade, setNewLocalidade] = useState(aluno.localidade);
  const [newCurso, setNewCurso] = useState(aluno.curso);
  const [newSobre, setNewSobre] = useState(aluno.sobre);
  const [newSemestre, setNewSemestre] = useState(aluno.semestre);

  const { id } = useSelector((store) => ({
    id: store.id,
  }));

  const onClickSave = async () => {
    setUpdateApiProgress(true);
    try {
      await updateAluno(id, {
        nome: newNome,
        localidade: newLocalidade,
        curso: newCurso,
        sobre: newSobre,
        semestre: newSemestre,
      });
      setEditMode(false);
      dispatch(
        updateSuccess({
          nome: newNome,
          localidade: newLocalidade,
          curso: newCurso,
          sobre: newSobre,
          semestre: newSemestre,
        })
      );
    } catch (error) {}
    setUpdateApiProgress(false);
  };

  const onClickCancel = () => {
    setEditMode(false);
  };
  let content;

  if (inEditMode) {
    content = (
      <>
        <Input
          label={t('studentNameChange')}
          id="nome"
          initialValue={newNome}
          onChange={(event) => setNewNome(event.target.value)}
        />
        <Input
          label={t('studentCourseChange')}
          id="curso"
          initialValue={newCurso}
          onChange={(event) => setNewCurso(event.target.value)}
        />
        <Input
          label={t('studentSemesterChange')}
          id="semestre"
          initialValue={newSemestre}
          onChange={(event) => setNewSemestre(event.target.value)}
        />
        <Input
          label={t('studentLocationChange')}
          id="localidade"
          initialValue={newLocalidade}
          onChange={(event) => setNewLocalidade(event.target.value)}
        />
        <TextArea
          label={t('studentAboutChange')}
          id="sobre"
          initialValue={newSobre}
          onChange={(event) => setNewSobre(event.target.value)}
          numberOfRows={2}
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
              <b>{t('studentInfo')}</b>
            </div>
            <div className="card-body text-dark">
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('studentName')}:</b> {newNome}
                </span>
              </p>
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('studentCourse')}: </b> {newCurso}
                </span>
              </p>

              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('studentSemester')}: </b> {newSemestre}
                </span>
              </p>
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('studentLocation')}: </b> {newLocalidade}
                </span>
              </p>
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('studentAbout')}: </b>
                </span>
              </p>
              <p
                className="card-text d-flex justify-content-left"
                style={{
                  whiteSpace: 'pre-line',
                  textAlign: 'left',
                }}
              >
                {newSobre}
              </p>
            </div>
          </div>
        </div>
        {aluno.idUsuario === id && (
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
export default AlunoInfoCard;
