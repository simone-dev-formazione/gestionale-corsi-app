import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import { homeOutline, hammerOutline, logOutOutline, peopleOutline } from "ionicons/icons";
import { Redirect, Route } from "react-router";
import { Home } from "../Home/Home";
import { Settings } from "../Settings/Settings";
import { useUserStore } from "../../hooks/useUserStore";
import AuthService from "../../services/authService";
import Users from "../Users/Users";
import { useIonAlert } from "@ionic/react";

export function Menu() {

    const router = useIonRouter();

    const { user, unsetLoggedInUser } = useUserStore();

    const [showAlert] = useIonAlert();

    const handleLogout = async () => {
        showAlert({
            header: 'Confirm Logout',
            message: 'Do you really want to log out?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: async () => {
                        await AuthService.logOutUser();
                        unsetLoggedInUser();
                        router.push('/', 'none');
                    }
                }
            ]
        });

    }

    const paths = [
        { name: 'Home', url: '/app/list', icon: homeOutline },
        { name: 'Settings', url: '/app/settings', icon: hammerOutline }
    ]

    return (
        <IonPage>
            <IonSplitPane contentId="main">
                <IonMenu contentId="main">
                    <IonHeader>
                        <IonToolbar color={'secondary'}>
                            <IonTitle>Hello, {user?.firstName}</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        {paths?.map((path, index) => (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem detail={true} routerLink={path.url} routerDirection="none">
                                    <IonIcon icon={path.icon} className="ion-margin-end" />
                                    {path.name}
                                </IonItem>
                            </IonMenuToggle>
                        ))}
                        {
                            user?.role === 'admin' && (
                                <IonMenuToggle autoHide={false}>
                                    <IonItem detail={true} routerLink={'/app/admin/users'} routerDirection="none">
                                        <IonIcon icon={peopleOutline} className="ion-margin-end" />
                                        [Admin] Users
                                    </IonItem>
                                </IonMenuToggle>

                            )
                        }
                        <IonMenuToggle autoHide={false} >
                            <IonButton expand='block' onClick={handleLogout}>
                                <IonIcon icon={logOutOutline} className="ion-margin-end" />
                                Logout
                            </IonButton>
                        </IonMenuToggle>
                    </IonContent>
                </IonMenu>

                <IonRouterOutlet id="main">
                    <Route exact path={'/app/list'} component={Home} />
                    <Route path={'/app/settings'} component={Settings} />
                    <Route path={'/app/admin/users'} component={Users} />
                    <Route exact path={'/app'}>
                        <Redirect to={'/app/list'} />
                    </Route>
                </IonRouterOutlet>
            </IonSplitPane>
        </IonPage>
    );
}