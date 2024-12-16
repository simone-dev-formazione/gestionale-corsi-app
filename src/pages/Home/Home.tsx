import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonMenuButton, IonModal, IonPage, IonRefresher, IonRefresherContent, IonSkeletonText, IonText, IonTitle, IonToolbar, useIonAlert, useIonToast, useIonViewDidEnter, useIonViewWillEnter } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import courseService from "../../services/courseService";
import { Course } from "../../lib/interfaces";
import { RefresherEventDetail } from "@ionic/core";
import { createOutline, trashOutline } from "ionicons/icons";
import { useUserStore } from "../../hooks/useUserStore";
// import DatabaseService from "../../services/databaseService";
// import { useDatabase } from "../../contexts/DatabaseContext";

export function Home() {

    const { user } = useUserStore();

    const [courses, setCourses] = useState<Course[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    const modal = useRef<HTMLIonModalElement>(null);

    const [showAlert] = useIonAlert();

    const [showToast] = useIonToast();

    // const { addLog } = useDatabase();

    useIonViewWillEnter(() => {
        courseService.getCourses()
            .then(res => setCourses(res))
            .then(() => setTimeout(() => { setLoading(false) }, 2000));

    }, []);

    const handleRefresh = async (e: CustomEvent<RefresherEventDetail>) => {
        const courses = await courseService.getCourses();
        setCourses(courses);
        e.detail.complete();
    }

    const handleCourseSelection = async (courseId: number) => {
        const course = await courseService.getCourse(courseId);
        if (!selectedCourse) {
            setSelectedCourse(null);
        }
        setSelectedCourse(course);
    }

    const handleCloseModal = () => {
        // modal?.current?.dismiss();
        setSelectedCourse(null);
    }

    const handleDelete = (courseId: number) => {
        showAlert({
            header: 'Delete',
            message: 'Do you really want to delete the course?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: async () => {
                        const result = await courseService.deleteCourse(courseId);
                        if (!result) {
                            return showToast({
                                message: 'Error',
                                color: 'danger',
                                duration: 2000
                            })
                        }
                        const courses = await courseService.getCourses();
                        setCourses(courses);
                        handleCloseModal();
                    }
                }
            ]
        });
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
                                    <IonCard key={course.id} onClick={() => { handleCourseSelection(course.id) }}>
                                        <IonCardHeader>
                                            <IonCardTitle>{course.title} <IonBadge color={'primary'}>{course.category.name}</IonBadge></IonCardTitle>
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
                <IonModal isOpen={selectedCourse !== null}>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setSelectedCourse(null)}>Close</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>{selectedCourse?.title} <IonChip color={'primary'}>{selectedCourse?.category.name}</IonChip></IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonItem>
                                    <IonText>{selectedCourse?.duration} ore</IonText>
                                </IonItem>
                                <IonItem>
                                    <IonText>{selectedCourse?.description}</IonText>
                                </IonItem>
                            </IonCardContent>
                        </IonCard>
                        {user && user.role === 'admin' ? (
                            <>
                                <IonButton expand='block' size="default" shape="round">
                                    <IonIcon icon={createOutline} />
                                </IonButton>
                                <IonButton expand="block" size="default" shape="round" onClick={() => handleDelete(selectedCourse?.id!)}>
                                    <IonIcon icon={trashOutline} />
                                </IonButton>
                            </>
                        )
                            :
                            (<></>)
                        }

                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
}