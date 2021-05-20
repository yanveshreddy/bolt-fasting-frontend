import Cookies from "js-cookie";

export default function authHeader() {
  const jwtToken = Cookies.get("jwt-token");

  if (jwtToken) {
    return { "x-access-token": jwtToken };
  } else {
    return {};
  }
}
