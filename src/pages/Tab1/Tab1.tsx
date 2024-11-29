import { IonButton, IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, {useState} from 'react';
import cameraService from '../../services/cameraService';

const Tab1: React.FC = () => {
    const [image, setImage] = useState<string>('');

    const handleClick = async () => {
        const img = await cameraService.takePhoto();
        setImage(img);
        return () => {
            setImage('');
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'primary'}>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Take Photo</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonButton expand='block' onClick={handleClick}>Take Photo</IonButton>
                {image && (
                    <IonImg src={image}/>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Tab1;