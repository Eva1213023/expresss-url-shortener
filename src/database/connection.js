import config  from "config";
import { drizzle } from "drizzle-orm/neon-http";

export default drizzle(config.get("database.connectionString"));
