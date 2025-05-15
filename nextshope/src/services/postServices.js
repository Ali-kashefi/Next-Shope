import http from "./httpServices";

export async function sendOTPAPI({ phoneNumber} ) {
    return http.post("/user/get-otp", { phoneNumber }).then((res) => res.data);
}
export async function cheackOTPAPI({ data} ) {
    return http.post("/user/check-otp", { data }).then((res) => res.data);
}