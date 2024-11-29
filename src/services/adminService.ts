import { CapacitorHttp } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";
import AuthService from "./authService";
import { User } from "../lib/interfaces";

class AdminService {

    async getUsers(): Promise<User[]>{

        const token = await AuthService.getToken();

        if(!token){
            return []
        }

        const response = await CapacitorHttp.get({
            url: 'http://10.0.2.2:3000/api/admin/users',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        return response.data;
    }

}

export default new AdminService();