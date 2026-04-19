import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../util/Routes';

function AuthAdmin() {
    const userRole = useSelector((state) => state.auth.userRole);
    const navigate = useNavigate();

    useEffect(() => {
        if (userRole !== 'admin') {
            navigate(routes.sendToUserLogin());
        }
    }, []);

    return (<Outlet />);
}

export default AuthAdmin;
