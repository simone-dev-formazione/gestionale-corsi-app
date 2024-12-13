import { IonButtons, IonContent, IonHeader, IonItem, IonMenuButton, IonPage, IonTitle, IonToggle, IonToolbar, ToggleCustomEvent, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import { Preferences } from '@capacitor/preferences';
import { useDarkMode } from '../../hooks/useDarkMode';

const Tab2: React.FC = () => {

    const {checkDarkMode, toggleDarkMode} = useDarkMode();

    const [darkState, setDarkState] = useState<boolean>(false);

    useIonViewWillEnter(() => {
        setDarkState(checkDarkMode());
    });

    const handleToggle = async () => {
        if(!darkState){
            setDarkState(toggleDarkMode(true));
            await Preferences.set({
                key: 'dark',
                value: 'true'
            }) }
        else{
            setDarkState(toggleDarkMode(false));
            await Preferences.set({
                key: 'dark',
                value: 'false'
            });
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'primary'}>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonToggle checked={darkState} onIonChange={handleToggle}>Dark Mode</IonToggle>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;