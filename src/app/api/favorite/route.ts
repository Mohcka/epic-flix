import { NextResponse } from "next/server";
// import { without } from "lodash";

import { prisma } from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
import { exclude } from "@/utils/prisma-utils";

export async function POST(req: Request) {
  try {
    const { currentUser } = await serverAuth();

    const { movieId } = await req.json();

    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      throw new Error("Invalid ID");
    }

    const user = exclude(
      await prisma.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      }),
      ["hashedPassword"]
    );

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "An internal server error had occured" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { currentUser } = await serverAuth();

    const { movieId } = await req.json();

    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      throw new Error("Invalid ID");
    }

    const updatedFavoriteIds = currentUser.favoriteIds.filter(
      (id: string) => id !== movieId
    );

    const updatedUser = exclude(
      await prisma.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      }),
      ["hashedPassword"]
    );

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "An internal server error had occured" },
      { status: 500 }
    );
  }
}
