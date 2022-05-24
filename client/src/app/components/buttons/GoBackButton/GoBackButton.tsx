import React from "react";
import styles from "./GoBackButton.module.css";
import {useNavigate} from "react-router-dom";

export const GoBackButton: React.FC = (): JSX.Element => {
    const history = useNavigate()

    const handleClick = () => {
        history(-1)
    }

    return (
        <span className={styles.goBackButton} onClick={handleClick}>
           &lArr;
        </span>
    )
}