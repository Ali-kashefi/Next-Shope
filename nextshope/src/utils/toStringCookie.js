export function toStringcookie(cookies) {
    let strCookie = "";
  cookies.getAll().forEach((item) => {
    strCookie += `${item?.name}=${item?.value}; `;
  });
  return strCookie;
}