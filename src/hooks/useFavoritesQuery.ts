import { Movie } from "@prisma/client";
import { QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const favoritesToggleQueryKey: QueryKey = ["favoritesToggle"];

const useFavoritesQuery = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: favoritesToggleQueryKey,
    queryFn: () => axios.get<Movie[]>("/api/favorites").then((res) => res.data),
  });

  return { isLoading, data, error, queryKey: favoritesToggleQueryKey };
};

export default useFavoritesQuery;
