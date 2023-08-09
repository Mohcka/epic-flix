import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCurrentUser = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => axios.get("/api/current").then((res) => res.data),
  });

  return { isLoading, data, error };
};

export default useCurrentUser;
