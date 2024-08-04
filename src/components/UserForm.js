import { useState, useEffect } from 'react';

function UserForm({ onUserAdded, onUserUpdated, selectedUser }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (selectedUser) {
            setName(selectedUser.name);
            setEmail(selectedUser.email);
            setIsEditing(true);
        } else {
            setName('');
            setEmail('');
            setIsEditing(false);
        }
    }, [selectedUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            onUserUpdated({ id: selectedUser.id, name, email });
        } else {
            onUserAdded({ name, email });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-2">
                <label className="block text-gray-700">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                {isEditing ? 'Update User' : 'Add User'}
            </button>
        </form>
    );
}

export default UserForm;
