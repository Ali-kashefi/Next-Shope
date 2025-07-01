
import { getAllCoupnsAPI } from "@/service/ServicesMethode";
import { useQuery } from "@tanstack/react-query";

export function useGetAllcopun() {
    const { error, isLoading, data } = useQuery({
        queryKey: ["get-allcopun"],
        queryFn: getAllCoupnsAPI,
        retry: 1,
        refetchOnWindowFocus: true,

    });
    return {
        error, isLoading, data
    }
}