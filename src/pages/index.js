import React, { useEffect, useState } from 'react';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import Modal from '../components/Modal';
import { getAPI, deleteAPI, postAPI, putAPI } from '../services/fetchAPI';

export default function Home() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getAPI('/users');
            setUsers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const handleUserAdded = async (newUser) => {
        try {
            await postAPI('/users', newUser);
            fetchUsers();
            setModalVisible(false);
        } catch (error) {
            console.error('Failed to add user:', error);
        }
    };

    const handleUserUpdated = async (updatedUser) => {
        try {
            await putAPI(`/users/${updatedUser.id}`, updatedUser);
            fetchUsers();
            setModalVisible(false);
            setSelectedUser(null);
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setModalVisible(true);
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteAPI(`/users/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 sm:p-6">
            <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-4 sm:p-6">
                <h1 className="text-3xl font-bold mb-4 text-center">User Management</h1>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded mb-4 w-full sm:w-auto"
                    onClick={() => {
                        setSelectedUser(null);
                        setModalVisible(true);
                    }}
                >
                    Add User
                </button>
                {Array.isArray(users) && users.length > 0 ? (
                    <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
                ) : (
                    <p className="text-center text-gray-500">No users available.</p>
                )}
            </div>

            <Modal isVisible={isModalVisible} onClose={() => setModalVisible(false)}>
                <UserForm
                    onUserAdded={handleUserAdded}
                    onUserUpdated={handleUserUpdated}
                    selectedUser={selectedUser}
                />
            </Modal>
        </div>
    );
}
