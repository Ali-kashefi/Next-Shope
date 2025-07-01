import { getallusersAPI } from "@/service/ServicesMethode";
import { useQuery } from "@tanstack/react-query";
export default function useGetallusers() {
const { error, isLoading, data } = useQuery({
    queryKey: ["get-users"],
    queryFn: getallusersAPI ,
    retry: 2,
    refetchOnWindowFocus: true,

  });
  return{
    error, isLoading, data
  }
}