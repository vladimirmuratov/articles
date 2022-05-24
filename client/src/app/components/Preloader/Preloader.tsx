import React from "react";
import styles from "./Preloader.module.css";

export const Preloader: React.FC = (): JSX.Element => (
    <div className={styles.preloader_container}>
        <span className={styles.preloader}/>
    </div>
)
