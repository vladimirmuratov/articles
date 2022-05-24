import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useForm} from "react-hook-form";
import styles from "./FormAuth.module.css";
import {signIn, signUp} from "../../store/authSlice";
import {Preloader} from "../Preloader/Preloader";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

interface FormData {
    email: string;
    password: string;
}

export const FormAuth: React.FC = (): JSX.Element => {
    const regExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const regExpPassword = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/

    const dispatch = useAppDispatch()
    const history = useNavigate()
    const {isAdminSignUp, isLoading, data, error} = useAppSelector(state => state.auth)
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>()

    const onSubmit = (formData: FormData) => {
        if (isAdminSignUp) {
            dispatch(signUp(formData))
        }else {
            dispatch(signIn(formData))
        }
    }

    useEffect(() => {
        if (data && !error) {
            history(-1)
        }
    }, [data, history, error])

    useEffect(() => {
        if(error.length){
            toast.error(error)
        }
    }, [error])

    return (
        <>
            {isLoading
                ? <Preloader/>
                : (<form onSubmit={handleSubmit(onSubmit)} className={styles.form_container}>
                    <h1 className={styles.form_title}>{isAdminSignUp ? "Sign Up" : "Sign In"}</h1>
                    <h3 className={styles.form_subtitle}>(Only administrator)</h3>
                    <input
                        {...register("email", {required: true, pattern: regExpEmail})}
                        placeholder="email"
                        className={styles.form_input}
                    />
                    {errors.email?.type === "required" && <span className={styles.error}>This field is required</span>}
                    {errors.email?.type === "pattern" && <span className={styles.error}>Email is not valid</span>}
                    <input
                        {...register("password", {required: true, pattern: regExpPassword})}
                        placeholder="password"
                        className={styles.form_input}
                    />
                    {errors.password?.type === "required" &&
                    <span className={styles.error}>This field is required</span>}
                    {errors.password?.type === "pattern" &&
                    <span className={styles.error}>Password must include: 8 symbols, digits, upper and lower case letters and special characters</span>}

                    <input type="submit" className={styles.button}/>
                </form>)
            }
        </>
    )
}