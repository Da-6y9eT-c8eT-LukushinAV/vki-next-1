'use client';

import { useForm } from 'react-hook-form';
import useGroups from '@/hooks/useGroups';
import styles from './AddStudent.module.scss';

interface AddStudentFormValues {
  firstName: string;
  lastName: string;
  middleName?: string;
  groupId?: number;
}

interface Props {
  onSubmit: (values: AddStudentFormValues) => void;
}

const AddStudent = ({ onSubmit }: Props): React.ReactElement => {
  const { groups } = useGroups();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<AddStudentFormValues>({
    defaultValues: { firstName: '', lastName: '', middleName: '', groupId: undefined },
    mode: 'onSubmit',
  });

  const submitHandler = (values: AddStudentFormValues): void => {
    onSubmit(values);
    reset();
  };

  return (
    <form className={styles.AddStudent} onSubmit={handleSubmit(submitHandler)}>
      <input
        placeholder="Фамилия"
        {...register('lastName', { required: 'Укажите фамилию' })}
      />
      {errors.lastName?.message && <span className={styles.Error}>{errors.lastName.message}</span>}

      <input
        placeholder="Имя"
        {...register('firstName', { required: 'Укажите имя' })}
      />
      {errors.firstName?.message && <span className={styles.Error}>{errors.firstName.message}</span>}

      <input
        placeholder="Отчество"
        {...register('middleName')}
      />

      <select
        {...register('groupId')}
      >
        <option value={''}>Выберите группу</option>
        {groups.map((g) => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>

      <button type="submit" disabled={isSubmitting}>Добавить</button>
    </form>
  );
};

export default AddStudent;


