import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonSkeletonText, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import courseService from "../../services/courseService";
import { Course } from "../../lib/interfaces";
import { IonRefresherCustomEvent, RefresherCustomEvent } from "@ionic/core";

export function Home() {

    const [courses, setCourses] = useState<Course[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        courseService.getCourses()
            .then(res => setCourses(res))
            .then(() => setTimeout(() => { setLoading(false) }, 2000));
    }, []);

    const handleRefresh = async (e: RefresherCustomEvent) => {
        const courses = await courseService.getCourses();
        setCourses(courses);
        e.detail.complete();
    }

    return (
        <IonPage>
            <IonHeader id="header">
                <IonToolbar color={'primary'}>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRefresher slot="fixed" onIonRefresh={(e) => handleRefresh(e)}>
                    <IonRefresherContent />
                </IonRefresher>
                {loading ?
                    (
                        [...Array(10)].map((_, index) => (
                            <IonCard key={index}>
                                <IonCardHeader>

                                </IonCardHeader>
                                <IonCardContent>
                                    <IonItem>
                                        <IonSkeletonText animated={true} /><IonChip></IonChip>
                                    </IonItem>
                                    <IonItem>
                                        <IonSkeletonText animated={true} />
                                    </IonItem>
                                </IonCardContent>
                            </IonCard>
                        ))
                    )
                    :
                    (
                        courses.length === 0 ? (
                            <IonCard>
                                <IonCardContent>
                                    <IonItem>
                                        <IonText>No courses available</IonText>
                                    </IonItem>
                                </IonCardContent>
                            </IonCard>
                        )
                            :
                            (
                                courses.map(course => (
                                    <IonCard key={course.id}>
                                        <IonCardHeader>
                                            <IonCardTitle>{course.title} <IonChip color={'primary'}>{course.category.name}</IonChip></IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <IonItem>
                                                <IonText>{course.duration} ore</IonText>
                                            </IonItem>
                                            <IonItem>
                                                <IonText>{course.description}</IonText>
                                            </IonItem>
                                        </IonCardContent>
                                    </IonCard>
                                ))
                            )
                    )
                }
            </IonContent>
        </IonPage>
    );
}