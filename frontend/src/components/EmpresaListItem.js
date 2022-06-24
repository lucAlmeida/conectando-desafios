import { withRouter } from 'react-router-dom';
import defaultProfileImage from '../assets/profile.png';

const EmpresaListItem = (props) => {
  const { empresa, history } = props;

  return (
    <li
      className="list-group-item list-group-item-action"
      onClick={() => history.push(`/empresa/${empresa.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={defaultProfileImage}
        alt="profile"
        width="30"
        className="rounded-circle shadow-sm"
        style={{ marginRight: 20 }}
      />
      {empresa.nome}
    </li>
  );
};

export default withRouter(EmpresaListItem);
