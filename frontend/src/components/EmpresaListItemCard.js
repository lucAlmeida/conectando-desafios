import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EmpresaListItemCard = (props) => {
  const { t } = useTranslation();
  const history = useHistory();

  const { empresa } = props;
  const [nome] = useState(empresa.nome);
  const [responsavel] = useState(empresa.responsavel);
  const [categoria] = useState(empresa.categoria);
  const [localidade] = useState(empresa.localidade);
  const [cnpj] = useState(empresa.cnpj);

  let content;

  content = (
    <>
      <li className="list-group-item list-group-item-action">
        <div className="d-flex justify-content-center">
          <div
            className="card border-dark mb-3"
            style={{ width: '70%', cursor: 'pointer' }}
            onClick={() => history.push(`/empresa/${empresa.idUsuario}`)}
          >
            <div className="card-header">
              <b>{nome}</b>
            </div>
            <div className="card-body text-dark">
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('companyRepresentative')}: </b> {responsavel}
                </span>
              </p>
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('companyCategory')}: </b> {categoria}
                </span>
              </p>
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('companyLocation')}: </b> {localidade}
                </span>
              </p>
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('companyCNPJ')}: </b> {cnpj}
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
export default EmpresaListItemCard;
