const { createPool } = require("mysql2/promise");
const { dbConfig } = require("./config");

class DB {
  static async connect() {
    DB.pool = createPool(dbConfig);
    await DB.pool.getConnection();
  }

  static async disconnect() {
    await DB.pool.end();
  }

  static async query(sql, values) {
    const [rows] = await DB.pool.query(sql, values);
    return rows;
  }
}

module.exports = { DB };
