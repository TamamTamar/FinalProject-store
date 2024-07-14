import React, { FC, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getUserById } from '../services/auth';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../@Types/types';

const Profile: FC = () => {
    const [user, setUser] = useState<IUser>();
   // const { user } = useAuth();
   const { _id } = jwtDecode(localStorage.getItem("token") || "") as any

   useEffect(() => {
       getUserById(_id)
       .then ((res) => {
           setUser(res.data)
       })
   }, [])
  

    if (!user) {
        return <div>No user data found</div>;
    }

    return (
        <div>
            <h2 className="text-xl text-orange-400 bg-slate-800">
            {user.name.first}
            </h2>
        </div>
    );
};

export default Profile;