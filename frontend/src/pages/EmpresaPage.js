import { Component } from 'react';
import { getEmpresaById } from '../api/apiCalls';
import EmpresaInfoCard from '../components/EmpresaInfoCard';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

class EmpresaPage extends Component {
  state = {
    empresa: {},
    pendingApiCall: false,
    failResponse: undefined,
  };

  componentDidMount() {
    this.loadEmpresa();
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.match.params.id !== this.props.match.params.id) {
      this.loadEmpresa();
    }
  }

  loadEmpresa = async () => {
    this.setState({ pendingApiCall: true });
    try {
      const response = await getEmpresaById(this.props.match.params.id);
      this.setState({ empresa: response.data });
    } catch (error) {
      this.setState({ failResponse: error.response.data.message });
    }
    this.setState({ pendingApiCall: false });
  };

  render() {
    const { empresa, pendingApiCall, failResponse } = this.state;

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
        content = <EmpresaInfoCard empresa={empresa} />;
      }
    }

    return <div data-testid="empresa-page">{content}</div>;
  }
}

export default EmpresaPage;
