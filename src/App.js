import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Defaultcomponent from "./components/Defaultcomponents/Defaultcomponent";
import { jwtDecode } from "jwt-decode";
import * as UserService from "../src/services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/slides/userSlide";
import { isJsonString } from "./utils";
import Loading from "./components/isLoading";

function App() {
    const dispatch = useDispatch();
    const [isLoading, setisLoanding] = useState(false)
    const user = useSelector((state) => state.user)


    useEffect(() => {
        setisLoanding(true)
        const { storageData, decoded } = handleDecoded()
        if (decoded?.id) {
            handleGetDetailUser(decoded?.id, storageData);
        }
        setisLoanding(false)
    }, []);

    const handleDecoded = () => {
        let storageData = localStorage.getItem('access_token');
        let decoded = {};
        if (storageData && isJsonString(storageData)) {  // Không cần check isJsonString
            storageData = JSON.parse(storageData)
            decoded = jwtDecode(storageData);
        }
        return { decoded, storageData }
    }

    UserService.axiosJWT.interceptors.request.use(async function (config) {
        const { decoded } = handleDecoded()
        const currentTime = new Date()
        if (decoded?.exp < currentTime.getTime() / 1000) {
            const data = await UserService.refreshToken()
            config.headers['Authorization'] = `Bearer ${data?.access_token}`;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    const handleGetDetailUser = async (id, token) => {
        const res = await UserService.getDetailUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };

    return (
        <div>
            <Loading isLoading={isLoading}>
                <Router>
                    <Routes>
                        {routes.map((route) => {
                            const Page = route.page;
                            const ischeckAuth = !route.isPrivate || user.isAdmin
                            const Layout = route.isShowHeader ? Defaultcomponent : React.Fragment;
                            return (
                                <Route key={route.path} path={route.path} element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                } />
                            );
                        })}
                    </Routes>
                </Router>
            </Loading>
        </div>
    );
}

export default App;
