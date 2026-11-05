// src/server.ts
import 'dotenv/config';          // carrega as variáveis do .env (DATABASE_URL, JWT_SECRET)
import express from 'express';
import 'express-async-errors';   // erros em funções async caem no tratador de erros abaixo
import cors from 'cors';
import type { Request, Response, NextFunction } from 'express';
import { routes } from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// Tratador de erros global: evita derrubar o servidor e não expõe detalhes internos
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  return res.status(500).json({ error: 'Erro interno no servidor.' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
