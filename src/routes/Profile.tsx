import { useEffect, useState } from "react";
import auth from "../services/auth";
import { IUser } from "../@Types/types";
import { jwtDecode } from "jwt-decode";

// טיפוס עבור נתוני הטוקן
interface DecodedToken {
    _id: string;
    // ניתן להוסיף כאן שדות נוספים מהטוקן לפי הצורך
}

const Profile = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No token found");
        return <div>No token found</div>;
    }

    // פענוח הטוקן לשליפת ה-ID של המשתמש
    const decodedToken = jwtDecode<DecodedToken>(token);
    const userId = decodedToken._id;

    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        auth
            .userDetails(userId, token) // העברת הטוקן לבקשה
            .then((res) => {
                setUser(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [userId, token]);

    return (
        <div>
            <h2 className="text-xl text-orange-400 bg-slate-800">
                {user?.name.first} {user?.name.middle} {user?.name.last}
            </h2>
        </div>
    );
};

export default Profile;