export interface IArticle {
    _id: string,
    title: string,
    description: string,
    body: string,
    created_at?: string
    updatedAt?: string
}

export interface IResponseAuth {
    accessToken: string,
    expiresIn: number,
    refreshToken: string,
    userId: string
}