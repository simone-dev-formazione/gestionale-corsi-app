import { jwtDecode } from "jwt-decode";
import { Preferences } from "@capacitor/preferences";
import { JwtPayload } from "../lib/types";

class AuthService {

    async getToken() {
        const response = await Preferences.get({
            key: 'token'
        })

        if (!response || !response.value) {
            return '';
        }

        return response.value
    }

    async getLoggeduserData(token: string) {
        const userData = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;
        if (userData.exp! > currentTime) {
            return {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                role: userData.role,
            };
        } else {
            await this.logOutUser();
            return null;
        }
    }

    async logOutUser() {
        await Preferences.remove({
            key: 'token'
        })
    }
}

export default new AuthService();