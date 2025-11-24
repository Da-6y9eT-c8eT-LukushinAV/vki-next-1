'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import type UserInterface from '@/types/UserInterface';
import styles from './Profile.module.scss';

interface Props {
  userFromServer: UserInterface | null;
}

const Profile = ({ userFromServer }: Props): React.ReactElement => {
  const { user, setUser, logout } = useAuth();

  useEffect(() => {
    // Синхронизируем пользователя из сервера с клиентским состоянием
    if (userFromServer && (!user || user.id !== userFromServer.id)) {
      setUser(userFromServer);
    }
  }, [userFromServer, user, setUser]);

  const displayUser = user || userFromServer;

  if (!displayUser) {
    return (
      <div className={styles.Profile}>
        <a href="/login" className={styles.loginLink}>Войти</a>
      </div>
    );
  }

  const fullName = `${displayUser.lastName} ${displayUser.firstName}${displayUser.middleName ? ` ${displayUser.middleName}` : ''}`;

  const handleLogout = async (): Promise<void> => {
    // Удаляем токен через API
    await fetch('/api/auth/logout', { method: 'POST' });
    logout();
  };

  return (
    <div className={styles.Profile}>
      <div className={styles.userInfo}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.userEmail}>{displayUser.email}</span>
      </div>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Выйти
      </button>
    </div>
  );
};

export default Profile;

