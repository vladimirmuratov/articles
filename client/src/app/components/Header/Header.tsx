import React from "react";
import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks";
import {localStorageService} from "../../services/localStorage.service";

export const Header: React.FC = (): JSX.Element => {
    const {data} = useAppSelector(state => state.auth)
    const userId = localStorageService.getUserId()
    const loggedIn = !!(data?.userId || userId)

    return (
        <header className={styles.header_container}>
            <Link to="/" className={styles.title}>Articles</Link>
            {loggedIn
                ? <Link to="/admin" className={styles.link}>Admin</Link>
                : <Link to="/signIn" className={styles.link}>Sign In</Link>
            }
        </header>
    )
}