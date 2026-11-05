import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class SessionController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    // 1. Encontrar o usuário pelo e-mail
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // 2. Comparar a senha fornecida com a que está no banco
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // 3. Gerar o Token JWT (o segredo vem do .env, nunca fica fixo no código)
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET não configurado no .env');
    }
    const token = jwt.sign({ id: user.id, role: user.role }, secret, {
      expiresIn: '1d'
    });

    return res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token
    });
  }
}