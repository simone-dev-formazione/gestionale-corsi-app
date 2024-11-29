import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import IonicLogo from '../../assets/images/ionic-logo.png'
import { checkmarkDoneOutline } from "ionicons/icons";
import React from "react";
import { useIonRouter } from "@ionic/react";

export function Register() {

    const router = useIonRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('register');
        router.goBack();
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={"primary"}>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Create account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
                <div className="ion-text-center ion-padding">
                    <img src={IonicLogo} alt="Ionic logo" height={'100dvh'}/>
                </div>
                <IonCard>
                    <IonCardContent>
                        <form onSubmit={handleSubmit}>
                            <IonInput label="E-mail" fill="outline" labelPlacement="floating" type="email" placeholder="johndoe@email.com"/>
                            <IonInput className="ion-margin-top" label="Password" fill="outline" labelPlacement="floating" type="password"/>
                            <IonButton className="ion-margin-top" expand="block" type="submit">Create my account <IonIcon icon={checkmarkDoneOutline} slot="end"/></IonButton>
                        </form>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}