import './css/App.css';

import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { updateJWT } from './redux/slicer/authSlicer';

import http from './util/http';
import Fingerprint from './util/fingerprint';

import './css/pages/user.css';

import UserMustBeLoggedIn from './components/util/UserMustBeLoggedIn';
import UserMustBeAdmin from './components/util/UserMustBeAdmin';
import UserMustBeLoggedOff from './components/util/UserMustBeLoggedOff';

import BigLoading from './components/util/BigLoading';

import SiteHeader from './components/common/SiteHeader';
import SiteFooter from './components/common/SiteFooter';

import PageAdmin from './components/pages/PageAdmin';
import PageAdminChampionshipScore from './components/pages/PageAdminChampionshipScore';
import PageAdminCreatePool from './components/pages/PageAdminCreatePool';
import PageAdminEditPool from './components/pages/PageAdminEditPool';
import PageAdminPoolUserParticipation from './components/pages/PageAdminPoolUserParticipation';
import PageChampionshipFixtures from './components/pages/PageChampionshipFixtures';
import PageChampionships from './components/pages/PageChampionships';
import PagePoolBet from './components/pages/PagePoolBet';
import PagePoolDashboard from './components/pages/PagePoolDashboard';
import PagePoolFixture from './components/pages/PagePoolFixture';
import PagePools from './components/pages/PagePools';
import PagePoolUserBet from './components/pages/PagePoolUserBet';
import PageRoot404 from './components/pages/PageRoot404';
import PageRootContactUs from './components/pages/PageRootContactUs';
import PageRootHome from './components/pages/PageRootHome';
import PageRootRules from './components/pages/PageRootRules';
import PageUserForgotPassword from './components/pages/PageUserForgotPassword';
import PageUserLogin from './components/pages/PageUserLogin';
import PageUserRegister from './components/pages/PageUserRegister';

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
        const data = {
            fingerprint: await Fingerprint.get(),
        };

        await http.authValidate(data)
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
                    <Route path='contact' element={<PageRootContactUs />} />
                    <Route path='rules' element={<PageRootRules />} />
                    <Route path='championships' element={<PageChampionships />} />
                    <Route path='championship/:championshipId' element={<PageChampionshipFixtures />} />

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

                    <Route element={<UserMustBeAdmin />} >
                        <Route path='admin' element={<PageAdmin />} />
                        <Route path='admin/pool' element={<PageAdminCreatePool />} />
                        <Route path='admin/pool/:poolUuid' element={<PageAdminEditPool />} />
                        <Route path='admin/pool/:poolUuid/participation' element={<PageAdminPoolUserParticipation />} />
                        <Route path='admin/championship/:championshipId' element={<PageAdminChampionshipScore />} />
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
