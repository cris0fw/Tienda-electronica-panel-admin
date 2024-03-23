import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const getTokenFromLocalStorage = localStorage.getItem("token");
  return getTokenFromLocalStorage !== null ? (
    children
  ) : (
    <Navigate to="/login" replace={true} />
  );
};
