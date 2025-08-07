import pg from 'pg';

export const pool = new pg.Pool({
    host : 'd252neh5pdvs73ce3dl0-a.virginia-postgres.render.com',
    user : 'jdbarrerap',
    password : 'KFXtj8okRkoTQiKbiQIhDxOPEx2V3Ysk',
    port : 5432,
    database : 'juanda_db',
    ssl : { rejectUnauthorized : false }
})
