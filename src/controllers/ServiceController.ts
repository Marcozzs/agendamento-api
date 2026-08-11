// src/controllers/ServiceController.ts
import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

export class ServiceController {
  // Criar um novo serviço
  async create(req: Request, res: Response) {
    try {
      const { title, description, price, durationMinutes } = req.body;

      const service = await prisma.service.create({
        data: {
          title,
          description,
          price,
          durationMinutes
        }
      });

      return res.status(201).json(service);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar o serviço.' });
    }
  }

  // Listar todos os serviços cadastrados
  async list(req: Request, res: Response) {
    try {
      const services = await prisma.service.findMany();
      return res.json(services);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar os serviços.' });
    }
  }
}