import EmpresaList from '../components/EmpresaList';
import { useSelector } from 'react-redux';

const ListarEmpresasPage = () => {
  const auth = useSelector((store) => store);
  return auth.isLoggedIn ? (
    <div data-testid="listar-empresas-page">
      <EmpresaList />
    </div>
  ) : (
    <h2 style={{ textAlign: 'center', marginTop: '30px' }}>
      Página indisponível. Por favor, faça o login.
    </h2>
  );
};

export default ListarEmpresasPage;
