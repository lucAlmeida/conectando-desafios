import AlunoList from '../components/AlunoList';
import { useSelector } from 'react-redux';

const ListarAlunosPage = () => {
  const auth = useSelector((store) => store);
  return auth.isLoggedIn ? (
    <div data-testid="listar-alunos-page">
      <AlunoList />
    </div>
  ) : (
    <h2 style={{ textAlign: 'center', marginTop: '30px' }}>
      Página indisponível. Por favor, faça o login.
    </h2>
  );
};

export default ListarAlunosPage;
