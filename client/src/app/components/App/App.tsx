import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";

import {useAppDispatch} from "../../hooks";
import {fetchArticles} from "../../store/articleSlice";
import {Header} from "../Header/Header";
import {MinePage} from "../../pages/MinePage/MinePage";
import styles from "./App.module.css";
import {ArticlePage} from "../../pages/ArticlePage/ArticlePage";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NotFoundPage} from "../../pages/404/NotFound";
import {SignInPage} from "../../pages/SignInPage/SignInPage";
import {AdminPage} from "../../pages/AdminPage/AdminPage";
import {CreateArticlePage} from "../../pages/CreataArticlePage/CreateArticlePage";
import {ProtectedRoute} from "../ProtectedRoute";
import {localStorageService} from "../../services/localStorage.service";
import {updateRefreshToken} from "../../store/authSlice";

function App() {
    const dispatch = useAppDispatch()
    const expiresDate = localStorageService.getExpiresDate()
    const refreshToken = localStorageService.getRefreshToken()
    const isExpired = refreshToken && Number(expiresDate) < Date.now()

    useEffect(() => {
        if(isExpired){
            dispatch(updateRefreshToken())
        }
    }, [])

    useEffect(() => {
        dispatch(fetchArticles())
    }, [])

    return (
        <main className={styles.App}>
            <Header/>
            <Routes>
                <Route index element={<MinePage/>}/>
                <Route path="/signIn" element={<SignInPage/>}/>
                <Route path="/article/:id" element={<ArticlePage/>}/>
                <Route path="/admin" element={(
                    <ProtectedRoute redirectTo="/">
                        <AdminPage/>
                    </ProtectedRoute>)}
                />
                <Route path="/admin/article/create" element={(
                    <ProtectedRoute redirectTo="/">
                        <CreateArticlePage/>
                    </ProtectedRoute>
                )}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
            <ToastContainer/>
        </main>
    );
}

export default App;
