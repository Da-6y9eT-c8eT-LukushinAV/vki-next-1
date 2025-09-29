import { deleteStudentDb } from '@/db/studentDb';
<<<<<<< HEAD

export async function DELETE(_request: Request, { params }: { params: { id: string } }): Promise<Response> {  
  const studentId = Number(params.id);
  if (Number.isNaN(studentId)) {
    return new Response(JSON.stringify({ error: 'Invalid id' }), { status: 400 });
  }
=======
import { type NextApiRequest } from 'next/types';

interface Params {
  params: { id: number };
}

export async function DELETE(req: NextApiRequest, { params }: Params): Promise<Response> {  
  const p = await params;
  const studentId = await p.id;
>>>>>>> 53fad53d2a244e059e618f1814e3675be23e0926

  const deletedStudentId = await deleteStudentDb(studentId);

  return new Response(JSON.stringify({ deletedStudentId }), {
    headers: {
      'Content-Type': 'application/json',
    },
<<<<<<< HEAD
    status: 200,
  });
}
=======
  });
};
>>>>>>> 53fad53d2a244e059e618f1814e3675be23e0926
