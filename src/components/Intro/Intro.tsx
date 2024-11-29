import { useEffect } from "react";
import { ContainerProps } from "../../lib/interfaces";
import { IonSpinner } from "@ionic/react";
import { IonButton } from "@ionic/react";
import IonicLogo from '../../assets/images/ionic-logo.png'


export function Intro({ onFinish }: ContainerProps) {

    const handleClick = () => {
        onFinish();
    }

    return (
        <div className="ion-text-center">
            <img src={IonicLogo}/>
            <IonButton type="button" onClick={handleClick}>Inizia</IonButton>
        </div>

    );
}