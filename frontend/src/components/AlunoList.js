import { Component } from 'react';
import { loadAlunosWithFilter } from '../api/apiCalls';
import AlunoListItemCard from './AlunoListItemCard';
import { withTranslation } from 'react-i18next';
import Spinner from './Spinner';

class AlunoList extends Component {
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

  handleClick = (e) => {
    this.loadData(0, this.state.search);
  };

  loadData = async (pageIndex) => {
    this.setState({ pendingApiCall: true });
    try {
      const response = await loadAlunosWithFilter(pageIndex, this.state.search);
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
          <h3>{t('students')}</h3>
        </div>
        <div className="d-flex justify-content-center pt-5 pb-5">
          <div className="input-group rounded" style={{ width: '50%' }}>
            <input
              type="search"
              className="form-control rounded"
              placeholder={t('searchStudents')}
              aria-label="Pesquisar"
              aria-describedby="search-addon"
              value={search}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleClick}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          {content.map((aluno) => {
            return <AlunoListItemCard key={aluno.id} aluno={aluno} />;
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

export default withTranslation()(AlunoList);
