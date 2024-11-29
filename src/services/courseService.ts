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

    async getCourse(courseId: number){
        try{

            const token = await authService.getToken();

            if (!token) {
                return null;
            }

            const result = await CapacitorHttp.get({
                url: platformService.getBaseAddressForPlatform() + 'api/courses/by-id/' + courseId,
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
    
            if(!result || !result.data){
                return null;
            }
    
            const course: Course = result.data;

            return course;
        }
        catch{
            return null;
        }
    }

    async deleteCourse(courseId: number){
        try{

            const token = await authService.getToken();

            if (!token) {
                return null;
            }

            const response = await CapacitorHttp.delete({
                url: platformService.getBaseAddressForPlatform() + 'api/courses/delete/' + courseId,
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            
            if(response.status === 400 || response.status === 401){
                return false;
            }

            return true;
            
        }
        catch{
            return false;
        }
    }
}

export default new CourseService();