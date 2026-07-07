import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";

const ProtectedAdminRoute = ({ children }) => {

    const { user, loading } = useCurrentUser();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedAdminRoute;