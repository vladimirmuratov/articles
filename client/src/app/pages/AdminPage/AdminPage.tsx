import React from "react";
import styles from "./AdminPage.module.css";
import {useAppSelector} from "../../hooks";
import {CardAdmin} from "../../components/CardAdmin/CardAdmin";
import {Link} from "react-router-dom";

export const AdminPage: React.FC = (): JSX.Element => {
    const {articles} = useAppSelector(state => state.article)

    return (
        <div className={styles.adminPage_wrapper}>
            <Link to="/admin/article/create" className={styles.adminPage_createArticleLink}>Create article</Link>
            <div className={styles.adminPage_container}>
                {articles.length
                    ? articles.map(a => <CardAdmin key={a._id} id={a._id} title={a.title}/>)
                    : <h1 className={styles.adminPage_title}>No articles</h1>
                }
            </div>
        </div>
    )
}