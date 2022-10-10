import './css/App.css';

import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { updateJWT } from './redux/slicer/authSlicer';

import http from './util/http';
import cookie from './util/cookie';

import PrivateRoute from './components/util/Auth';
import PrivateRouteAdmin from './components/util/AuthAdmin';
import PrivateRouteAlready from './components/util/AuthAlready';

import BigLoading from './components/util/BigLoading';

import SiteHeader from './components/common/SiteHeader';
import SiteFooter from './components/common/SiteFooter';

import Page404 from './components/pages/Page404';
import PageAdmin from './components/pages/PageAdmin';
// import PageAdminApostas from './components/pages/PageAdminApostas';
// import PageAdminScore from './components/pages/PageAdminScore';
import PageApostado from './components/pages/PageApostado';
import PageApostadoJogo from './components/pages/PageApostadoJogo';
import PageApostar from './components/pages/PageApostar';
import PageCampeonatos from './components/pages/PageCampeonatos';
import PageContato from './components/pages/PageContato';
import PageDashboard from './components/pages/PageDashboard';
import PageEsqueci from './components/pages/PageEsqueci';
import PageFixtures from './components/pages/PageFixtures';
import PageHome from './components/pages/PageHome';
import PageLogin from './components/pages/PageLogin';
import PageRegulamento from './components/pages/Regulamento';
import PageUser from './components/pages/PageUser';
import PageRedefinir from './components/pages/PageRedefinir';

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
        const userInfo = cookie.get('userLogin');

        if (userInfo) {
            const dataString = JSON.stringify({
                jwt: userInfo,
            });

            await http.post({
                url: `${process.env.REACT_APP_URL_BACK}/api/v1/validateCookie.php`,
                data: dataString,
                thenCallback: (response) => {
                    dispatch(updateJWT({
                        userName: response.name,
                        userEmail: response.email,
                        userId: response.id,
                        userImg: response.userImg,
                        userRole: response.userRole,
                        userJWT: response.jwt,
                    }));
                },
                catchCallback: ({ message }) => {
                    if (message === 'JWT não decodificado') {
                        cookie.set('userLogin', '', 0);
                    }
                },
            });
        }

        setLoading(false);
    };

    const returnApp = () => {
        return (
            <div className='wrapper'>
                <SiteHeader />

                <Routes>
                    <Route path='/' element={<Outlet />} >
                        {/* ROOT */}
                        <Route path='' element={<PageHome />} />
                        <Route path='faleconosco' element={<PageContato />} />
                        <Route path='regulamento' element={<PageRegulamento />} />

                        {/* USER */}
                        <Route path='user' element={<Outlet />} >
                            {/* USER - NOT RESTRICTED */}
                            <Route element={<PrivateRouteAlready />} >
                                <Route path='' element={<Page404 />} />

                                <Route path=':typeOfLogin' element={<PageLogin />} />

                                <Route path='esqueci' element={<PageEsqueci />} />

                                <Route path='redefinir/:id/:jwtCode' element={<PageRedefinir />} />
                                <Route path='redefinir/*' element={<Page404 />} />

                                <Route path='*' element={<Page404 />} />
                            </Route>

                            {/* USER - RESTRICTED */}
                            <Route element={<PrivateRoute />} >
                                <Route path='campeonatos' element={<PageCampeonatos />} />
                                <Route path='config' element={<PageUser />} />
                            </Route>
                        </Route>

                        {/* ADMIN - RESTRICTED */}
                        <Route path='admin' element={<PrivateRouteAdmin />} >
                            <Route path='' element={<PageAdmin />} />
                        </Route>

                        {/* CAMPEONATO - RESTRICTED */}
                        <Route path='campeonato' element={<PrivateRoute />} >
                            <Route path=':campeonato/:fase' element={<PageDashboard />} />
                            <Route path=':campeonato/:fase/jogos' element={<PageFixtures />} />
                            <Route path=':campeonato/:fase/jogo/:fixture' element={<PageApostadoJogo />} />
                            <Route path=':campeonato/:fase/apostado/:nome' element={<PageApostado />} />
                        </Route>




                    </Route>

                    <Route path='*' element={<Page404 />} />
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
