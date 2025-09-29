import { getStudentsDb } from '@/db/studentDb';

export async function GET(): Promise<Response> {
  const students = await getStudentsDb();
  // Нормализуем ключи к camelCase на случай, если БД/данные содержат snake_case
  const normalized = (students as any[]).map((s) => ({
    id: s.id,
    firstName: s.firstName ?? s.first_name ?? '',
    lastName: s.lastName ?? s.last_name ?? '',
    middleName: s.middleName ?? s.middle_name ?? '',
  }));

  return new Response(JSON.stringify(normalized), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
