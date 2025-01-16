import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "https://real-time-chatapp-delta.vercel.app" : "/";


export const useAuthStore = create((set, get) => ({
  authUser: JSON.parse(localStorage.getItem("authUser")) || null, // Load authUser from localStorage
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // Helper function for error handling
  handleError: (error, defaultMessage) => {
    const message = error.response?.data?.message || defaultMessage;
    toast.error(message);
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      if (res.data) {
        get().connectSocket(); // Reconnect socket after user authentication
      }
    } catch (error) {
      console.error("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data)); // Store user in localStorage
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      useAuthStore.getState().handleError(error, "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data)); // Store user in localStorage
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      useAuthStore.getState().handleError(error, "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      localStorage.removeItem("authUser"); // Remove user from localStorage
      toast.success("Logged out successfully");
      get().diconnectSocket();
    } catch (error) {
      useAuthStore.getState().handleError(error, "Logout failed");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data)); // Update user in localStorage
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error in updateProfile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return; // Skip if already connected
    const newSocket = io(BASE_URL, {
      query: { userId: authUser._id },
    });
    newSocket.connect();
    set({ socket: newSocket });

    newSocket.on("getOnlineUsers", (userId) => {
      set({ onlineUsers: userId });
    });
  },

  diconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) socket.disconnect();
  },
}));
