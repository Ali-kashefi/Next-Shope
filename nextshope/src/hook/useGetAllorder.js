import { getAllPaymentsAPI } from "@/service/ServicesMethode";
import { useQuery } from "@tanstack/react-query";

export function useGetAllorder() {
    const { error, isLoading, data } = useQuery({
        queryKey: ["get-allorder"],
        queryFn: getAllPaymentsAPI,
        retry: 1,
        refetchOnWindowFocus: true,

    });
    return {
        error, isLoading, data
    }
}