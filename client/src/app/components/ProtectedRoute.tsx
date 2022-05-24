import React, {ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {localStorageService} from "../services/localStorage.service";

interface Props {
    redirectTo: string,
    children: ReactNode
}

export const ProtectedRoute: React.FC<Props> = ({redirectTo, children}): JSX.Element => {
    const accessToken = localStorageService.getAccessToken()

    return (
        <>
            {accessToken ? children : <Navigate to={redirectTo}/>}
        </>
    )
}
