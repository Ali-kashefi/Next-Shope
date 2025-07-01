import http from "./httpServices";

export async function sendOTPAPI({ phoneNumber }) {
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
export function updateProfileAPI() {
  return http.patch("/user/update",).then(({ data }) => data.data);
}
export function logoutAPI() {
  return http.post("/user/logout")
}
export function getallCategorysAPI(data) {
  return http.get('/category/list', { data }).then(({ data }) => data.data)
}
export function getallproductsAPI(qs, cookies) {

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/list?${qs}`, {
    headers: {
      Cookie: cookies,
    },
  }
    , {
      cache: "no-store",

    }
  )
    .then((res) => res.json())
    .then(({ data }) => data)

}

export function getOneproductBySlugAPI(slug) {
  return http.get(`product/slug/${slug}`).then(({ data }) => data.data)
}
export function addToCartAPI(productId) {
  return http.post(`/cart/add`, { productId }).then(({ data }) => data.data)
}
export function removeproductfromcartbyIdAPI(productId) {
  return http.post(`/cart/remove`, { productId }).then(({ data }) => data.data)
}
export function createpeymentAPI() {
  return http.post(`/payment/create`).then(({ data }) => data.data)
}
export function likeAPI(id) {
  return http.post(`/product/like/${id}`).then(({ data }) => data.data);
}
export function getallusersAPI() {
  return http.get(`/admin/user/list`).then(({ data }) => data.data);

}

export function getallProductsAPI() {
  return http.get(`product/list`).then(({ data }) => data.data);

}


export function createProductAPI(data) {
  return http.post(`/admin/product/add`, data).then(({ data }) => data.data);

}
export function getProductbyidAPI(id) {
  return http.get(`product/${id}`).then(({ data }) => data.data);

}
export function updateProductAPI({ productId, data }) {
  return http.patch(`/admin/product/update/${productId}`, data).then(({ data }) => data.data);
}
export function removeProductbyIdAPI({ productId }) {
  return http.delete(`/admin/product/remove/${productId}`).then(({ data }) => data.data);
}
export function addNewCategoryAPI(data) {
  return http.post("/admin/category/add", data).then(({ data }) => data.data);
}

export function updateCategoryAPI({ id, data }) {
  return http
    .patch(`/admin/category/update/${id}`, data)
    .then(({ data }) => data.data);
}

export function removeCategoryAPI({id}) {
  return http
    .delete(`/admin/category/remove/${id}`)
    .then(({ data }) => data.data);
}
export function getCategoryByIdAPI(id) {
  return http.get(`/category/${id}`).then(({ data }) => data.data);
}
export function getAllPaymentsAPI() {
  return http.get("/admin/payment/list").then(({ data }) => data.data);
}


export function getAllCoupnsAPI() {
  return http.get("/admin/coupon/list").then(({ data }) => data.data);
}

export function getOneCouponAPI(id) {
  return http.get(`/admin/coupon/${id}`).then(({ data }) => data.data);
}
export function addNewCouponAPI(data) {
  return http.post("/admin/coupon/add", data).then(({ data }) => data.data);
}

export function updateCouponAPI({ id, data }) {
  return http
    .patch(`/admin/coupon/update/${id}`, data)
    .then(({ data }) => data.data);
}

export function deleteCouponAPI(id) {
  return http
    .delete(`/admin/coupon/remove/${id}`)
    .then(({ data }) => data.data);
}




