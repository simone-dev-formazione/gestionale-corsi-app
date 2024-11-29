import { CapacitorHttp, HttpResponse } from "@capacitor/core";

class UserSevice {
    
    async login(data: {email: string; password: string}): Promise<string | boolean>{
        try{
            const response: HttpResponse = await CapacitorHttp.post({
                url: 'http://10.0.2.2:3000/api/login',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    email: data.email,
                    password: data.password
                }
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
}

export default new UserSevice();