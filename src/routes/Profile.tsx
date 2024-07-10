import { useEffect, useState } from "react";
import auth from "../services/auth";
import { IUser } from "../@Types/types";


const Profile = () => {
    const data = localStorage.getItem("user_id")
    console.log(data)
    const userId = localStorage.getItem("user_id") ?? "no user id";
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        auth
            .userDetails(userId)
            .then((res) => {
                setUser(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return (
        <div>
            <h2 className="text-xl text-orange-400">
                {user?.name.first} {user?.name.middle} {user?.name.last}
            </h2>
        </div>
    );
};

export default Profile;