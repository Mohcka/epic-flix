import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import serverAuth from "@/lib/serverAuth";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();

    const favoritedMovies = await prisma.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });

    return NextResponse.json(favoritedMovies, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An internal server error had occured" },
      { status: 500 }
    );
  }
}
