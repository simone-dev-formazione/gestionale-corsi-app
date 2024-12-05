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
    setLoggedInUser: (token: string) => boolean; 
    unsetLoggedInUser: () => void;
}

export const useUserStore = create<UserStore>()((set) => ({
    user: undefined,
    setLoggedInUser: (token) => {set({user: AuthService.getLoggeduserData(token)}); return true},
    unsetLoggedInUser: () => set({user: undefined})
}));
