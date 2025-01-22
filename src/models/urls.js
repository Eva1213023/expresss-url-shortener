import { nanoid } from "nanoid";
import { eq, or } from "drizzle-orm";

export default class {
	constructor(db, table) {
		//初始化 把db當參數傳進去
		this.db = db; //this用來存取物件本身的屬性
		this.table = table;
	}

	async create(origin) {
		await this.db.insert(this.table).values({
			origin,
			short: nanoid(10), //因為剛在schema.js設定他為10
		});
		const result = await this.db
			.select()
			.from(this.table)
			.where(eq(this.table.origin, origin))
			.limit(1);
		return result.at(0);
	}
	async getOriginFromShort(short) {
		const result = await this.db
			.select()
			.from(this.table)
			.where(eq(this.table.short, short))
			.limit(1);
		return result.at(0);
	}
}
