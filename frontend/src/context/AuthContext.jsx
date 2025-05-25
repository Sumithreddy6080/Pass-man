// context/AuthContext.jsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const AuthContext = createContext();

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userinfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Login function
  const login = useCallback(async (newToken) => {
    try {
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setError("");
      await fetchUser(newToken);
    } catch (err) {
      console.error("Login error:", err);
      logout();
      throw err;
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setError("");
  }, []);

  // Fetch user data
  const fetchUser = useCallback(
    async (jwt) => {
      if (!jwt) return;

      try {
        const response = await fetch(`${BASE_URL}/api/user/data`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        // console.log("user name ra nani :" ,userData);
        setUser(userData);
        setUserInfo(userData.userdetails);

        setError("");
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err.message);
        logout();
      }
    },
    [logout]
  );

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        await fetchUser(token);
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token, fetchUser]);

  // Check if user is authenticated
  const isAuthenticated = Boolean(token && user);

  const value = {
    user,
    userinfo,
    setUser,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
