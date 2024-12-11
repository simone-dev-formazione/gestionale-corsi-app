import {create} from 'zustand';
import AuthService from '../services/authService';
import { User } from '../lib/types';

interface UserStore {
    user: User | null;
    setLoggedInUser: (token: string) => void; 
    unsetLoggedInUser: () => void;
}

export const useUserStore = create<UserStore>()((set) => ({
    user: null,
    setLoggedInUser: (token) => {
        AuthService.getLoggeduserData(token)
            .then(userData => {
                set({user: !userData ? null : { ...userData }})
            });
    },
    unsetLoggedInUser: () => set({user: null})
}));
