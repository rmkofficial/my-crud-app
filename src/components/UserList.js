// src/components/UserList.js

function UserList({ users, onEdit, onDelete }) {
    return (
        <div className="w-full space-y-4">
            {users.map((user) => (
                <div key={user.id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            className="text-blue-500 hover:text-blue-700"
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
                    </div>
                </div>
            ))}
        </div>
    );
}

export default UserList;
