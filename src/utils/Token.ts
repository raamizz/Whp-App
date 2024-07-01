import Cookies from "js-cookie";
import axios from "axios";

// Function to update the cookie value
export const updateCookie = () => {
  // Perform API call to get the new token
  // For example:
  axios.get("/refreshToken").then((response) => {
    const newToken = response.data.token;
    localStorage.set("localtoken", newToken);
  });
};
