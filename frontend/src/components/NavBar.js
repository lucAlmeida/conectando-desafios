import { Link } from 'react-router-dom';
import logo from '../assets/hoaxify.png';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../api/apiCalls';
import { logoutSuccess } from '../state/authActions';
const NavBar = (props) => {
  const { t } = useTranslation();
  const auth = useSelector((store) => store);
  const dispatch = useDispatch();

  const onClickLogout = async (event) => {
    // event.preventDefault();
    try {
      await logout();
    } catch (error) {}
    dispatch(logoutSuccess());
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/" title="Home">
          <img src={logo} alt="Conectando Desafios" width="45" />
          <span style={{ fontSize: '20px' }}>Conectando Desafios</span>
        </Link>
        <ul className="navbar-nav mr-auto">
          {!auth.isLoggedIn && (
            <>
              <Link className="nav-link" to="/cadastrar-aluno">
                <i
                  className="fa-solid fa-user-plus"
                  style={{ color: 'white', marginRight: '10px' }}
                ></i>
                {t('registerStudent')}
              </Link>

              <Link className="nav-link" to="/cadastrar-empresa">
                <i
                  className="fa-solid fa-user-plus"
                  style={{ color: 'white', marginRight: '10px' }}
                ></i>
                {t('registerCompany')}
              </Link>
              <Link className="nav-link" to="/login">
                <i
                  className="fa-solid fa-right-to-bracket"
                  style={{ color: 'white', marginRight: '10px' }}
                ></i>
                {t('login')}
              </Link>
            </>
          )}
          {auth.isLoggedIn && (
            <>
              <Link className="nav-link" to="/listar-projetos">
                <i
                  className="fa-solid fa-list-check"
                  style={{ color: 'white', marginRight: '10px' }}
                ></i>
                {t('projects')}
              </Link>
              <Link className="nav-link" to="/listar-empresas">
                <i
                  className="fa-solid fa-building"
                  style={{ color: 'white', marginRight: '10px' }}
                ></i>
                {t('companies')}
              </Link>
              <Link className="nav-link" to="/listar-alunos">
                <i
                  className="fa-solid fa-graduation-cap"
                  style={{ color: 'white', marginRight: '10px' }}
                ></i>
                {t('students')}
              </Link>
              {!auth.perfilCorporativo && (
                <Link className="nav-link" to={`/aluno/${auth.id}`}>
                  <i
                    className="fa-solid fa-file-pen"
                    style={{ color: 'white', marginRight: '10px' }}
                  ></i>
                  {t('editProfile')}
                </Link>
              )}
              {auth.perfilCorporativo && (
                <Link className="nav-link" to={`/empresa/${auth.id}`}>
                  <i
                    className="fa-solid fa-file-pen"
                    style={{ color: 'white', marginRight: '10px' }}
                  ></i>
                  {t('editProfile')}
                </Link>
              )}
              <Link className="nav-link" to={`/user/${auth.id}`}>
                <i
                  className="fa-solid fa-gear"
                  style={{ color: 'white', marginRight: '10px' }}
                ></i>
                {t('myAccount')}
              </Link>
              <Link className="nav-link" to={'/'} onClick={onClickLogout}>
                <i
                  className="fa-solid fa-arrow-right-from-bracket"
                  style={{ color: 'white', marginRight: '10px' }}
                ></i>
                {t('logout')}
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
