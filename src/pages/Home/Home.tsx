import { IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";

export function Home(){
    return(
        <IonPage>
        <IonHeader id="header">
            <IonToolbar color={'primary'}>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>Home</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent scrollY={false} className="ion-padding">
            this is the home page!
        </IonContent>
    </IonPage>
    );
}