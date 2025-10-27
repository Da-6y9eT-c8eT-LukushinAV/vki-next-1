import { useQuery } from '@tanstack/react-query';
import { getStudentApi } from '@/api/studentsApi';
import type StudentInterface from '@/types/StudentInterface';

interface StudentHookInterface {
  student: StudentInterface | undefined;
  isLoading: boolean;
  isError: boolean;
}

const useStudent = (studentId: number): StudentHookInterface => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => getStudentApi(studentId),
    enabled: !!studentId && !Number.isNaN(studentId),
  });

  return {
    student: data ?? undefined,
    isLoading,
    isError,
  };
};

export default useStudent;

