import defaultProfileImage from '../assets/profile.png';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Input from './Input';
import ButtonWithProgress from './ButtonWithProgress';
import Modal from './Modal';
import { updateUser, deleteUser } from '../api/apiCalls';
import { useHistory } from 'react-router-dom';
import { updateSuccess, logoutSuccess } from '../state/authActions';

const ProfileCard = (props) => {
  const { t } = useTranslation();
  const [inEditMode, setEditMode] = useState(false);
  const [deleteApiProgress, setDeleteApiProgress] = useState(false);
  const [updateApiProgress, setUpdateApiProgress] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = props;
  const [newUsername, setNewUsername] = useState(user.username);

  const { id, username } = useSelector((store) => ({
    id: store.id,
    username: store.username,
  }));

  const onClickSave = async () => {
    setUpdateApiProgress(true);
    try {
      await updateUser(id, { username: newUsername });
      setEditMode(false);
      dispatch(
        updateSuccess({
          username: newUsername,
        })
      );
    } catch (error) {}
    setUpdateApiProgress(false);
  };

  const onClickCancel = () => {
    setEditMode(false);
  };
  const onClickDelete = async () => {
    setDeleteApiProgress(true);
    try {
      await deleteUser(id);
      history.push('/');
      dispatch(logoutSuccess());
    } catch (error) {}

    setDeleteApiProgress(false);
  };

  let content;

  if (inEditMode) {
    content = (
      <>
        <Input
          label={t('usernameChange')}
          id="username"
          initialValue={newUsername}
          onChange={(event) => setNewUsername(event.target.value)}
        />
        <ButtonWithProgress
          onClick={onClickSave}
          apiProgress={updateApiProgress}
        >
          {t('save')}
        </ButtonWithProgress>{' '}
        <button className="btn btn-outline-secondary" onClick={onClickCancel}>
          {t('cancel')}
        </button>
      </>
    );
  } else {
    content = (
      <>
        <h3>{newUsername}</h3>
        {user.id === id && (
          <>
            <div>
              <button
                className="btn btn-outline-success"
                onClick={() => setEditMode(true)}
              >
                {t('edit')}
              </button>
            </div>
            <div className="pt-2">
              <button
                className="btn btn-danger"
                onClick={() => setModalVisible(true)}
              >
                {t('deleteAccount')}
              </button>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <div className="card text-center">
        <div className="card-header">
          <img
            src={defaultProfileImage}
            alt="profile"
            width="200"
            height="200"
            className="rounded-circle shadow"
          />
        </div>
        <div className="card-body">{content}</div>
      </div>
      {modalVisible && (
        <Modal
          content={t('deleteAccountConfirmation')}
          onClickCancel={() => setModalVisible(false)}
          onClickConfirm={onClickDelete}
          apiProgress={deleteApiProgress}
        />
      )}
    </>
  );
};
export default ProfileCard;
