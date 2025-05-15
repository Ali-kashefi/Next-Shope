import http from "./httpServices";

export async function sendOTPAPI({ phoneNumber }) {
    return http.post("/user/get-otp", { phoneNumber }).then((res) => res.data);
}