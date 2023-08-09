import { NextResponse as res } from "next/server";
import { prisma } from "@/lib/db";
import serverAuth from "@/lib/serverAuth";

export async function GET(
  req: Request,
  { params }: { params: { movieId: string } }
) {
  try {
    await serverAuth();
    console.log("get movie by id", { params });

    const { movieId } = params;

    if (typeof movieId !== "string") {
      throw new Error("Invalid Id");
    }

    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    return res.json(movie, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json(
      { error: "An issue occured on the server" },
      { status: 500 }
    );
  }
}
