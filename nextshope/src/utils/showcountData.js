
import { getAllPaymentsAPI, getallProductsAPI, getallusersAPI } from "@/service/ServicesMethode";
import setCookiesOnReq from "./setCookiesOnReq";
import { cookies } from "next/headers";

export async function showCountData() {
    const cookieStore = cookies();
    const option = setCookiesOnReq(cookieStore);
    try {
        const data = await Promise.all([
            getallusersAPI(option),
            getallProductsAPI(),
            getAllPaymentsAPI(option)
        ]);

        const numberOfUsers = Number(data[0].users?.length ?? 0);
        const numberOfPosts = Number(data[1].products?.length ?? 0);
        const numberOfOrder = Number(data[2].payments?.length ?? 0)
        const allPayments = data[2]?.payments;
        let lastThreePayments = [];


        if (Array.isArray(allPayments)) {
            lastThreePayments = allPayments.slice(-3);


        }

        return {
            numberOfPosts,
            numberOfOrder,
            numberOfUsers,
            lastThreePayments,
            allPayments
        };
    } catch (error) {
        console.error("خطا", error.response?.data?.message || error);
        throw new Error("خطا در بارگذاری اطلاعات");
    }
}
