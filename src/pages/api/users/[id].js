import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'PUT') {
        const { name, email } = req.body;
        try {
            const updatedUser = await prisma.user.update({
                where: { id: String(id) },
                data: { name, email },
            });
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(404).json({ error: 'User not found' });
        }
    } else if (req.method === 'DELETE') {
        try {
            await prisma.user.delete({
                where: { id: String(id) },
            });
            res.status(204).end();
        } catch (error) {
            res.status(404).json({ error: 'User not found' });
        }
    } else {
        res.setHeader('Allow', ['PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
