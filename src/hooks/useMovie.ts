import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useMovie = (id?: string) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => axios.get(`/api/movies/${id}`).then((res) => res.data),
  });

  return { isLoading, data, error };
};

export default useMovie;
