import { Component } from 'react';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { cadastrarProjeto } from '../api/apiCalls';
import Alert from '../components/Alert';
import ButtonWithProgress from '../components/ButtonWithProgress';

class CadastroProjetoPage extends Component {
  state = {
    titulo: '',
    categoria: '',
    descricao: '',
    contato: '',
    apiProgress: false,
    createProjectSuccess: false,
    errors: {},
  };

  onChange = (event) => {
    const { id, value } = event.target;
    const errorsCopy = { ...this.state.errors };
    delete errorsCopy[id];
    this.setState({
      [id]: value,
      errors: errorsCopy,
    });
  };

  submit = async (event) => {
    event.preventDefault();
    const { titulo, categoria, descricao, contato } = this.state;

    const body = {
      titulo,
      categoria,
      descricao,
      contato,
      idUsuario: this.props.currentState.id,
    };

    this.setState({ apiProgress: true });
    try {
      await cadastrarProjeto({
        ...body,
        perfilCorporativo: true,
      });
      this.setState({ createProjectSuccess: true });
    } catch (error) {
      if (error.response.status === 400) {
        this.setState({ errors: error.response.data.validationErrors });
      }
      this.setState({ apiProgress: false });
    }
  };

  render() {
    const { t } = this.props;
    let disabled = false;
    const { apiProgress, createProjectSuccess, errors } = this.state;

    return (
      <div
        className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 pt-3"
        data-testid="signup-page"
      >
        {!createProjectSuccess && (
          <form className="card" data-testid="form-sign-up">
            <div className="card-header">
              <h1 className="text-center">{t('registerProject')}</h1>
            </div>
            <div className="card-body">
              <Input
                id="titulo"
                label={t('projectTitle')}
                onChange={this.onChange}
                help={errors.titulo}
              />
              <Input
                id="categoria"
                label={t('projectCategory')}
                onChange={this.onChange}
                help={errors.categoria}
              />
              <TextArea
                id="descricao"
                label={t('projectDescription')}
                onChange={this.onChange}
                help={errors.descricao}
                numberOfRows={4}
              />
              <Input
                id="contato"
                label={t('projectContactLong')}
                onChange={this.onChange}
                help={errors.contato}
              />
              <div className="text-center">
                <ButtonWithProgress
                  disabled={disabled}
                  apiProgress={apiProgress}
                  onClick={this.submit}
                >
                  {t('register')}
                </ButtonWithProgress>
              </div>
            </div>
          </form>
        )}
        {createProjectSuccess && (
          // <Alert>Please check your e-mail to activate your account</Alert>
          <Alert>{t('projectCreatedSuccessfully')}</Alert>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentState: state,
});

const CadastroProjetoPageWithTranslation = connect(mapStateToProps)(
  withTranslation()(CadastroProjetoPage)
);

export default CadastroProjetoPageWithTranslation;
