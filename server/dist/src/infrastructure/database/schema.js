"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
exports.products = (0, sqlite_core_1.sqliteTable)('products', {
    id: (0, sqlite_core_1.integer)('id').primaryKey({ autoIncrement: true }),
    name: (0, sqlite_core_1.text)('name').notNull(),
    description: (0, sqlite_core_1.text)('description'),
    price: (0, sqlite_core_1.real)('price').notNull(),
    image: (0, sqlite_core_1.text)('image'),
});
//# sourceMappingURL=schema.js.map