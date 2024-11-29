import { Camera, CameraResultType } from "@capacitor/camera";

class CameraService {

    async takePhoto(){

        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            saveToGallery: true
        });

        const img = `data:image/jpeg;base64,${image.base64String}`;
        return img;
    }
}

export default new CameraService();