import {NextResponse as res} from 'next/server';
import { prisma } from '@/lib/db';
import serverAuth from '@/lib/serverAuth';

export async function GET(
  req: Request
) {
  try {
    await serverAuth();

    const movies = await prisma.movie.findMany();

    return res.json(movies, {status: 200});
  } catch (error) {
    console.log({ error });
    return res.json({error: ""}, {status: 500})
  }
}
