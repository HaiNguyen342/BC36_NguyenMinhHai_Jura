import axios from 'axios'
import { ACCESS_TOKEN } from '../util/settings/config'

const TokenCyberSoft =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNiIsIkhldEhhblN0cmluZyI6IjE5LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4OTcyNDgwMDAwMCIsIm5iZiI6MTY2MDQxMDAwMCwiZXhwIjoxNjg5ODcyNDAwfQ.LOuGqORmUbzSj-vrf010cInw8TjYTzoLxS6HI1nQakE'
    

const baseURL = 'https://jiranew.cybersoft.edu.vn/api/'


export const api = axios.create()

api.interceptors.request.use((config) => {
    config = {
        ...config,
        headers: {
            TokenCyberSoft,
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
        },
        baseURL,
    }

    return config
})
