import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

// Create a context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Function to update points
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const updatePoints = (points) => {
    if (user) {
      setUser((prevUser) => {
        const updatedUser = { ...prevUser, points: prevUser.points + points };
        return updatedUser;
      });
    } else {
      console.error("User not found in context");
    }
  };

  // Sync user state with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, updateUser, updatePoints }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Add prop types validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
