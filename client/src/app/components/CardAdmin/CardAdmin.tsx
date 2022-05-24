import React from "react";
import styles from "./CardAdmin.module.css";
import {useAppDispatch} from "../../hooks";
import {deleteArticle} from "../../store/articleSlice";
import {DeleteButton} from "../buttons/DeleteButton/DeleteButton";

interface IProps {
    id: string,
    title: string
}

export const CardAdmin: React.FC<IProps> = ({id, title}): JSX.Element => {
    const dispatch = useAppDispatch()

    const deleteHandler = (id: string) => {
        const answer = window.confirm('Delete?')
        if (answer) {
            dispatch(deleteArticle({id}))
        }
    }

    return (
        <div className={styles.cardAdmin_container}>
            <h3>{title}</h3>
          <DeleteButton onClick={() => deleteHandler(id)}/>
        </div>
    )
}