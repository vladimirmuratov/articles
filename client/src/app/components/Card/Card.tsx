import React from "react";
import styles from "./Card.module.css";
import {Link} from "react-router-dom";

interface IProps {
    _id: string,
    title: string,
    description: string
}

export const Card: React.FC<IProps> = ({_id, title, description}): JSX.Element => {

    return (
        <div className={styles.card_container}>
            <h3 className={styles.card_title}>{title}</h3>
            <h4 className={styles.card_description}>{description}</h4>
            <Link to={`/article/${_id}`} className={styles.card_link}>Открыть</Link>
        </div>
    )
}