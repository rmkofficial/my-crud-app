import { prisma } from '@/lib/prisma';

const checkEmail = async (req, res) => {
    if (req.method === 'POST') {
        const { email } = req.body;

        try {
            const existingUser = await prisma.user.findUnique({
                where: { email }
            });

            if (existingUser) {
                res.status(200).json({ exists: true });
            } else {
                res.status(200).json({ exists: false });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error checking email' });
        }
    } else {
        res.status(405).end(); 
    }
};

export default checkEmail;
