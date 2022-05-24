import React from "react";
import styles from "./SignInPage.module.css";
import {FormAuth} from "../../components/FormAuth/FormAuth";

export const SignInPage: React.FC = (): JSX.Element => {

    return (
        <div className={styles.signUpPage_container}>
            <FormAuth/>
        </div>
    )
}