import JtockAuth from "j-tockauth";

let apiUrl = process.env.REACT_APP_AUTH_URL;

const auth = new JtockAuth({
  host: apiUrl,
  prefixUrl: "/api/v1",
});

export default auth;
