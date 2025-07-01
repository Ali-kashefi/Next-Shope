"use client";
import Button from "@/components/ui/Buttone";
import TextField from "@/components/ui/TextField";
import useGetUser from "@/hook/useGetUser";
import { updateProfileAPI } from "@/service/ServicesMethode";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const includeObj = (obj, keys) => {
  const newObj = {};
  if (obj) {
    keys.forEach((key) => {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = obj[key];
      }
    });
  }
  return newObj;
};

function Page() {
  const { user, isLoading} = useGetUser();

  const includeskey = ["name", "email", "phoneNumber", "biography"];

  const [formData, setFormData] = useState({});
  const [isDataInitialized, setIsDataInitialized] = useState(false); 

  useEffect(() => {
   
    if (user && !isDataInitialized) {
      setFormData(includeObj(user, includeskey));
      setIsDataInitialized(true); 
    }
  }, [user, isDataInitialized]);

  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutateAsync } = useMutation({
    mutationFn: updateProfileAPI,
  });

  const handleSubmite = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync(formData);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      toast.success(message);
      
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="max-w-sm">
      <h1 className="text-xl font-bold mb-4">اطلاعات کاربری</h1>
      <form className="space-y-5" onSubmit={handleSubmite}>
        {includeskey.map((key) => (
          <TextField
            key={key}
            label={key === "phoneNumber" ? "شماره تلفن" : key === "name" ? "نام" : key === "email" ? "ایمیل" : key === "biography" ? "بیوگرافی" : key}
            name={key}
            value={formData[key] || ""} 
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            disabled={isLoading || isUpdating}
          />
        ))}
        <div className="pt-2">
          <Button
            btnType="Submite"
            isLoading={isUpdating || isLoading}
            className="w-fit h-12"
            onClick={handleSubmite}
          >
            ویرایش اطلاعات
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Page;