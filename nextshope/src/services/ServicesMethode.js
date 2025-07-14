import http from "./httpServices";

// Sends OTP to a phone number
export async function sendOTPAPI({ phoneNumber }) {
  return http.post("/user/get-otp", { phoneNumber }).then((res) => res.data);
}
// Checks the provided OTP
export function cheackOTPAPI(data) {
  return http.post("/user/check-otp", data).then(({ data }) => data.data);
}
// Completes user profile
export function completeProfileAPI(data) {
  return http.post("/user/complete-profile", data).then(({ data }) => data.data);
}
// Fetches user profile
export function getUserProfileAPI() {
  return http.get("/user/profile").then(({ data }) => data.data);
}
// Updates user profile
export function updateProfileAPI(data) { // Added 'data' parameter for update
  return http.patch("/user/update", data).then(({ data }) => data.data);
}
// Logs out the user
export function logoutAPI() {
  return http.post("/user/logout");
}
// Fetches all categories
export function getallCategorysAPI(data) {
  return http.get('/category/list', { data }).then(({ data }) => data.data);
}
// Fetches all products with query string and cookies
export function getallproductsAPI(qs, cookies) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/list?${qs}`, {
    headers: {
      Cookie: cookies,
    },
    cache: "no-store",
  })
    .then((res) => res.json())
    .then(({ data }) => data);
}
// Fetches a single product by slug
export function getOneproductBySlugAPI(slug) {
  return http.get(`product/slug/${slug}`).then(({ data }) => data.data);
}
// Adds a product to cart
export function addToCartAPI(productId) {
  return http.post(`/cart/add`, { productId }).then(({ data }) => data.data);
}
// Removes a product from cart
export function removeproductfromcartbyIdAPI(productId) {
  return http.post(`/cart/remove`, { productId }).then(({ data }) => data.data);
}
// Creates a new payment
export function createpeymentAPI() {
  return http.post(`/payment/create`).then(({ data }) => data.data);
}
// Likes a product
export function likeAPI(id) {
  return http.post(`/product/like/${id}`).then(({ data }) => data.data);
}
// Fetches all users (admin)
export function getallusersAPI(option) {
  return http.get(`/admin/user/list`, option).then(({ data }) => data.data);
}
// Fetches all products (general)
export function getallProductsAPI() {
  return http.get(`product/list`).then(({ data }) => data.data);
}
// Creates a new product (admin)
export function createProductAPI(data) {
  return http.post(`/admin/product/add`, data).then(({ data }) => data.data);
}
// Fetches a product by ID
export function getProductbyidAPI(id) {
  return http.get(`product/${id}`).then(({ data }) => data.data);
}
// Updates a product (admin)
export function updateProductAPI({ productId, data }) {
  return http.patch(`/admin/product/update/${productId}`, data).then(({ data }) => data.data);
}
// Removes a product by ID (admin)
export function removeProductbyIdAPI({ productId }) {
  return http.delete(`/admin/product/remove/${productId}`).then(({ data }) => data.data);
}
// Adds a new category (admin)
export function addNewCategoryAPI(data) {
  return http.post("/admin/category/add", data).then(({ data }) => data.data);
}
// Updates a category (admin)
export function updateCategoryAPI({ id, data }) {
  return http
    .patch(`/admin/category/update/${id}`, data)
    .then(({ data }) => data.data);
}
// Removes a category (admin)
export function removeCategoryAPI({ id }) {
  return http
    .delete(`/admin/category/remove/${id}`)
    .then(({ data }) => data.data);
}
// Fetches a category by ID
export function getCategoryByIdAPI(id) {
  return http.get(`/category/${id}`).then(({ data }) => data.data);
}
// Fetches all payments (admin)
export function getAllPaymentsAPI(option) {
  return http.get("/admin/payment/list", option).then(({ data }) => data.data);
}
// Fetches all coupons (admin)
export function getAllCoupnsAPI() {
  return http.get("/admin/coupon/list").then(({ data }) => data.data);
}
// Fetches a single coupon (admin)
export function getOneCouponAPI(id) {
  return http.get(`/admin/coupon/${id}`).then(({ data }) => data.data);
}
// Adds a new coupon (admin)
export function addNewCouponAPI(data) {
  return http.post("/admin/coupon/add", data).then(({ data }) => data.data);
}
// Updates a coupon (admin)
export function updateCouponAPI({ id, data }) {
  return http
    .patch(`/admin/coupon/update/${id}`, data)
    .then(({ data }) => data.data);
}
// Deletes a coupon (admin)
export function deleteCouponAPI({id}) {
  return http
    .delete(`/admin/coupon/remove/${id}`)
    .then(({ data }) => data.data);
}