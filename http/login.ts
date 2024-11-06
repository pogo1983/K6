import { check } from "k6";
import http from "k6/http";
import { BASE_URL } from "../config/constants";
import { params } from "../config/httpConfig";

export const login = (username: string, password: string) => {
  const url = `${BASE_URL}/users/signin`;
  const body = JSON.stringify({
    username,
    password,
  });

  const res = http.post(url, body, params);

  check(res, {
    "login response status is 200": (r) => r.status === 200,
    "login response has valid token": (r) => r.json("token") !== undefined,
  });

  return res.json("token");
};
