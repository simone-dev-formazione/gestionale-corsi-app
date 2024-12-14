import { SQLiteConnection, SQLiteDBConnection, CapacitorSQLite } from "@capacitor-community/sqlite";
import { DatabaseContext } from "../context/databaseContext";
import { useEffect, useState } from "react";
import { LogEntry } from "../lib/types";

export function DatabaseContextProvider({ children }: { children: React.ReactNode }) {

    const [sqlite, setSqlite] = useState<SQLiteConnection>(new SQLiteConnection(CapacitorSQLite));

    const [db, setDb] = useState<SQLiteDBConnection | null>(null);

    useEffect(() => {
        async function initializeDatabase() {
            try {
                // Creazione della connessione al database
                const db = await sqlite.createConnection("usage-logs-db", false, "no-encryption", 1, false);

                // Apertura del database
                await db.open();

                // Creazione della tabella log
                const query = `
                    CREATE TABLE IF NOT EXISTS logs (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        event TEXT NOT NULL,
                        timestamp TEXT NOT NULL,
                        details TEXT
                    );
                `;

                await db.execute(query);
                await addLog(db, "Application started", "Application started successfully");
                setDb(db);
            } catch (error) {
                console.error("Errore durante la creazione del database:", (error as any).message);
            }
        }

        initializeDatabase();
    }, []);

    async function loadLogs(database: SQLiteDBConnection): Promise<LogEntry[]> {
        try {
            if (!database) throw new Error("Database non inizializzato");
            const query = "SELECT * FROM logs ORDER BY timestamp DESC";
            const result = await database.query(query);
            return result.values || [];
        } catch (error) {
            console.error("Errore durante il caricamento dei log:", (error as any).message);
            return [];
        }
    }

    async function addLog(database: SQLiteDBConnection, event: string, details: string): Promise<void> {
        try {
            if (!database) throw new Error("Database non inizializzato");
            const timestamp = new Date().toLocaleString();
            const query = `
                INSERT INTO logs (event, timestamp, details)
                VALUES (?, ?, ?);
            `;
            await database.run(query, [event, timestamp, details]);
        } catch (error) {
            console.error("Errore durante l'aggiunta del log:", (error as any).message);
        }
    }

    async function clearLogs(database: SQLiteDBConnection): Promise<void> {
        try {
            if (!database) throw new Error("Database non inizializzato");
            const query = "DELETE FROM logs";
            await database.run(query);
        } catch (error) {
            console.error("Errore durante la cancellazione dei log:", (error as any).message);
        }
    }

    async function deleteById(database: SQLiteDBConnection, id: string | number): Promise<void> {
        try {
            if (!database) throw new Error("Database non inizializzato");
            const query = "DELETE FROM logs WHERE id = ?";
            await database.run(query, [id]);
        } catch (error) {
            console.error("Errore durante la cancellazione del log:", (error as any).message);
        }
    }

    const databaseContextValue = {
        db,
        addLog,
        loadLogs,
        clearLogs,
        deleteById
    };

    return (
        <DatabaseContext.Provider value={databaseContextValue}>
            {children}
        </DatabaseContext.Provider>
    );
}