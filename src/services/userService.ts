import { CapacitorHttp, HttpResponse } from "@capacitor/core";
import platformService from "./platformService";
import { RegisterRequest } from "../lib/interfaces";
import { LoginRequest } from "../lib/interfaces";
import { Preferences } from "@capacitor/preferences";
import {z} from 'zod';

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

            await Preferences.set({
                key: 'token',
                value: response.data.token
            });

            return response.data.token;
        }
        catch
        {
            return false;
        }
    }

    async validateRegisterData(data: RegisterRequest): Promise<boolean | RegisterRequest>{
        try{
            const registerRequest = z.object({
                firstName: z.string().min(2).max(20),
                lastName: z.string().min(2).max(20),
                email: z.string().min(6).email(),
                password: z.string().min(12).max(18).regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{12,18}$/)
            }).required();
    
            const validatedRequest = await registerRequest.safeParseAsync(data);
    
            if (!validatedRequest.success) {
                return false;
            }

            return validatedRequest.data;
        }
        catch
        {
            return false;
        }
        
    }

    async register(data: RegisterRequest): Promise<boolean>{
        try{

            const validatedData = await this.validateRegisterData(data);

            if(!validatedData){
                return false;
            }

            const response: HttpResponse = await CapacitorHttp.post({
                url: platformService.getBaseAddressForPlatform() + 'api/register',
                headers: { 'Content-Type': 'application/json' },
                data: validatedData
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