import React, { useCallback, useMemo } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import useFavoriteMutation from "@/hooks/useFavoriteMutation";
import useFavoritesQuery from "@/hooks/useFavoritesQuery";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { data: userFaves } = useFavoritesQuery();
  const { mutateAsync: mutateFavorites } = useFavoriteMutation();
  const { data: session, update } = useSession();

  const isFavorite = useMemo(() => {
    const list = userFaves?.map((movie) => movie.id) ?? [];

    return list.includes(movieId);
  }, [userFaves, movieId]);

  const toggleFavorites = useCallback(async () => {
    await mutateFavorites({
      movieId,
      isFavorite: !isFavorite,
    });
  }, [movieId, isFavorite, mutateFavorites]);

  const Icon = isFavorite ? CheckIcon : PlusIcon;

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};

export default FavoriteButton;
