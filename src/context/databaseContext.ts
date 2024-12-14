import { createContext } from "react";
import { DatabaseContextType } from "../lib/types";

export const DatabaseContext = createContext<DatabaseContextType | null>(null);