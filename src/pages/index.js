import { useEffect, useState } from 'react';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import { getAPI, deleteAPI, postAPI, putAPI } from '../services/fetchAPI';

export default function Home() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getAPI('/users');
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const handleUserAdded = async (newUser) => {
        try {
            await postAPI('/users', newUser);
            fetchUsers(); 
        } catch (error) {
            console.error('Failed to add user:', error);
        }
    };

    const handleUserUpdated = async (updatedUser) => {
        try {
            await putAPI(`/users/${updatedUser.id}`, updatedUser);
            fetchUsers(); 
            setSelectedUser(null); 
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <div className="w-full max-w-3xl p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
            <UserForm
              onUserAdded={handleUserAdded}
              onUserUpdated={handleUserUpdated}
              selectedUser={selectedUser}
            />
            <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
          </div>
        </div>
      );
    }
