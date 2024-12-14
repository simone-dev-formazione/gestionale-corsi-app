import { IonButtons, IonContent, IonHeader, IonItem, IonMenuButton, IonPage, IonTitle, IonToggle, IonToolbar, ToggleCustomEvent, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import { Preferences } from '@capacitor/preferences';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useDatabase } from '../../contexts/DatabaseContext';

const Tab2: React.FC = () => {

    const { addLog } = useDatabase();

    const { checkDarkMode, toggleDarkMode } = useDarkMode();

    const [darkState, setDarkState] = useState<boolean>(false);

    useIonViewWillEnter(() => {
        setDarkState(checkDarkMode());
    });

    useIonViewDidEnter(() => {
        addLog?.("Settings page entered", "Take Photo page entered successfully");
    });

    const handleToggle = async () => {
        if (!darkState) {
            setDarkState(toggleDarkMode(true));
            await Preferences.set({
                key: 'dark',
                value: 'true'
            })
        }
        else {
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