import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../util/Routes';

function AuthAlready() {
    const userName = useSelector((state) => state.auth.userName);
    const navigate = useNavigate();

    useEffect(() => {
        if (userName) {
            navigate(routes.sendToPools());
        }
    }, []);

    return ( <Outlet />);
}

export default AuthAlready;
