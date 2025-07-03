//Receive cookie and place in the header cookie section and at the end of the header
//  it is sent with a cookie for authentication.
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
  