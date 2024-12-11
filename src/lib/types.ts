export type JwtPayload = {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    iat: number;
    exp: number; 
    sub: string;
    iss: string;
};

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}