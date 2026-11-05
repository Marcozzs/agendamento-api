import type { Request, Response } from 'express';
import { ServiceService } from '../services/ServiceService.js';

// O controller só cuida do HTTP (ler a requisição e devolver a resposta).
// A regra de negócio fica no ServiceService.
const serviceService = new ServiceService();

export class ServiceController {
  // POST /services
  async create(req: Request, res: Response) {
    try {
      const { name, description, price, durationMinutes } = req.body;
      const service = await serviceService.create({ name, description, price, durationMinutes });
      return res.status(201).json(service);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // GET /services
  async list(req: Request, res: Response) {
    const services = await serviceService.list();
    return res.json(services);
  }

  // GET /services/:id
  async show(req: Request, res: Response) {
    const service = await serviceService.findById(String(req.params.id));
    if (!service) {
      return res.status(404).json({ error: 'Serviço não encontrado.' });
    }
    return res.json(service);
  }

  // PUT /services/:id
  async update(req: Request, res: Response) {
    const { name, description, price, durationMinutes } = req.body;
    const service = await serviceService.update(String(req.params.id), {
      name, description, price, durationMinutes
    });
    if (!service) {
      return res.status(404).json({ error: 'Serviço não encontrado.' });
    }
    return res.json(service);
  }

  // DELETE /services/:id
  async delete(req: Request, res: Response) {
    const deleted = await serviceService.delete(String(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Serviço não encontrado.' });
    }
    return res.status(204).send();
  }
}
