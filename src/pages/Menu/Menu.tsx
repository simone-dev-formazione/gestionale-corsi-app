import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import { homeOutline, hammerOutline, logOutOutline, peopleOutline } from "ionicons/icons";
import { Redirect, Route, RouteComponentProps } from "react-router";
import { Home } from "../Home/Home";
import { Settings } from "../Settings/Settings";
import { useUserStore } from "../../hooks/useUserStore";
import AuthService from "../../services/authService";
import Users from "../Users/Users";
import { useIonAlert } from "@ionic/react";
import './Menu.css';
import { Preferences } from "@capacitor/preferences";
import { useThemeStore } from "../../hooks/useThemeStore";
import Test from "../Test/Test";

export function Menu({ match }: RouteComponentProps) {

    const router = useIonRouter();

    const user = useUserStore((state) => state.user);
    const unsetLoggedInUser = useUserStore((state) => state.unsetLoggedInUser);

    const [showAlert] = useIonAlert();

    const setGlobalTheme = useThemeStore((state) => state.setGlobalTheme);

    useIonViewWillEnter(() => {
        Preferences.get({
            key: 'dark'
        })
            .then((t) => {
                t.value === 'true' && document.documentElement.classList.add('ion-palette-dark');
                setGlobalTheme(t.value === 'true');
            })
    });

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
                                <IonItem detail={true} routerLink={path.url} routerDirection="none" className="menu-items">
                                    <IonIcon icon={path.icon} className="ion-margin-end" />
                                    {path.name}
                                </IonItem>
                            </IonMenuToggle>
                        ))}
                        {
                            user?.role === 'admin' && (
                                <>
                                    <IonMenuToggle autoHide={false}>
                                        <IonItem detail={true} routerLink={'/app/admin/users'} routerDirection="none">
                                            <IonIcon icon={peopleOutline} className="ion-margin-end" />
                                            [Admin] Users
                                        </IonItem>
                                    </IonMenuToggle>
                                    <IonMenuToggle autoHide={false}>
                                        <IonItem detail={true} routerLink={'/app/admin/test/17'} routerDirection="none">
                                            <IonIcon icon={peopleOutline} className="ion-margin-end" />
                                            [Admin] test
                                        </IonItem>
                                    </IonMenuToggle>
                                </>
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
                    <Route exact path={`${match.url}/list`} component={Home} />
                    <Route path={`${match.url}/settings`} component={Settings} />
                    <Route exact path={`${match.url}/admin/users`} component={Users} />
                    <Route exact path={`${match.url}/admin/test/:id`} component={Test} />
                    <Route exact path={`${match.url}`}>
                        <Redirect to={`${match.url}/list`} />
                    </Route>
                </IonRouterOutlet>
            </IonSplitPane>
        </IonPage>
    );
}