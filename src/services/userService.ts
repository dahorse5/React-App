import axios from "axios"
import { jwtDecode, JwtPayload } from "jwt-decode"
import User, { Login, EditUserType } from "../interfaces/User";



const api: string = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users`;

export function getUserById(id: string) {
    return axios.get(`${api}/${id}`, { headers: { 'x-auth-token': localStorage.authToken } })
}


export function login(values: Login) {
    return axios.post(`${api}/login`, values) // token
}



export async function register(userValues: User) {
    try {
        const response = await axios.post(api, userValues)
        console.log(response.data._id);

    } catch (error) {
        console.log(error);
    }
}



export interface CustomJwtPayload extends JwtPayload {
    _id?: string;
    isBusiness?: boolean;
    isAdmin: boolean;
    iat: number;
}




export async function getUserDetails(token: string) {
    try {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        const userId = decoded._id || "Id Not Found";
        return await getUserById(userId);
    } catch (error) {
        console.error(`Error: ${error}`);
        return null;
    }
}


export function getAllUsers() {
    return axios.get(api, { headers: { 'x-auth-token': localStorage.authToken } })
}


// delete user
export function deleteUser(userId: string) {
    return axios.delete(`${api}/${userId}`, { headers: { 'x-auth-token': localStorage.authToken } })
}

export function editUser(userId: string, newUser: EditUserType) {
    return axios.put(`${api}/${userId}`, newUser, { headers: { 'x-auth-token': localStorage.authToken } })
}

export function setBusiness(userId: string, isBusiness: boolean) {
    return axios.patch(`${api}/${userId}`, { isBusiness: isBusiness }, { headers: { 'x-auth-token': localStorage.authToken } })
}