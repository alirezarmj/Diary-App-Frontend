import axios from "axios";

/**
 * Fetches all posts from the server.
 * @returns {Array} - Array of post objects.
 * @throws {Error} - If the request fails or the response status is not 200.
 */
export const getAllPosts = async () => {
  try {
    const res = await axios.get("/posts");
    if (res?.status !== 200) throw new Error("Failed to fetch posts");
    return res.data;
  } catch (err) {
    console.error("Error in getAllPosts:", err.response?.data || err.message);
    throw err;
  }
};

/**
 * Sends an authentication request (login or signup) to the server.
 * @param {boolean} signup - If true, sends a signup request; otherwise, sends a login request.
 * @param {Object} data - User data containing name, email, and password.
 * @returns {Object} - Response data from the server (e.g., user details, token).
 * @throws {Error} - If the request fails or the response status is not 200 or 201.
 */
export const sendAuthRequest = async (signup, data) => {
  try {
    const endpoint = `/user/${signup ? "signup" : "login"}`;
    const payload = {
      name: data.name || "", // Name is optional for login
      email: data.email,
      password: data.password,
    };

    const res = await axios.post(endpoint, payload);

    if (![200, 201].includes(res?.status)) {
      throw new Error("Authentication Failed");
    }
    return res.data;
  } catch (err) {
    console.error("Error in sendAuthRequest:", err.response?.data || err.message);
    throw err;
  }
};

/**
 * Sends a request to add a new post to the server.
 * @param {Object} data - Post data containing title, description, imageUrl, location, and date.
 * @returns {Object} - Response data from the server (e.g., the created post).
 * @throws {Error} - If the request fails or the response status is not 201.
 */
export const sendAddPostRequest = async (data) => {
  try {
    const res = await axios.post("/posts/", {
      title: data.title, // Ensure it's title, not name
      description: data.description,
      image: data.imageUrl,
      location: data.location,
      date: data.date, // Ensure the date is formatted properly
      user: localStorage.getItem("userId"), // Attach the logged-in user's ID
    });

    if (res.status !== 201) throw new Error("Failed to send new post");
    return res.data;
  } catch (err) {
    console.log("Error in Adding New Post:", err.response?.data || err.message);
    throw err;
  }
};

/**
 * Fetches details of a specific post by its ID.
 * @param {string} id - The ID of the post to fetch.
 * @returns {Object} - The post details.
 * @throws {Error} - If the request fails or the response status is not 200.
 */
export const getPostDetails = async (id) => {
  try {
    const res = await axios.get(`/posts/${id}`);

    if (res.status !== 200) throw new Error("Unable to fetch diary!");
    return res.data;
  } catch (err) {
    console.log("Fetching Post Details:", err.response?.data || err.message);
    throw err;
  }
};

/**
 * Updates an existing post on the server.
 * @param {string} id - The ID of the post to update.
 * @param {Object} data - Updated post data containing title, description, imageUrl, and location.
 * @returns {Object} - Response data from the server (e.g., the updated post).
 * @throws {Error} - If the request fails or the response status is not 200.
 */
export const updatePost = async (id, data) => {
  try {
    const res = await axios.put(`/posts/${id}`, {
      title: data.title, // Ensure it's title, not name
      description: data.description,
      image: data.imageUrl,
      location: data.location,
    });

    if (res.status !== 200) throw new Error("Unable to update post!");
    return res.data;
  } catch (err) {
    console.log("Updating Post Details:", err.response?.data || err.message);
    throw err;
  }
};

/**
 * Deletes a post from the server by its ID.
 * @param {string} id - The ID of the post to delete.
 * @returns {Object} - Response data from the server (e.g., confirmation of deletion).
 * @throws {Error} - If the request fails or the response status is not 200.
 */
export const deletePost = async (id) => {
  try {
    const res = await axios.delete(`/posts/${id}`);
    if (res.status !== 200) throw new Error("Unable to delete post!");
    return res.data;
  } catch (err) {
    console.log("Deleting Post Details:", err.response?.data || err.message);
    throw err;
  }
};

/**
 * Fetches details of the currently logged-in user.
 * @returns {Object} - The user details.
 * @throws {Error} - If the request fails or the response status is not 200.
 */
export const getUserDetails = async () => {
  const id = localStorage.getItem("userId"); // Get the logged-in user's ID from localStorage
  try {
    const res = await axios.get(`/user/${id}`);
    if (res.status !== 200) throw new Error("No user found!");
    return res.data;
  } catch (err) {
    console.log("Finding user Details:", err.response?.data || err.message);
    throw err;
  }
};
