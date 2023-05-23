import { API_BASE_URL } from "../api-config";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  const access_token = localStorage.getItem("ACCESS_TOKEN");
  if (access_token && access_token != null) {
    headers.appent("Authorization", "Bearer" + access_token);
  }

  let options = {
    headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then((resp) => {
      if (resp.status === 200) {
        return resp.json();
      } else if (resp.status === 403) {
        window.location.href = "/login";
      }
    })
    .catch((error) => {
      console.log("http error");
      console.log(error);
    });
}

export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO).then((resp) => {
    console.log(resp);
    if (resp.token) {
      window.location.href = "/";
      localStorage.setItem("ACCESS_TOKEN", resp.token);
      window.location.href = "/";
    }
    // alert(resp.token);
  });
}

export function signout() {
  localStorage.removeItem("ACCESS_TOKEN");
  window.location.href = "/";
}

export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO);
}
