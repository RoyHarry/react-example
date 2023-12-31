import { useState, useEffect, createContext } from 'react';
import { User, Auth } from '../api'; 
import { hasExpiredToken } from '../utils';

const userController = new User();
const authController = new Auth();

export const AuthContext = createContext();

export function AuthProvider(props){
    console.log("AuthProvider");
    console.log(props);
    const { children } = props;
    const [user, setUser] = useState(null);
    const [token, setToken]  = useState(null);
    const [refreshToken, setRefreshToken]  = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(( ) =>{
        //Comprobar si el usuario está logueado o no

        (async () =>{
        //console.log(authController);
        const accessToken = await authController.getAccessToken();
        const refreshToken = await authController.getRefreshToken();
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        if(!accessToken || !refreshToken){
            
            logout();
            setLoading(false);
            return;
        }

        if(hasExpiredToken(accessToken)){
            if(hasExpiredToken(refreshToken)){
                logout();
            }else{
                await reLogin(refreshToken);
            }
        }else{
            await login(accessToken);
        }        

        setLoading(false);
        })()    
    }, []);
    
    const reLogin = async (refreshToken)=>{
        try {
            const { accessToken } = await authController.refreshAccessToken(refreshToken);
            authController.setAccessToken(accessToken);
            await login(accessToken);
        } catch (error) {
            console.error(error);
        }
    }

    const login = async (accessToken) =>{
        try {
            const response = await userController.getMe(accessToken);
            delete response.password;
            setUser(response);
            setToken(accessToken);
            setRefreshToken(refreshToken);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    const logout = async () => {

        setUser(null);
        setToken(null);
        authController.removeToken()        
    }

    const data = {
        accessToken: token,        
        user,
        login,
        logout
    };

    if(loading) return null;

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}
