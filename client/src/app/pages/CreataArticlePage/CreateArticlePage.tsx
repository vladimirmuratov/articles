import React from "react";
import styles from "./CreateArticlePage.module.css";
import {FormCreateArticle} from "../../components/FormCreateArticle/FormCreateArticle";

export const CreateArticlePage: React.FC = (): JSX.Element => {

    return (
        <div className={styles.createArticlePage_wrapper}>
            <FormCreateArticle/>
        </div>
    )
}