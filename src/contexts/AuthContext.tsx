import { jwtDecode } from "jwt-decode";
import { createContext, FC, useEffect, useMemo, useState } from "react";
import * as auth from "../services/auth";
import { AuthContextProviderProps, AuthContextType, DecodedToken, IUser,  } from "../@Types/types";
import dialogs from "../ui/dialogs";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    const [user, setUser] = useState<IUser | undefined>()
    const [loading, setLoading] = useState<boolean>(true)


 const isLoggedIn = useMemo(() => user !== undefined, [user])

    useEffect(() => {
        setLoading(true)
        if (token) {
            const { _id } = jwtDecode(token) as any
            auth.userDetails(_id).then((res) => {
                setUser(res.data)
            }).finally(() => setLoading(false))
        }
        else {
            setLoading(false)
        }
    }, [])


    /* const login = async (email: string, password: string) => {
        await auth
            .login({ email, password })
            .then((res) => {
                setToken(res.data);
                localStorage.setItem("token", res.data);
            })

    } */

    const login = async (email: string, password: string) => {
        await auth
            .login({ email, password })
            .then((res) => {
                const token = res.data; // וודא שהטוקן נשלף בצורה נכונה
                setToken(token);
                
                localStorage.setItem("token", token);
                const decodedToken = jwtDecode<DecodedToken>(token);
                const userId = decodedToken._id;

                auth.userDetails(userId)
                    .then((res) => {
                        setUser(res.data);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            })
            .catch((error) => {
                console.error("Login error:", error);
            });
    };


    const register = async (form: IUser) => {
        await auth
            .register(form)
    }

    const logout = () => {
        setToken(null);
        setUser(undefined)
        localStorage.removeItem("token");
        dialogs.success("Logout", "You have been logged out successfully");
    
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn, user, token, login, register, logout
        }}>
            {children}
        </AuthContext.Provider>
    )
};