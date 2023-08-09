import useSwr from 'swr'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useBillboard = () => {
  // const { data, error, isLoading } = useSwr('/api/random', fetcher, { 
  //   revalidateIfStale: false,
  //   revalidateOnFocus: false,
  //   revalidateOnReconnect: false,
  //  });
  // return {
  //   data,
  //   error,
  //   isLoading
  // }

  const { data, error, isLoading } = useQuery({
    queryKey: ["billboard"],
    queryFn: () => axios.get("/api/movies/random").then((res) => res.data),
  });
  
  return { isLoading, data, error };
};

export default useBillboard;
