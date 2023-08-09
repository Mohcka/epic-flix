import { Movie, User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritesToggleQueryKey } from "./useFavoritesQuery";
import axios from "axios";

const useFavoriteMutation = () => {
  const queryClient = useQueryClient();

  const favoriteMutation = useMutation({
    mutationFn: ({
      movieId,
      isFavorite: shouldSetFavorite,
    }: {
      movieId: Movie["id"];
      isFavorite: boolean;
    }) =>
      shouldSetFavorite
        ? axios.post<User>("/api/favorite", { movieId })
        : axios.delete<User>("/api/favorite", { data: { movieId } }),
    onSuccess: () => {
      queryClient.invalidateQueries(favoritesToggleQueryKey);
    },
  });

  return favoriteMutation;
};

export default useFavoriteMutation;
