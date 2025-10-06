'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import Student from '@/components/Students/Student/Student';
import AddStudent from '@/components/Students/AddStudent/AddStudent';
import styles from './Students.module.scss';

const Students = (): React.ReactElement => {
  const { students, deleteStudentMutate, addStudentMutate } = useStudents();

  const onDeleteHandler = (studentId: number): void => {
    deleteStudentMutate(studentId);
  };

  const onAddHandler = (payload: { firstName: string; lastName: string; middleName?: string }): void => {
    addStudentMutate(payload);
  };

  return (
    <div className={styles.Students}>
      <AddStudent onSubmit={onAddHandler} />
      {students.map((student: StudentInterface) => (
        <Student
          key={student.id}
          student={student}
          onDelete={onDeleteHandler}
        />
      ))}
    </div>
  );
};

export default Students;
