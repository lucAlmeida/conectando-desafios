import { withRouter } from 'react-router-dom';
import defaultProfileImage from '../assets/profile.png';

const AlunoListItem = (props) => {
  const { aluno, history } = props;

  return (
    <li
      className="list-group-item list-group-item-action"
      onClick={() => history.push(`/aluno/${aluno.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={defaultProfileImage}
        alt="profile"
        width="30"
        className="rounded-circle shadow-sm"
        style={{ marginRight: 20 }}
      />
      {aluno.nome}
    </li>
  );
};

export default withRouter(AlunoListItem);
