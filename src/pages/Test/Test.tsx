import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';

const Test: React.FC = () => {

    const {id} = useParams<{id: string}>();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Page Title</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div>id: {id}</div>
            </IonContent>
        </IonPage>
    );
};

export default Test;