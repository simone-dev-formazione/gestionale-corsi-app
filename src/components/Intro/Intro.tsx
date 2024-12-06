import { useEffect } from "react";
import { ContainerProps } from "../../lib/interfaces";
import { IonImg, IonSpinner } from "@ionic/react";
import { IonButton } from "@ionic/react";
import IonicLogo from '../../assets/images/ionic-logo.png'


export function Intro({ onFinish }: ContainerProps) {

    const handleClick = () => {
        onFinish();
    }

    return (
        <div className="ion-text-center">
            <IonImg src={IonicLogo} style={{height: '15dvh'}}/>
            <IonButton type="button" onClick={handleClick}>Inizia</IonButton>
        </div>

    );
}