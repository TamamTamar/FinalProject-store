import { Navigate } from "react-router-dom";
import { DecodedToken, FCC } from "../@Types/types";
import { jwtDecode } from "jwt-decode";


const ProtectedRouteAdmin: FCC = ({ children }) => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode<DecodedToken>(token);
  const admin = decodedToken.isAdmin;

  if (!admin) {
    return <Navigate to={"/"} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRouteAdmin;
