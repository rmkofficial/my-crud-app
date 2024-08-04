import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Tüm kullanıcıları listeleme
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } else if (req.method === 'POST') {
        // Yeni kullanıcı ekleme
        const { name, email } = req.body;
        const newUser = await prisma.user.create({
            data: { name, email },
        });
        res.status(201).json(newUser);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
