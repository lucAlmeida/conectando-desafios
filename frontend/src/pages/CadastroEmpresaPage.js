import { Component } from 'react';
import Input from '../components/Input';
import InputWithValue from '../components/InputWithValue';
import { withTranslation } from 'react-i18next';
import { cadastrarEmpresa } from '../api/apiCalls';
import Alert from '../components/Alert';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { cnpjMask } from '../utils/cnpjMask';

class CadastroEmpresaPage extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    nome: '',
    responsavel: '',
    categoria: '',
    localidade: '',
    cnpj: '',
    apiProgress: false,
    signUpSuccess: false,
    errors: {},
  };

  onChange = (event) => {
    const { id, value } = event.target;
    const errorsCopy = { ...this.state.errors };
    delete errorsCopy[id];
    console.log(value);
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
      responsavel,
      categoria,
      localidade,
      cnpj,
    } = this.state;

    const userFields = {
      username,
      email,
      password,
    };

    const empresaFields = {
      nome,
      responsavel,
      categoria,
      localidade,
      cnpj,
    };

    this.setState({ apiProgress: true });
    try {
      /*
      const response = await signUp({ ...userBody, perfilCorporativo: true });
      if (response.data) {
        const { id } = response.data;
        await cadastrarEmpresa({ ...empresaBody, idUsuario: id });
      }
      */
      await cadastrarEmpresa({ ...userFields, ...empresaFields });

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
              <h1 className="text-center">{t('registerCompany')}</h1>
            </div>
            <div className="card-body">
              <Input
                id="nome"
                label={t('companyName')}
                onChange={this.onChange}
                help={errors.nome}
              />
              <Input
                id="responsavel"
                label={t('companyRepresentative')}
                onChange={this.onChange}
                help={errors.responsavel}
              />
              <Input
                id="categoria"
                label={t('companyCategory')}
                onChange={this.onChange}
                help={errors.categoria}
              />
              <Input
                id="localidade"
                label={t('companyLocation')}
                onChange={this.onChange}
                help={errors.localidade}
              />
              <InputWithValue
                id="cnpj"
                label={t('companyCNPJ')}
                onChange={this.onChange}
                help={errors.cnpj}
                value={cnpjMask(this.state.cnpj)}
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
                  {t('registerCompany')}
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

const SignUpPageWithTranslation = withTranslation()(CadastroEmpresaPage);

export default SignUpPageWithTranslation;
