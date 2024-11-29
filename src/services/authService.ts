import { jwtDecode } from "jwt-decode";
import { Preferences } from "@capacitor/preferences";

interface GetUserRequest {
    firstName: string;
    lastName: string;
    role: string;
    email: string;
}

class AuthService {

    async getToken(){
        const response = await Preferences.get({
            key: 'token'
        })

        if(!response || !response.value){
            return '';
        }

        return response.value
    }
    
    getLoggeduserData(token: string){
        const userData: GetUserRequest = jwtDecode(token);
        return userData;
    }

    async logOutUser(){
        await Preferences.remove({
            key: 'token'
        })
    }
}

export default new AuthService();