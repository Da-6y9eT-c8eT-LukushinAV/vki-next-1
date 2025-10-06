import { addStudentDb, getStudentsDb } from '@/db/studentDb';

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

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { firstName, lastName, middleName, groupId } = body ?? {};

    if (!firstName || !lastName) {
      return new Response(JSON.stringify({ error: 'firstName and lastName are required' }), { status: 400 });
    }

    const created = await addStudentDb(String(firstName), String(lastName), String(middleName ?? ''), Number(groupId ?? 1));

    return new Response(JSON.stringify(created), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
  }
  catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to create student' }), { status: 500 });
  }
}
