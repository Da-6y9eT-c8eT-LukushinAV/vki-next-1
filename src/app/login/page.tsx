import Page from '@/components/layout/Page/Page';
import LoginForm from '@/components/auth/LoginForm/LoginForm';
import { META_DESCRIPTION, META_TITLE } from '@/constants/meta';
import { type Metadata } from 'next/types';

export const metadata: Metadata = {
  title: `Вход - ${META_TITLE}`,
  description: META_DESCRIPTION,
};

const LoginPage = (): React.ReactNode => (
  <Page>
    <h1>Вход в систему</h1>
    <LoginForm />
  </Page>
);

export default LoginPage;
