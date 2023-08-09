import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import serverAuth from "@/lib/serverAuth";

// This is the API endpoint that will be called by the frontend
export async function GET(req: Request) {
  try {
    // Authenticate with the server
    await serverAuth();

    // Get the total number of movies in the database
    const moviesCount = await prisma.movie.count();

    // Get a random index number between 0 and the total number of movies
    const randomIndex = Math.floor(Math.random() * moviesCount);

    // Find a movie at that random index
    const randomMovies = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    // Return the random movie
    return NextResponse.json(randomMovies[0], { status: 200 });
  } catch (error) {
    // If there's an error, send a 500 error back to the frontend
    return NextResponse.json(
      { error: "An issue occured on the server" },
      { status: 500 }
    );
  }
}
