import './css/App.css';

import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { updateJWT } from './redux/slicer/authSlicer';

import http from './util/http';
import Fingerprint from './util/fingerprint';

import './css/pages/user.css';

import PrivateRoute from './components/util/Auth';
import PrivateRouteAdmin from './components/util/AuthAdmin';
import PrivateRouteAlready from './components/util/AuthAlready';

import BigLoading from './components/util/BigLoading';

import SiteHeader from './components/common/SiteHeader';
import SiteFooter from './components/common/SiteFooter';

import PageRoot404 from './components/pages/PageRoot404';
import PageAdmin from './components/pages/PageAdmin';
import PageAdminApostas from './components/pages/PageAdminApostas';
import PageAdminScore from './components/pages/PageAdminScore';
import PageCampeonatoApostadoUser from './components/pages/PageCampeonatoApostadoUser';
import PageCampeonatoFixture from './components/pages/PageCampeonatoFixture';
import PageCampeonatoApostar from './components/pages/PageCampeonatoApostar';
import PageUserCadastro from './components/pages/PageUserCadastro';
import PageCampeonatos from './components/pages/PageCampeonatos';
import PagePools from './components/pages/PagePools';
import PageRootContato from './components/pages/PageRootContato';
import PageCampeonatoDashboard from './components/pages/PageCampeonatoDashboard';
import PageUserEsqueci from './components/pages/PageUserEsqueci';
import PageCampeonatoFixtures from './components/pages/PageCampeonatoFixtures';
import PageRootHome from './components/pages/PageRootHome';
import PageUserLogin from './components/pages/PageUserLogin';
import PageRootRegulamento from './components/pages/PageRootRegulamento';

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
                dispatch(updateJWT({
                    userUuid: response.uuid,
                    userName: response.name,
                    userPhoneNumber: response.phoneNumber,
                    userRole: response.role,
                    userJWT: response.jwt,
                }));
            })
            .catch(() => { });

        setLoading(false);
    };

    const returnApp = () => {
        return (
            <div className='wrapper'>
                <SiteHeader />

                <Routes>
                    <Route path='/' element={<Outlet />} >
                        {/* ROOT */}
                        <Route path='' element={<PageRootHome />} />
                        <Route path='faleconosco' element={<PageRootContato />} />
                        <Route path='regulamento' element={<PageRootRegulamento />} />
                        <Route path='campeonatos' element={<PageCampeonatos />} />
                        <Route path='campeonato/:championshipId' element={<PageCampeonatoFixtures />} />

                        {/* RESTRICTED */}
                        <Route element={<PrivateRoute />} >
                            <Route path='pools' element={<PagePools />} />
                        </Route>

                        {/* USER */}
                        <Route path='user' element={<Outlet />} >
                            {/* USER - NOT RESTRICTED */}
                            <Route element={<PrivateRouteAlready />} >
                                <Route path='' element={<PageRoot404 />} />

                                <Route path='login' element={<PageUserLogin />} />
                                <Route path='cadastrar' element={<PageUserCadastro />} />

                                <Route path='esqueci' element={<PageUserEsqueci />} />

                                <Route path='*' element={<PageRoot404 />} />
                            </Route>
                        </Route>

                        {/* ADMIN - RESTRICTED */}
                        <Route path='admin' element={<PrivateRouteAdmin />} >
                            <Route path='' element={<PageAdmin />} />
                        </Route>

                        {/* CAMPEONATO - RESTRICTED */}
                        <Route path='campeonato' element={<PrivateRoute />} >
                            <Route path=':campeonato/:fase' element={<PageCampeonatoDashboard />} />
                            <Route path=':campeonato/:fase/jogo/:fixture' element={<PageCampeonatoFixture />} />
                            <Route path=':campeonato/:fase/apostado/:nome' element={<PageCampeonatoApostadoUser />} />
                            <Route path=':campeonato/:fase/:parte/apostar' element={<PageCampeonatoApostar />} />

                            {/* ADMIN - RESTRICTED */}
                            <Route path=':campeonato' element={<PrivateRouteAdmin />} >
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
