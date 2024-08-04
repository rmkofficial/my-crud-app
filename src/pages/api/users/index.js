// /src/pages/api/users/index.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    // CORS başlıklarını ayarla
    res.setHeader('Access-Control-Allow-Origin', 'https://my-crud-app-theta.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        // CORS preflight request'lere yanıt ver
        res.status(200).end();
        return;
    }

    try {
        if (req.method === 'GET') {
            // Tüm kullanıcıları listeleme
            const users = await prisma.user.findMany();
            res.status(200).json(users);
        } else if (req.method === 'POST') {
            // Yeni kullanıcı ekleme
            const { name, email } = req.body;
            if (!name || !email) {
                return res.status(400).json({ error: 'Name and email are required' });
            }

            try {
                const newUser = await prisma.user.create({
                    data: { name, email },
                });
                res.status(201).json(newUser);
            } catch (error) {
                console.error('Database error:', error);
                res.status(500).json({ error: 'Database error occurred while creating user' });
            }
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
