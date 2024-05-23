import { useEffect } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from 'jwt-decode';

const AuthWrapper = ({ role }) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;
  const decodedToken = token ? jwtDecode(token) : null;
  const userRole = decodedToken && decodedToken.sub ? decodedToken.sub.role : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && role) {
        navigate("/login");
    }
    if (isAuthenticated && role && role !== userRole) {
        navigate("/login");
    }
  }, [isAuthenticated, navigate, role, userRole]);

  return (
    <div>

    </div>
  );
};

  export default AuthWrapper;