import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { logInOutline, personCircleOutline } from 'ionicons/icons';
import IonicLogo from '../../assets/images/ionic-logo.png'
import { useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";
import { Intro } from "../../components/Intro/Intro";
import { Preferences } from "@capacitor/preferences";
import { useIonLoading } from "@ionic/react";
import { InputInputEventDetail, IonInputCustomEvent } from "@ionic/core";
import UserService from "../../services/userService";
import { useUserStore } from "../../hooks/useUserStore";
import { useIonToast } from "@ionic/react";

export function Login() {

    const {user, setLoggedInUser} = useUserStore();

    const [formData, setFormData] = useState<{email: string; password: string}>({email: '', password:''})

    const [introShown, setIntroShown] = useState<boolean>(true);

    const [present, dismiss] = useIonLoading();

    const [showToast] = useIonToast();

    useEffect(() => {
        Preferences.get({
            key: 'introShown'
        })
            .then((res) => res.value !== 'true' && setIntroShown(false))
        // Preferences.clear()

        Preferences.get({
            key: 'token'
        })
        .then((res) => res.value && setLoggedInUser(res.value))
        .then((res) =>  res && router.push('/app', 'none'));

    }, [])

    const router = useIonRouter();

    const handleChange = (e: IonInputCustomEvent<InputInputEventDetail>) => {
        const name = e.target.name;
        const value = e.detail.value;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = await UserService.login(formData);
       
        await present('Logging in...');

        if(!token){
            return await dismiss();
        }

        setLoggedInUser(token as string);

        setTimeout(async () => {
            await Preferences.set({
                key: 'token',
                value: token as string
            });
            await dismiss();
            showToast({
                message: 'Login successfull',
                color: "success",
                duration: 2000,
            });
            router.push('/app', 'forward');
        }, 2000);

    }

    const handleFinish = async () => {
        setIntroShown(true);
        await Preferences.set({
            key: 'introShown',
            value: 'true'
        });
    }

    return (
        <>
            {!introShown ? (
                <Intro onFinish={handleFinish} />
            )
                :
                (
                    <IonPage>
                        <IonHeader>
                            <IonToolbar color={"primary"}>
                                <IonTitle>Login</IonTitle>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent scrollY={false} className="ion-padding">
                            <IonGrid fixed>
                                <IonRow className="ion-justify-content-center">
                                    <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                                        <div className="ion-text-center ion-padding">
                                            <img src={IonicLogo} alt="Ionic logo" height={'100dvh'} />
                                        </div>
                                    </IonCol>
                                </IonRow>
                                <IonRow className="ion-justify-content-center">
                                    <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                                        <IonCard>
                                            <IonCardContent>
                                                <form onSubmit={handleSubmit}>
                                                    <IonInput  label="E-mail" fill="outline" labelPlacement="floating" type="email" placeholder="johndoe@email.com" onIonInput={handleChange} value={formData.email} name='email'/>
                                                    <IonInput className="ion-margin-top" label="Password" fill="outline" labelPlacement="floating" type="password" onIonInput={handleChange} value={formData.password} name='password'/>
                                                    <IonButton className="ion-margin-top" expand="block" type="submit">Login <IonIcon icon={logInOutline} slot="end" /></IonButton>
                                                    <IonButton className="ion-margin-top" routerLink="/register" color={'secondary'} expand="block" type="button">Create account <IonIcon icon={personCircleOutline} slot="end" /></IonButton>
                                                </form>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonContent>
                    </IonPage>
                )
            }
        </>
    );
}
