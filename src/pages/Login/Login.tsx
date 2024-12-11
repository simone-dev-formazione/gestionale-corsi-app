import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonInputPasswordToggle, IonPage, IonRow, IonTitle, IonToolbar, useIonViewWillLeave } from "@ionic/react";
import { logInOutline, personCircleOutline } from 'ionicons/icons';
import IonicLogo from '../../assets/images/ionic-logo.png'
import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { Intro } from "../../components/Intro/Intro";
import { Preferences } from "@capacitor/preferences";
import { useIonLoading } from "@ionic/react";
import { InputInputEventDetail, IonInputCustomEvent } from "@ionic/core";
import UserService from "../../services/userService";
import { useUserStore } from "../../hooks/useUserStore";
import { useIonToast } from "@ionic/react";
import { useIonViewWillEnter } from "@ionic/react";
import { LoginRequest } from "../../lib/interfaces";

export function Login() {

    const setLoggedInUser = useUserStore((state) => state.setLoggedInUser);
    const user = useUserStore((state) => state.user);

    const [formData, setFormData] = useState<LoginRequest>({ email: '', password: '' })

    const [introShown, setIntroShown] = useState<boolean>(true);

    const [present, dismiss] = useIonLoading();

    const [showToast] = useIonToast();

    useIonViewWillEnter(() => {
        Preferences.get({
            key: 'introShown'
        })
            .then((res) => res.value !== 'true' && setIntroShown(false))
    }, [])

    useIonViewWillLeave(() => {
        setFormData({ email: '', password: '' });
    })

    const router = useIonRouter();

    const handleChange = (e: IonInputCustomEvent<InputInputEventDetail>) => {
        const name = e.target.name;
        const value = e.detail.value;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await UserService.login(formData);

        await present('Logging in...');

        if (!response) {
            await dismiss();
            return showToast({
                message: 'Login failed',
                color: "danger",
                duration: 2000,
            });
        }

        setTimeout(async () => {
            await dismiss();
            await showToast({
                message: 'Login successfull',
                color: "success",
                duration: 2000,
            });
            router.push('/app', 'forward');
            setLoggedInUser(response as string);
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
                                            <IonImg src={IonicLogo} alt="Ionic logo" style={{ height: '15dvh' }} />
                                        </div>
                                    </IonCol>
                                </IonRow>
                                <IonRow className="ion-justify-content-center">
                                    <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                                        <IonCard>
                                            <IonCardContent>
                                                <form onSubmit={handleSubmit}>
                                                    <IonInput label="E-mail" fill="outline" labelPlacement="floating" type="email" placeholder="johndoe@email.com" onIonInput={handleChange} value={formData.email} name='email' />
                                                    <IonInput className="ion-margin-top" label="Password" fill="outline" labelPlacement="floating" type="password" onIonInput={handleChange} value={formData.password} name='password'>
                                                        <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                                                    </IonInput>
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
