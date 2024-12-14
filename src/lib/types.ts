import { SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";

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

export type LogEntry = {
    id: number;
    event: string;
    timestamp: string;
    details: string | null;
};

export type DatabaseContextType = {
    db: SQLiteDBConnection | null;
    addLog: (database: SQLiteDBConnection, event: string, details: string) => Promise<void>;
    loadLogs: (database: SQLiteDBConnection) => Promise<LogEntry[]>;
    clearLogs: (database: SQLiteDBConnection) => Promise<void>;
    deleteById: (database: SQLiteDBConnection, id: string | number) => Promise<void>;
}