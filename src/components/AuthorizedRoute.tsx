import { ReactNode } from "react";
import { useUserStore } from "../hooks/useUserStore";
import { Redirect } from "react-router";

export function AuthorizedRoute({children, unauthorizedRedirectTo}: {children: ReactNode; unauthorizedRedirectTo: string}){
    const {user} = useUserStore();

    return user?.role === 'admin'? <>{children}</> : <Redirect to={unauthorizedRedirectTo}/>
}