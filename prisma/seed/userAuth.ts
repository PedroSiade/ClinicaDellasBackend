import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedUserAuth() {
  console.log('🌱 Criando usuários de autenticação...');

  try {
    // Hash das senhas
    const adminPassword = await bcrypt.hash('admin123', 12);
    const managerPassword = await bcrypt.hash('manager123', 12);

    // Criar usuário admin
    const admin = await prisma.userAuth.upsert({
      where: { email: 'admin@clinicadellas.com' },
      update: {},
      create: {
        name: 'Administrador',
        email: 'admin@clinicadellas.com',
        password: adminPassword,
      },
    });

    // Criar usuário manager
    const manager = await prisma.userAuth.upsert({
      where: { email: 'manager@clinicadellas.com' },
      update: {},
      create: {
        name: 'Gerente',
        email: 'manager@clinicadellas.com',
        password: managerPassword,

      },
    });


  } catch (error) {
    console.error('❌ Erro ao criar usuários:', error);
    throw error;
  }
}

async function main() {
  try {
    await seedUserAuth();
  } catch (error) {
    console.error('❌ Erro no seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
