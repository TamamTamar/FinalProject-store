import { FC, useEffect, useState } from 'react';
import { Avatar } from 'flowbite-react';
import { useAuth } from '../hooks/useAuth';

const Profile: FC = () => {
    const { user } = useAuth();

    if (!user) {
        return <div>No user data found</div>;
    }

    return (
        <div className="max-w-md mx-auto p-4 bg-gray-800 text-white rounded-lg shadow-md">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Avatar img={user.image.url} alt={user.image.alt} rounded size="sm" />
                <div>
                    <h2 className="text-xl font-bold text-orange-400">{user.name.first} {user.name.middle} {user.name.last}</h2>
                    <p className="text-sm">{user.phone}</p>
                    <p className="text-sm">{`${user.address.street} ${user.address.houseNumber}, ${user.address.city}, ${user.address.state}, ${user.address.country}, ${user.address.zip}`}</p>
                </div>
            </div>
        </div>
    );
};



export default Profile;