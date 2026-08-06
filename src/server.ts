// src/server.ts
import express from 'express';
import cors from 'cors';
import { UserController } from './controllers/UserController';

const app = express();

app.use(cors());
app.use(express.json());

const userController = new UserController();

// Rota de teste
app.get('/ping', (req, res) => {
  res.json({ message: 'Pong! A API está viva!' });
});

// Rota de cadastro de usuários
app.post('/users', userController.create);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});