import serviceOperations from '@/services/serviceOperations';

export default async function handler(req, res) {
    const tableName = 'User';

    res.setHeader('Access-Control-Allow-Origin', 'https://my-crud-app-theta.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        if (req.method === 'GET') {
            const users = await serviceOperations.getAllData(tableName);
            res.status(200).json(users);
        } else if (req.method === 'POST') {
            const { name, email } = req.body;
            if (!name || !email) {
                return res.status(400).json({ error: 'Name and email are required' });
            }
            const newUser = await serviceOperations.createNewData(tableName, { name, email });
            res.status(201).json(newUser);
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
