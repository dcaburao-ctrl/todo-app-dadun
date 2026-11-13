import axios from 'axios';

// ─────────────────────────────────────────────────────────────
// SET THIS BASED ON HOW YOU ARE RUNNING THE APP RIGHT NOW:
//
// • Testing in a WEB BROWSER (npx expo start --web):
//     use 'http://localhost:5000/api/todos'
//
// • Testing on a PHONE with Expo Go:
//     use 'http://YOUR-LAPTOP-LAN-IP:5000/api/todos'
//     (run `ipconfig` on your laptop, use the IPv4 Address, and
//      your phone + laptop must be on the SAME Wi-Fi network)
//
// • Android emulator:
//     use 'http://10.0.2.2:5000/api/todos'
//
// Do NOT leave a phone IP in here when testing on web, and vice versa —
// that mismatch is the #1 cause of "add doesn't work" / infinite loading.
// ─────────────────────────────────────────────────────────────
const BASE_URL = 'http://localhost:5000/api/todos';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 8000, // fail fast instead of hanging forever
});

// Pulls out a readable message from any axios error, so alerts
// on screen tell you the REAL problem instead of a generic one.
const describeError = (error) => {
  if (error.response) {
    // Server responded with an error status (400, 404, 500, etc.)
    return `Server error ${error.response.status}: ${
      error.response.data?.message || 'Unknown server error'
    }`;
  }
  if (error.request) {
    // Request was sent but no response came back — classic network/IP issue
    return `No response from server at ${BASE_URL}. Check that the backend is running and BASE_URL is correct for how you're testing (web vs phone).`;
  }
  return `Request setup error: ${error.message}`;
};

export const fetchTodos = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('fetchTodos failed:', describeError(error));
    throw new Error(describeError(error));
  }
};

export const addTodo = async (title) => {
  try {
    const response = await api.post('/', { title });
    return response.data;
  } catch (error) {
    console.error('addTodo failed:', describeError(error));
    throw new Error(describeError(error));
  }
};

export const updateTodo = async (id, updates) => {
  try {
    const response = await api.put(`/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('updateTodo failed:', describeError(error));
    throw new Error(describeError(error));
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('deleteTodo failed:', describeError(error));
    throw new Error(describeError(error));
  }
};

export default api;
