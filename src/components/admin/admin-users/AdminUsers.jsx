import { useAllUsers } from '../../../api/authApi';
import styles from './AdminUsers.module.css';

export default function AdminUsers() {
    const { users, loading } = useAllUsers();
    

    if (loading) return <div>Loading...</div>;

    return (
        <div className={styles.adminContent}>
            {/* {showEditUserForm ? (
                <h2>Edit User</h2>
                ) : ( */}
                <h2>Manage Users</h2>
                {/* )} */}
            

            {
            // showEditUserForm ? (
            //     <EditUser
            //         userId={selectedUser}
            //         onSubmit={handleSubmitEditUser}
            //         onCancel={handleCancelEdit}
            //     />
            // ) : 
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
                                        // onClick={() => handleEditUser(user.id)}
                                        >
                                            Edit
                                        </button>
                                        {user.admin || <button className={`${styles.btn} ${styles.btnDelete}`} 
                                        // onClick={() => handleDeleteUser(user.id)}
                                        >
                                            Delete
                                        </button>}
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