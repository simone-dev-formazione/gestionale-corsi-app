import { IonButtons, IonCard, IonCardContent, IonChip, IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonSkeletonText, IonTitle, IonToolbar, RefresherCustomEvent } from '@ionic/react';
import React, { useState } from 'react';
import AdminService from '../../services/adminService';
import { User } from '../../lib/interfaces';
import { useIonViewWillEnter } from '@ionic/react';
import { LogEntry } from '../../services/databaseService';
import databaseService from '../../services/databaseService';

const Users: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const [users, setUsers] = useState<User[]>([]);

    const [results, setResults] = useState<User[]>([]);

    useIonViewWillEnter(() => {

        databaseService.getInstance().addLog("Users page loaded", "Users page loaded successfully");

        AdminService.getUsers()
            .then((res) => { setUsers(res); setResults(res); })
            .then(() => setTimeout(() => { setLoading(false) }, 2000));

    }, []);

    const handleInput = (ev: Event) => {
        const target = ev.target as HTMLIonSearchbarElement;
        const query = target?.value?.toLowerCase() || '';

        if (query) {
            setResults(users.filter((user) =>
                Object.values(user).some((value) =>
                    String(value).toLowerCase().includes(query)
                )
            ));
        } else {
            setResults([...users]);
        }
    };

    const handleRefresh = async (e: RefresherCustomEvent) => {
        const users = await AdminService.getUsers();
        setUsers(users);
        setResults(users);
        e.detail.complete();
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'primary'}>
                    <IonButtons slot='start'>
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Users</IonTitle>
                </IonToolbar>
                <IonToolbar color={'primary'}>
                    <IonSearchbar onIonInput={(ev) => handleInput(ev)} />
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRefresher slot='fixed' onIonRefresh={async (e) => await handleRefresh(e)}>
                    <IonRefresherContent />
                </IonRefresher>

                {loading && (
                    [...Array<number>(10)].map((_, index) => (
                        <IonCard key={index}>
                            <IonCardContent>
                                <IonItem lines='none'>
                                    <IonLabel>
                                        <IonSkeletonText animated={true} />
                                        <p><IonSkeletonText /></p>
                                    </IonLabel>
                                    <IonChip slot='end' color={'primary'}></IonChip>
                                </IonItem>
                            </IonCardContent>
                        </IonCard>
                    ))
                )}
                {results?.map((result) => (
                    <IonCard key={result.id}>
                        <IonCardContent className='ion-no-padding'>
                            <IonItem lines='none'>
                                <IonLabel>
                                    {result.firstName} {result.lastName}
                                    <p>{result.email}</p>
                                </IonLabel>
                                <IonChip slot='end' color={'primary'}>{result.role.substring(0, 1).toUpperCase()}</IonChip>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                ))}
            </IonContent>
        </IonPage>
    );
};

export default Users;