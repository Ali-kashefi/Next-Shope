import { getallCategorysAPI } from "@/service/ServicesMethode";
import { useQuery } from "@tanstack/react-query";

export function useGetallcategory() {
    const { error, isLoading, data } = useQuery({
        queryKey: ["get-categories"],
        queryFn: getallCategorysAPI,
        retry: 1,
        refetchOnWindowFocus: true,

    });
    return {
        error, isLoading, data
    }
}