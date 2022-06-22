import CadastroAlunoPage from './pages/CadastroAlunoPage';
import CadastroEmpresaPage from './pages/CadastroEmpresaPage';
import CadastroProjetoPage from './pages/CadastroProjetoPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import AlunoPage from './pages/AlunoPage';
import EmpresaPage from './pages/EmpresaPage';
import ProjetoPage from './pages/ProjetoPage';
import ListarAlunosPage from './pages/ListarAlunosPage';
import ListarEmpresasPage from './pages/ListarEmpresasPage';
import ListarProjetosPage from './pages/ListarProjetosPage';
import AccountActivationPage from './pages/AccountActivationPage';
import LanguageSelector from './components/LanguageSelector';

import { Route } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <div>
        <Route exact path="/" component={HomePage} />
        <Route path="/cadastrar-aluno" component={CadastroAlunoPage} />
        <Route path="/cadastrar-empresa" component={CadastroEmpresaPage} />
        <Route path="/cadastrar-projeto" component={CadastroProjetoPage} />
        <Route path="/listar-alunos" component={ListarAlunosPage} />
        <Route path="/listar-empresas" component={ListarEmpresasPage} />
        <Route path="/listar-projetos" component={ListarProjetosPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/user/:id" component={UserPage} />
        <Route path="/aluno/:id" component={AlunoPage} />
        <Route path="/empresa/:id" component={EmpresaPage} />
        <Route path="/projeto/:id" component={ProjetoPage} />
        <Route path="/activate/:token" component={AccountActivationPage} />
        <LanguageSelector />
      </div>
    </div>
  );
}

export default App;
