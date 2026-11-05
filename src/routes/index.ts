// src/routes/index.ts
// Todas as rotas da API ficam centralizadas aqui.
import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';
import { ServiceController } from '../controllers/ServiceController.js';
import { SessionController } from '../controllers/SessionController.js';

export const routes = Router();

const userController = new UserController();
const serviceController = new ServiceController();
const sessionController = new SessionController();

// Rota de teste
routes.get('/ping', (req, res) => {
  res.json({ message: 'Pong! A API está viva!' });
});

// Usuários e login
routes.post('/users', userController.create);
routes.post('/sessions', sessionController.create);

// Serviços (CRUD)
routes.post('/services', serviceController.create);
routes.get('/services', serviceController.list);
routes.get('/services/:id', serviceController.show);
routes.put('/services/:id', serviceController.update);
routes.delete('/services/:id', serviceController.delete);
