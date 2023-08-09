"use client";

import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import Redirect from "@/components/Redirect";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import useFavoritesQuery from "@/hooks/useFavoritesQuery";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import useMovieList from "@/hooks/useMovieList";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { isValidSession, isLoading } = useAuthRedirect();

  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavoritesQuery();
  const { isOpen, closeModal } = useInfoModalStore();
  const { data: session, update } = useSession();
  
  if (!isValidSession || isLoading) {
    return null;
  }

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}
