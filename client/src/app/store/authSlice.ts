import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {httpService} from "../services/http.service";
import {IResponseAuth} from "../types";
import {localStorageService} from "../services/localStorage.service";

export const signUp = createAsyncThunk<IResponseAuth, { email: string, password: string }, { rejectValue: string }>(
    "auth/signUp",
    async function (payload, {rejectWithValue}) {
        try {
            const response = await httpService.post("/auth/signUp", {
                email: payload.email.trim(),
                password: payload.password.trim()
            })
            // console.log('response SignUp', response.data)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.error.message)
        }
    }
)

export const signIn = createAsyncThunk<IResponseAuth, { email: string, password: string }, { rejectValue: string }>(
    "auth/signIn",
    async function (payload, {rejectWithValue}) {
        try {
            const response = await httpService.post("/auth/signIn", {
                email: payload.email.trim(),
                password: payload.password.trim()
            })
            // console.log('response SignIn', response.data)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.error.message)
        }
    }
)

export const updateRefreshToken = createAsyncThunk<IResponseAuth, undefined, {rejectValue: string}>(
    "auth/updateRefreshToken",
    async function (_, {rejectWithValue}){
        const refreshToken = localStorageService.getRefreshToken()
        try {
            const response = await httpService.post('/auth/token', {refreshToken: refreshToken})
            if(response.status === 200){
                return response.data
            }
        }catch (e) {
            return rejectWithValue('Can\'t update refresh token')
        }
    }
)

interface IInitialState {
    data: any,
    isAdminSignUp: boolean,
    isLoading: boolean,
    error: string
}

const initialState: IInitialState = {
    data: null,
    isAdminSignUp: false,
    isLoading: false,
    error: ''
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.error = ''
                state.isLoading = true
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
                localStorageService.setTokens(action.payload)
            })
            .addCase(signIn.pending, (state) => {
                state.error = ''
                state.isLoading = true
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
                localStorageService.setTokens(action.payload)
            })
            .addCase(updateRefreshToken.fulfilled, (state, action) => {
                localStorageService.setTokens(action.payload)
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.isLoading = false;
            })
    }
})

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}

export default authSlice.reducer