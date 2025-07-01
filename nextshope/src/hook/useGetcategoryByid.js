import { useQuery } from "@tanstack/react-query";
import { getCategoryByIdAPI } from "../services/ServicesMethode";

export const useGetCategoryById = (id) =>
  useQuery({
    queryKey: ["get-category", id],
    queryFn: () => getCategoryByIdAPI(id),
    retry: false,
    refetchOnWindowFocus: true,
  });