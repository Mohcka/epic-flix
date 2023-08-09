import { NextResponse as res } from "next/server";
import { prisma } from "@/lib/db";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      throw new Error("Not signed in");
    }

    const { movieId } = await req.json();

    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      throw new Error("Invalid ID");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      throw new Error("Invalid email");
    }

    const updatedFavoriteIds = user.favoriteIds.filter((id) => id !== movieId);

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      },
    });

    return res.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);

    return res.json(
      { error: "An internal server error had occured" },
      { status: 500 }
    );
  }
}
