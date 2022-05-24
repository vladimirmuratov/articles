import React from "react";
import {Link} from "react-router-dom";
import styles from "./NotFound.module.css";

export const NotFoundPage = () => (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <h1> 404 PAGE NOT FOUND</h1>
            <Link to="/">Home</Link>
        </div>
    </div>
)