import { InputInputEventDetail, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import IonicLogo from '../../assets/images/ionic-logo.png'
import { checkmarkDoneOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useIonRouter } from "@ionic/react";
import { IonInputCustomEvent } from "@ionic/core";
import { RegisterRequest } from "../../lib/interfaces";
import userService from "../../services/userService";
import { useIonToast } from "@ionic/react";

export function Register() {

    const router = useIonRouter();

    const [showToast] = useIonToast();

    const [formData, setFormData] = useState<RegisterRequest>({firstName: '', lastName: '', email: '', password: ''});

    const handleChange = (e: IonInputCustomEvent<InputInputEventDetail>) => {
        const name = e.target.name;
        const value = e.detail.value;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await userService.register(formData);
        if(!response){
            return showToast({
                message: 'Registration failed',
                color: 'danger',
                duration: 2000
            });
        }

        showToast({
            message: 'Account created!',
            color: 'success',
            duration: 2000
        });

        router.push('/', 'back');
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
            <IonContent scrollY={false} className="ion-padding">
                <IonGrid fixed>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <div className="ion-text-center ion-padding">
                                <IonImg src={IonicLogo} alt="Ionic logo" style={{height: '15dvh'}} />
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <IonCard>
                                <IonCardContent>
                                    <form onSubmit={handleSubmit}>
                                        <IonInput label="First Name" fill="outline" labelPlacement="floating" type="text" placeholder="John" onIonInput={handleChange} value={formData.firstName} name='firstName' />
                                        <IonInput label="Last Name" fill="outline" labelPlacement="floating" type="text" placeholder="Doe" onIonInput={handleChange} value={formData.lastName} name='lastName' />
                                        <IonInput label="E-mail" fill="outline" labelPlacement="floating" type="email" placeholder="johndoe@email.com" onIonInput={handleChange} value={formData.email} name='email' />
                                        <IonInput className="ion-margin-top" label="Password" fill="outline" labelPlacement="floating" type="password" onIonInput={handleChange} value={formData.password} name='password' />
                                        <IonButton className="ion-margin-top" expand="block" type="submit">Create Account <IonIcon icon={checkmarkDoneOutline} slot="end" /></IonButton>
                                    </form>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}