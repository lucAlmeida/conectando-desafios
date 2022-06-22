import ProjetoList from '../components/ProjetoList';
import { useSelector } from 'react-redux';

const ListarProjetosPage = () => {
  const auth = useSelector((store) => store);
  return auth.isLoggedIn ? (
    <div data-testid="listar-projetos-page">
      <ProjetoList perfilCorporativo={auth.perfilCorporativo} />
    </div>
  ) : (
    <h2 style={{ textAlign: 'center', marginTop: '30px' }}>
      Página indisponível. Por favor, faça o login.
    </h2>
  );
};

export default ListarProjetosPage;
