
import { getProductbyidAPI } from "@/service/ServicesMethode";
import { useQuery } from "@tanstack/react-query";

export function useGetproductByid(productId) {
    const { data, error, isLoading } = useQuery({
        queryKey: ["get-product-by-id", productId],
        queryFn: () => getProductbyidAPI(productId),
        retry: 1,
        refetchOnWindowFocus: true,

        staleTime: 0,
        gcTime: 0,
    })

    return {
        error, isLoading, data
    }

};