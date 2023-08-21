import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

const  db = await sqlite.open({
    filename:  './taxi_queue.db',
    driver:  sqlite3.Database
});

await db.migrate();

export async function joinQueue() {
    // console.log('join queue')
    const sql = `update taxi_queue SET passenger_queue_count = passenger_queue_count + 1`
    await db.run(sql);
}

export async function leaveQueue() {
    const sql = `update taxi_queue SET passenger_queue_count = passenger_queue_count - 1`
    await db.run(sql);   
}

export async function joinTaxiQueue() {
    const sql = `update taxi_queue SET taxi_queue_count = taxi_queue_count + 1`
    await db.run(sql);
   
}

export async function queueLength() {
    const sql = `SELECT taxi_queue_count FROM taxi_queue`
    await db.get(sql);
}

export async function taxiQueueLength() {
    const sql = `SELECT taxi_queue_count FROM taxi_queue`
    await db.get(sql);
}

export async function taxiDepart() {
    const sql1 = `SELECT passenger_queue_count FROM taxi_queue`;
    let passengers = 0;
    passengers = await db.get(sql1);
    console.log(passengers);
    const sql2 = `SELECT taxi_queue_count FROM taxi_queue`;
    let taxis = 0; 
    taxis = await db.get(sql2);
    console.log(taxis);

    if (taxis.taxi_queue_count >=1 && passengers.passenger_queue_count >=12) {
        const sql3 = `update taxi_queue 
        SET 
            taxi_queue_count = taxi_queue_count - 1, 
            passenger_queue_count = passenger_queue_count - 12`;
        await db.run(sql3);

    }

}