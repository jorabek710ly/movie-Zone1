import { useQuery } from "@tanstack/react-query";
import { api } from "..";

export const useCasts = () => {
  const getCastsSingle = (id: string) => {
    return useQuery({
      queryKey: ["person", id],
      queryFn: () => api.get(`person/${id}`).then((res) => res.data),
    });
  };

  const getMovieeDetail = (id: string) => {
    return useQuery({
      queryKey: ["movie_credits", id],
      queryFn: () => api.get(`person/${id}/movie_credits`).then((res) => res.data),
    });
  };

  return { getCastsSingle, getMovieeDetail };
};
