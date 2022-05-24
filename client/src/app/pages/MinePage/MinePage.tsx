import React, {useEffect} from "react";
import styles from "./MinePage.module.css";
import {useAppSelector} from "../../hooks";
import {Card} from "../../components/Card/Card";
import {toast} from "react-toastify";
import {Preloader} from "../../components/Preloader/Preloader";

export const MinePage: React.FC = (): JSX.Element => {
    const {articles, error, isLoading} = useAppSelector(state => state.article)

    useEffect(() => {
        if (error.length) {
            toast.error(error)
        }
    }, [error])

    return (
        <div className={styles.minePage_wrapper}>
            {isLoading
                ? <Preloader/>
                : (<div className={styles.minePage_container}>
                    {articles.length
                        ? articles.map(item => <Card key={item._id} {...item}/>)
                        : <h1 className={styles.title}>NO ARTICLES</h1>
                    }
                </div>)
            }
        </div>
    )
}