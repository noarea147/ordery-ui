import axios from "axios";

export const METHOD_GET = "GET",
  METHOD_POST = "POST",
  METHOD_PUT = "PUT",
  METHOD_DELETE = "DELETE";

export default async function axiosFactory({
  url,
  method,
  data,
  isFake = false,
}) {
  if (url.includes("http")) {
    isFake = true;
  }
  const REACT_APP_BASE_URL = "http://192.168.1.52:9000";
  const header = getHeader(method, data, url);
  const urlToUse = isFake ? url : REACT_APP_BASE_URL + url;
  let response = { status: "", data: "", error: "" };
  try {
    switch (method) {
      case METHOD_GET:
        response = await axios.get(urlToUse, header);
        break;
      case METHOD_POST:
        response = await axios.post(urlToUse, data, header);
        break;
      case METHOD_PUT:
        response = await axios.put(urlToUse, data, header);
        break;
      case METHOD_DELETE:
        response = await axios.delete(urlToUse, header);
        break;
      default:
        new Error("Method not supported");
    }
  } catch (error) {
    switch (error.response.status) {
      case 401:
        response.status = 401;
        response.error = "Unauthorized";
        response.data = error.response.data.message;
        getAccessToken();
        break;
      case 403:
        response.status = 403;
        response.error = "Forbidden";
        response.data = error.response.data.message;
        getAccessToken();
        break;
      case 404:
        response.status = 404;
        response.error = "Not found";
        response.data = error.response.data.message;
        break;
      case 500:
        response.status = 500;
        response.error = "Internal server error";
        response.data = error.response.data.message;
        break;
      default:
        response.status = 400;
        response.error = "Something went wrong";
        response.data = error.response.data.message;
        break;
    }
  } finally {
    return {
      data: response.data,
      status: response.status,
      error: response.error,
    };
  }
}

function getHeader(method, data, url) {
  let header = {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("jwtAccessToken")}`,
  };
  if (url.includes("images")) {
    header = {
      "Content-Type": "application/json",
    };
  }
  if (method === METHOD_DELETE) {
    return { headers: header, data: data };
  }
  return { headers: header };
}

async function getAccessToken() {
  localStorage.removeItem("user");
  localStorage.removeItem("jwtAccessToken");
  window.location.href = "/login";
  // let header = {
  //   "Content-Type": "application/json",
  //   authorization: `Bearer ${localStorage.getItem("jwtRefreshToken")}`,
  // };
  // let url = process.env.REACT_APP_BASE_URL + "user/refresh";
  // let response = await axios.get(url, header);
  // if (response.status === 200) {
  //   localStorage.setItem("jwtAccessToken", response.data.data.accessToken);
  //   console.log("your access token just refreshed you fine");
  // } else {
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("jwtAccessToken");
  //   localStorage.removeItem("jwtRefreshToken");
  //   window.location.href = "/";
  // }
}
