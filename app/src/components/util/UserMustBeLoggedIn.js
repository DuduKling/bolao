import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from './Routes';

function UserMustBeLoggedIn() {
    const userName = useSelector((state) => state.auth.userName);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userName) {
            navigate(routes.sendToUserLogin());
        }
    }, []);

    return (<Outlet />);
}

export default UserMustBeLoggedIn;
