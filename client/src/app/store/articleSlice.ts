import {IArticle} from "../types";
import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {httpService} from "../services/http.service";

export const fetchArticles = createAsyncThunk<IArticle[], undefined, { rejectValue: string }>(
    'article/fetchArticles',
    async function (_, {rejectWithValue}) {
        try {
            const response = await httpService.get('')
            if (response.status === 200) {
                return response.data
            }
        } catch (e) {
            return rejectWithValue('Error server!')
        }
    }
)

export const deleteArticle = createAsyncThunk<null, { id: string }, { rejectValue: string }>(
    'article/deleteArticle',
    async function ({id}, {rejectWithValue, dispatch}) {
        try {
            const response = await httpService.delete(`/articles/delete/${id}`)
            if (response.status === 200) {
                dispatch(fetchArticles())
                return response.data
            }
        } catch (e) {
            return rejectWithValue('Can\'t delete article')
        }
    }
)

export const createArticle = createAsyncThunk<IArticle, IArticle, { rejectValue: string }>(
    'article/createArticle',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            const response = await httpService.post(`/articles/create`, payload)
            if (response.status === 201) {
                dispatch(fetchArticles())
                return response.data
            }
        } catch (e) {
            return rejectWithValue('Can\'t create article')
        }
    }
)

interface IInitialState {
    articles: IArticle[],
    isLoading: boolean,
    error: string
}

const initialState: IInitialState = {
    articles: [],
    isLoading: false,
    error: ''
}

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.isLoading = true
                state.error = ''
                state.articles = []
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.isLoading = false
                state.articles = action.payload
            })
            .addCase(createArticle.pending, (state) => {
                state.isLoading = true
                state.error = ''
            })
            .addCase(createArticle.fulfilled, (state, action) => {
                state.isLoading = false
                // state.articles.push(action.payload)
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

export default articleSlice.reducer