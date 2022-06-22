import { Component } from 'react';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import { withTranslation } from 'react-i18next';
import { cadastrarAluno } from '../api/apiCalls';
import Alert from '../components/Alert';
import ButtonWithProgress from '../components/ButtonWithProgress';

class CadastroAlunoPage extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    nome: '',
    localidade: '',
    curso: '',
    sobre: '',
    semestre: '',
    apiProgress: false,
    signUpSuccess: false,
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

    const {
      username,
      email,
      password,
      nome,
      localidade,
      curso,
      sobre,
      semestre,
    } = this.state;

    const userFields = {
      username,
      email,
      password,
    };

    const alunoFields = {
      nome,
      localidade,
      curso,
      sobre,
      semestre,
    };

    this.setState({ apiProgress: true });
    try {
      /*
      const response = await signUp(userBody);
      if (response.data) {
        const { id } = response.data;
        await cadastrarAluno({ ...alunoBody, idUsuario: id });
      }
      */
      await cadastrarAluno({ ...userFields, ...alunoFields });

      this.setState({ signUpSuccess: true });
    } catch (error) {
      if (error.response.status === 400) {
        this.setState({ errors: error.response.data.validationErrors });
      }
      this.setState({ apiProgress: false });
    }
  };

  render() {
    const { t } = this.props;
    let disabled = true;
    const { password, passwordRepeat, apiProgress, signUpSuccess, errors } =
      this.state;
    if (password && passwordRepeat) {
      disabled = password !== passwordRepeat;
    }

    let passwordMismatch =
      password !== passwordRepeat ? t('passwordMismatchValidation') : '';

    return (
      <div
        className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 pt-3"
        data-testid="signup-page"
      >
        {!signUpSuccess && (
          <form className="card" data-testid="form-sign-up">
            <div className="card-header">
              <h1 className="text-center">{t('registerStudent')}</h1>
            </div>
            <div className="card-body">
              <Input
                id="nome"
                label={t('studentName')}
                onChange={this.onChange}
                help={errors.nome}
              />
              <Input
                id="curso"
                label={t('studentCourse')}
                onChange={this.onChange}
                help={errors.curso}
              />
              <Input
                id="localidade"
                label={t('studentLocation')}
                onChange={this.onChange}
                help={errors.localidade}
              />
              <TextArea
                id="sobre"
                label={t('studentAbout')}
                onChange={this.onChange}
                help={errors.sobre}
                numberOfRows={2}
              />
              <Input
                id="semestre"
                label={t('studentSemester')}
                onChange={this.onChange}
                help={errors.semestre}
              />
              <Input
                id="username"
                label={t('username')}
                onChange={this.onChange}
                help={errors.username}
              />
              <Input
                id="email"
                label={t('email')}
                onChange={this.onChange}
                help={errors.email}
              />
              <Input
                id="password"
                label={t('password')}
                onChange={this.onChange}
                help={errors.password}
                type="password"
              />
              <Input
                id="passwordRepeat"
                label={t('passwordRepeat')}
                onChange={this.onChange}
                help={passwordMismatch}
                type="password"
              />
              <div className="text-center">
                <ButtonWithProgress
                  disabled={disabled}
                  apiProgress={apiProgress}
                  onClick={this.submit}
                >
                  {t('registerStudent')}
                </ButtonWithProgress>
              </div>
            </div>
          </form>
        )}
        {signUpSuccess && <Alert>{t('accountCreatedSuccessfully')}</Alert>}
      </div>
    );
  }
}

const SignUpPageWithTranslation = withTranslation()(CadastroAlunoPage);

export default SignUpPageWithTranslation;
