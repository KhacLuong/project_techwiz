import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";

const AuthRouter = ({allowedRoles, page:Page}) => {
    const location = useLocation()
    const {roles} = useAuth()
    return (
        roles.some(role => allowedRoles.includes(role))
            ? <Page/>
            : <Navigate to={location.pathname.includes("admin") ? '/admin/v1/cms/sign-in' : '/'} state={{from: location}} replace/>
    );
};

export default AuthRouter;