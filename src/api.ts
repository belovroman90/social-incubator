import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data
        })
    },
    follow(id: number) {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    },
    unFollow(id: number) {
        return instance.delete<ResponseType>(`follow/${id}`)
            .then(response => response.data)
    },
    getProfile(id: number) {
        return instance.get(`profile/${id}`)
            .then(response => response.data)
    }
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<AuthData>>(`auth/me`)
            .then(response => response.data)
    }
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}
type AuthData = {
    id: number
    email: string
    login: string
}