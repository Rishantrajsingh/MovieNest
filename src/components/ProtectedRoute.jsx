import { Navigate } from "react-router-dom";
import { useFirebase } from "../context/FirebaseContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useFirebase();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
