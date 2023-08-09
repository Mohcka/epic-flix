import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useMovie = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["movies"],
    queryFn: () => axios.get(`/api/movies`).then((res) => res.data),
  });

  return { isLoading, data, error };
};

export default useMovie;

