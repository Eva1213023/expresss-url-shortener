import { pgTable, varchar, index } from "drizzle-orm/pg-core";

export const urls = pgTable(
	//建立我資料庫的架構
	"urls",
	{
		short: varchar(10).primaryKey(),
		origin: varchar(255).notNull(),
	},
	(table) => {
		return {
			originIndex: index("origin_idx").on(table.origin), // This is an example of how to create an index
			//short 不用幫她建index是因為unique 就會有index屬性
		};
	},
);
