'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import styles from './LoginForm.module.scss';

const LoginForm = (): React.ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Ошибка входа');
        setIsLoading(false);
        return;
      }

      // Сохраняем пользователя в состояние
      setUser(data.user);
      
      // Перенаправляем на главную страницу
      router.push('/');
      router.refresh();
    }
    catch (err) {
      setError('Произошла ошибка при входе');
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.LoginForm} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <button type="submit" disabled={isLoading} className={styles.submitButton}>
        {isLoading ? 'Вход...' : 'Войти'}
      </button>

      <div className={styles.testUsers}>
        <p>Тестовые пользователи:</p>
        <ul>
          <li>admin@test.com / admin123</li>
          <li>user@test.com / user123</li>
        </ul>
      </div>
    </form>
  );
};

export default LoginForm;

