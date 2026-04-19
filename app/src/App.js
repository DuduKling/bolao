import './css/App.css';

import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { updateJWT } from './redux/slicer/authSlicer';

import http from './util/http';
import Fingerprint from './util/fingerprint';

import './css/pages/user.css';

import UserMustBeLoggedIn from './components/util/Auth';
import UserMustBeAdmin from './components/util/AuthAdmin';
import UserMustBeLoggedOff from './components/util/AuthAlready';

import BigLoading from './components/util/BigLoading';

import SiteHeader from './components/common/SiteHeader';
import SiteFooter from './components/common/SiteFooter';

import PageRoot404 from './components/pages/PageRoot404';
import PageAdmin from './components/pages/PageAdmin';
import PageAdminApostas from './components/pages/PageAdminApostas';
import PageAdminScore from './components/pages/PageAdminScore';
import PagePoolUserBet from './components/pages/PagePoolUserBet';
import PagePoolFixture from './components/pages/PagePoolFixture';
import PagePoolBet from './components/pages/PagePoolBet';
import PageUserRegister from './components/pages/PageUserRegister';
import PageChampionships from './components/pages/PageChampionships';
import PagePools from './components/pages/PagePools';
import PageRootContactUs from './components/pages/PageRootContactUs';
import PagePoolDashboard from './components/pages/PagePoolDashboard';
import PageUserForgotPassword from './components/pages/PageUserForgotPassword';
import PageChampionshipFixtures from './components/pages/PageChampionshipFixtures';
import PageRootHome from './components/pages/PageRootHome';
import PageUserLogin from './components/pages/PageUserLogin';
import PageRootRules from './components/pages/PageRootRules';

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        didMount();
    }, []);

    const didMount = async () => {
        const dataString = JSON.stringify({
            fingerprint: await Fingerprint.get(),
        });

        await http.post({
            url: `${process.env.REACT_APP_URL_BACK}/api/v1/user/authValidate.php`,
            data: dataString,
            withCredentials: true,
        })
            .then((response) => {
                dispatch(updateJWT({ userJWT: response.jwt }));
            })
            .catch(() => { });

        setLoading(false);
    };

    const returnApp = () => {
        return (
            <div className='wrapper'>
                <SiteHeader />

                <Routes>
                    <Route path='/' element={<PageRootHome />} />
                    <Route path='faleconosco' element={<PageRootContactUs />} />
                    <Route path='regulamento' element={<PageRootRules />} />
                    <Route path='campeonatos' element={<PageChampionships />} />
                    <Route path='campeonato/:championshipId' element={<PageChampionshipFixtures />} />

                    <Route element={<UserMustBeLoggedIn />} >
                        <Route path='pools' element={<PagePools />} />
                        <Route path='pools/:poolUuid/bet' element={<PagePoolBet />} />
                        <Route path='pools/:poolUuid/user/:userUuid' element={<PagePoolUserBet />} />
                        <Route path='pools/:poolUuid/dashboard' element={<PagePoolDashboard />} />
                        <Route path='pools/:poolUuid/fixture/:fixtureId' element={<PagePoolFixture />} />
                    </Route>

                    <Route element={<UserMustBeLoggedOff />} >
                        <Route path='user/login' element={<PageUserLogin />} />
                        <Route path='user/cadastrar' element={<PageUserRegister />} />
                        <Route path='user/esqueci' element={<PageUserForgotPassword />} />
                    </Route>

                    {/* ----- OLDER ROUTES ---- */}
                    <Route path='/' element={<Outlet />} >
                        {/* ADMIN - RESTRICTED */}
                        <Route path='admin' element={<UserMustBeAdmin />} >
                            <Route path='' element={<PageAdmin />} />
                        </Route>

                        {/* CAMPEONATO - RESTRICTED */}
                        <Route path='campeonato' element={<UserMustBeLoggedIn />} >
                            {/* ADMIN - RESTRICTED */}
                            <Route path=':campeonato' element={<UserMustBeAdmin />} >
                                <Route path=':fase/admin' element={<PageAdminApostas />} />
                                <Route path=':fase/:parte/admin' element={<PageAdminScore />} />
                            </Route>
                        </Route>
                    </Route>

                    <Route path='*' element={<PageRoot404 />} />
                </Routes>

                <SiteFooter />
            </div>
        );
    };

    return (
        <div>
            {loading ? <BigLoading /> : returnApp()}
        </div>
    );
}

export default App;
