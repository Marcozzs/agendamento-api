// src/controllers/UserController.ts
import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;

      // 1. Verifica se o usuário já existe
      const userExists = await prisma.user.findUnique({
        where: { email }
      });

      if (userExists) {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
      }

      // 2. Criptografa a senha (hash)
      const passwordHash = await bcrypt.hash(password, 8);

      // 3. Salva no banco de dados
      const user = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: role || 'CLIENT' // Se não mandar, o padrão é CLIENT
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true
          // Repare que omitimos o passwordHash para não devolvê-lo na resposta!
        }
      });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  }
}