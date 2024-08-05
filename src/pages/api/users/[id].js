import serviceOperations from '@/services/serviceOperations';

export default async function handler(req, res) {
    const { id } = req.query;
    const tableName = 'User';

    try {
        if (req.method === 'PUT') {
            const { name, email } = req.body;
            const updatedUser = await serviceOperations.updateDataByAny(
                tableName,
                { id: String(id) },
                { name, email }
            );
            res.status(200).json(updatedUser);
        } else if (req.method === 'DELETE') {
            await serviceOperations.deleteDataByAny(tableName, { id: String(id) });
            res.status(204).end();
        } else {
            res.setHeader('Allow', ['PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
