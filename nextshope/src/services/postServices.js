import http from "./httpServices";

export async function sendOTPAPI({ phoneNumber} ) {
    return http.post("/user/get-otp", { phoneNumber }).then((res) => res.data);
}
export function cheackOTPAPI(data) {
    return http.post("/user/check-otp", data).then(({ data }) => data.data);
  }
  export function completeProfileAPI(data) {
    return http.post("/user/complete-profile", data).then(({ data }) => data.data);
  }
  export function getUserProfileAPI() {
   return http.get("/user/profile").then(({ data }) => data.data);
  }
  export function updateProfileAPI(data) {
  return http.patch("/user/update", data).then(({ data }) => data.data);
}
export function logoutAPI() {
   return http.post("/user/logout")
}

