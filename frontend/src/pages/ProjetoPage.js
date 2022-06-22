import { Component } from 'react';
import { getProjetoById, getEmpresaById } from '../api/apiCalls';
import ProjetoInfoCard from '../components/ProjetoInfoCard';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

class ProjetoPage extends Component {
  state = {
    projeto: {},
    empresa: {},
    pendingApiCall: false,
    failResponse: undefined,
  };

  componentDidMount() {
    this.loadProjeto();
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.match.params.id !== this.props.match.params.id) {
      this.loadProjeto();
    }
  }

  loadProjeto = async () => {
    this.setState({ pendingApiCall: true });
    try {
      const projetoResponse = await getProjetoById(this.props.match.params.id);
      const empresaResponse = await getEmpresaById(
        projetoResponse.data.idUsuario
      );
      this.setState({
        projeto: projetoResponse.data,
        empresa: empresaResponse.data,
      });
    } catch (error) {
      this.setState({ failResponse: error.response.data.message });
    }
    this.setState({ pendingApiCall: false });
  };

  render() {
    const { projeto, empresa, pendingApiCall, failResponse } = this.state;

    let content = (
      <Alert type="secondary" center>
        <Spinner size="big" />
      </Alert>
    );
    if (!pendingApiCall) {
      if (failResponse) {
        content = (
          <Alert type="danger" center>
            {failResponse}
          </Alert>
        );
      } else {
        content = <ProjetoInfoCard projeto={projeto} empresa={empresa} />;
      }
    }

    return <div data-testid="projeto-page">{content}</div>;
  }
}

export default ProjetoPage;
