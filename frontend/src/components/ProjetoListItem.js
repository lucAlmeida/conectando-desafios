import { withRouter } from 'react-router-dom';
import defaultProfileImage from '../assets/profile.png';

const ProjetoListItem = (props) => {
  const { projeto, history } = props;

  return (
    <li
      className="list-group-item list-group-item-action"
      onClick={() => history.push(`/projeto/${projeto.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={defaultProfileImage}
        alt="profile"
        width="30"
        className="rounded-circle shadow-sm"
        style={{ marginRight: 20 }}
      />
      {projeto.titulo}
    </li>
  );
};

export default withRouter(ProjetoListItem);
