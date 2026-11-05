// src/services/ServiceService.ts
// Camada de regras de negócio dos serviços: só esta camada conversa com o Prisma.
import { prisma } from '../lib/prisma.js';

type ServiceData = {
  name: string;
  description?: string;
  price: number;
  durationMinutes: number;
};

export class ServiceService {
  async create(data: ServiceData) {
    if (!data.name || data.price < 0 || data.durationMinutes <= 0) {
      throw new Error('Dados inválidos: informe nome, preço >= 0 e duração > 0.');
    }
    return prisma.service.create({ data });
  }

  async list() {
    return prisma.service.findMany();
  }

  async findById(id: string) {
    return prisma.service.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<ServiceData>) {
    const exists = await this.findById(id);
    if (!exists) return null;
    return prisma.service.update({ where: { id }, data });
  }

  async delete(id: string) {
    const exists = await this.findById(id);
    if (!exists) return false;
    await prisma.service.delete({ where: { id } });
    return true;
  }
}
