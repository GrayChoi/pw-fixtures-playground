import { test as baseTest } from '@playwright/test';
const sqlite3 = require('sqlite3').verbose();

// 打开数据库
const db = new sqlite3.Database('./mydatabase.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Database connected!');
    }
});

// 设置数据库忙碌时的等待超时时间为2000毫秒（2秒）
db.configure('busyTimeout', 2000);

function incrementCounter() {
    return new Promise<number>((resolve) => {
        db.serialize(() => {
            db.run("BEGIN IMMEDIATE TRANSACTION;");
            db.get("SELECT cnt FROM counter WHERE id = 1", (err, row) => {
                if (err) {
                    console.error('Error reading count', err);
                    db.run("ROLLBACK;");
                    return;
                }
    
                const currentCount = row.cnt;
                const newCount = currentCount + 1;
    
                db.run("UPDATE counter SET cnt = ? WHERE id = 1", [newCount], (err) => {
                    if (err) {
                        console.error('Error updating count', err);
                        db.run("ROLLBACK;");
                    } else {
                        db.run("COMMIT;");
                        resolve(newCount);
                        console.log(`Counter updated successfully to ${newCount}`);
                    }
                });
            });
        });
    })
}

export const test = baseTest.extend<{ cnt: number }>({
    cnt: async ({}, use) => {
        const cnt = await incrementCounter();
        use(cnt);
    },
});