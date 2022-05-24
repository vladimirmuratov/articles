import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useForm} from "react-hook-form";
import styles from "./FormCreateArticle.module.css";
import {Preloader} from "../Preloader/Preloader";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {createArticle} from "../../store/articleSlice";

interface FormData {
    title: string,
    description: string,
    body: string
}

export const FormCreateArticle: React.FC = (): JSX.Element => {

    const dispatch = useAppDispatch()
    const history = useNavigate()
    const {isLoading, error} = useAppSelector(state => state.article)
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>()

    const onSubmit = async (formData: FormData) => {
        const payload = {
            _id: '',
            ...formData
        }
        await dispatch(createArticle(payload)).then(res => {
            if (res.type === 'article/createArticle/fulfilled') {
                history(-1)

            }
        })
    }

    useEffect(() => {
        if (error.length) {
            toast.error(error)
        }
    }, [error])

    return (
        <>
            {isLoading
                ? <Preloader/>
                : (<form onSubmit={handleSubmit(onSubmit)} className={styles.form_container}>
                    <h1 className={styles.form_title}>Create article</h1>
                    <input
                        {...register("title", {required: true})}
                        placeholder="title"
                        className={styles.form_input}
                    />
                    {errors.title?.type === "required" && <span className={styles.error}>This field is required</span>}
                    <input
                        {...register("description", {required: true})}
                        placeholder="description"
                        className={styles.form_input}
                    />
                    {errors.description?.type === "required" &&
                    <span className={styles.error}>This field is required</span>}
                    <textarea
                        {...register("body", {required: true})}
                        placeholder="text of article"
                        className={styles.form_input}
                    />
                    {errors.body?.type === "required" &&
                    <span className={styles.error}>This field is required</span>}

                    <input type="submit" className={styles.button}/>
                </form>)
            }
        </>
    )
}