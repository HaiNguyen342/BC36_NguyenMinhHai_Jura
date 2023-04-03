
import { api } from "../constants/api"


export const UsersService = {
    signIn: (thongTinDangNhap) => {
        return api.post(`Users/signin`, thongTinDangNhap)
    },
    signUp: (thongTinDangKy) => {
        return api.post(`Users/signup`, thongTinDangKy)
    },
    getUser: (keyWord) => {
        if(keyWord !== '') { 
            return api.get(`Users/getUser?keyword=${keyWord}`)
        }
        return api.get(`Users/getUser`)
    },
    getUserByProjectId: (projectId) => {
        return api.get(`Users/getUserByProjectId?idProject=${projectId}`)
    },
    editUser:(data)=>{
        return api.put(`Users/editUser`,data)
    },
    DeleteUser:(id)=>{
        return api.delete(`Users/deleteUser?id=${id}`)
    }
}
