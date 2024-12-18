import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";

// Define the type for log entries
export type LogEntry = {
  id: number;
  event: string;
  timestamp: string;
  details: string | null;
};

class DatabaseService {
  private static instance: DatabaseService;
  private sqlite: SQLiteConnection;
  private db?: SQLiteDBConnection;

  private constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async initializeDatabase() {
    try {
      // Creazione della connessione al database
      this.db = await this.sqlite.createConnection(
        "usage-logs-db",
        false,
        "no-encryption",
        1,
        false
      );

      // Apertura del database
      await this.db.open();

      // Creazione della tabella log
      const query = `
                CREATE TABLE IF NOT EXISTS logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    event TEXT NOT NULL,
                    timestamp TEXT NOT NULL,
                    details TEXT
                );
            `;

      await this.db.execute(query);
      await this.addLog(
        "Application started",
        "Application started successfully"
      );
    } catch (error) {
      console.error(
        "Errore durante la creazione del database:",
        (error as any).message
      );
    }
  }

  async addLog(event: string, details: string): Promise<void> {
    try {
      if (this.db) {
        const timestamp = new Date().toLocaleString();
        const query = `
                INSERT INTO logs (event, timestamp, details)
                VALUES (?, ?, ?);
            `;
        await this.db.run(query, [event, timestamp, details]);
      }
    } catch (error) {
      console.error(
        "Errore durante l'aggiunta del log:",
        (error as any).message
      );
    }
  }

  async loadLogs(): Promise<LogEntry[]> {
    try {
      if (this.db) {
        const query = "SELECT * FROM logs ORDER BY timestamp DESC";
        const result = await this.db.query(query);
        return result.values || [];
      }
      return [];
    } catch (error) {
      console.error(
        "Errore durante il caricamento dei log:",
        (error as any).message
      );
      return [];
    }
  }

  async clearLogs(): Promise<void> {
    try {
      if (this.db) {
        const query = "DELETE FROM logs";
        await this.db.run(query);
      }
    } catch (error) {
      console.error(
        "Errore durante la cancellazione dei log:",
        (error as any).message
      );
    }
  }

  async deleteById(id: string | number): Promise<void> {
    try {
      if (this.db) {
          const query = "DELETE FROM logs WHERE id = ?";
          await this.db.run(query, [id]);
      }
    } catch (error) {
      console.error(
        "Errore durante la cancellazione del log:",
        (error as any).message
      );
    }
  }
}

export default DatabaseService;
