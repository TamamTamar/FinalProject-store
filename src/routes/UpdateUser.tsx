import React, { useEffect, useState } from 'react'
import { getUserById } from '../services/auth'
import { useParams } from 'react-router-dom';
import { IUser } from '../@Types/types';

const UpdateUser = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        //get user by id
        getUserById(id)
            .then(res => setUser(res.data))
            .catch(err => console.log(err));

    }, [])
  return (
    <div>
        <p>{user?.name.first}</p>
    </div>
  )
}

export default UpdateUser