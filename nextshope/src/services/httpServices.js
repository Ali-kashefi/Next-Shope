//In this code that uses Axios,
//  a base address has been assigned and it has the ability to automatically
//  log in the user using the access token when their cookies expire so that the user does not need to log in
//  again. The required REST API methods have been assigned to make the task easier.
//  This code has the ability to register cookies automatically.
import axios from "axios";
const app = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});



app.interceptors.request.use(
  (res) => res,
  (err) => Promise.reject(err)
);

app.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/refresh-token`,
          { withCredentials: true }
        );
        if (data) return app(originalConfig);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  })
const http = {
    get: app.get,
    post: app.post,
    put: app.put,
    delete: app.delete,
    patch: app.patch,
}


export default http;