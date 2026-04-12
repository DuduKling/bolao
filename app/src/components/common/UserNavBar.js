import React, { useEffect, useState } from 'react';
import '../../css/common/userNavBar.css';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { updateJWT } from '../../redux/slicer/authSlicer';

import PropTypes from 'prop-types';

import http from '../../util/http';

function UserNavBar(props) {
    const [isAdmin, setIsAdmin] = useState(false);

    const userRole = useSelector((state) => state.auth.userRole);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (userRole === 'admin') {
            setIsAdmin(true);
        }
    }, []);

    const logout = async () => {
        dispatch(updateJWT({
            userUuid: '',
            userName: '',
            userPhoneNumber: '',
            userRole: '',
            userJWT: '',
        }));

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/user/authReset.php`,
            data: JSON.stringify({}),
            withCredentials: true,
        });

        navigate('/');
    };

    const showAdminLink = () => {
        if (isAdmin) {
            return (
                <Link to="/admin" className="navUser-container">
                    Admin
                </Link>
            );
        }
    };

    return (
        <div className={props.visible ? 'userNavBar-container -show' : 'userNavBar-container -hide'}>

            {showAdminLink()}

            <a className="navUser-container" onClick={logout}>
                Sair
            </a>
        </div>
    );
}

UserNavBar.propTypes = {
    visible: PropTypes.bool,
};

export default UserNavBar;
