import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const API = axios.create({ baseURL: `${BASE_URL}/api` });

const fetchUsers = async () => {
  try {
    const response = await API.get("/users");

    return response.data; // This should be the data you're expecting
  } catch (error) {
    console.log("Failed to fetch users:", error.message);
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const response = await API.post("/users", userData); // Send user data
    return response.data; // Return created user data
  } catch (error) {
    console.error(
      "Failed to create user:",
      error.response?.data || error.message
    );
    throw error; // Ensure the caller knows the request failed
  }
};

export { fetchUsers, createUser };
