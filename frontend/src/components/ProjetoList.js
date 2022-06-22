import { Component } from 'react';
import { loadProjetosWithFilter, getEmpresaById } from '../api/apiCalls';
import ProjetoListItemCard from './ProjetoListItemCard';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import Spinner from './Spinner';

class ProjetoList extends Component {
  state = {
    page: {
      content: [],
      page: 0,
      size: 0,
      totalPages: 0,
    },
    pendingApiCall: false,
    search: '',
  };

  componentDidMount() {
    this.loadData();
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.loadData(0, e.target.value);
    }
  };

  loadData = async (pageIndex, search) => {
    this.setState({ pendingApiCall: true });
    try {
      const response = await loadProjetosWithFilter(
        pageIndex,
        this.state.search
      );

      const page = response.data;

      const loadEmpresa = async (idUsuario) => {
        return await getEmpresaById(idUsuario);
      };

      const contentWithEmpresas = await Promise.all(
        page.content.map(async (projeto) => {
          const response = await loadEmpresa(projeto.idUsuario);
          return { ...projeto, empresa: response.data };
        })
      );
      const pageWithEmpresas = { ...page, content: contentWithEmpresas };

      this.setState({ page: pageWithEmpresas });
    } catch (error) {}
    this.setState({ pendingApiCall: false });
  };

  render() {
    const { pendingApiCall, search } = this.state;
    const { totalPages, page, content } = this.state.page;
    const { t, perfilCorporativo } = this.props;
    return (
      <div className="card">
        <div className="card-header text-center">
          <h3>{t('projects')}</h3>
        </div>
        {perfilCorporativo && (
          <div className="row pt-5">
            <div className="text-center ">
              <button
                className="btn btn-success"
                onClick={() => this.props.history.push('/cadastrar-projeto')}
              >
                {t('registerNewProject')}
              </button>
            </div>
          </div>
        )}

        <div className="d-flex justify-content-center pt-5 pb-5">
          <div className="input-group rounded" style={{ width: '50%' }}>
            <input
              type="search"
              className="form-control rounded"
              placeholder={t('searchProjects')}
              aria-label="Pesquisar"
              aria-describedby="search-addon"
              value={search}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
            <button type="button" className="btn btn-primary">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          {content.map((projeto) => {
            return (
              <ProjetoListItemCard
                key={projeto.id}
                projeto={projeto}
                empresa={projeto.empresa}
              />
            );
          })}
        </ul>
        <div className="card-footer text-center">
          {page !== 0 && !pendingApiCall && (
            <button
              className="btn btn-outline-secondary btn-sm float-start"
              onClick={() => this.loadData(page - 1)}
            >
              {t('previousPage')}
            </button>
          )}
          {totalPages > page + 1 && !pendingApiCall && (
            <button
              className="btn btn-outline-secondary btn-sm float-end"
              onClick={() => this.loadData(page + 1)}
            >
              {t('nextPage')}
            </button>
          )}
          {pendingApiCall && <Spinner />}
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(ProjetoList));
