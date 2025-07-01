
import { getallproductsAPI } from "@/service/ServicesMethode";
import { useQuery } from "@tanstack/react-query";

export function useGetallproduct() {
    const { error, isLoading, data } = useQuery({
        queryKey: ["get-allproducts"],
        queryFn: getallproductsAPI,
        retry: 1,
        refetchOnWindowFocus: true,

    });
    return {
        error, isLoading, data
    }
}