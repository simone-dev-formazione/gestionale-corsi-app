import { CapacitorHttp, HttpResponse } from "@capacitor/core";
import platformService from "./platformService";
import { RegisterRequest } from "../lib/interfaces";
import { LoginRequest } from "../lib/interfaces";

class UserSevice {
    
    async login(data: LoginRequest): Promise<string | boolean>{
        try{

            const response: HttpResponse = await CapacitorHttp.post({
                url: platformService.getBaseAddressForPlatform() + 'api/login',
                headers: { 'Content-Type': 'application/json' },
                data: data
            });
    
            if(!response.data.token){
                return false;
            }

            return response.data.token;
        }
        catch
        {
            return false;
        }
    }

    async register(data: RegisterRequest): Promise<string | boolean>{
        try{

            const response: HttpResponse = await CapacitorHttp.post({
                url: platformService.getBaseAddressForPlatform() + 'api/register',
                headers: { 'Content-Type': 'application/json' },
                data: data
            });
    
            if(response.status !== 201){
                return false;
            }

            return true;
        }
        catch
        {
            return false;
        }
    }
}

export default new UserSevice();