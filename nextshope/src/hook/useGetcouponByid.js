import { getOneCouponAPI } from "@/service/ServicesMethode";
import { useQuery } from "@tanstack/react-query";

export function useGetcouponByid(id) {
    const { error, isLoading, data } = useQuery({
          queryKey: ["coupon", id], 
       
           queryFn: () => getOneCouponAPI(id),
           enabled: !!id, 

    });
    return {
        error, isLoading, data
    }
}