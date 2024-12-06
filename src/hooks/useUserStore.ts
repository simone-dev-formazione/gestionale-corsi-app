import {create} from 'zustand';
import AuthService from '../services/authService';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

interface UserStore {
    user?: User;
    setLoggedInUser: (token: string) => void; 
    unsetLoggedInUser: () => void;
}

export const useUserStore = create<UserStore>()((set) => ({
    user: undefined,
    setLoggedInUser: (token) => set({user: AuthService.getLoggeduserData(token)}),
    unsetLoggedInUser: () => set({user: undefined})
}));
