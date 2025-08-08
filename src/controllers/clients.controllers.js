import pg from 'pg';
import { pool } from '../db.js';

export const getUsers = async ( req , res ) => {
    try{
        const { rows } = await pool.query('SELECT * FROM clients'); 
        console.log(rows);
        res.send(rows); 
    } catch (error) {
        console.error('Error when getting clients', error);
        return res.status(500).json({ message : "Internal Server error"});
    }
}

export const getUser = async ( req , res) =>{
   try{
        const { id } = req.params;
        const { rows } = await pool.query('SELECT * FROM clients WHERE id = $1', [id]);
        console.log(rows);
        if ( rows.length === 0){
            return res.send('User not found');
        }
        res.send(rows[0]);
   } catch (error) {
        console.error('Error when getting client', error);
        return res.status(500).json({ message : "Internal Server error"});
   }
}

export const newUser = async ( req , res ) =>{
    try{
        const newClient = req.body;
        const { rows } = await pool.query('INSERT INTO clients (nombre, apellido, email, telefono) VALUES ($1, $2, $3, $4) RETURNING *', [newClient.name, newClient.lastname, newClient.email, newClient.phone])
        console.log(rows[0]);
        res.send(rows[0]);  
    } catch (error){
        if (error.code === '23505'){
            console.error('Email already exists');
            return res.status(400).send('Email already exists');
        }
        console.error('Error when adding client', error);
        return res.status(500).json({ message : "Internal Server error"});
    }
}

export const updateUser = async ( req , res ) =>{
    try{
        const { id } = req.params;
        const client = req.body;
        const { rows, rowCount } = await pool.query('UPDATE clients SET nombre = $1, apellido = $2, email = $3, telefono = $4 WHERE id = $5 RETURNING *', [client.name, client.lastname, client.email, client.phone, id]);
        if (rowCount === 0){
            console.log('Client not found');
            return res.status(402).json({ message : "Client not found"});
        }
        res.send(rows[0]);
    } catch (error){
        console.error('Error when updating client', error);
        return res.status(500).json({ message : "Internal Server error"});
    }
}

export const deleteUser = async ( req , res ) =>{
    const { id } = req.params;
    const { rows , rowCount } = await pool.query('DELETE FROM clients WHERE id = $1 RETURNING *', [id]);
    if (rowCount === 0){
        console.log('Client not found');
        return res.status(402).json({ message : "Client not found"});
    }
    res.send(rows[0]);
}

