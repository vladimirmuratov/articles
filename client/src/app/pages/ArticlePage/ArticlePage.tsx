import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {useAppSelector} from "../../hooks";
import styles from "./ArticlePage.module.css";
import {IArticle} from "../../types";
import {GoBackButton} from "../../components/buttons/GoBackButton/GoBackButton";

export const ArticlePage: React.FC = (): JSX.Element => {
    const {id} = useParams()
    const {articles} = useAppSelector(state => state.article)
    const [article, setArticle] = useState<IArticle>()

    useEffect(() => {
        articles.forEach(a => {
            if (a._id === id) {
                setArticle(a)
            }
        })
    }, [id, articles])

    return (
        <div className={styles.article_wrapper}>
            <GoBackButton/>
            <div className={styles.article_container}>
                <h1 className={styles.article_title}>{article && article.title}</h1>
                <p className={styles.article_body}>{article && article.body}</p>
            </div>
        </div>
    )
}