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

export interface Category{
    id: number;
    name: string;
}

export interface Course {
    id: number;
    title: string;
    description: string;
    duration: number;
    category: Category;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}