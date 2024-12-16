import { IonButton, IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import React, {useState} from 'react';
import cameraService from '../../services/cameraService';
// import { useDatabase } from '../../contexts/DatabaseContext';

const Tab1: React.FC = () => {

    // const { addLog } = useDatabase();

    // useIonViewDidEnter(() => {
    //     addLog?.("Take Photo page entered", "Take Photo page entered successfully");
    // });
    
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