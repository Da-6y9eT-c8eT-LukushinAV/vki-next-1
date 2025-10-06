import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteStudentApi, getStudentsApi, addStudentApi } from '@/api/studentsApi';
import type StudentInterface from '@/types/StudentInterface';

interface StudentsHookInterface {
  students: StudentInterface[];
  deleteStudentMutate: (studentId: number) => void;
  addStudentMutate: (p: { firstName: string; lastName: string; middleName?: string }) => void;
}

const useStudents = (): StudentsHookInterface => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['students'],
    queryFn: () => getStudentsApi(),
    enabled: true,
  });

  /**
   * Мутация удаления студента
   */
  const deleteStudentMutate = useMutation({
    // вызов API delete
    mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    // оптимистичная мутация (обновляем данные на клиенте до API запроса delete)
    onMutate: async (studentId: number) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      // получаем данные из TanStackQuery
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
      let updatedStudents = [...(previousStudents ?? [])] ;

      if (!updatedStudents) return;

      // помечаем удаляемую запись
      updatedStudents = updatedStudents.map((student: StudentInterface) => ({
        ...student,
        ...(student.id === studentId ? { isDeleted: true } : {}),
      }));
      // обновляем данные в TanStackQuery
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);

      return { previousStudents, updatedStudents };
    },
    onError: (err, variables, context) => {
      console.log('>>> deleteStudentMutate  err', err);
      queryClient.setQueryData<StudentInterface[]>(['students'], context?.previousStudents);
    },
    // обновляем данные в случаи успешного выполнения mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    onSuccess: async (studentId, variables, { previousStudents }) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });

      // вариант 2 - удаление конкретной записи
      if (!previousStudents) {
        return;
      }
      const updatedStudents = previousStudents.filter((student: StudentInterface) => student.id !== studentId);
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);
    },
  });

  /**
   * Мутация добавления студента
   */
  const addStudentMutate = useMutation({
    mutationFn: async (payload: { firstName: string; lastName: string; middleName?: string }) => addStudentApi(payload),
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
      const tempId = Math.floor(Math.random() * -1000000);
      const optimistic: StudentInterface = {
        id: tempId,
        firstName: payload.firstName,
        lastName: payload.lastName,
        middleName: payload.middleName ?? '',
      };
      const updated = [optimistic, ...(previousStudents ?? [])];
      queryClient.setQueryData<StudentInterface[]>(['students'], updated);
      return { previousStudents, tempId };
    },
    onError: (err, variables, context) => {
      console.log('>>> addStudentMutate err', err);
      queryClient.setQueryData<StudentInterface[]>(['students'], context?.previousStudents);
    },
    onSuccess: async (created, variables, context) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      const current = queryClient.getQueryData<StudentInterface[]>(['students']) ?? [];
      const replaced = current.map((s) => (s.id === context?.tempId ? created : s));
      queryClient.setQueryData<StudentInterface[]>(['students'], replaced);
    },
  });

  return {
    students: data ?? [],
    deleteStudentMutate: deleteStudentMutate.mutate,
    addStudentMutate: addStudentMutate.mutate,
  };
};

export default useStudents;
