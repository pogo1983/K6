import { check } from "k6";
import { Options } from "k6/options";
import http from "k6/http";
// konifiguracja testu wydajnosciowego
export let options: Options = {
  // Start with a smoke test configuration
  vus: 5, //ilosc klientow
  iterations: 5, //ilosc powtorzen
};
//to jest test funkcjonanly
export default () => {
  const url = "http://localhost:4001/users/signin";
  const body = JSON.stringify({
    username: "admin",
    password: "admin",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, body, params);

  // Verify the response
  check(res, {
    "status is 200": (r) => r.status === 200,
    "has valid token": (r) => r.json("token") !== undefined,
  });
};
