import { IonButton, IonButtons, IonCard, IonCardContent, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { useIonViewWillEnter } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import { useDatabaseContext } from '../../hooks/useDatabaseContext';
import { LogEntry } from '../../lib/types';

const Logs: React.FC = () => {
    const [logs, setLogs] = useState<LogEntry[]>([]);

    const { db, loadLogs, clearLogs, deleteById } = useDatabaseContext()!;

    useIonViewWillEnter(() => {
        loadLogs(db!).then((logs) => setLogs(logs));
    });

    const handleDeleteAllClick = async () => {
        await clearLogs(db!);
        setLogs([]);
    };  

    const handleDeleteOneClick = async (id: string | number) => {
        await deleteById(db!, id);
        setLogs(logs.filter((log) => log.id !== id));
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'primary'}>
                    <IonButtons slot='start'>
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Logs</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {logs.length === 0 ? (
                    <IonCard>
                        <IonCardContent>
                            <IonItem lines='none'>
                                <IonLabel>No logs</IonLabel>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                ) 
                : (
                    <>
                        <IonButton onClick={handleDeleteAllClick}>Delete all</IonButton>
                        {logs.map((log) => (
                            <IonCard key={log.id}>
                                <IonCardContent>
                                    <IonItem lines='none'>
                                        <IonLabel>
                                            {log.event}
                                            <p>{log.timestamp}</p>
                                        </IonLabel>
                                        <IonIcon icon={trashOutline} onClick={() => handleDeleteOneClick(log.id)}/>
                                    </IonItem>
                                </IonCardContent>
                            </IonCard>
                        ))}
                    </>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Logs;