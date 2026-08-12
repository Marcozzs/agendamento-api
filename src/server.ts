// src/server.ts
import express from 'express';
import cors from 'cors';
import { UserController } from './controllers/UserController.js';
import { ServiceController } from './controllers/ServiceController.js';
import { SessionController } from './controllers/SessionController.js';
const app = express();

app.use(cors());
app.use(express.json());

const userController = new UserController();
const serviceController = new ServiceController();
const sessionController = new SessionController();

// Rota de teste
app.get('/ping', (req, res) => {
  res.json({ message: 'Pong! A API está viva!' });
});

// Rotas de Usuários
app.post('/users', userController.create);

// Rotas de Serviços
app.post('/services', serviceController.create);
app.get('/services', serviceController.list);

app.post('/sessions', sessionController.create);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});