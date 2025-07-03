export default function setCookiesOnReq(req) {

    const options = {
      headers: {
        Cookie:
          `${req.get("accessToken")?.name}=${
            req.get("accessToken")?.value
          }; ${req.get("refreshToken")?.name}=${
            req.get("refreshToken")?.value
          }` || "-",
      },
    };
  
    return options;
 
  }
  