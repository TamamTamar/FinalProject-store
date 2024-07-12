import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../services/auth';
import { IUser } from '../@Types/types';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        getAllUsers()
            .then(res => setUsers(res.data))
            .catch(err => setError(err));
    }, []);

    return (
        <div className="product-list-container">
            {users.map(user => (
                <div key={user.id}> {/* Ensure the key is applied to a wrapping element */}
                    <Card className="product-card">
                        <h5 className="text-xl font-bold">{user.name.first}</h5>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default Users;
