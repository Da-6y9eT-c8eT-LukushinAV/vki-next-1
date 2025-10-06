'use client';

import { useForm } from 'react-hook-form';
import styles from './AddStudent.module.scss';

interface AddStudentFormValues {
  firstName: string;
  lastName: string;
  middleName?: string;
}

interface Props {
  onSubmit: (values: AddStudentFormValues) => void;
}

const AddStudent = ({ onSubmit }: Props): React.ReactElement => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<AddStudentFormValues>({
    defaultValues: { firstName: '', lastName: '', middleName: '' },
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

      <button type="submit" disabled={isSubmitting}>Добавить</button>
    </form>
  );
};

export default AddStudent;


