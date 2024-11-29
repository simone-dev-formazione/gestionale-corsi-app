import { CapacitorHttp } from "@capacitor/core";
import platformService from "./platformService";
import authService from "./authService";
import { Course } from "../lib/interfaces";

class CourseService {
    async getCourses(){
        try{

            const token = await authService.getToken();

            if (!token) {
                return []
            }

            const result = await CapacitorHttp.get({
                url: platformService.getBaseAddressForPlatform() + 'api/courses',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
    
            if(!result || !result.data){
                return [];
            }
    
            const courses: Course[] = result.data;

            return courses;
        }
        catch{
            return [];
        }
        
    }
}

export default new CourseService();