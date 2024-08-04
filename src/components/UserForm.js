// src/components/UserForm.js

import React, { useState, useEffect } from 'react';

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
        <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 text-center">{isEditing ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-semibold">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${isEditing ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
                        } transition-colors duration-300`}
                >
                    {isEditing ? 'Update User' : 'Add User'}
                </button>
            </form>
        </div>
    );
}

export default UserForm;
