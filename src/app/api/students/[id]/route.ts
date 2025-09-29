import { deleteStudentDb } from '@/db/studentDb';

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
