import React, { createContext, useContext, useEffect, useState } from 'react';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { LogEntry } from '../lib/types';

type DatabaseContextProps = {
    db?: SQLiteDBConnection;
    addLog?: (event: string, details: string) => Promise<void>;
    loadLogs?: () => Promise<LogEntry[]>;
    clearLogs?: () => Promise<void>;
    deleteById?: (id: string | number) => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextProps>({});

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [db, setDb] = useState<SQLiteDBConnection | undefined>(undefined);

    useEffect(() => {
        initializeDatabase()
    }, []);

    const initializeDatabase = async () => {
        const sqlite = new SQLiteConnection(CapacitorSQLite);
        const dbConnection = await sqlite.createConnection("usage-logs-db", false, "no-encryption", 1, false);
        await dbConnection.open();
        setDb(dbConnection);
    };

    async function addLog(event: string, details: string): Promise<void> {
        try {
            const timestamp = new Date().toLocaleString();
            const query = `
            INSERT INTO logs (event, timestamp, details)
            VALUES (?, ?, ?);
        `;
            await db?.run(query, [event, timestamp, details]);
        } catch (error) {
            console.error("Errore durante l'aggiunta del log:", (error as any).message);
        }
    }

    async function loadLogs(): Promise<LogEntry[]> {
        try {
            const query = "SELECT * FROM logs ORDER BY timestamp DESC";
            const result = await db?.query(query);
            return result?.values || [];
        } catch (error) {
            console.error("Errore durante il caricamento dei log:", (error as any).message);
            return [];
        }
    }

    async function clearLogs(): Promise<void> {
        try {
            const query = "DELETE FROM logs";
            await db?.run(query);
        } catch (error) {
            console.error("Errore durante la cancellazione dei log:", (error as any).message);
        }
    }

    async function deleteById(id: string | number): Promise<void> {
        try {
            const query = "DELETE FROM logs WHERE id = ?";
            await db?.run(query, [id]);
        } catch (error) {
            console.error("Errore durante la cancellazione del log:", (error as any).message);
        }
    }

    return (
        <DatabaseContext.Provider value={{ addLog, loadLogs, clearLogs, deleteById }}>
            {children}
        </DatabaseContext.Provider>
    );
};

export const useDatabase = () => {
    return useContext(DatabaseContext);
};