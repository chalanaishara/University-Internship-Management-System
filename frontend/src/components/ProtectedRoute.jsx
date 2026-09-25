import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);
    console.log("REQUIRED ROLE:", role);

    if (!token) {
        console.log("No token");
        return <Navigate to="/login" replace />;
    }

    try {

        const payload = JSON.parse(
            atob(token.split(".")[1])
        );

        console.log("TOKEN PAYLOAD:", payload);
        console.log("TOKEN ROLE:", payload.role);

        if (role && payload.role !== role) {
            console.log("ROLE NOT MATCHED");
            return <Navigate to="/" replace />;
        }

        console.log("ROLE MATCHED");

        return children;

    } catch (error) {

        console.log("Invalid token");

        localStorage.removeItem("token");

        return <Navigate to="/login" replace />;
    }
}

export default ProtectedRoute;