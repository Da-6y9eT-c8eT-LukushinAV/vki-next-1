import StudentDetail from '@/components/Students/StudentDetail/StudentDetail';
import Page from '@/components/layout/Page/Page';
import { type Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Студент - Вэб разработка ВКИ - Next.js шаблон',
  description: 'Информация о студенте',
};

const StudentPage = (): React.ReactNode => (
  <Page>
    <h1>Студент</h1>
    <StudentDetail />
  </Page>
);

export default StudentPage;

