import { IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { Redirect, Route } from "react-router";
import Tab1 from "../Tab1/Tab1";
import Tab2 from "../Tab2/Tab2";
import { ellipse, triangle } from "ionicons/icons";

export function Settings() {
    return (
            <IonTabs>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="tab1" href="/app/settings/tab1">
                        <IonIcon icon={triangle} />
                        <IonLabel>Tab 1</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab2" href="/app/settings/tab2">
                        <IonIcon icon={ellipse} />
                        <IonLabel>Tab 2</IonLabel>
                    </IonTabButton>
                </IonTabBar>

                <IonRouterOutlet>
                    <Route path={'/app/settings/tab1'} component={Tab1} />
                    <Route path={'/app/settings/tab2'} component={Tab2} />
                    <Route exact path={'/app/settings'}>
                        <Redirect to={'/app/settings/tab1'} />
                    </Route>
                </IonRouterOutlet>
            </IonTabs>
    );
}