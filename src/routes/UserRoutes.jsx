
import { Navigate } from "react-router-dom";

const UserRoutes = ({ children }) => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  if (!token || !userData || userData === "undefined") {
    return <Navigate to="/Login" />;
  }

  const user = JSON.parse(userData);

  return children;
};

export default UserRoutes;