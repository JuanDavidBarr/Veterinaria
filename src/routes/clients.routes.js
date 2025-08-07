import { Router } from 'express';
import { deleteUser, getUser, getUsers, newUser, updateUser } from '../controllers/clients.controllers.js'

const router = new Router();

router.get('/clients', getUsers);

router.get('/clients/:id', getUser);

router.post('/clients', newUser);

router.put('/clients/:id', updateUser);

router.delete('/clients/:id', deleteUser);

export default router;
