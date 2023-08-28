import { Post } from "../pages/web";
import { ENV } from "../utils"; 

export class Auth{
    baseApi = ENV.BASE_API;
    async register(data){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.REGISTER}`
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                }),
            };

            const response = await fetch (url, params)
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async login(data){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.LOGIN}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",                    
                },
                body: JSON.stringify(data)
            }
            const response = await fetch (url, params);
            const result = await response.json();            
            
            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    async refreshAccessToken(refreshToken) {
        console.log("async refreshAccessToken");
        console.log("refresh Token",refreshToken);
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.REFRESH_ACCESS_TOKEN}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    token: refreshToken,
                })
            };
            const response = await fetch(url, params);
            const result = await response.json();
            if(response!==200) throw result;

            return result; 
        } catch (error) {
            
        }
    }

    async setAccessToken(token){
        localStorage.setItem(ENV.JWT.ACCESS_TOKEN, token);
    }

    async getAccessToken(){
        return localStorage.getItem(ENV.JWT.ACCESS_TOKEN);
    }

    async setRefreshToken(token){
        localStorage.setItem(ENV.JWT.REFRESH_TOKEN, token);        
    }

    async getRefreshToken(){
        return localStorage.getItem(ENV.JWT.REFRESH_TOKEN);
    }

    removeToken(){
        localStorage.removeItem(ENV.JWT.ACCESS_TOKEN);
        localStorage.removeItem(ENV.JWT.REFRESH_TOKEN);
    }
}
