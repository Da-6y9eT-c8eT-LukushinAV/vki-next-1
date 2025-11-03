import { deleteStudentDb, getStudentDb } from '@/db/studentDb';

export async function GET(_request: Request, { params }: { params: { id: string } }): Promise<Response> {
  const studentId = Number(params.id);
  if (Number.isNaN(studentId)) {
    return new Response(JSON.stringify({ error: 'Invalid id' }), { status: 400 });
  }

  const student = await getStudentDb(studentId);
  
  if (!student) {
    return new Response(JSON.stringify({ error: 'Student not found' }), { status: 404 });
  }

  // Нормализуем ключи к camelCase
  const normalized = {
    id: student.id,
    firstName: (student as any).firstName ?? (student as any).first_name ?? '',
    lastName: (student as any).lastName ?? (student as any).last_name ?? '',
    middleName: (student as any).middleName ?? (student as any).middle_name ?? '',
    contacts: (student as any).contacts ?? '',
    groupId: (student as any).groupId ?? (student as any).group_id ?? undefined,
    group: (student as any).group
      ? {
          id: (student as any).group.id,
          name: (student as any).group.name,
          contacts: (student as any).group.contacts ?? '',
        }
      : undefined,
  };

  return new Response(JSON.stringify(normalized), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
  });
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }): Promise<Response> {  
  const studentId = Number(params.id);
  if (Number.isNaN(studentId)) {
    return new Response(JSON.stringify({ error: 'Invalid id' }), { status: 400 });
  }

  const deletedStudentId = await deleteStudentDb(studentId);

  return new Response(JSON.stringify({ deletedStudentId }), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
  });
}
