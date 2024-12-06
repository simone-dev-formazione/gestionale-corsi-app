import { IonButtons, IonContent, IonHeader, IonItem, IonMenuButton, IonPage, IonTitle, IonToggle, IonToolbar, ToggleCustomEvent, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import { useThemeStore } from '../../hooks/useThemeStore';
import { Preferences } from '@capacitor/preferences';

const Tab2: React.FC = () => {

    const theme = useThemeStore((state) => state.theme);
    const setGlobalTheme = useThemeStore((state) => state.setGlobalTheme);

    const [darkState, setDarkState] = useState<boolean>(false);

    useIonViewWillEnter(() => {
        setDarkState(theme);
    });

    const handleToggle = async () => {
        if(!darkState){
            document.documentElement.classList.add('ion-palette-dark');
            setGlobalTheme(true);
            setDarkState(true);
            await Preferences.set({
                key: 'dark',
                value: 'true'
            }) }
        else{
            document.documentElement.classList.remove('ion-palette-dark');
            setGlobalTheme(false);
            setDarkState(false);
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