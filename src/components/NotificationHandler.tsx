import { useEffect } from 'react';
import { setupNotifications } from '../services/notificationService';
import { useIonRouter } from '@ionic/react';

const NotificationHandler: React.FC = () => {
  const router = useIonRouter();

  useEffect(() => {
    setupNotifications(router);
  }, [router]);

  return null;
};

export default NotificationHandler;