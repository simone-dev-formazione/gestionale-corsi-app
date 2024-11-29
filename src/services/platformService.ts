import { isPlatform } from "@ionic/react";

class PlatformService {

    getBaseAddressForPlatform() {
        const isIos = isPlatform('ios');
        const isAndroid = isPlatform('android')

        let baseAddress: string;

        if (isIos) {
            baseAddress = 'http://localhost:3000/';
        }
        else if (isAndroid) {
            baseAddress = 'http://10.0.2.2:3000/'
        }
        else {
            baseAddress = 'http://localhost:3000/';
        }

        return baseAddress;
    }

}

export default new PlatformService();