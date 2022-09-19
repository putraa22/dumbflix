import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/userContext";

export function IsLoginRoute() {
    const [state, dispatch] = useContext(UserContext)

    if (state.isLogin) {
        return <Outlet />
    } else {
        return <Navigate to={'/'} />
    }
}

export function IsAdminRoute() {
    const [state, dispatch] = useContext(UserContext)

    if (state.user.role == "admin") {
        return <Outlet />
    } else {
        return <Navigate to={'/list-film'} />
    }
}