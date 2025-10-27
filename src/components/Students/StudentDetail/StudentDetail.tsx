'use client';

import { useParams } from 'next/navigation';
import useStudent from '@/hooks/useStudent';
import BackButton from '@/components/common/BackButton/BackButton';
import styles from './StudentDetail.module.scss';

const StudentDetail = (): React.ReactElement => {
  const params = useParams();
  const studentId = Number(params.id);
  const { student, isLoading, isError } = useStudent(studentId);

  if (isLoading) {
    return (
      <div>
        <BackButton />
        <p>Загрузка...</p>
      </div>
    );
  }

  if (isError || !student) {
    return (
      <div>
        <BackButton />
        <p>Студент не найден</p>
      </div>
    );
  }

  return (
    <div className={styles.StudentDetail}>
      <BackButton />
      <h2>Информация о студенте</h2>
      <div className={styles.info}>
        <div className={styles.row}>
          <span className={styles.label}>ID:</span>
          <span className={styles.value}>{student.id}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Фамилия:</span>
          <span className={styles.value}>{student.lastName}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Имя:</span>
          <span className={styles.value}>{student.firstName}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Отчество:</span>
          <span className={styles.value}>{student.middleName || '-'}</span>
        </div>
        {student.groupId && (
          <div className={styles.row}>
            <span className={styles.label}>Группа ID:</span>
            <span className={styles.value}>{student.groupId}</span>
          </div>
        )}
        {student.contacts && (
          <div className={styles.row}>
            <span className={styles.label}>Контакты:</span>
            <span className={styles.value}>{student.contacts}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetail;

