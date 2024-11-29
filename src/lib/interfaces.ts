export interface ContainerProps {
    onFinish: () => void;
}

interface AddId {
    id?: number;
}

export interface User extends AddId {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}