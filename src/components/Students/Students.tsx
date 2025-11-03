'use client';

import useStudents from '@/hooks/useStudents';
import useGroups from '@/hooks/useGroups';
import type StudentInterface from '@/types/StudentInterface';
import Student from '@/components/Students/Student/Student';
import AddStudent from '@/components/Students/AddStudent/AddStudent';
import styles from './Students.module.scss';

const Students = (): React.ReactElement => {
  const { students, deleteStudentMutate, addStudentMutate } = useStudents();
  const { groups } = useGroups();

  const onDeleteHandler = (studentId: number): void => {
    debugger;
    console.log('onDeleteHandler', studentId);

    deleteStudentMutate(studentId);
  };

  const onAddHandler = (payload: { firstName: string; lastName: string; middleName?: string; groupId?: number }): void => {
    debugger;  
    console.log('Добавление студента', payload);

    addStudentMutate(payload);
  };

  return (
    <div className={styles.Students}>
      <AddStudent onSubmit={onAddHandler} />
      {students.map((student: StudentInterface) => (
        <Student
          key={student.id}
          student={{
            ...student,
            group: student.group ?? groups.find(g => g.id === (student.groupId ?? -1)) ?? undefined,
          }}
          onDelete={onDeleteHandler}
        />
      ))}
    </div>
  );
};

export default Students;
