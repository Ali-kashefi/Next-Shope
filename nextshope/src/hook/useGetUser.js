import { getUserProfileAPI } from "@/service/postServices";
import { useQuery } from "@tanstack/react-query";

export default function useGetUser() {
   const { error, isLoading, data } = useQuery({
      queryKey: ["get-user"],
      queryFn: getUserProfileAPI,
      retry:2 ,
      refetchOnWindowFocus: true,
    });
    
    const {user, cart } = data||{} ;
  
    
    return {
      data,
      user,
      cart,
      error,
      isLoading,

    };
}
