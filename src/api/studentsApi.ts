import type StudentInterface from '@/types/StudentInterface';

export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const base = process.env.NEXT_PUBLIC_API ?? '/api/';
    const response = await fetch(`${base}students`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const students = await response.json() as StudentInterface[];
    return students;
  }
  catch (err) {
    console.log('>>> getStudentsApi', err);
    return [] as StudentInterface[];
  }
};

export const deleteStudentApi = async (studentId: number): Promise<number> => {
  try {
    const base = process.env.NEXT_PUBLIC_API ?? '/api/';
    const response = await fetch(`${base}students/${studentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    return studentId;
  }
  catch (err) {
    console.log('>>> deleteStudentApi', err);
    return -1;
  }
};

export const addStudentApi = async (student: {
  firstName: string;
  lastName: string;
  middleName?: string;
  groupId?: number;
}): Promise<StudentInterface> => {
  try {
    const base = process.env.NEXT_PUBLIC_API ?? '/api/';
    const response = await fetch(`${base}students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const created = await response.json() as StudentInterface;
    return created;
  }
  catch (err) {
    console.log('>>> addStudentApi', err);
    return { id: -1, firstName: '', lastName: '', middleName: '' } as StudentInterface;
  }
};
