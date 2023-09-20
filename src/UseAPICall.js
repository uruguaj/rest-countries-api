import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const useAPICall = (queryOptions) => {
  const navigate = useNavigate();
  return useQuery({
    ...queryOptions,
    retry: false,
    onError: (err) => {
      alert("An error has occurred!");
    },
  });
};
