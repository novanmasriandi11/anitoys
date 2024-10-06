import { createContext, useContext, useEffect, useState } from "react";
import { fetchSignIn } from "../utils/ApiUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const signIn = async(email, password) => {
        try {
            const { token: newToken, role, email: userEmail, username, authorId } = await fetchSignIn(email, password);
            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUserInfo({ role, email: userEmail, username, authorId });
        } catch (error) {
            console.error('Failed to sign in: ', error);
            throw error;
        }
    };

    const signOut = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUserInfo(null)
    }

    return (
        <AuthContext.Provider value={{ token, userInfo, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};