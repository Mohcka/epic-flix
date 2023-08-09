import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useRandomMovie = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["randomMovie"],
    queryFn: () => axios.get("/api/movies/random").then((res) => res.data),
  });

  return { isLoading, data, error };
};

export default useRandomMovie;
