function UserList({ users, onEdit, onDelete }) {
    return (
        <table className="min-w-full bg-white">
            <thead>
                <tr>
                    <th className="py-2 px-4 border-b border-gray-200">Name</th>
                    <th className="py-2 px-4 border-b border-gray-200">Email</th>
                    <th className="py-2 px-4 border-b border-gray-200">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td className="py-2 px-4 border-b border-gray-200">{user.name}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                        <td className="py-2 px-4 border-b border-gray-200">
                            <button className="text-blue-500 mr-2" onClick={() => onEdit(user)}>Edit</button>
                            <button className="text-red-500" onClick={() => onDelete(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default UserList;
