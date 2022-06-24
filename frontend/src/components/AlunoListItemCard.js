import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AlunoListItemCard = (props) => {
  const { t } = useTranslation();
  const history = useHistory();

  const { aluno } = props;
  const [nome] = useState(aluno.nome);
  const [localidade] = useState(aluno.localidade);
  const [curso] = useState(aluno.curso);
  const [semestre] = useState(aluno.semestre);

  let content;

  content = (
    <>
      <li className="list-group-item list-group-item-action">
        <div className="d-flex justify-content-center">
          <div
            className="card border-dark mb-3"
            style={{ width: '70%', cursor: 'pointer' }}
            onClick={() => history.push(`/aluno/${aluno.id}`)}
          >
            <div className="card-header">
              <b>{nome}</b>
            </div>
            <div className="card-body text-dark">
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('studentCourse')}: </b> {curso}
                </span>
              </p>
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('studentSemester')}: </b> {semestre}
                </span>
              </p>
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('studentLocation')}: </b> {localidade}
                </span>
              </p>
            </div>
          </div>
        </div>
      </li>
    </>
  );

  return (
    <>
      <div className="card text-center">
        <div className="card-body">{content}</div>
      </div>
    </>
  );
};
export default AlunoListItemCard;
