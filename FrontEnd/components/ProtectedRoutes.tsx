import { Navigate, Outlet } from "react-router-dom";
import React from "react"

interface ProtectedRoutesProps {
    isLoggedIn: boolean | null
    role: "user" | "guest"
    requiredRole: "user"
}

interface LoginAuthRouteProps {
    isLoggedIn: boolean | null
    role: "guest" | "user"
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ isLoggedIn, role, requiredRole }) => {
    if (isLoggedIn === false || isLoggedIn === null) {
        return <Navigate to="/login" />
    }

    if (role !== requiredRole) {
        return <Navigate to="/" />
    }

    if (role === requiredRole) {
        return <Outlet />
    }
}

const LoginAuthRoute: React.FC<LoginAuthRouteProps> = ({ isLoggedIn, role }) => {
    if (isLoggedIn === true && role === "user") {
        return <Navigate to="/user/vote" />
    }

    return <Outlet />
}

export { ProtectedRoutes, LoginAuthRoute }