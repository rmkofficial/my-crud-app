// src/components/UserList.js

function UserList({ users, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Name</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Email</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition">
                            <td className="py-3 px-4 border-b border-gray-200">{user.name}</td>
                            <td className="py-3 px-4 border-b border-gray-200">{user.email}</td>
                            <td className="py-3 px-4 border-b border-gray-200">
                                <button
                                    className="text-blue-500 hover:text-blue-700 mr-2"
                                    onClick={() => onEdit(user)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => onDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
