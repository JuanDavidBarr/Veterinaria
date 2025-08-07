import { Client } from 'pg';
import fs from 'fs';
import csv from 'csv-parser';

const client = new Client({
    host: 'd252neh5pdvs73ce3dl0-a.virginia-postgres.render.com',
    user: 'jdbarrerap',
    password: 'KFXtj8okRkoTQiKbiQIhDxOPEx2V3Ysk',
    port: 5432,
    database: 'juanda_db',
    ssl: { rejectUnauthorized: false }
})

async function clientsInjection() {
    try {
        await client.connect();
        const clients = [];
        fs.createReadStream('./data_csv/clients.csv')
            .pipe(csv())
            .on('data', (data) => {
                clients.push(data);
            })
            .on('end', async () => {
                for (const element of clients) {
                    const query = 'INSERT INTO clients (id, nombre, apellido, email, telefono) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING;'
                    const values = [
                        parseInt(element.id),
                        element.nombre,
                        element.apellido,
                        element.email,
                        element.telefono
                    ]
                    await client.query(query, values);
                }
                await client.end();
            })
    } catch (error) {
        console.error('Error when injecting clients', error);
        await client.end();
    }
}
clientsInjection();