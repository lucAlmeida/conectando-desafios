import { Component } from 'react';
import { getAlunoById } from '../api/apiCalls';
import AlunoInfoCard from '../components/AlunoInfoCard';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

class AlunoPage extends Component {
  state = {
    aluno: {},
    pendingApiCall: false,
    failResponse: undefined,
  };

  componentDidMount() {
    this.loadAluno();
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.match.params.id !== this.props.match.params.id) {
      this.loadAluno();
    }
  }

  loadAluno = async () => {
    this.setState({ pendingApiCall: true });
    try {
      const response = await getAlunoById(this.props.match.params.id);
      this.setState({ aluno: response.data });
    } catch (error) {
      this.setState({ failResponse: error.response.data.message });
    }
    this.setState({ pendingApiCall: false });
  };

  render() {
    const { aluno, pendingApiCall, failResponse } = this.state;

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
        content = <AlunoInfoCard aluno={aluno} />;
      }
    }

    return <div data-testid="aluno-page">{content}</div>;
  }
}

export default AlunoPage;
