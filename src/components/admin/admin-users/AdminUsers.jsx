import { useState } from 'react';
import { useDeleteUser, useEditUser } from '../../../api/authApi';
import AccountSettings from '../../user/account/AccountSettings';
import styles from './AdminUsers.module.css';

export default function AdminUsers({ users, loading, error, fetchAllUsers }) {
    const { deleteUser } = useDeleteUser();
    const { editUserData } = useEditUser();
    const [showEditUserForm, setShowEditUserForm] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isAdminOpen, setIsAdminOpen] = useState(false);

    const handleEditUser = (userId) => {
            setSelectedUserId(userId);
            setShowEditUserForm(true);
    };

    const handleDeleteUser = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if(!confirmDelete) return;
        
        try {
            await deleteUser(userId);

            setSelectedUserId(null);

            await fetchAllUsers();
            console.log('Deleted user successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSubmitEditUser = async (userId, userData) => {
        try {
            await editUserData(userId, userData);

            setShowEditUserForm(false);
            setSelectedUserId(null);
            
            await fetchAllUsers();

            console.log('User updated successfully!');
        } catch (error) {
            console.error('Error editing user: ', error);
            
        }
    };

    const adminOpen = () => {
        setIsAdminOpen(true);
    };
    

    if (loading) return <div>Loading...</div>;

    return (
        <div className={styles.adminContent}>
            {showEditUserForm ? (
                <h2>Edit User</h2>
                ) : (
                <h2>Manage Users</h2>
                )}
            

            {
            showEditUserForm ? (
                <AccountSettings
                    userId={selectedUserId}
                    onSubmit={handleSubmitEditUser}
                    onAdmin={adminOpen}
                />
            ) : 
            (
                <div className={styles.usersList}>
                    {users && users.length > 0 ? (
                        <div className={styles.usersGrid}>
                            {users.map(user => (
                                <div key={user.id} className={styles.userItem}>
                                    <h4>{user.name}</h4>
                                    <p>{user.email}</p>
                                    <div className={styles.userActions}>
                                        <button className={`${styles.btn} ${styles.btnEdit}`} 
                                        onClick={() => handleEditUser(user.id)}
                                        >
                                            Edit
                                        </button>
                                            {user.admin || <button className={`${styles.btn} ${styles.btnDelete}`} 
                                            onClick={() => handleDeleteUser(user.id)}
                                        >
                                            Delete
                                        </button>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h3 className={styles.noArticles}>No users yet</h3>
                    )}
                </div>
            )}
        </div>
    );
} 