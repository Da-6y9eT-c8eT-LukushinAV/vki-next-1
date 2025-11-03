'use client';

import Link from 'next/link';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Student.module.scss';

interface Props {
  student: StudentInterface;
  onDelete: (id: number) => void;
}

const Student = ({ student, onDelete }: Props): React.ReactElement => {
  const onDeleteHandler = (): void => {
    onDelete(student.id);
  };

  const studentName = `${student.id} - ${student.lastName} ${student.firstName} ${student.middleName}`;

  return (
    <div className={`${styles.Student} ${student.isDeleted ? styles['--isDeleted'] : '' } `}>
      <span>
        {studentName}
        {student.group ? ` — Группа: ${student.group.name}` : ''}
      </span>
      <div className={styles.actions}>
        <Link href={`/students/${student.id}`} className={styles.actionButton}>
          Открыть
        </Link>
        <button onClick={onDeleteHandler} className={styles.actionButton}>Удалить</button>
      </div>
    </div>
  );
};

export default Student;
