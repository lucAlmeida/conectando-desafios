import { Component } from 'react';
import { loadEmpresasWithFilter } from '../api/apiCalls';
import EmpresaListItemCard from './EmpresaListItemCard';
import { withTranslation } from 'react-i18next';
import Spinner from './Spinner';

class EmpresaList extends Component {
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

  loadData = async (pageIndex) => {
    this.setState({ pendingApiCall: true });
    try {
      const response = await loadEmpresasWithFilter(
        pageIndex,
        this.state.search
      );
      const page = response.data;
      this.setState({ page: page });
    } catch (error) {}
    this.setState({ pendingApiCall: false });
  };

  render() {
    const { pendingApiCall, search } = this.state;
    const { totalPages, page, content } = this.state.page;
    const { t } = this.props;
    return (
      <div className="card">
        <div className="card-header text-center">
          <h3>{t('companies')}</h3>
        </div>
        <div className="d-flex justify-content-center pt-5 pb-5">
          <div className="input-group rounded" style={{ width: '50%' }}>
            <input
              type="search"
              className="form-control rounded"
              placeholder={t('searchCompanies')}
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
          {content.map((empresa) => {
            return <EmpresaListItemCard key={empresa.id} empresa={empresa} />;
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

export default withTranslation()(EmpresaList);
