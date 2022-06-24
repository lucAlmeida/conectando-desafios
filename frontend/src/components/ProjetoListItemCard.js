import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProjetoListItemCard = (props) => {
  const { t } = useTranslation();
  const history = useHistory();

  const { projeto, empresa } = props;
  const [titulo] = useState(projeto.titulo);
  const [categoria] = useState(projeto.categoria);
  const [descricao] = useState(projeto.descricao);
  const [contato] = useState(projeto.contato);
  const [dthrPublicacao] = useState(projeto.createdAt);
  const [nomeEmpresa] = useState(empresa.nome);
  // const [responsavelEmpresa] = useState(empresa.responsavel);
  // const [categoriaEmpresa] = useState(empresa.categoria);
  // const [localidadeEmpresa] = useState(empresa.localidade);
  // const [cnpjEmpresa] = useState(empresa.cnpj);

  let content;

  const [anoPublicacao, mesPublicacao, diaPublicacao] = dthrPublicacao
    .split('T')[0]
    .split('-');

  const dataPublicacao = `${diaPublicacao}/${mesPublicacao}/${anoPublicacao}`;

  content = (
    <>
      <li className="list-group-item list-group-item-action">
        <div className="d-flex justify-content-center">
          <div
            className="card border-dark mb-3"
            style={{ width: '70%', cursor: 'pointer' }}
            onClick={() => history.push(`/projeto/${projeto.id}`)}
          >
            <div className="card-header">
              <b>{titulo}</b>
            </div>
            <div className="card-body text-dark">
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('projectCategory')}: </b> {categoria}
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
                {descricao}
              </p>
              {/* 
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('projectContact')}: </b> {contato}
                </span>
              </p>

              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('companyName')}:</b> {nomeEmpresa}
                </span>
              </p>
              */}
              <p className="card-text d-flex justify-content-left">
                <span>
                  <b>{t('projectPublishedOn')}:</b> {dataPublicacao}
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
export default ProjetoListItemCard;
