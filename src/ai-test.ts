import { Options } from "k6/options";
import { login } from "../http/login";
import { SharedArray } from "k6/data";

// Load test data from JSON file
const testData = new SharedArray("users", function () {
  return JSON.parse(open("./assets/users.json")).users;
});

// konfiguracja testu wydajnościowego
export let options: Options = {
  vus: 1,
  iterations: 1,
};

// test funkcjonalny (scenariusz klienta pokrywający najwaniejsze endpointy)
export default () => {
  // Get a random user from the test data array
  const user = testData[Math.floor(Math.random() * testData.length)] as {
    username: string;
    password: string;
  };
  login(user.username, user.password);
};
