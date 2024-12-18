import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, isPlatform, setupIonicReact, useIonRouter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Menu } from './pages/Menu/Menu';
import { useUserStore } from './hooks/useUserStore';
import { useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';
import { useDarkMode } from './hooks/useDarkMode';
import DatabaseService from './services/databaseService';
// import { DatabaseProvider } from './contexts/DatabaseContext';
// import { setupNotifications } from './services/notificationService';
import NotificationHandler from './components/NotificationHandler';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/palettes/dark.system.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

// import '@ionic/react/css/palettes/dark.system.css';

// import '@ionic/react/css/palettes/dark.always.css';

import '@ionic/react/css/palettes/dark.class.css';


/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {

  const { toggleDarkMode } = useDarkMode();

  const router = useIonRouter()

  const user = useUserStore((state) => state.user);
  const setLoggedInUser = useUserStore((state) => state.setLoggedInUser);

  useEffect(() => {
    // setupNotifications();

    if(isPlatform('mobile')) {
      DatabaseService.getInstance().initializeDatabase();
    }

    Preferences.get({
      key: 'token'
    })
      .then((res) => { res.value && setLoggedInUser(res.value) });

    Preferences.get({
      key: 'dark'
    })
      .then((t) => {
        t.value === 'true' && toggleDarkMode(true);
      })
  }, []);

  return (
    <IonApp>
      {/* <DatabaseProvider> */}
        <IonReactRouter>
          <NotificationHandler />
          <IonRouterOutlet>
            <Route exact path="/" render={() =>
              !user ? <Login /> : <Redirect to={'/app'} />
            } />
            <Route exact path="/register" component={Register} />
            <Route path='/app' render={(props) =>
              !user ? <Redirect to='/' /> : <Menu {...props} />
            } />
          </IonRouterOutlet>
        </IonReactRouter>
      {/* </DatabaseProvider> */}
    </IonApp>
  )
};

export default App;
