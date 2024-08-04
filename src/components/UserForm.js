import React, { useState, useEffect } from 'react';

function UserForm({ onUserAdded, onUserUpdated, selectedUser }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({ name: '', email: '' });

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

    const validateForm = async () => {
        let formErrors = { name: '', email: '' };
        let isValid = true;

        if (!name) {
            formErrors.name = 'Name is required';
            isValid = false;
        }

        if (!email) {
            formErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = 'Email address is invalid';
            isValid = false;
        } else {
            // Güncelleme sırasında mevcut e-posta kontrolü
            const response = await fetch('/api/users/check-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, id: selectedUser?.id })
            });
            const { exists } = await response.json();
            if (exists) {
                formErrors.email = 'This email is already in use';
                isValid = false;
            }
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (await validateForm()) {
            if (isEditing) {
                onUserUpdated({ id: selectedUser.id, name, email });
            } else {
                onUserAdded({ name, email });
            }
        }
    };

    return (
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
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <button
                type="submit"
                className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${isEditing ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
                    } transition-colors duration-300`}
            >
                {isEditing ? 'Update User' : 'Add User'}
            </button>
        </form>
    );
}

export default UserForm;
