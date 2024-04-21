const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
import fs from "fs";
import fsp from "fs/promises";

async function globalSetup() {

    if (fs.existsSync('./mydatabase.db')) {
        await fsp.unlink('./mydatabase.db');
    }

    // 创建或打开数据库文件
    const db = await sqlite.open({
        filename: './mydatabase.db',
        driver: sqlite3.Database
    })


    await db.exec("CREATE TABLE IF NOT EXISTS counter (id INTEGER PRIMARY KEY, cnt INTEGER NOT NULL DEFAULT 0)");
    await db.run("INSERT INTO counter (id, cnt) VALUES (1, 0)");
    await db.close();
}

export default globalSetup;