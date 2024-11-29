import { CapacitorHttp } from "@capacitor/core";
import AuthService from "./authService";
import { User } from "../lib/interfaces";
import platformService from "./platformService";

class AdminService {

    async getUsers(): Promise<User[]> {

        const token = await AuthService.getToken();

        if (!token) {
            return []
        }

        const response = await CapacitorHttp.get({
            url: platformService.getBaseAddressForPlatform() + 'api/admin/users',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        return response.data;
    }

}

export default new AdminService();