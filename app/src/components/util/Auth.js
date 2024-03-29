import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Auth() {
    const userName = useSelector((state) => state.auth.userName);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userName) {
            navigate('/user/login');
        }
    }, []);

    return (<Outlet />);
}

export default Auth;
